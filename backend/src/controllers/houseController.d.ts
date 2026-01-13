import type { Request, Response } from 'express';
export declare const getAllHouses: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getHouseById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addHouse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateHouse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getAllHouses: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateHouse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addHouse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=houseController.d.ts.map