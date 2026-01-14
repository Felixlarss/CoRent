import 'dotenv';
import { db } from '../database';
import type {
  MemberRoomRow,
  MemberRoom,
  AddMemberRoomConfirmation,
  Result,
  UpdateMemberRoomConfirmation,
  DeleteMemberRoomConfirmation,
} from '../models/types.ts';

export const createMemberRoom = async (
  room_id: string,
  member_id: string,
): Promise<Result<AddMemberRoomConfirmation>> => {
  try {
    const { rows } = await db.query<MemberRoom>(
      `
    INSERT INTO 
      member_room (room_id, member_id) 
    VALUES 
      ( $1, $2)
    RETURNING member_id, room_id;
`,
      [room_id, member_id],
    );
    if (!rows[0]) throw new Error('add failed');
    return {
      ok: true,
      data: { member_room_added: { member_id: rows[0].member_id } },
    };
  } catch (error) {
    return { ok: false, error };
  }
};

export const updateMemberRoomById = async (
  room_id: string,
  member_id: string,
): Promise<Result<UpdateMemberRoomConfirmation>> => {
  try {
    const { rows } = await db.query<MemberRoom>(
      `  
    UPDATE member_room
    SET room_id = $1
    WHERE member_id = $2
`,
      [room_id, member_id],
    );
    if (!rows[0]) throw new Error('update failed');
    return {
      ok: true,
      data: { member_room_updated: { member_id: rows[0].member_id } },
    };
  } catch (error) {
    return { ok: false, error };
  }
};

export const deleteMemberRoomById = async (
  member_id: string,
): Promise<Result<DeleteMemberRoomConfirmation>> => {
  try {
    const { rows } = await db.query(
      `
  DELETE FROM member_room
  WHERE member_id = $1
`,
      [member_id],
    );
    if (!rows[0]) throw new Error('delete failed');
    return {
      ok: true,
      data: { member_room_deleted: { member_id: rows[0].id } },
    };
  } catch (error) {
    return { ok: false, error };
  }
};

export default { createMemberRoom, updateMemberRoomById, deleteMemberRoomById };
