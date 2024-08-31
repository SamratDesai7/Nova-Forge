const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const Mens = require("./models/Men.js");
const Women = require("./models/Women.js");
const Kids = require("./models/Kids.js");
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const saveRedirect = require("./middleware.js");
const loggedIn = require("./middleware.js");
const flash = require("connect-flash");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionOption = {
  secret: "supersecretcode",
  resave: false,
  saveUninitialized: true,
  Cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOption));
app.use(flash());

// flash message middlewere
// local variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Authenticates and Authorization middlewere
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("connected to DB");
}

main().catch((err) => {
  console.log(err);
});

app.get("/mens", async (req, res) => {
  const MenData = await Mens.find({});
  res.render("mens.ejs", { MenData });
});

app.get("/Women", async (req, res) => {
  const WomenData = await Women.find({});
  res.render("Women.ejs", { WomenData });
});

app.get("/kids", async (req, res) => {
  const KidsData = await Kids.find({});
  res.render("kids.ejs", { KidsData });
});

app.get("/mens/:id", async (req, res) => {
  const id = req.params.id;
  let menDatails = await Mens.findById(id);
  res.render("mensdetails.ejs", { menDatails });
});

//signup

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
  const { username , email, password } = req.body;
  const user = new User({ username, email, password });
  try {
    await user.save();
    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).send({ message: "Invalid username or password" });
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return res.status(401).send({ message: "Invalid username or password" });
  }
  req.login(user, (err) => {
    if (err) {
      return res.status(500).send({ message: "Error logging in" });
    }
    res.redirect("/home");
  });
});





app.get("/women/:id", async (req, res) => {
  const id = req.params.id;
  let womenDatails = await Women.findById(id);
  res.render("womendetails.ejs", { womenDatails });
  console.log(womenDatails);
});

app.get("/kids/:id", async (req, res) => {
  const id = req.params.id;
  let kidsDatails = await Kids.findById(id);
  res.render("kidsDetails.ejs", { kidsDatails });
  console.log(kidsDatails);
});

app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

//  men new
app.get("/admin/newmen", (req, res) => {
  res.render("new.ejs");
});

app.post("/mens", (req, res) => {
  const { name, price, description, image } = req.body;
  const newProduct = new Mens({
    product_name: name,
    price: price,
    image_url: image,
    description: description,
  });
  newProduct
    .save()
    .then(() => {
      res.redirect("/mens");
    })
    .catch((err) => {
      console.error(err);
    });
});

// home

app.get("/home", (req, res) => {
  res.render("home.ejs");
});
//  men new women
app.get("/admin/newWomen", (req, res) => {
  res.render("newWomen.ejs");
});

app.post("/women", (req, res) => {
  const { product_name, price, description, image } = req.body;
  const newProduct = new Women({
    product_name: product_name,
    price: price,
    image_url: image,
    description: description,
  });
  newProduct
    .save()
    .then(() => {
      res.redirect("/women");
    })
    .catch((err) => {
      console.error(err);
    });
});

//  men new kid

app.get("/admin/newkid", (req, res) => {
  res.render("newkid.ejs");
});

app.post("/kids", (req, res) => {
  const { name, price, description, image } = req.body;
  const newProduct = new Kids({
    product_name: name,
    price: price,
    image_url: image,
    description: description,
  });
  newProduct
    .save()
    .then(() => {
      res.redirect("/kids");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.delete("/mens/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let deleted = await Mens.findByIdAndDelete(id);
    res.redirect("/mens");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
});

app.delete("/women/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let deleted = await Women.findByIdAndDelete(id);
    res.redirect("/women");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
});

app.delete("/kids/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let deleted = await Kids.findByIdAndDelete(id);
    res.redirect("/kid");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
});

app.get("/contact" , (req,res) => {
  res.render("contact.ejs");
})

app.get("/article" , (req,res) => {
  res.render("article.ejs");
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
