import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide your first and last name"]
  },
  email: {
    type: String,
    required: [true, "Email must be provided"]
  },
  phone: {
    type: String,
    required: [true, "Phone number must be provided"]
  },
  password: {
    type: String,
    required: [true, "You must type a password"]
  }
})

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__V;
    delete returnedObject.hashPw;
  }
});

const User = mongoose.model("User", userSchema);

export default User;