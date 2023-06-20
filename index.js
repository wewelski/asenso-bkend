import app from "./app.js";
import config from "./utils/config.js";
import bcrypt from "bcrypt";
import User from "./models/User.js";

// This is a locally-ran mongo URI. Must be updated to final URI.
// mongoose.connect("config.MONGODB_URI");
//   .then(() => {
//     console.log("Connected to Mongo Server!");
//   })
//   .catch(error => {
//     console.log("Connection ERROR!");
//     console.log(error)
//   })

/* This line is for rendering purpose only during development */
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true}));
app.use(session({secret: "worktimefun"}));

/* Routes */
app.get("/", (_req,res) => {
  res.send("Goodluck on your capstone, Group 3!");
})

/* Login */
app.get("/login", (_req,res) => {
  res.render("login"); // EJS render. To be removed later.
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

/* Sign Up */
app.get("/register", (req,res) => {
  res.render("signup"); // EJS render. To be removed later.
})

app.post("/register", async (req,res) => {
  const { fullname, email, phone, password} = req.body;
  const hashPw = await bcrypt.hash(password, 12);
  const user = new User({
    fullname,
    email,
    phone,
    password: hashPw
  })
  await user.save();
  res.redirect("/login");
})

app.listen(config.PORT, () => {
  console.log(`Listening to PORT ${config.PORT}`);
})