import 'dotenv';
import { db } from '../database.ts';
export const getAllHouses = async () => {
    try {
        const { rows } = await db.query(`
      SELECT house_id, house_name, house_m2, house_rent FROM house;
`);
        return { ok: true, data: rows };
    }
    catch (error) {
        return { ok: false, error };
    }
};
export const getHouseById = async (house_id) => {
    try {
        const { rows } = await db.query(`
      SELECT house_id, house_name, house_m2, house_rent FROM house Where house_id = $1;
`, [house_id]);
        if (!rows[0])
            throw new Error('no Member Found');
        return { ok: true, data: rows[0] };
    }
    catch (error) {
        return { ok: false, error };
    }
};
export const updateHouseById = async (house_id, updated_data) => {
    try {
        const { house_name, house_m2, house_rent } = updated_data;
        const { rows } = await db.query(`  
    UPDATE house
    SET
      house_name = $1,
      house_m2 = $2,
      house_rent = $3
    WHERE house_id = $4
    RETURNING house_id;
`, [house_name, house_m2, house_rent, house_id]);
        if (!rows[0])
            throw new Error('house update failed');
        return {
            ok: true,
            data: { house_updated: { house_id: rows[0].house_id } },
        };
    }
    catch (error) {
        return { ok: false, error };
    }
};
export const addHouse = async (house_name, house_rent, house_m2) => {
    try {
        const { rows } = await db.query(`  
INSERT INTO 
  house (house_name, house_rent, house_m2)
VALUES 
  ( $1, $2, $3 )
RETURNING house_id;
`, [house_name, house_rent, house_m2]);
        if (!rows[0])
            throw new Error('house add failed');
        console.log({ rows });
        return {
            ok: true,
            data: { House_added: { house_id: rows[0].house_id } },
        };
    }
    catch (error) {
        return { ok: false, error };
    }
};
export default { getAllHouses, updateHouseById, getHouseById, addHouse };
//# sourceMappingURL=houseService.js.map