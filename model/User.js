const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  usr: {
    type: String,
    validate: {
      validator: function () {
      },
      message: (props) => `${props.value} is not valid for path ${props.path}`,
      reason: (props) => `${props.value} includes special character`,
    },
    require: [true, "username"],
  },
  pwd: {
    type: String,
    require: [true, "must be good password"],
  },
  roles: { type: Array, default: [2001] },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
