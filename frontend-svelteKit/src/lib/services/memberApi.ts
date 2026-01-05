import type { Member, MemberRow } from '../types.ts';

const url = 'http://localhost:3000/api';
const noMemberErr = 'Error, No Member Found';

// get all members

export async function getMembers(): Promise<MemberRow[]> {
	const response = await fetch(`${url}/members`);

	const json = await response.json();

	if (!response.ok || !json.ok) {
		throw new Error(noMemberErr);
	}

	const members: MemberRow[] = await json.data;
	return members;
}

// get a member by id

export async function getMemberById(member_id: string): Promise<MemberRow> {
	const response = await fetch(`${url}/member/${member_id}`);

	const json = await response.json();

	if (!response.ok) {
		throw new Error(noMemberErr);
	}

	const member: MemberRow = await json.data;
	return member;
}

// post member

export async function addMember(member_name: string) {
	const response = await fetch(`${url}/member`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			member_name
		})
	});
	if (!response.ok) throw new Error('post faled');
	const json = await response.json();
	const data = json.data.member_added;
	return data;
}

// patch member

export async function editMemberById(member_id: string, member_name: string, member_m2: number) {
	const old_member_data = await getMemberById(member_id);
	console.log(member_id);
	const updatedData = {
		member_name: member_name ?? old_member_data.member_name,
		member_m2: member_m2 ?? old_member_data.member_m2
	};
	console.log(updatedData);
	const response = await fetch(`${url}/member/${member_id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedData)
	});
	console.log(response);
	if (!response.ok) throw new Error('edit faled');
	return response;
}

// delete member

export async function deleteMemberById(member_id: string) {
	const response = await fetch(`${url}/member/${member_id}`, { method: 'DELETE' });
	if (!response.ok) throw new Error('delete faled');
	return response;
}

export default {
	getMembers,
	getMemberById,
	addMember,
	deleteMemberById,
	editMemberById
};
