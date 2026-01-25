import { expect, test, describe, vi, beforeEach } from 'vitest';
import { getMembers, getMemberById } from '../../src/lib/services/memberApi';
import { getAuthHeaders } from '$lib/services/auth';
import type { MemberRow } from '../../src/lib/types';

// Mock the environment variables
// if using live backend
const MOCK_API_URL = 'https://corent-production.up.railway.app/api';
// else use localhost
// const MOCK_API_URL = 'http://localhost:3000/api';
vi.stubGlobal('import.meta.env', {
	VITE_API_URL: MOCK_API_URL
});

// Mock for localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => (store[key] = value.toString()),
		clear: () => (store = {})
	};
})();

Object.defineProperty(global, 'localStorage', {
	value: localStorageMock
});

// Mock for fetch
const fetchMock = vi.spyOn(global, 'fetch');

describe('memberApi', () => {
	beforeEach(() => {
		// Reset mocks before each test
		vi.clearAllMocks();
		localStorageMock.clear();
	});

	describe('getAuthHeaders', () => {
		test('should return headers without authorization if no token is in localStorage', () => {
			const headers = getAuthHeaders();
			expect(headers.get('Content-Type')).toBe('application/json');
			expect(headers.has('authorization')).toBe(false);
		});

		test('should return headers with authorization if a token exists in localStorage', () => {
			const mockToken = 'test_token_123';
			localStorageMock.setItem('auth_token', mockToken);

			const headers = getAuthHeaders();

			expect(headers.get('Content-Type')).toBe('application/json');
			expect(headers.get('authorization')).toBe(mockToken);
		});
	});

	describe('getMembers', () => {
		test('should return a list of members on successful fetch', async () => {
			const mockMembers: MemberRow[] = [
				{
					member_id: '1',
					member_name: 'John Doe',
					member_rent: '4201',
					member_m2: '50',
					house_id: 483928
				},
				{
					member_id: '2',
					member_name: 'Jane Doe',
					member_rent: '5219',
					member_m2: '60',
					house_id: 483928
				}
			];

			const mockResponse = {
				ok: true,
				json: async () => ({ ok: true, data: mockMembers })
			};

			fetchMock.mockResolvedValue(mockResponse as Response);

			const members = await getMembers();

			expect(fetch).toHaveBeenCalledWith(`${MOCK_API_URL}/members`, {
				headers: expect.any(Headers)
			});
			expect(members).toEqual(mockMembers);
		});

		test('should throw an error if the fetch response is not ok', async () => {
			const mockResponse = {
				ok: false,
				json: async () => ({ ok: false, error: 'Failed to fetch' })
			};

			fetchMock.mockResolvedValue(mockResponse as Response);

			await expect(getMembers()).rejects.toThrow('Error, No Member Found');

			expect(fetch).toHaveBeenCalledWith(`${MOCK_API_URL}/members`, {
				headers: expect.any(Headers)
			});
		});

		test('should throw an error if the json body indicates failure', async () => {
			const mockResponse = {
				ok: true,
				json: async () => ({ ok: false, error: 'API returned an error' })
			};

			fetchMock.mockResolvedValue(mockResponse as Response);

			await expect(getMembers()).rejects.toThrow('Error, No Member Found');
		});
	});

	describe('getMemberById', () => {
		test('should return a single member on successful fetch', async () => {
			const mockMember: MemberRow = {
				member_id: '2',
				member_name: 'Jane Doe',
				member_rent: '5219',
				member_m2: '60',
				house_id: 483928
			};

			const mockResponse = {
				ok: true,
				json: async () => ({ ok: true, data: mockMember })
			};

			fetchMock.mockResolvedValue(mockResponse as Response);

			const member = await getMemberById('1');

			expect(fetch).toHaveBeenCalledWith(`${MOCK_API_URL}/member/1`, {
				headers: expect.any(Headers)
			});
			expect(member).toEqual(mockMember);
		});

		test('should throw an error if the fetch response is not ok', async () => {
			const mockResponse = {
				ok: false,
				json: async () => ({ ok: false, error: 'Not Found' })
			};

			fetchMock.mockResolvedValue(mockResponse as Response);

			await expect(getMemberById('1')).rejects.toThrow('Error, No Member Found');
		});
	});
});
