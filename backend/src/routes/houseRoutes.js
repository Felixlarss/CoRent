import { Router } from 'express';
import authMiddleware from './authMiddleweare.ts';
import { getAllHouses, updateHouse, getHouseById, addHouse, } from '../controllers/houseController.ts';
const router = Router();
router.get('/houses', authMiddleware, getAllHouses);
router.get('/house/:house_id', getHouseById);
router.patch('/house/:house_id', authMiddleware, updateHouse);
router.post('/house', addHouse);
export default router;
//# sourceMappingURL=houseRoutes.js.map