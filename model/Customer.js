const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstname: String,
  lastname: String,
  phone: {
    type: String,
    validate: {
      validator: function () {
        return /^0\d{2}([/\-.])\d{3}\1\d{4}$/.test(this.phone);
      },
      message: "phone number is not correct, try again",
      reason: "who knows",
    },
    required: [true, "blar blar blar"],
  },
  email: {
    type: String,
    validate: {
      validator: function () {
        return /^\w+(.)?\w+@{1}\w+.com$/.test(this.email);
      },
      message: (props) => `${props.value} is not valid.....${props.path}`,
    },
  },
  birthDate: {
    type: String,
    validate: {
      validator: function () {
        return /^\d{2}([/\-.])\d{2}\1\d{4}$/.test(this.birthDate);
      },
      message: (props) => `${props.value} is not valid.....${props.path}`,
    },
    },
    placeOfWork: String,
    occupation: String,
});


module.exports = mongoose.model('Customer', customerSchema);