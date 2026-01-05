import type { Request, Response } from 'express';
import memberService from '../services/memberService.ts';
import type { Member, MemberNameRow, Result } from '../models/types.ts';
// get all members

export const getAllMembers = async (_req: Request, res: Response) => {
  try {
    const rows = await memberService.getAllMembers();
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// get a member

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { member_id } = req.params;
    if (!member_id) throw new Error(memberService.noMemberFoundErr);
    const rows = await memberService.getMemberById(member_id);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// post a member

export const createMember = async (req: Request, res: Response) => {
  try {
    const { member_name } = (await req.body) as {
      member_name: string;
    };
    const rows = await memberService.createMember(member_name);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// update a member

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { member_id } = req.params;
    if (!member_id) throw new Error(memberService.noMemberFoundErr);
    const old_member_rows = await memberService.getMemberById(member_id);
    if (!old_member_rows.ok) {
      return res.status(500).json({ error: old_member_rows.error });
    }
    const old_members = old_member_rows.data;
    const { member_name } = req.body;
    const updated_data = {
      member_name: member_name ?? old_members.member_name!,
    };
    const rows = await memberService.updateMemberById(member_id, updated_data);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// delete a member

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { member_id } = req.params;
    if (!member_id) throw new Error(memberService.noMemberFoundErr);
    const rows = await memberService.deleteMemberById(member_id);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  getAllMembers,
  getMemberById,
  createMember,
  deleteMember,
  updateMember,
};
