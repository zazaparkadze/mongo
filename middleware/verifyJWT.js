const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(403);
  //console.log(authHeader);
  try {
    const token = authHeader.split(" ")[1];
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json("no valid accessToken recieved");
      }
      req.usr = decoded.usr;
      req.roles = decoded.roles;
    });
  } catch (err) {
    return res.status(403).json("no valid accessToken recieved");
  }
  next();
};

module.exports = verifyJWT;
