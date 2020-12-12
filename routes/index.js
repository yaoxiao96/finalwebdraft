
const express = require("express");
const router = express.Router();

const myDB = require("../db/myMongoDB.js");

const Passport = require("passport");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Strategy = require("passport-local").Strategy;
const authUtils = require("../utils/auth");
const Session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser("cookie_secret"));
app.use(
	Session({
		secret: "cookie_secret",
		resave: true,
		saveUninitialized: true,
	})
);

app.use(Passport.initialize());
app.use(Passport.session());

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

Passport.use(
	new Strategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			const client = new MongoClient(uri, { useUnifiedTopology: true });
			await client.connect();
			//database
			const db = await client.db("apts");
			const users = db.collection("user");
			users.findOne({ username }, (err, user) => {
				if (err) {
					return done(err);
				}

				if (!user) {
					return done(null, false);
				}
				let newPass = authUtils.decrypt(user.password);
				if (password != newPass) {
					return done(null, false);
				}

				return done(null, user);
			});
		}
	)
);

Passport.serializeUser((user, done) => {
	done(null, user._id);
});

Passport.deserializeUser((id, done) => {
	done(null, { id });
});

router.post(
	Passport.authenticate("local", {
		failureRedirect: "/signin?error=Invalid username or password.",
	}),
	function (req, res) {
		res.redirect("/player?username=" + req.user.username);
	}
);

router.post("/signupp", async (req, res, next) => {
	const registrationParams = req.body;
	const users = await myDB.initializeUsers();
	let user = req.body.username;
	await myDB.createFavorites(user);
	if (
		registrationParams.password != registrationParams.password2 ||
    registrationParams.username == "" ||
    registrationParams.pasword == ""
	) {
		res.redirect("/signup?error=Passwords must match.");
	} else {
		const payload = {
			username: registrationParams.username,
			password: authUtils.encrypt(registrationParams.password),
		};
		users.findOne({ username: registrationParams.username }, function (
			err,
			user
		) {
			if (err) {
				return next(err);
			}
			if (user) {
				res.redirect("/signup?error=Username already exists.");
			} else {
				users.insertOne(payload, (err) => {
					if (err) {
						res.redirect("/signup?error=Error signing in.");
					}
				});
				res.redirect("/signin");
			}
		});
	}
});

router.get("/filter",async(req, res) =>{
	const fapartments = await myDB.filterProperties();
	res.json(fapartments);

});

router.get("/", async (req, res) => {
	const gapartment = await myDB.getProperties();
	res.json(gapartment);
});


router.post("/signout", (req, res) => {
	req.session.destroy();
	res.redirect("/?msg=You have been signed out successfully.");
});


router.post("/removeFav", async (req, res) => {
	let apartment = req.body.rapartment;
	let user = req.body.player;
	await myDB.removeFavorite(user, apartment);
	res.redirect("/favorites"); // redirect to home page
});

router.post("/removeFav", async (req, res) => {
	let apartment = req.body.rapartment;
	let user = req.body.player;
	await myDB.removeFavorite(user, apartment);
	res.redirect("/favorites"); // redirect to home page
});

router.get("/favorites1", async (req, res) => {
	const favs = await myDB.getFavorites();
	res.json(favs);
});


module.exports = router;