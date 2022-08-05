// import { makeHash } from '../authentication/authentication.service';
const { makeHash } = require('../authentication/authentication.service')
const AuthRepository = require('../database/repository/authRepository');
const authRepository = new AuthRepository();

class AuthController {
  register = async (req, res) => {
    // console.log(req.body);
    //   is user exist or not
    const { username } = req.body;
    const result = await authRepository.fetchUser(username);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });

    if (result.data.length !== 0) {
      return res.status(200).json({
        success: false,
        message: 'The user exists',
      });
    }
    const param= {};
    param.username = username;
    param.first_name = req.body.first_name;
    param.last_name = req.body.last_name;
    param.email = req.body.email;
    param.password = makeHash(req.body.password);
    console.log(param);

    const result1 = await authRepository.createUser(username, param.password);
    if (!result1.success)
      return res.status(400).json({
        success: false,
        message: result1.error,
      });
    return res.status(200).json({
      success: true,
      data: result1.data,
    });
    //  entry the data
  };
}

module.exports = AuthController;
