import type { Request, Response } from 'express';
import memberRoomService from '../services/memberRoomService.ts';

// get all rooms

export const createMemberRoom = async (req: Request, res: Response) => {
  try {
    const { member_id, room_id } = (await req.body) as {
      room_id: string;
      member_id: string;
    };
    const rows = await memberRoomService.createMemberRoom(room_id, member_id);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { createMemberRoom };
