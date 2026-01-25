export type MemberRow = {
	member_name: string;
	member_id: string;
	member_m2: string;
	member_rent: string;
	house_id: number;
	ok?: boolean;
	status?: number;
	error?: { ok: false; error: string };
};

export type MemberAuthResponse =
	| { ok: true; data: { token: string } & MemberRow }
	| { ok: false; error: string };

export type MemberRowResponse = { ok: true; data: MemberRow } | { ok: false; error: string };

// { ok: true, data: { Room_added: { room_id: rows[0].room_id } } }

export type HouseRow = {
	house_name: string;
	house_id: number;
	house_m2: number;
	house_rent: number;
};

export interface Member {
	member_name: string;
	member_id: string;
	member_m2: string;
	member_rent: string;
}

export interface Room {
	room_name: string;
	room_id: string;
	room_m2: number;
}

export type RoomRow = {
	room_name: string;
	room_id: string;
	room_m2: number;
};
