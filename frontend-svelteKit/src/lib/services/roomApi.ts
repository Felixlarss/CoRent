import type { RoomRow } from '$lib/types';
import { getAuthHeaders } from './auth';
const url = import.meta.env.VITE_API_URL;
const noRoomErr = 'Error, No room Found';

export async function getRooms(): Promise<RoomRow[]> {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/rooms`, { headers });

	const json = await response.json();

	if (!response.ok || !json.ok) {
		throw new Error(noRoomErr);
	}

	const rooms: RoomRow[] = await json.data;
	return rooms;
}

export async function getRoomsById(room_house_id: number): Promise<RoomRow[]> {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/rooms/${room_house_id}`, { headers });

	const json = await response.json();

	if (!response.ok || !json.ok) {
		throw new Error(noRoomErr);
	}

	const rooms: RoomRow[] = await json.data;
	return rooms;
}

export async function addRoom(
	room_name: string,
	room_m2: number,
	room_house_id: string
): Promise<RoomRow[]> {
	const response = await fetch(`${url}/room`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			room_name,
			room_m2,
			room_house_id
		})
	});
	if (!response.ok) throw new Error('post faled');
	const json = await response.json();
	const data = json.data;
	return data;
}
