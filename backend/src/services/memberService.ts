import 'dotenv';
import { db } from '../database.ts';
import type {
  Member,
  MemberRow,
  Result,
  AddMemberConfirmation,
  DeleteMemberConfirmation,
  UpdateMemberConfirmation,
} from '../models/types.ts';

export const noMemberFoundErr = 'Member not found';

// get all members

export const getAllMembers = async (): Promise<Result<Member[]>> => {
  try {
    const { rows } = await db.query<Member>(
      `
WITH room_occupants AS (
  SELECT
    room_id,
    COUNT(*) AS occupants
  FROM member_room
  GROUP BY room_id
),

member_private_area AS (
  SELECT
    m.member_id,
    r.room_house_id AS house_id,
    COALESCE(r.room_m2 / ro.occupants, 0) AS private_m2
  FROM member m
  LEFT JOIN member_room mr
    ON m.member_id = mr.member_id
  LEFT JOIN room r
    ON r.room_id = mr.room_id
  LEFT JOIN room_occupants ro
    ON ro.room_id = r.room_id
),

member_private_sum AS (
  SELECT
    member_id,
    house_id,
    SUM(private_m2) AS private_m2
  FROM member_private_area
  GROUP BY member_id, house_id
),

house_common AS (
  SELECT
    h.house_id,
    h.house_rent,
    h.house_m2,
    COUNT(DISTINCT mps.member_id) AS members,
    h.house_m2 - SUM(mps.private_m2) AS common_m2
  FROM house h
  LEFT JOIN member_private_sum mps
    ON mps.house_id = h.house_id
  GROUP BY h.house_id, h.house_rent, h.house_m2
)

SELECT
  m.member_id,
  m.member_name,
  ROUND(COALESCE(mps.private_m2, 0), 2) AS member_m2,
  ROUND(
    (
      COALESCE(mps.private_m2, 0)
      +
      COALESCE(hc.common_m2, 0) / NULLIF(hc.members, 0)
    )
    * (hc.house_rent / hc.house_m2),
    2
  ) AS member_rent
FROM member m
LEFT JOIN member_private_sum mps
  ON m.member_id = mps.member_id
LEFT JOIN house_common hc
  ON hc.house_id = mps.house_id
ORDER BY m.member_id;
`,
    );
    return { ok: true, data: rows };
  } catch (error) {
    return { ok: false, error };
  }
};

// get a member

export const getMemberById = async (
  member_id: string,
): Promise<Result<Member>> => {
  try {
    const { rows } = await db.query<Member>(
      `
WITH room_occupants AS (
  SELECT
    room_id,
    COUNT(*) AS occupants
  FROM member_room
  GROUP BY room_id
),

member_private_area AS (
  SELECT
    m.member_id,
    r.room_house_id AS house_id,
    COALESCE(r.room_m2 / ro.occupants, 0) AS private_m2
  FROM member m
  LEFT JOIN member_room mr
    ON m.member_id = mr.member_id
  LEFT JOIN room r
    ON r.room_id = mr.room_id
  LEFT JOIN room_occupants ro
    ON ro.room_id = r.room_id
),

member_private_sum AS (
  SELECT
    member_id,
    house_id,
    SUM(private_m2) AS private_m2
  FROM member_private_area
  GROUP BY member_id, house_id
),

house_common AS (
  SELECT
    h.house_id,
    h.house_rent,
    h.house_m2,
    COUNT(DISTINCT mps.member_id) AS members,
    h.house_m2 - SUM(mps.private_m2) AS common_m2
  FROM house h
  LEFT JOIN member_private_sum mps
    ON mps.house_id = h.house_id
  GROUP BY h.house_id, h.house_rent, h.house_m2
)

SELECT
  m.member_id,
  m.member_name,
  ROUND(COALESCE(mps.private_m2, 0), 2) AS member_m2,
  ROUND(
    (
      COALESCE(mps.private_m2, 0)
      +
      COALESCE(hc.common_m2, 0) / NULLIF(hc.members, 0)
    )
    * (hc.house_rent / hc.house_m2),
    2
  ) AS member_rent
FROM member m
LEFT JOIN member_private_sum mps
  ON m.member_id = mps.member_id
LEFT JOIN house_common hc
  ON hc.house_id = mps.house_id
WHERE m.member_id = $1;
`,
      [member_id],
    );
    if (!rows[0]) throw new Error(noMemberFoundErr);
    return { ok: true, data: rows[0] };
  } catch (error) {
    return { ok: false, error };
  }
};

// post a member

export const createMember = async (
  member_name: string,
): Promise<Result<AddMemberConfirmation>> => {
  try {
    const { rows } = await db.query<Member>(
      `
    INSERT INTO 
      member (member_name) 
    VALUES 
      ( $1 )
    RETURNING member_id AS member_id, member_name AS member_name;
`,
      [member_name],
    );
    if (!rows[0]) throw new Error(noMemberFoundErr);
    return {
      ok: true,
      data: { member_added: { member_id: rows[0].member_id } },
    };
  } catch (error) {
    return { ok: false, error };
  }
};

// update a member

export const updateMemberById = async (
  member_id: string,
  updated_data: Partial<Member>,
): Promise<Result<UpdateMemberConfirmation>> => {
  try {
    const { member_name } = updated_data;
    const { rows } = await db.query<MemberRow>(
      `  
    UPDATE member
    SET
      member_name = $1,
    WHERE member_id = $2
    RETURNING member_id;
`,
      [member_name, member_id],
    );
    if (!rows[0]) throw new Error(noMemberFoundErr);
    return {
      ok: true,
      data: { member_updated: { member_id: rows[0].member_id } },
    };
  } catch (error) {
    return { ok: false, error };
  }
};

// post a member

export const deleteMemberById = async (
  member_id: string,
): Promise<Result<DeleteMemberConfirmation>> => {
  try {
    const { rows } = await db.query(
      `
  DELETE FROM member
  WHERE member_id = $1
  RETURNING member_id, member_name;
`,
      [member_id],
    );
    if (!rows[0]) throw new Error(noMemberFoundErr);
    return { ok: true, data: { member_deleted: { member_id: rows[0].id } } };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  getAllMembers,
  getMemberById,
  createMember,
  deleteMemberById,
  updateMemberById,
  noMemberFoundErr,
};
