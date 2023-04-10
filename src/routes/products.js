import express from 'express';
import { create, get, getAll, remove, update } from '../controllers/products';
import { check } from '../middlewares/check';
const routes = express.Router();
routes.post('/products', check , create)
routes.get('/products/:id',get)
routes.get('/products',getAll)
routes.put('/products/:id',update)
routes.delete('/products/:id',remove)
export default routes