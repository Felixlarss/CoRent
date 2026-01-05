export type MemberRow = {
	member_name: string;
	member_id: string;
	member_m2: string;
	member_rent: string;
};

export interface Member {
	member_name: string;
	member_id: string;
	member_m2: string;
	member_rent: string;
}

export type RoomRow = {
	room_name: string;
	room_id: string;
	room_m2: number;
};

export interface Room {
	room_name: string;
	room_id: string;
	room_m2: number;
}
