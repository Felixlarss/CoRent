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

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const { room_id } = req.params;
    if (!room_id) throw new Error('no room found');
    const rows = await roomService.getRoomById(room_id);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const addRoom = async (req: Request, res: Response) => {
  try {
    const { room_name, room_m2, room_house_id } = req.body;
    console.log({ room_house_id });
    const rows = await roomService.addRoom(room_name, room_m2, room_house_id);
    console.log({ rows });
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { getAllRooms, getRoomById, addRoom };
