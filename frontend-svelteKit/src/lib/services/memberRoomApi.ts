const url = 'http://localhost:3000/api';

export async function addMemberRoom(room_id: string, member_id: string) {
	const response = await fetch(`${url}/member_room`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			room_id,
			member_id
		})
	});
	if (!response.ok) throw new Error('post faled');
	return response;
}

export default { addMemberRoom };
