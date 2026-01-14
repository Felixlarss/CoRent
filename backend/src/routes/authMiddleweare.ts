import type { JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getMemberById } from '../services/memberService.js';
import type { MemberRow } from '../models/types.js';

dotenv.config();

interface TokenPayLoad extends JwtPayload {
  member_id: string;
}

interface AuthRequest extends Request {
  player?: MemberRow;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'invalid token' });
  }
  try {
    const decoded = jwt.verify(
      authorization,
      process.env.JWT_HASH!,
    ) as TokenPayLoad;
    const member = await getMemberById(decoded.member_id);
    if (!member.ok) {
      return res.status(401).json({ error: 'member not found' });
    }
    req.body = { ...req.body, member: member.data };
  } catch (error) {
    console.log({ error });
    return res.status(401).json({ error });
  }
  next();
};

export default authMiddleware;
