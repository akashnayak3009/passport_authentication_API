import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import passport from "passport";

const router = express.Router();

//lOGIN PAGE
router.get("/login", (req, res) => res.render("login"));

//Register Page
router.get("/register", (req, res) => res.render("register"));

//Register handle

router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //check required fields

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" });
    }

    //check password match

    if (password !== password2) {
        errors.push({ msg: "Password Not Match " });
    }

    //check password length
    if (password.length < 6) {
        errors.push({ msg: "Password must be 6 character" });
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
        });
    } else {
        //Validation passed
        User.findOne({ email }).then((user) => {
            //user exists
            if (user) {
                errors.push({ msg: "Email is Already register " });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                });

                // Hash Password

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => { 
                        if(err) throw err;
                        //Set password to hashed

                        newUser.password =hash;;
                        //save User

                        newUser.save()
                         .then(user=>{
                            req.flash('success_msg', 'You are now register and can log in');
                            res.redirect('/users/login');
                         })
                         .catch(err => console.log(err));
                    }));
            }});
    }});

    //Login Handle
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', {
          successRedirect: '/dashboard',
          failureRedirect: '/users/login',
          failureFlash: true
        })(req, res, next);
      });
      
    // Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
      }
      req.flash('success_msg', 'You are logged out');
      res.redirect('/users/login');
    });
  });
  
export default router;
