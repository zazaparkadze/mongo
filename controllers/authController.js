const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  console.log(req.headers);
  console.log(req.cookies);
  const { usr, pwd } = req.body;
  if (!usr || !pwd)
    return res.status(400).json("username and password are required!");
  try {
    const foundUser = await User.findOne({ usr: usr });
    if (!foundUser) return res.status(401).json("not allowed");
    const match = await bcrypt.compare(pwd, foundUser.pwd);
    if (match) {
      const accessToken = await jwt.sign(
        {
          usr: usr,
          roles: foundUser.roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "960s",
        }
      );
      const refreshToken = await jwt.sign(
        { usr: usr, roles: foundUser.roles },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        /*  sameSite: "none",
        secure: true, */
        maxAge: 12 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken });
      foundUser.refreshToken = refreshToken;
      await foundUser.save();
    } else {
      return res.status(403).json("username or/and password is not correct");
    }
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

module.exports = handleLogin;
