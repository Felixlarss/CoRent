import 'dotenv';
import { db } from '../database';
import type {
  RoomRow,
  Room,
  Result,
  AddRoomConfirmation,
} from '../models/types.ts';

export const getAllRooms = async (
  room_house_id: string,
): Promise<Result<Room[]>> => {
  try {
    const { rows } = await db.query<Room>(
      `
      SELECT room_id, room_name, room_m2 FROM room where room_house_id = $1;
`,
      [room_house_id],
    );
    return { ok: true, data: rows };
  } catch (error) {
    return { ok: false, error };
  }
};

export const getRoomsById = async (
  room_house_id: string,
): Promise<Result<Room[]>> => {
  try {
    const { rows } = await db.query<Room>(
      `
SELECT * from room WHERE room_house_id = $1
`,
      [room_house_id],
    );
    if (!rows[0]) throw new Error('no room found');
    return { ok: true, data: rows };
  } catch (error) {
    return { ok: false, error };
  }
};

export const getRoomById = async (room_id: string): Promise<Result<Room>> => {
  try {
    const { rows } = await db.query<Room>(
      `
SELECT * from room WHERE room_id = $1
`,
      [room_id],
    );
    if (!rows[0]) throw new Error('no room found');
    return { ok: true, data: rows[0] };
  } catch (error) {
    return { ok: false, error };
  }
};

export const addRoom = async (
  room_name: string,
  room_m2: number,
  room_house_id: string,
): Promise<Result<AddRoomConfirmation>> => {
  try {
    const { rows } = await db.query<Room>(
      `
    INSERT INTO
  room (room_name, room_m2, room_house_id)
VALUES 
  ( $1, $2, $3 )
RETURNING room_id
`,
      [room_name, room_m2, room_house_id],
    );
    if (!rows[0]) throw new Error('add failed services');
    return { ok: true, data: { Room_added: { room_id: rows[0].room_id } } };
  } catch (error) {
    return { ok: false, error };
  }
};

export default { getAllRooms, getRoomById, addRoom, getRoomsById };
