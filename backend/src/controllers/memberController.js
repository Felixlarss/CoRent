import memberService from '../services/memberService.js';
import bcrypt from 'bcryptjs';
// get memberid from body
function getMemberIdFromBody(body) {
    const output = {
        error: '',
        member_id: '',
    };
    if (!body.member) {
        output.error = 'no member found';
        return output;
    }
    const { member } = body;
    const { member_id } = member;
    if (!member_id) {
        output.error = 'id not found';
        return output;
    }
    output.member_id = member_id;
    return output;
}
// get all members
export const getAllMembers = async (req, res) => {
    try {
        const house_id = await req.body.member.house_id;
        const rows = await memberService.getAllMembers(house_id);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
// get a member
export const getMemberById = async (req, res) => {
    try {
        const { error, member_id } = getMemberIdFromBody(req.body);
        if (error) {
            return res.status(500).json(error);
        }
        if (!member_id)
            throw new Error(memberService.noMemberFoundErr);
        const rows = await memberService.getMemberById(member_id);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
// post a member
export const createMember = async (req, res) => {
    try {
        const { member_name, password, confirm_password } = (await req.body);
        if (password !== confirm_password) {
            return res
                .status(422)
                .json({ member_name, error: 'password does not match' });
        }
        const rows = await memberService.createMember(member_name, password);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
// update a member
export const updateMember = async (req, res) => {
    try {
        const { member_id } = req.params;
        if (!member_id)
            throw new Error(memberService.noMemberFoundErr);
        const old_member_rows = await memberService.getMemberById(member_id);
        if (!old_member_rows.ok) {
            return res.status(500).json({ error: old_member_rows.error });
        }
        const old_members = old_member_rows.data;
        const { member_name } = req.body;
        const updated_data = {
            member_name: member_name ?? old_members.member_name,
        };
        const rows = await memberService.updateMemberById(member_id, updated_data);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
// delete a member
export const deleteMember = async (req, res) => {
    try {
        const { member_id } = req.params;
        if (!member_id)
            throw new Error(memberService.noMemberFoundErr);
        const rows = await memberService.deleteMemberById(member_id);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
export const confirmMember = async (req, res) => {
    try {
        const { member_name, password } = req.body;
        const rows = await memberService.confirmMember(member_name, password);
        if (!rows.ok) {
            return res.status(500).json({ error: rows.error });
        }
        return res.status(201).json(rows);
    }
    catch (error) {
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
//# sourceMappingURL=memberController.js.map