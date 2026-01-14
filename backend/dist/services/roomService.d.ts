import 'dotenv';
import type { Room, Result, AddRoomConfirmation } from '../models/types.ts';
export declare const getAllRooms: (room_house_id: string) => Promise<Result<Room[]>>;
export declare const getRoomsById: (room_house_id: string) => Promise<Result<Room[]>>;
export declare const getRoomById: (room_id: string) => Promise<Result<Room>>;
export declare const addRoom: (room_name: string, room_m2: number, room_house_id: string) => Promise<Result<AddRoomConfirmation>>;
declare const _default: {
    getAllRooms: (room_house_id: string) => Promise<Result<Room[]>>;
    getRoomById: (room_id: string) => Promise<Result<Room>>;
    addRoom: (room_name: string, room_m2: number, room_house_id: string) => Promise<Result<AddRoomConfirmation>>;
    getRoomsById: (room_house_id: string) => Promise<Result<Room[]>>;
};
export default _default;
//# sourceMappingURL=roomService.d.ts.map