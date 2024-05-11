// create variable and require mongoose
const mongoose = require("mongoose");

const { Schema } = mongoose;

//create variable and a userSchema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "A first name is required"],
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "A username is required"],
    unique: true,
  },
  password: {
    type: Buffer,
  },
  salt: {
    type: Buffer,
  },
  strategy: {
    type: String,
    required: true,
  },
});
//make user available via export and use userSchema as model
const User = mongoose.model("User", userSchema);
module.exports = User;
