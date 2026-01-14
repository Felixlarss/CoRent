import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getMemberById } from '../services/memberService.js';
dotenv.config();
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'invalid token' });
    }
    try {
        const decoded = jwt.verify(authorization, process.env.JWT_HASH);
        const member = await getMemberById(decoded.member_id);
        if (!member.ok) {
            return res.status(401).json({ error: 'member not found' });
        }
        req.body = { ...req.body, member: member.data };
    }
    catch (error) {
        console.log({ error });
        return res.status(401).json({ error });
    }
    next();
};
export default authMiddleware;
//# sourceMappingURL=authMiddleweare.js.map