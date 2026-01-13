import houseService from '../services/houseService.js';
// get all rooms
export const getAllHouses = async (_req, res) => {
    try {
        const rows = await houseService.getAllHouses();
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
export const getHouseById = async (req, res) => {
    try {
        const { house_id } = req.params;
        if (!house_id)
            throw new Error('no house found');
        const rows = await houseService.getHouseById(house_id);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
export const addHouse = async (req, res) => {
    try {
        const { house_name, house_rent, house_m2 } = req.body;
        const rows = await houseService.addHouse(house_name, house_rent, house_m2);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
export const updateHouse = async (req, res) => {
    try {
        const { house_id } = req.params;
        if (!house_id)
            throw new Error('house update failed');
        const old_house_rows = await houseService.getHouseById(house_id);
        if (!old_house_rows.ok) {
            return res.status(500).json({ error: old_house_rows.error });
        }
        const old_house = old_house_rows.data;
        const { house_name, house_m2, house_rent } = req.body;
        const updated_data = {
            house_name: house_name ?? old_house.house_name,
            house_m2: house_m2 ?? old_house.house_m2,
            house_rent: house_rent ?? old_house.house_rent,
        };
        const rows = await houseService.updateHouseById(house_id, updated_data);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
export default { getAllHouses, updateHouse, addHouse };
//# sourceMappingURL=houseController.js.map