const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const fsPromises = require("fs").promises;

const logEvents = async (message, fileName) => {
  const dateTime = new Date().toLocaleString().replace(",", "  ");
  const msg = `${dateTime}\t${crypto.randomUUID()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..","logs"))) {
      fs.mkdir(path.join(__dirname, "..", "logs"), (err) => {
        if (err) throw err;
      });
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..","logs", `${fileName}`),
      msg
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.url}\t${req.method}\t${req.headers.origin}`, `${req.method}request.txt`);
  next();
};
module.exports = { logger, logEvents };
