import express from "express";
import {
    loginHandle,
    logoutHandle,
    registerHandle,
} from "../controllers/userControllers.js";
import { forwardAuthenticated } from "../config/auth.js";

const router = express.Router();

//lOGIN PAGE
router.get("/login",forwardAuthenticated, (req, res) => res.render("login"));

//Register Page
router.get("/register",forwardAuthenticated, (req, res) => res.render("register"));

//Register handle

router.post("/register", registerHandle);

//Login Handle
router.post("/login", loginHandle);

// Logout
router.get("/logout", logoutHandle);

export default router;
