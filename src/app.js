import mongoose from "mongoose";
import express from 'express'
import ProductRouter from './routes/products'
import CatgoryRouter from './routes/category'
import authRouter from "./routes/auth";
import cors from "cors";
const app = express();
// middlewares
app.use(express.json());
app.use(cors());
// router
// app.use('/api', ProductRoutes)
app.use('/api', CatgoryRouter)
app.use('/api', ProductRouter)
app.use('/api', authRouter)
//connect
mongoose.connect('mongodb://127.0.0.1:27017/asm2');

export const viteNodeApp = app;