import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import pool from '../config/db.js';
import logger from '../config/logger.js';

const authService = new AuthService(pool);

export class AuthController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await authService.getUsers();
      res.json(users);
    } catch (error) {
      logger.error('Error getting users:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get users'
      });
    }
  }

  async cleanupExpiredSessions(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.cleanupExpiredSessions();
      res.json(result);
    } catch (error) {
      logger.error('Error cleaning up expired sessions:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to cleanup sessions'
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData = {
        ...req.body,
        userAgent: req.headers['user-agent']
      };
      const result = await authService.login(loginData);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      logger.error('Error during login:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to login'
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.register(req.body);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Error during registration:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to register'
      });
    }
  }

  async validateToken(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          valid: false,
          message: 'No token provided'
        });
        return;
      }
      
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      const result = await authService.validateToken(token);
      res.json(result);
    } catch (error) {
      logger.error('Error validating token:', error);
      res.status(500).json({
        valid: false,
        message: error instanceof Error ? error.message : 'Failed to validate token'
      });
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.changePassword(req.body);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Error changing password:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to change password'
      });
    }
  }

  async adminChangePassword(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.adminChangePassword(req.body);
      res.json(result);
    } catch (error) {
      logger.error('Error in admin change password:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to change password'
      });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const userAgent = req.headers['user-agent'];
      const result = await authService.refreshToken(req.user!.jwtToken, userAgent);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      logger.error('Error refreshing token:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to refresh token'
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.logout(req.user!.jwtToken);
      res.json(result);
    } catch (error) {
      logger.error('Error during logout:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to logout'
      });
    }
  }

  async logoutAllSessions(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.logoutAllSessions(req.user!.jwtToken);
      res.json(result);
    } catch (error) {
      logger.error('Error logging out all sessions:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to logout all sessions'
      });
    }
  }

  async getUserSessions(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.getUserSessions(req.user!.jwtToken);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Error getting user sessions:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get sessions'
      });
    }
  }

  async updateUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.updateUserInfo(req.body, req.user!.jwtToken);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Error updating user info:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update user info'
      });
    }
  }
}

export const authController = new AuthController();
