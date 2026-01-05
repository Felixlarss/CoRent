import type { RoomRow } from '$lib/types';

const url: string = 'http://localhost:3000/api';
const noRoomErr = 'Error, No room Found';

export async function getRooms(): Promise<RoomRow[]> {
	const response = await fetch(`${url}/rooms`);

	const json = await response.json();

	if (!response.ok || !json.ok) {
		throw new Error(noRoomErr);
	}
	const members: RoomRow[] = await json.data;
	return members;
}
