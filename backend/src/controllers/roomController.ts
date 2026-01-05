import type { Request, Response } from 'express';
import roomService from '../services/roomService.ts';

// get all rooms

export const getAllRooms = async (_req: Request, res: Response) => {
  try {
    const rows = await roomService.getAllRooms();
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { getAllRooms };
