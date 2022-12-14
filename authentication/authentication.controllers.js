const jwt =require('jsonwebtoken');
const getAccessToken = async (req, res) => {
  const data = req.body;
  const token = jwt.sign(data, process.env.JWT_SECRET || 'sayMyName');
  res
    .json({
      access_token: token,
    })
    .status(200);
};

module.exports = getAccessToken;
