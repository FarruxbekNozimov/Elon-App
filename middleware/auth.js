const jwt = require("jsonwebtoken");
const { jsonReader } = require("../utils/fileUtil");

module.exports = function (req, res, next) {
	if (!req.cookies.token) {
		res.redirect("/admin/login");
		return;
	}
	let token = jwt.verify(req.cookies.token, "FarruxDEV");
	let users = jsonReader("admins");
	for (let i in users) {
		if (users[i].id == token.userId) {
			return next();
		}
	}
	res.redirect("/admin/login");
};
