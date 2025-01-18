const User = require("../model/User");

const handleLogout = async (req, res) => {
  //delete accessToken , front-end also;
  console.log(req.cookies);
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  try {
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        /*  sameSite: "None",
        Secure: true, */
        maxAge: 12 * 60 * 60 * 1000,
      });
      res.sendStatus(204);
    }

    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie("jwt", {
      httpOnly: true /* sameSite: "None", Secure: true */,
    });
    res.status(200).send("logged out, token deleted");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleLogout };
