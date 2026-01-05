import 'dotenv';
import { db } from '../database.ts';
import type {
  MemberRoomRow,
  MemberRoom,
  AddMemberRoomConfirmation,
  Result,
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

export default { createMemberRoom };
