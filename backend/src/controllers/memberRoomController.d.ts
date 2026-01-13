import type { Request, Response } from 'express';
export declare const createMemberRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateMemberRoomById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteMemberRoomById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    createMemberRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateMemberRoomById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteMemberRoomById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=memberRoomController.d.ts.map