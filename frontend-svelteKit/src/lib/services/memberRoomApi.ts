import { getAuthHeaders } from './memberApi';
const url = import.meta.env.VITE_API_URL;

export async function addMemberRoom(room_id: string, member_id: string) {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/member_room`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			room_id,
			member_id
		})
	});
	if (!response.ok) throw new Error('post faled');
	const json = await response.json();
	const data = json.data;
	return data;
}

export async function editMemberRoomById(member_id: string, room_id: string) {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/member_room/${member_id}`, {
		method: 'PATCH',
		headers,
		body: JSON.stringify({ room_id })
	});
	console.log('dbug');
	if (!response.ok) throw new Error('edit faled');
	const json = await response.json();
	const data = await json.data;
	return data;
}

export async function deleteMemberRoomById(member_id: string) {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/member_room/${member_id}`, { method: 'DELETE', headers });
	if (!response.ok) throw new Error('delete faled');
	return response;
}

export default { addMemberRoom, editMemberRoomById, deleteMemberRoomById };
