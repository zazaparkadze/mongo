require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connDB = require("./config/connDB");
const { logger } = require("./middleware/logEvents");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');

const port = process.env.PORT || 3500;

connDB();
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

app.use("/", express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use("/", require("./routes/root"));
app.use('/auth', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));
app.use('/refresh', require('./routes/refresh'));

app.use('/posts', require('./routes/posts'));
//app.use(verifyJWT);
app.use('/users', require('./routes/users'));

app.all("/*", (req, res) => {
  // console.log(req.accepts('application/json'));
  res.status(404);
  if (req.url.endsWith(".json")) {  // req.headers['content-type'] === 'application/json'
    res.json({ message: "no json file found" });
  } else if (req.url.endsWith(".txt")) {
    res.type("txt").send("no file found");
  } else {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(port, () => console.log(`server is running on port ${port}`));
});
