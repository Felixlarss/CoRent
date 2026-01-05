import 'dotenv';
import { db } from '../database.ts';
import type { RoomRow, Room, Result } from '../models/types.ts';

export const getAllRooms = async (): Promise<Result<Room[]>> => {
  try {
    const { rows } = await db.query<Room>(
      `
      SELECT room_id, room_name, room_m2 FROM room;
`,
    );
    return { ok: true, data: rows };
  } catch (error) {
    return { ok: false, error };
  }
};

export default { getAllRooms };
