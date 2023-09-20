import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import indexRouter from './routes/index.js'
import userRouter from './routes/usersRouter.js'
import expressLayouts from 'express-ejs-layouts';

dotenv.config();
connectDB();

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/api',indexRouter)
app.use('/api/users',userRouter)



const port = process.env.PORT;
app.listen(port, console.log(`Server is connected to Port: ${port}`.yellow.bold.italic.underline));