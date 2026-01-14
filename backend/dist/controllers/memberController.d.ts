import type { Request, Response } from 'express';
export declare const getAllMembers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMemberById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const confirmMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getAllMembers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMemberById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=memberController.d.ts.map