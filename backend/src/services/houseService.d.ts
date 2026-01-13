import 'dotenv';
import type { House, Result, UpdateHouseConfirmation, AddHouseConfirmation } from '../models/types.ts';
export declare const getAllHouses: () => Promise<Result<House[]>>;
export declare const getHouseById: (house_id: string) => Promise<Result<House>>;
export declare const updateHouseById: (house_id: string, updated_data: Partial<House>) => Promise<Result<UpdateHouseConfirmation>>;
export declare const addHouse: (house_name: string, house_rent: number, house_m2: number) => Promise<Result<AddHouseConfirmation>>;
declare const _default: {
    getAllHouses: () => Promise<Result<House[]>>;
    updateHouseById: (house_id: string, updated_data: Partial<House>) => Promise<Result<UpdateHouseConfirmation>>;
    getHouseById: (house_id: string) => Promise<Result<House>>;
    addHouse: (house_name: string, house_rent: number, house_m2: number) => Promise<Result<AddHouseConfirmation>>;
};
export default _default;
//# sourceMappingURL=houseService.d.ts.map