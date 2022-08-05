const express = require('express');
const getAccessToken = require('../authentication/authentication.controllers') ;
const { login } = require('../authentication/authentication.middleware') ;
const AuthController = require('../controllers/profile.auth.controller');
const authController = new AuthController();

const authRouter = express.Router();

authRouter.post('/token', login, getAccessToken);
authRouter.post('/register', authController.register);

module.exports =  authRouter;
