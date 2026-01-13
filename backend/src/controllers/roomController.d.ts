import type { Request, Response } from 'express';
export declare const getAllRooms: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRoomsById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRoomById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getAllRooms: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getRoomById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getRoomsById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=roomController.d.ts.map