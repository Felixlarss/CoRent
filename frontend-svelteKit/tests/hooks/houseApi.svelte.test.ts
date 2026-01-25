import { expect, test, describe, vi, beforeEach } from 'vitest';
import { getHouses, getHouseById } from '../../src/lib/services/houseApi';
import type { HouseRow } from '../../src/lib/types';

// Mock the environment variables
// if using live backend
const MOCK_API_URL = 'https://corent-production.up.railway.app/api';
// else use localhos
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

describe('houseApi', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorageMock.clear();
	});

	describe('getHouses', () => {
		test('Should return a list of houses on successful fetch', async () => {
			const mockHouses: HouseRow[] = [
				{
					house_id: 111111,
					house_name: 'testHouse1',
					house_m2: 219,
					house_rent: 30000
				},
				{
					house_id: 999999,
					house_name: 'testHouse2',
					house_m2: 300,
					house_rent: 40000
				}
			];

			const mockResponse = {
				ok: true,
				json: async () => ({ ok: true, data: mockHouses })
			};

			fetchMock.mockResolvedValue(mockResponse as Response);

			const houses = await getHouses();

			expect(fetch).toHaveBeenCalledWith(`${MOCK_API_URL}/houses`, {
				headers: expect.any(Headers)
			});
			expect(houses).toEqual(mockHouses);
		});

		test('should thow an error if the fetch response is not ok', async () => {
			const mockResponse = {
				ok: false,
				json: async () => ({ ok: false, error: 'Falied to fetch' })
			};

			fetchMock.mockResolvedValue(mockResponse as Response);

			await expect(getHouses()).rejects.toThrow('Error, No House Found');

			expect(fetch).toHaveBeenCalledWith(`${MOCK_API_URL}/houses`, {
				headers: expect.any(Headers)
			});
		});
	});
});
