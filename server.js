import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());



const port = process.env.PORT;

app.listen(port, console.log(`Server is connected to Port: ${port}`.yellow.bold.italic.underline));