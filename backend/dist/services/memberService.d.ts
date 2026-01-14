import 'dotenv';
import type { Member, MemberRow, Result, WithAuth, AddMemberConfirmation, DeleteMemberConfirmation, UpdateMemberConfirmation } from '../models/types.ts';
export declare const noMemberFoundErr = "Member not found";
export declare const getAllMembers: (house_id: string) => Promise<Result<Member[]>>;
export declare const getMemberById: (member_id: string) => Promise<Result<Member>>;
export declare const createMember: (member_name: string, password: string) => Promise<Result<AddMemberConfirmation>>;
export declare const updateMemberById: (member_id: string, updated_data: Partial<Member>) => Promise<Result<UpdateMemberConfirmation>>;
export declare const deleteMemberById: (member_id: string) => Promise<Result<DeleteMemberConfirmation>>;
export declare const confirmMember: (member_name: string, password: string) => Promise<Result<Partial<MemberRow & WithAuth>>>;
declare const _default: {
    getAllMembers: (house_id: string) => Promise<Result<Member[]>>;
    getMemberById: (member_id: string) => Promise<Result<Member>>;
    createMember: (member_name: string, password: string) => Promise<Result<AddMemberConfirmation>>;
    deleteMemberById: (member_id: string) => Promise<Result<DeleteMemberConfirmation>>;
    updateMemberById: (member_id: string, updated_data: Partial<Member>) => Promise<Result<UpdateMemberConfirmation>>;
    confirmMember: (member_name: string, password: string) => Promise<Result<Partial<MemberRow & WithAuth>>>;
    noMemberFoundErr: string;
};
export default _default;
//# sourceMappingURL=memberService.d.ts.map