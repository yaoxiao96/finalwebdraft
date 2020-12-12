// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const localDb = "mongodb://localhost:27017";

// router.post(
// 	"/login",
// 	passport.authenticate("local", {
// 		failureRedirect: "/login?msg='Error auth'",
// 	}),
// 	function (req, res) {
// 		console.log("Logged in", req.body);
// 		res.redirect("/");
// 	}
// );

// router.get("/getUser", (req, res) =>
// 	res.send({ username: req.user ? req.user.username : null })
// );

// router.get("/logout", function (req, res) {
// 	req.logout();
// 	// res.redirect("/");
// 	res.send({});
// });

// router.post("/register", async(req,res,next) => {
// 	const url = process.env.MONGO_URL || localDb;
// 	const client = await new MongoClient(uri, { useUnifiedTopology: true });
// 	await client.connect();
// 	const db = client.db("apts");
// 	const user = db.collection("user");
// 	const data = req.body.data;
// 	user.findOne({ _id: data.email }, function (error, result) {
// 		if (error !== undefined && error !== null) {
// 			res.status(500);
// 			client.close();
// 			res.send("Registration failed, please try again later");
// 		} else if (result != null) {
// 			response.status(400);
// 			client.close();
// 			res.send("User exists already, login instead");
// 		} else {
// 			user.insertOne(
// 				{ _id: data.email, name: data.name, password: data.password },
// 				function (error, result) {
// 					res.send(result);
// 				}
// 			);
// 		}
// 	});
// });

// router.post("/register",async (req, res, next) => {


// });

// module.exports = router;
