import express from 'express'
import { create, get, getAll, remove, update } from '../controllers/category';
import { check } from '../middlewares/check';
const router = express.Router();
router.post('/categorys', check , create)
router.get('/categorys/:id',get)
router.get('/categorys',getAll)
router.put('/categorys/:id',update)
router.delete('/categorys/:id',remove)

export default router