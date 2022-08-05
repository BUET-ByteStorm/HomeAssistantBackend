const { NextFunction, Response } =require('express');
const jwt =require('jsonwebtoken');
const AuthRepository = require('../database/repository/authRepository');
const authRepository = new AuthRepository();

const { isPasswordValid } =require('./authentication.service');

const login = async (req, res, next) => {
  const { username, password } = req.body;
  // Fetching userData from database
  const userInfo = await authRepository.fetchUser(username);
  console.log(userInfo.data);

  if (!userInfo.success)
    return res.status(400).json({
      success: false,
      message: userInfo.error,
    });
  if (userInfo.data.length === 0)
    return res.status(409).json({
      success: false,
      message: 'User not found',
    });

  const hashPass = userInfo.data[0].password;
  //  Add more info if needed
  const userId = userInfo.data[0].id;
  console.log(hashPass);
  console.log(isPasswordValid(hashPass, password));

  if (hashPass && isPasswordValid(hashPass, password)) {
    req.body = {
      userId: userId,
      username: username,
    };
    next();
  } else {
    res.status(400).json({
      message: 'Invalid email or password',
    });
  }
};

const isValidJWTToken = (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET || '';
  if (req.headers['authorization']) {
    try {
      const authorization = req.headers['authorization'].split(' ');
      if (authorization[0] != 'Bearer') {
        return res.status(401).json({});
      } else {
        const userData = jwt.verify(authorization[1], SECRET_KEY);
        //    add necessary data to request body. Here i added only userId
        console.log(userData);

        req.body.userId = userData?.userId;
        req.body.username = userData?.username;

        next();
      }
    } catch (err) {
      console.log(err);

      return res.status(403).send();
    }
  } else {
    return res
      .status(401)
      .send({ error: 'Please attach access token in headers.' });
  }
};

module.exports = { login, isValidJWTToken };
