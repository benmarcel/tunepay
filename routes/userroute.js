const express = require("express");
const router = express.Router();
const auth = require("../userauth/auth");
const userController = require("../controllers/users");
const songController = require('../controllers/uploads')

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/upload", auth.isAuthenticated, auth.role('Artist'), songController.upload);
