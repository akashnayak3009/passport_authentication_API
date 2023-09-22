import {Strategy as LocalStrategy} from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//Load User Model
import User from '../models/userModel.js';


export default function initializePassport(passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
          // Match user
          const user = await User.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }
  
          // Match password
          const isMatch = await bcrypt.compare(password, user.password);
  
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        } catch (err) {
          return done(err);
        }
      })
    );
  
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser((id, done) => {
        User.findById(id)
          .then(user => {
            done(null, user);
          })
          .catch(err => {
            done(err);
          });
      });
      
  }
