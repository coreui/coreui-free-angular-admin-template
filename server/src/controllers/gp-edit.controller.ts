import { Request, Response } from 'express';
import { GpEditService } from '../services/gp-edit.service.js';
import pool from '../config/db.js';
import logger from '../config/logger.js';

const gpEditService = new GpEditService(pool);

export class GpEditController {
  async getUpcomingGps(req: Request, res: Response): Promise<void> {
    try {
      const data = await gpEditService.getUpcomingGps();
      res.json({ success: true, data });
    } catch (error) {
      logger.error('Error getting upcoming GPs:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get upcoming GPs'
      });
    }
  }

  async getAllTracks(req: Request, res: Response): Promise<void> {
    try {
      const data = await gpEditService.getAllTracks();
      res.json({ success: true, data });
    } catch (error) {
      logger.error('Error getting all tracks:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get all tracks'
      });
    }
  }

  async createGp(req: Request, res: Response): Promise<void> {
    try {
      const data = await gpEditService.createGp(req.body);
      res.json({ success: true, data });
    } catch (error) {
      logger.error('Error creating GP:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create GP'
      });
    }
  }

  async updateGp(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: 'Invalid ID' });
        return;
      }
      
      const data = await gpEditService.updateGp(id, req.body);
      res.json({ success: true, data });
    } catch (error) {
      logger.error('Error updating GP:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update GP'
      });
    }
  }

  async deleteGp(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: 'Invalid ID' });
        return;
      }

      await gpEditService.deleteGp(id);
      res.json({ success: true });
    } catch (error) {
      logger.error('Error deleting GP:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete GP'
      });
    }
  }

  async bulkUpdateGpDate(req: Request, res: Response): Promise<void> {
    try {
      const daysOffset = parseInt(req.body.daysOffset);
      if (isNaN(daysOffset)) {
        res.status(400).json({ success: false, message: 'Invalid daysOffset' });
        return;
      }

      await gpEditService.bulkUpdateGpDate(daysOffset);
      res.json({ success: true });
    } catch (error) {
      logger.error('Error bulk updating GP dates:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to bulk update GP dates'
      });
    }
  }
}

export const gpEditController = new GpEditController();
