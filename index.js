const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const session = require("express-session");

// This is locally-ran mongo URI. Must be updated to final URI.
mongoose.connect("mongodb://127.0.0.1:27017/userAuth")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(error => {
    console.log("Connection ERROR!");
    console.log(error)
  })

// These next two lines are for EJS templating. Can be removed to give way to React frontend rendering
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true}));
app.use(session({secret: "worktimefun"}));

app.get("/", (req,res) => {
  res.send("Goodluck on your capstone, Group 3!");
})

app.get("/success", (req,res) => {
  res.send("Registered! You can now login!");
})

// ** ROUTES **
// Login
app.get("/login", (req,res) => {
  res.render("welcome"); // EJS render. To be removed later.
})

app.post("/login", async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  const validPass = await bcrypt.compare(password, user.password);
  if (validPass) {
    req.session.user_id = user._id;
    res.send("You're now logged in! Welcome!");
  }
  else {
    res.send("Invalid email or password! Try again.");
  }
});

app.post("/logout", (req,res) => {
  req.session.user_id = null;
  res.redirect("/login");
})

//  Sign Up
app.get("/signup", (req,res) => {
  res.render("signup"); // EJS render. To be removed later.
})

app.post("/signup", async (req,res) => {
  const { fullname, email, phone, password} = req.body;
  const hashPw = await bcrypt.hash(password, 12);
  const user = new User({
    fullname,
    email,
    phone,
    password: hashPw
  })
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/success");
})

app.listen(3000, () => {
  console.log("Listening to PORT 3000..");
})