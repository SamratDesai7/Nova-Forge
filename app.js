const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const Mens = require("./models/Men.js");
const Women = require("./models/Women.js");
const Kids = require("./models/Kids.js");
const Payment = require("./models/paymenthistory.js");
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const { saveRedirect } = require("./middleware.js");
const flash = require("connect-flash");
const MyError = require("./utilities/MyError.js")
const wrapAshync = require("./utilities/WrapAsync.js");
require("dotenv").config();
const paymentRoute = require('./routes/paymentRoute');
const { appendFile } = require("fs");
const methodOverride = require("method-override");
app.use('/',paymentRoute);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

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

app.use((req , res , next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user=req.user;
  next();
})

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated();
  next();
});
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
  res.render("women.ejs", { WomenData });
});

app.get("/kids", async (req, res) => {
  const KidsData = await Kids.find({});
  res.render("kids.ejs", { KidsData });
});

app.get("/mens/:id", async (req, res) => {
  const id = req.params.id;
  let menDatails = await Mens.findById(id);
  res.render("mensdetails.ejs", { menDatails });
  console.log(req.user);
});

app.get("/mens/:id/payment", (req,res) => {
  res.render("payment.ejs");
})

app.get("/mens/:id/payment-history", async (req, res) => {
  
  const payments = await Payment.find({ });
  res.render("payment-history.ejs", { payments });
});


app.get("/support" , (req,res) => {
  res.render("chatbot.ejs");
})


//signup

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup",wrapAshync( async (req, res) => {
  const { username, password, email } = req.body;

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).send({ message: "Username or email already exists" });
  }

  // Create a new user
  const newUser = new User({ username, email });
  await User.register(newUser, password, (err, user) => {
    if (err) {
      return res.status(500).send({ message: "Error creating user" });
    }
    // Log the user in
    req.login(user, (err) => {
      if (err) {
        return res.status(500).send({ message: "Error logging in" });
      }
      res.redirect("/home");
    });
  });
}));

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    console.log(req.body);
    res.redirect('/home');
  }
);

app.get('/logout' , (req , res , next) => {
  req.logout((err) => {
    if(err){
      next(err);
    }
    req.flash("success", "You are logout now");
    res.redirect("/login");
  })
})

app.get('/', (req, res) => {
  const isLoggedIn = req.isAuthenticated();
  res.render('index', { isLoggedIn });
});


app.get("/women/:id", async (req, res) => {
  const id = req.params.id;
  let womenDatails = await Women.findById(id);
  res.render("womendetails.ejs", { womenDatails });
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

app.get(
  "/edit/:id",
  async (req, res) => {
    let { id } = req.params;
    const product = await Mens.findById(id);
    res.render("edit.ejs", { product });
  }
);

// update route
app.patch(
  "/edit/:id",
  async (req, res) => {
    let { id } = req.params;
    await Mens.findByIdAndUpdate(id, { $set: req.body.product });
    req.flash("success", "Mens Updated!");
    res.redirect("/home");
  }
);




app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
