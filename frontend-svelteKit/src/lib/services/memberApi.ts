import type { MemberAuthResponse, MemberRow, MemberRowResponse } from '../types.ts';
import { getAuthHeaders } from './auth.ts';

const url = import.meta.env.VITE_API_URL;
const noMemberErr = 'Error, No Member Found';

// confirm member

export async function confirmLogin(
	member_name: string,
	password: string
): Promise<MemberAuthResponse> {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/member/auth`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ member_name: member_name, password })
	});
	const body = (await response.json()) as MemberAuthResponse;

	if (body.ok) {
		localStorage.setItem('auth_token', body.data.token);
	}
	return body;
}

// get all member data

export async function getMemberData(): Promise<MemberRowResponse> {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/member/0`, { headers });
	const json = (await response.json()) as MemberRowResponse;
	return json;
}

// get all members

export async function getMembers(): Promise<MemberRow[]> {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/members`, { headers });

	const json = await response.json();

	if (!response.ok || !json.ok) {
		throw new Error(noMemberErr);
	}

	const members: MemberRow[] = await json.data;
	return members;
}

// get a member by id

export async function getMemberById(member_id: string): Promise<MemberRow> {
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/member/${member_id}`, { headers });

	const json = await response.json();

	if (!response.ok) {
		throw new Error(noMemberErr);
	}

	const member: MemberRow = await json.data;
	return member;
}

// post member

export async function addMember(member_name: string, password: string, confirm_password: string) {
	const response = await fetch(`${url}/member`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			member_name,
			password,
			confirm_password
		})
	});
	if (response.status === 401) return { ok: false, error: 'password requirements not met' };
	if (!response.ok) throw new Error('Post Failed');
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
	const headers = getAuthHeaders();
	const response = await fetch(`${url}/member/${member_id}`, { method: 'DELETE', headers });
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
