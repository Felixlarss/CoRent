import type { HouseRow } from '../types.ts';

const url = import.meta.env.VITE_API_URL;
const noHouseErr = 'Error, No House Found';

export async function getHouses(): Promise<HouseRow[]> {
	const response = await fetch(`${url}/Houses`);

	const json = await response.json();

	if (!response.ok || !json.ok) {
		throw new Error(noHouseErr);
	}

	const members: HouseRow[] = await json.data;
	return members;
}

export async function getHouseById(house_id: number): Promise<HouseRow> {
	const response = await fetch(`${url}/house/${house_id}`);

	const json = await response.json();

	if (!response.ok) {
		throw new Error(noHouseErr);
	}

	const house: HouseRow = await json.data;
	return house;
}

export async function addHouse(
	house_name: string,
	house_rent: number,
	house_m2: number
): Promise<HouseRow> {
	const response = await fetch(`${url}/house`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			house_name,
			house_rent,
			house_m2
		})
	});
	if (!response.ok) throw new Error('post faled');
	const json = await response.json();
	const data = json.data;
	return data;
}
