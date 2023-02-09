const { Router } = require("express");
const { jsonReader, jsonWriter } = require("../utils/fileUtil.js");
const path = require("path");
const router = Router();
const { generateJWTtoken } = require("../utils/token");
const AuthMiddleware = require("../middleware/auth.js");

// LOGIN admin

router.get("/admin/login", (req, res) => {
	req.cookies.token && res.redirect("/");
	res.render("adminLogin", { form: true });
});

router.post("/admin/auth", (req, res) => {
	const { login, password } = req.body;
	let users = jsonReader("admins");
	console.log(login, password);
	for (let i in users) {
		if (users[i].login == login) {
			if (users[i].password != password) {
				return res.render("adminLogin");
			}
			const token = generateJWTtoken(users[i].id);
			res.cookie("token", token, { httpOnly: true, secure: true });
			res.redirect("/admin");
		}
	}
	return res.render("adminLogin");
});

router.get("/admin/login", (req, res) => {
	res.render("adminLogin", {});
});

router.get("/admin", AuthMiddleware, (req, res) => {
	let posts = jsonReader("posts");
	res.render("admin", {
		posts,
		admin: true,
	});
});

module.exports = router;
