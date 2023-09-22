import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import indexRouter from './routes/index.js'
import userRouter from './routes/usersRouter.js'
import expressLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.js'

const app = express();

//passport config
initializePassport(passport);

dotenv.config();
connectDB(); 

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser

app.use(express.urlencoded({extended:false}));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  //Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  // Connect flash
  app.use(flash());

  //GLobal Vars
    app.use((req,res,next)=>{
        res.locals.success_msg =req.flash('success_msg')
        res.locals.error_msg =req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    })


//Routes
app.use('/',indexRouter)
app.use('/users',userRouter)



const port = process.env.PORT;
app.listen(port, console.log(`Server is connected to Port: ${port}`.yellow.bold.italic.underline));