export interface Member {
  member_id: string;
  member_name: string;
  password_hash: string;
}

export interface WithAuth {
  token: string;
}

export type MemberNameRow = {
  member_id: string;
  member_name: string;
};

export type MemberRow = {
  member_id: string;
  member_name: string;
  password_hash: string;
};

export interface AddMemberConfirmation {
  member_added: Partial<MemberRow>;
}

export interface DeleteMemberConfirmation {
  member_deleted: Partial<MemberNameRow>;
}

export interface UpdateMemberConfirmation {
  member_updated: Partial<Member>;
}

export interface AddMemberRoomConfirmation {
  member_room_added: Partial<MemberRoomRow>;
}

export interface UpdateMemberRoomConfirmation {
  member_room_updated: Partial<MemberRoomRow>;
}

export interface DeleteMemberRoomConfirmation {
  member_room_deleted: Partial<MemberRoomRow>;
}

export interface UpdateHouseConfirmation {
  house_updated: Partial<HouseRow>;
}

export interface AddHouseConfirmation {
  House_added: Partial<HouseRow>;
}

export interface AddRoomConfirmation {
  Room_added: Partial<RoomRow>;
}

export type Result<T> =
  | {
      ok: true;
      data: T;
    }
  | { ok: false; error: unknown };

export interface House {
  house_id: number;
  house_name: string;
  house_rent: number;
  house_m2: number;
}

export type HouseRow = {
  house_id: number;
  house_name: string;
  house_rent: number;
  house_m2: number;
};

export type RoomRow = {
  room_id: string;
  room_name: string;
};

export interface Room {
  room_id: string;
  room_name: string;
}

export type MemberRoomRow = {
  room_id: string;
  member_id: string;
};

export interface MemberRoom {
  room_id: string;
  member_id: string;
}
