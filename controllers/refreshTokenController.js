const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  
  jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    // send new accessToken
    const accessToken = jwt.sign(
      {
        usr: decoded.usr,
        roles: decoded.roles,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '600s' }
    );
    res.status(200).json({ accessToken });
    console.log("new accessToken sent");
  });

};

module.exports = handleRefreshToken;
