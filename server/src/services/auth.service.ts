import pg from "pg";
import { createHash, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { EmailService } from "./mail.service.js";
import { getPasswordResetEmailTemplate } from "../config/email_templates.js";
import type {
  User,
  LoginRequest,
  AuthResponse,
  ChangePasswordRequest,
  AdminChangePasswordRequest,
  ChangePasswordResponse,
  SessionsResponse,
  TokenValidationResponse,
  RefreshTokenResponse,
  LogoutResponse,
  RegisterRequest,
  UpdateUserInfoRequest
} from "@f123dashboard/shared";

export class AuthService {
  private pool: pg.Pool;
  private jwtSecret: string;
  private static readonly TOKEN_EXPIRY_DAYS = 7;
  private static readonly TOKEN_EXPIRY_JWT = '7d';

  constructor(pool: pg.Pool) {
    this.pool = pool;
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    this.jwtSecret = process.env.JWT_SECRET;
  }

  async getUsers(): Promise<User[]> {
    const result = await this.pool.query (`
  SELECT id, username, name, surname, mail, encode(image, 'escape') as image
  FROM users;
    `);
      return result.rows as User[];
  }

  async cleanupExpiredSessions(): Promise<LogoutResponse> {
    try {
      await this.cleanExpiredSessions();
      
      return {
        success: true,
        message: 'Sessioni scadute pulite con successo'
      };

    } catch (error) {
      console.error('Cleanup expired sessions error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante la pulizia delle sessioni scadute'
      };
    }
  }

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    try {
      this.validateLoginInput(loginData.username, loginData.password);

      // Get user from database
      const result = await this.pool.query(
        'SELECT id, username, name, surname, password, mail, encode(image, \'escape\') as image, is_active, is_admin FROM users WHERE username = $1',
        [loginData.username]
      );

      if (result.rows.length === 0) {
        return {
          success: false,
          message: 'Nome utente o password non validi'
        };
      }

      const user = result.rows[0];

      // Check if user account is active
      if (!user.is_active) {
        return {
          success: false,
          message: 'Account disabilitato'
        };
      }
      
      // Verify password
      const isPasswordValid = this.comparePassword(loginData.password, user.password);
      
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Nome utente o password non validi'
        };
      }

      // Create session and get JWT token
      const jwtToken = await this.createSession(user.id, loginData.userAgent);

      // Update last login
      await this.pool.query(
        'UPDATE users SET last_login = NOW() WHERE id = $1',
        [user.id]
      );

      return {
        success: true,
        message: 'Login effettuato con successo',
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          surname: user.surname,
          mail: user.mail,
          image: user.image,
          isAdmin: user.is_admin
        },
        token: jwtToken
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante il login'
      };
    }
  }


  async register(request: RegisterRequest): Promise<AuthResponse> {
    try {   
      const { username, name, surname, password, mail, image } = request;
      //onst userAgent = request.headers['user-agent'];

      // Validate input
      this.validateRegisterInput(request);

      // Check if username already exists
      const existingUser = await this.pool.query(
        'SELECT username FROM users WHERE username = $1',
        [username]
      );

      if (existingUser.rows.length > 0) {
        return {
            success: false,
            message: 'Nome utente già esistente'
        };
      }

      // Check if email already exists
      const existingEmail = await this.pool.query(
        'SELECT mail FROM users WHERE mail = $1',
        [mail]
      );

      if (existingEmail.rows.length > 0) {
        return {
            success: false,
            message: 'Email già esistente'
        };
      }

      // Hash password
      const hashedPassword = this.hashPassword(password);

      // Insert new user
      const result = await this.pool.query(
        'INSERT INTO users (username, name, surname, password, mail, image, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id, username, name, surname, mail, image',
        [username, name, surname, hashedPassword, mail, image || null]
      );

      const newUser = result.rows[0];

      // Create session and get JWT token
      const jwtToken = await this.createSession(newUser.id, undefined);

      return {
          success: true,
          message: 'Registrazione completata con successo',
          user: {
            id: newUser.id,
            username: newUser.username,
            name: newUser.name,
            surname: newUser.surname,
            mail: newUser.mail,
            image: image
          },
          token: jwtToken
      };

    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle validation errors with specific status codes
      if (error instanceof Error) {
        if (error.message.includes('obbligatori') || 
            error.message.includes('deve') || 
            error.message.includes('caratteri') ||
            error.message.includes('email valido') ||
            error.message.includes('contenere')) {
          return {    
              success: false,
              message: error.message
          };
        }
      }

      return {
          success: false,
          message: 'Si è verificato un errore durante la registrazione'
      };
    }
  }

  async validateToken(jwtToken: string): Promise<TokenValidationResponse> {
    try {
      const sessionData = await this.validateSession(jwtToken);
      
      if (!sessionData.valid) {
        return { valid: false };
      }

      return {
        valid: true,
        userId: sessionData.userId,
        username: sessionData.username,
        name: sessionData.name,
        surname: sessionData.surname,
        mail: sessionData.mail,
        image: sessionData.image,
        isAdmin: sessionData.isAdmin
      };

    } catch (error) {
      console.error('Token validation error:', error);
      return { valid: false };
    }
  }

  async changePassword(changeData: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    try {
      this.validateChangePasswordInput(changeData.currentPassword, changeData.newPassword);

      // Validate JWT token
      const sessionData = await this.validateSession(changeData.jwtToken);
      
      if (!sessionData.valid) {
        return {
          success: false,
          message: 'Sessione non valida'
        };
      }

      // Get current user
      const result = await this.pool.query(
        'SELECT password FROM users WHERE id = $1',
        [sessionData.userId]
      );

      if (result.rows.length === 0) {
        return {
          success: false,
          message: 'Utente non trovato'
        };
      }

      // Verify current password
      const isCurrentPasswordValid = this.comparePassword(
        changeData.currentPassword, 
        result.rows[0].password
      );

      if (!isCurrentPasswordValid) {
        return {
          success: false,
          message: 'Password corrente errata'
        };
      }

      // Hash new password
      const hashedNewPassword = this.hashPassword(changeData.newPassword);

      // Update password
      await this.pool.query(
        'UPDATE users SET password = $1, password_updated_at = NOW() WHERE id = $2',
        [hashedNewPassword, sessionData.userId]
      );

      // Invalidate all sessions for this user (force re-login)
      await this.pool.query(
        'UPDATE user_sessions SET is_active = FALSE WHERE user_id = $1',
        [sessionData.userId]
      );

      return {
        success: true,
        message: 'Password modificata con successo'
      };

    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante la modifica della password'
      };
    }
  }

  async adminChangePassword(changeData: AdminChangePasswordRequest): Promise<ChangePasswordResponse> {
    try {
      // Validate JWT token and check if user is admin
      const sessionData = await this.validateSession(changeData.jwtToken);
      
      if (!sessionData.valid) {
        console.error('Admin change password: Invalid session');
        return {
          success: false,
          message: 'Sessione non valida'
        };
      }

      // Check if user is admin
      if (!sessionData.isAdmin) {
        console.error('Admin change password: User is not admin');
        return {
          success: false,
          message: 'Accesso non autorizzato. Solo gli amministratori possono modificare le password.'
        };
      }

      // Validate new password
      this.validateNewPassword(changeData.newPassword);

      // Check if target user exists and get their ID and email
      const userResult = await this.pool.query(
        'SELECT id, username, name, surname, mail FROM users WHERE username = $1',
        [changeData.userName]
      );

      if (userResult.rows.length === 0) {
        console.error('Admin change password: Target user not found');
        return {
          success: false,
          message: 'Utente non trovato'
        };
      }

      const targetUser = userResult.rows[0];
      const targetUserId = targetUser.id;

      // Hash new password
      const hashedNewPassword = this.hashPassword(changeData.newPassword);

      // Update password
      await this.pool.query(
        'UPDATE users SET password = $1, password_updated_at = NOW() WHERE id = $2',
        [hashedNewPassword, targetUserId]
      );

      // Invalidate ALL sessions for the target user (force re-login)
      const invalidateResult = await this.pool.query(
        'UPDATE user_sessions SET is_active = FALSE WHERE user_id = $1 AND is_active = TRUE',
        [targetUserId]
      );

      console.log(`Invalidated ${invalidateResult.rowCount} sessions for user ${targetUser.username}`);

      // Send email notification if user has email
      if (targetUser.mail && targetUser.mail.trim() !== '') {
        try {
          const emailService = new EmailService();
          
          // Generate email template using the email templates module
          const { html, text } = getPasswordResetEmailTemplate(
            { 
              username: targetUser.username, 
              name: targetUser.name, 
              surname: targetUser.surname 
            },
            changeData.newPassword
          );

          await emailService.sendGmailEmail(
            targetUser.mail,
            'Password Modificata - Race for Federica',
            html,
            text
          );

          console.log(`Password reset email sent to ${targetUser.username} (${targetUser.mail})`);
        } catch (emailError) {
          console.error('Failed to send password reset email:', emailError);
          // Don't fail the password change if email fails
        }
      }

      return {
        success: true,
        message: `Password modificata con successo per l'utente ${targetUser.username}. Sessioni invalidate: ${invalidateResult.rowCount}.`
      };

    } catch (error) {
      console.error('Admin change password error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante la modifica della password'
      };
    }
  }

  async refreshToken(oldJwtToken: string, userAgent?: string): Promise<RefreshTokenResponse> {
    try {
      const sessionData = await this.validateSession(oldJwtToken);
      
      if (!sessionData.valid) {
        return {
          success: false,
          message: 'Sessione non valida'
        };
      }

      // Generate new JWT token
      const newJwtToken = this.generateJWTToken(sessionData.userId!, sessionData.username!);

      // Update session in database with new activity
      await this.pool.query(
        'UPDATE user_sessions SET last_activity = NOW() WHERE user_id = $1 AND is_active = TRUE',
        [sessionData.userId]
      );

      return {
        success: true,
        token: newJwtToken,
        message: 'Token aggiornato con successo'
      };

    } catch (error) {
      console.error('Refresh token error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante l\'aggiornamento del token'
      };
    }
  }

  async logout(jwtToken: string): Promise<LogoutResponse> {
    try {
      await this.invalidateSession(jwtToken);
      
      return {
        success: true,
        message: 'Disconnessione effettuata con successo'
      };

    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante la disconnessione'
      };
    }
  }

  async logoutAllSessions(jwtToken: string): Promise<LogoutResponse> {
    try {
      const sessionData = await this.validateSession(jwtToken);
      
      if (!sessionData.valid) {
        return {
          success: false,
          message: 'Sessione non valida'
        };
      }

      // Invalidate all sessions for this user
      await this.pool.query(
        'UPDATE user_sessions SET is_active = FALSE WHERE user_id = $1',
        [sessionData.userId]
      );

      return {
        success: true,
        message: 'Tutte le sessioni sono state disconnesse con successo'
      };

    } catch (error) {
      console.error('Logout all sessions error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante la disconnessione di tutte le sessioni'
      };
    }
  }

  async getUserSessions(jwtToken: string): Promise<SessionsResponse> {
    try {
      const sessionData = await this.validateSession(jwtToken);
      
      if (!sessionData.valid) {
        return {
          success: false,
          message: 'Sessione non valida'
        };
      }

      const result = await this.pool.query(
        `SELECT session_token, created_at, last_activity, expires_at, is_active
         FROM user_sessions 
         WHERE user_id = $1 AND is_active = TRUE
         ORDER BY last_activity DESC`,
        [sessionData.userId]
      );

      return {
        success: true,
        sessions: result.rows.map(session => ({
          sessionToken: session.session_token,
          createdAt: session.created_at,
          lastActivity: session.last_activity,
          expiresAt: session.expires_at,
          isActive: session.is_active,
          isCurrent: true // Since we're using JWT, we can't easily identify the current session
        }))
      };

    } catch (error) {
      console.error('Get user sessions error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante il recupero delle sessioni'
      };
    }
  }

  async updateUserInfo(request: UpdateUserInfoRequest, jwt: string): Promise<AuthResponse> {
    try {
      const { name, surname, mail, image } = request;

      if (!jwt) {
        return {
          success: false,
          message: 'Token JWT è obbligatorio'
        };
      }

      // Validate JWT token
      const sessionData = await this.validateSession(jwt);
      
      if (!sessionData.valid) {
        return {
          success: false,
          message: 'Sessione non valida'
        };
      }

      // Build updates object from provided fields
      const updates = {
        name,
        surname,
        mail,
        image
      };

      // Validate updates
      this.validateUpdateUserInfoInput(updates);

      // If email is being updated, check if it already exists
      if (mail) {
        const existingEmail = await this.pool.query(
          'SELECT id FROM users WHERE mail = $1 AND id != $2',
          [mail, sessionData.userId]
        );

        if (existingEmail.rows.length > 0) {
          return {
            success: false,
            message: 'Email già esistente'
          };
        }
      }

      // Build dynamic query
      const updateFields: string[] = [];
      const values: any[] = [];
      let parameterIndex = 1;

      if (name !== undefined) {
        updateFields.push(`name = $${parameterIndex}`);
        values.push(name);
        parameterIndex++;
      }

      if (surname !== undefined) {
        updateFields.push(`surname = $${parameterIndex}`);
        values.push(surname);
        parameterIndex++;
      }

      if (mail !== undefined) {
        updateFields.push(`mail = $${parameterIndex}`);
        values.push(mail);
        parameterIndex++;
      }

      if (image !== undefined) {
        updateFields.push(`image = $${parameterIndex}`);
        values.push(image);
        parameterIndex++;
      }

      // If no fields to update
      if (updateFields.length === 0) {
        return {
          success: false,
          message: 'Nessun campo valido da aggiornare'
        };
      }

      // Add user ID to values
      values.push(sessionData.userId);

      // Execute update query
      const query = `
        UPDATE users 
        SET ${updateFields.join(', ')} 
        WHERE id = $${parameterIndex} 
        RETURNING id, username, name, surname, mail, encode(image, 'escape') as image, is_admin
      `;

      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        return {
          success: false,
          message: 'Utente non trovato'
        };
      }

      const updatedUser = result.rows[0];

      return {
        success: true,
        message: 'Informazioni utente aggiornate con successo',
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          name: updatedUser.name,
          surname: updatedUser.surname,
          mail: updatedUser.mail,
          image: updatedUser.image,
          isAdmin: updatedUser.is_admin
        }
      };

    } catch (error) {
      console.error('Update user info error:', error);
      
      // Handle validation errors
      if (error instanceof Error) {
        if (error.message.includes('obbligatori') || 
            error.message.includes('deve') || 
            error.message.includes('caratteri') ||
            error.message.includes('email valido') ||
            error.message.includes('contenere')) {
          return {
            success: false,
            message: error.message
          };
        }
      }

      return {
        success: false,
        message: 'Si è verificato un errore durante l\'aggiornamento delle informazioni utente'
      };
    }
  }

    private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  private comparePassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  private sanitizeUserAgent(userAgent?: string): string | undefined {
    if (!userAgent) return undefined;
    
    // Limit user agent length to prevent database issues
    const maxLength = 500;
    return userAgent.length > maxLength ? userAgent.substring(0, maxLength) : userAgent;
  }

  private generateSessionToken(): string {
    return randomBytes(32).toString('hex');
  }

  private generateJWTToken(userId: number, username: string, isAdmin: boolean = false): string {
    return jwt.sign(
      { 
        userId: userId, 
        username: username,
        isAdmin: isAdmin
      },
      this.jwtSecret,
      { expiresIn: AuthService.TOKEN_EXPIRY_JWT }
    );
  }

  private async createSession(userId: number, userAgent?: string): Promise<string> {
    const sessionToken = this.generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + AuthService.TOKEN_EXPIRY_DAYS); // 7 days from now

    // Generate JWT token
    const user = await this.pool.query(
      'SELECT username, is_admin FROM users WHERE id = $1',
      [userId]
    );
    
    const jwtToken = this.generateJWTToken(userId, user.rows[0].username, user.rows[0].is_admin);

    // Sanitize user agent for database storage
    const sanitizedUserAgent = this.sanitizeUserAgent(userAgent);

    await this.pool.query(
      `INSERT INTO user_sessions (user_id, session_token, expires_at, ip_address, user_agent) 
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, sessionToken, expiresAt, null, sanitizedUserAgent || null]
    );

    return jwtToken;
  }

  private async validateSession(jwtToken: string): Promise<{ valid: boolean; userId?: number; username?: string; name?: string; surname?: string; mail?: string; image?: string; isAdmin?: boolean }> {
    try {
      // Verify JWT token
      const decoded = jwt.verify(jwtToken, this.jwtSecret) as any;
      
      // Check if user still exists and is active
      const result = await this.pool.query(
        'SELECT id, username, is_active, name, surname, mail, encode(image, \'escape\') as image, is_admin FROM users WHERE id = $1',
        [decoded.userId]
      );

      if (result.rows.length === 0) {
        return { valid: false };
      }

      const user = result.rows[0];

      // Check if user account is active
      if (!user.is_active) {
        return { valid: false };
      }

      // Check if there's an active session for this user
      const sessionResult = await this.pool.query(
        `SELECT session_token, expires_at, is_active 
         FROM user_sessions 
         WHERE user_id = $1 AND is_active = TRUE 
         ORDER BY last_activity DESC 
         LIMIT 1`,
        [decoded.userId]
      );

      if (sessionResult.rows.length === 0) {
        return { valid: false };
      }

      const session = sessionResult.rows[0];

      // Check if session is expired
      if (new Date() > new Date(session.expires_at)) {
        // Clean up expired session
        await this.pool.query(
          'UPDATE user_sessions SET is_active = FALSE WHERE user_id = $1',
          [decoded.userId]
        );
        return { valid: false };
      }

      // Update last activity for the most recent session
      await this.pool.query(
        'UPDATE user_sessions SET last_activity = NOW() WHERE session_token = $1',
        [session.session_token]
      );

      return {
        valid: true,
        userId: user.id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        mail: user.mail,
        image: user.image,
        isAdmin: user.is_admin
      };

    } catch (error) {
      console.error('Token validation error:', error);
      return { valid: false };
    }
  }

  private async invalidateSession(jwtToken: string): Promise<void> {
    try {
      // Decode JWT to get user ID
      const decoded = jwt.verify(jwtToken, this.jwtSecret) as any;
      
      // Invalidate all sessions for this user
      await this.pool.query(
        'UPDATE user_sessions SET is_active = FALSE WHERE user_id = $1',
        [decoded.userId]
      );
    } catch (error) {
      console.error('Error invalidating session:', error);
    }
  }

  private async cleanExpiredSessions(): Promise<void> {
    // Mark expired sessions as inactive
    await this.pool.query(
      'UPDATE user_sessions SET is_active = FALSE WHERE expires_at < NOW() AND is_active = TRUE'
    );
    
    // Delete very old sessions (older than 30 days) to prevent database bloat
    await this.pool.query(
      'DELETE FROM user_sessions WHERE created_at < NOW() - INTERVAL \'30 days\''
    );
  }

  private validateLoginInput(username: string, password: string): void {
    if (!username || !password) {
      throw new Error('Nome utente e password sono obbligatori');
    }
    
    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('Nome utente e password devono essere stringhe');
    }
  }

  private validateRegisterInput(registerData: RegisterRequest): void {
    const { username, name, surname, password, mail, image } = registerData;
    
    if (!username || !name || !surname || !password || !mail || !image) {
      throw new Error('Tutti i campi sono obbligatori inclusa l\'immagine del profilo');
    }

    if (username.length < 3 || username.length > 30) {
      throw new Error('Il nome utente deve contenere tra 3 e 30 caratteri');
    }

    if (password.length < 8) {
      throw new Error('La password deve contenere almeno 8 caratteri');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      throw new Error('Inserire un indirizzo email valido');
    }

    // Image validation
    if (image.length > 5000000) { // 5MB limit
      throw new Error('Dimensione immagine troppo grande (massimo 5MB)');
    }

    // Check if image is a valid base64 string
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    let cleanImage = image;
    
    // Remove data URL prefix if present
    if (image.startsWith('data:')) {
      const commaIndex = image.indexOf(',');
      if (commaIndex !== -1) {
        cleanImage = image.substring(commaIndex + 1);
      }
    }
    
    if (!base64Regex.test(cleanImage)) {
      throw new Error('Formato immagine non valido. Fornire un\'immagine codificata in base64 valida');
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      throw new Error('La password deve contenere almeno una lettera maiuscola, una lettera minuscola e un numero');
    }

    // Username format validation
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      throw new Error('Il nome utente può contenere solo lettere, numeri e underscore');
    }
  }

  private validateChangePasswordInput(currentPassword: string, newPassword: string): void {
    if (!currentPassword || !newPassword) {
      throw new Error('Password corrente e nuova password sono obbligatorie');
    }

    if (newPassword.length < 8) {
      throw new Error('La nuova password deve contenere almeno 8 caratteri');
    }

    if (currentPassword === newPassword) {
      throw new Error('La nuova password deve essere diversa dalla password corrente');
    }

    // Password strength validation for new password
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      throw new Error('La nuova password deve contenere almeno una lettera maiuscola, una lettera minuscola e un numero');
    }
  }

  private validateNewPassword(newPassword: string): void {
    if (!newPassword) {
      throw new Error('La nuova password è obbligatoria');
    }

    if (newPassword.length < 8) {
      throw new Error('La nuova password deve contenere almeno 8 caratteri');
    }
  }

  private validateUpdateUserInfoInput(updates: {
    name?: string;
    surname?: string;
    mail?: string;
    image?: string;
  }): void {
    // Check if at least one field is provided
    if (!updates || Object.keys(updates).length === 0) {
      throw new Error('At least one field must be provided for update');
    }

    // Validate name if provided
    if (updates.name !== undefined) {
      if (typeof updates.name !== 'string') {
        throw new Error('Name must be a string');
      }
      if (updates.name.trim().length === 0) {
        throw new Error('Name cannot be empty');
      }
      if (updates.name.length > 50) {
        throw new Error('Name must be 50 characters or less');
      }
    }

    // Validate surname if provided
    if (updates.surname !== undefined) {
      if (typeof updates.surname !== 'string') {
        throw new Error('Surname must be a string');
      }
      if (updates.surname.trim().length === 0) {
        throw new Error('Surname cannot be empty');
      }
      if (updates.surname.length > 50) {
        throw new Error('Surname must be 50 characters or less');
      }
    }

    // Validate email if provided
    if (updates.mail !== undefined) {
      if (typeof updates.mail !== 'string') {
        throw new Error('Email must be a string');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updates.mail)) {
        throw new Error('Please enter a valid email address');
      }
    }

    // Validate image if provided
    if (updates.image !== undefined) {
      if (typeof updates.image !== 'string') {
        throw new Error('Image must be a string');
      }
      
      if (updates.image.length > 5000000) { // 5MB limit
        throw new Error('Image size is too large (max 5MB)');
      }

      // Check if image is a valid base64 string
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      let cleanImage = updates.image;
      
      // Remove data URL prefix if present
      if (updates.image.startsWith('data:')) {
        const commaIndex = updates.image.indexOf(',');
        if (commaIndex !== -1) {
          cleanImage = updates.image.substring(commaIndex + 1);
        }
      }
      
      if (!base64Regex.test(cleanImage)) {
        throw new Error('Invalid image format. Please provide a valid base64 encoded image');
      }
    }
  }
}
