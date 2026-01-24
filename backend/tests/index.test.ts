import { db } from '../src/database'; // importera din db-connection
import { getRoomsByHouseId, getRoomById } from '../src/services/roomService';

afterAll(async () => await db.end());

describe('getRoomById (singular) in roomService', () => {
  test('should return ok:false, Error on no ID', async () => {
    const result = await getRoomById('');
    expect(result).toEqual({ ok: false, error: expect.any(Error) });
  });

  test('should return data on valid ID', async () => {
    const result = await getRoomById('1'); //Id 1 is Felix room id
    expect(result.ok).toEqual(true);
    if (result.ok) expect(result.data).toHaveProperty('room_id');
  });
});

describe('getRoomsById (plural) in roomService', () => {
  test('should return ok:false, Error on no ID', async () => {
    const result = await getRoomsByHouseId('');
    expect(result).toEqual({ ok: false, error: expect.any(Error) });
  });

  test('should return data array on valid ID', async () => {
    const result = await getRoomsByHouseId('309964'); //Id 1 is Felix room id
    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            room_id: expect.any(Number),
            room_name: expect.any(String),
            room_m2: expect.any(String),
            room_house_id: expect.any(Number),
          }),
        ]),
      );
    }
  });
});
