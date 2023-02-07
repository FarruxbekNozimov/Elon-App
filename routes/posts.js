const { Router } = require("express");
const { jsonReader, jsonWriter } = require("../utils/fileUtil.js");
const path = require("path");
const router = Router();

// CREATE POST

router.get("/create", (req, res) => {
	res.render("create", {});
});

router.post("/create", (req, res) => {
	let posts = jsonReader("posts");
	let {
		date,
		time,
		route,
		initRoute,
		isOnline,
		link,
		shaxs,
		ismSharif,
		yuridikNomi,
		yuridikProfessiya,
		yuridikPhone,
		yuridikPhoneNumber,
		jismoniyProfessiya,
		jismoniyPhone,
		jismoniyPhone2,
		postTitle,
		description,
		postMatni,
	} = req.body;
	console.log(req.body);
	if (
		!req.files ||
		!date ||
		!time ||
		!route ||
		!isOnline ||
		!initRoute ||
		!isOnline ||
		!link
	) {
		return res.render("create", {});
	}
	let post = {
		date,
		time,
		route,
		isOnline,
		initRoute,
		link,
		// POST
		postTitle,
		description,
		postMatni,
		tasdiqlangan: "false",
	};
	if (shaxs == "yuridik") {
		post = {
			...post,
			yuridikNomi,
			ismSharif,
			yuridikProfessiya,
			yuridikPhone,
			yuridikPhoneNumber,
		};
	} else {
		post = {
			...post,
			ismSharif,
			jismoniyProfessiya,
			jismoniyPhone,
			jismoniyPhone2,
		};
	}
	let imgName = Date.now() + ".png";
	req.files.postPhoto.mv(path.join(__dirname, "..", "public", "img", imgName));
	post.postPhoto = imgName;
	posts.push(post);

	jsonWriter("posts", posts);
	res.redirect("/");
});
// GET POSTS

router.get("/", (req, res) => {
	let { date, route, initRoute, isOnline, ismSharif } = req.query;
	let posts = jsonReader("posts");
	// let res = D
	for (let i in posts) {
	}
	res.render("index", {
		posts,
	});
});

// GET ONE POST

module.exports = router;
