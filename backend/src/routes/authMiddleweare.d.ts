import type { Request, Response, NextFunction } from 'express';
import type { MemberRow } from '../models/types.ts';
interface AuthRequest extends Request {
    player?: MemberRow;
}
declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default authMiddleware;
//# sourceMappingURL=authMiddleweare.d.ts.map