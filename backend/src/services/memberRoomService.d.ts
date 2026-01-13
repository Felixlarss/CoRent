import 'dotenv';
import type { AddMemberRoomConfirmation, Result, UpdateMemberRoomConfirmation, DeleteMemberRoomConfirmation } from '../models/types.ts';
export declare const createMemberRoom: (room_id: string, member_id: string) => Promise<Result<AddMemberRoomConfirmation>>;
export declare const updateMemberRoomById: (room_id: string, member_id: string) => Promise<Result<UpdateMemberRoomConfirmation>>;
export declare const deleteMemberRoomById: (member_id: string) => Promise<Result<DeleteMemberRoomConfirmation>>;
declare const _default: {
    createMemberRoom: (room_id: string, member_id: string) => Promise<Result<AddMemberRoomConfirmation>>;
    updateMemberRoomById: (room_id: string, member_id: string) => Promise<Result<UpdateMemberRoomConfirmation>>;
    deleteMemberRoomById: (member_id: string) => Promise<Result<DeleteMemberRoomConfirmation>>;
};
export default _default;
//# sourceMappingURL=memberRoomService.d.ts.map