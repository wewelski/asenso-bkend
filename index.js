const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

app.get("/", (req,res) => {
  res.send("Goodluck on your capstone, Group 3!");
})

// ** ROUTES **
// Login
app.get("/login", (req,res) => {
  res.render("welcome");
})

//  Sign Up
app.get("/signup", (req,res) => {
  res.render("signup");
})



app.listen(3000, () => {
  console.log("Listening to PORT 3000..");
})