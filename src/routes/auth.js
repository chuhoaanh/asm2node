import express from 'express';
import { singin, singup } from '../controllers/auth';
const singupRouter = express.Router();

singupRouter.post('/auth/singup',singup)
singupRouter.post('/auth/singin',singin)
export default singupRouter 