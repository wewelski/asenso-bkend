const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/userAuth")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(error => {
    console.log("Connection ERROR!");
    console.log(error)
  })

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true}));

app.get("/", (req,res) => {
  res.send("Goodluck on your capstone, Group 3!");
})

app.get("/success", (req,res) => {
  res.send("Registered! You can now login!");
})

// ** ROUTES **
// Login
app.get("/login", (req,res) => {
  res.render("welcome");
})

app.post("/login", async (req,res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username});
  const validPass = await bcrypt.compare(password, user.password);
  if (validPass) {
    res.send(`Welcome back, ${username}!`);
  }
  else {
    res.send("Invalid username or password! Try again.");
  }
});

//  Sign Up
app.get("/signup", (req,res) => {
  res.render("signup");
})

app.post("/signup", async (req,res) => {
  const { username, password} = req.body;
  const hashPw = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hashPw
  })
  await user.save();
  res.redirect("/success");
})



app.listen(3000, () => {
  console.log("Listening to PORT 3000..");
})