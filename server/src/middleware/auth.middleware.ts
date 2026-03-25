import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include user data
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        username: string;
        isAdmin?: boolean;
        jwtToken: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: 'Token di autenticazione mancante'
            });
            return;
        }

        // Extract token (format: "Bearer TOKEN")
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.substring(7) 
            : authHeader;

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Token di autenticazione non valido'
            });
            return;
        }

        // Verify JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET not configured');
        }

        const decoded = jwt.verify(token, jwtSecret) as {
            userId: number;
            username: string;
            isAdmin?: boolean;
        };
        
        // Attach user data to request
        req.user = {
            userId: decoded.userId,
            username: decoded.username,
            isAdmin: decoded.isAdmin,
            jwtToken: token
        };
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                success: false,
                message: 'Token scaduto'
            });
            return;
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: 'Token non valido'
            });
            return;
        }

        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Errore durante la verifica del token'
        });
    }
};

// Admin-only middleware
export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Autenticazione richiesta'
    });
    return;
  }

  if (!req.user.isAdmin) {
    res.status(403).json({
      success: false,
      message: 'Accesso negato: permessi amministratore richiesti'
    });
    return;
  }

  next();
};
