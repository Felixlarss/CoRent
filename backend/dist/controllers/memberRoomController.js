import memberRoomService from '../services/memberRoomService';
// get all rooms
export const createMemberRoom = async (req, res) => {
    try {
        const { member_id, room_id } = (await req.body);
        const rows = await memberRoomService.createMemberRoom(room_id, member_id);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
export const updateMemberRoomById = async (req, res) => {
    try {
        const { member_id } = req.params;
        if (!member_id)
            throw new Error('no member_id found');
        const { room_id } = (await req.body);
        const rows = await memberRoomService.updateMemberRoomById(room_id, member_id);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
export const deleteMemberRoomById = async (req, res) => {
    try {
        const { member_id } = req.params;
        if (!member_id)
            throw new Error('delete failes');
        const rows = await memberRoomService.deleteMemberRoomById(member_id);
        return res.status(201).json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
export default { createMemberRoom, updateMemberRoomById, deleteMemberRoomById };
//# sourceMappingURL=memberRoomController.js.map