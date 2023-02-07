const { Router } = require("express");
const { jsonReader, jsonWriter } = require("../utils/fileUtil.js");
const path = require("path");
const router = Router();

// CREATE POST

router.get("/create", (req, res) => {
	res.render("create", {});
});

router.post("/create", async (req, res) => {
	let posts = jsonReader("posts");
	let {
		date,
		time,
		route,
		initRoute,
		isOnline,
		link,
		shaxs,
		yuridikNomi,
		yuridikFullname,
		yuridikProfessiya,
		yuridikPhone,
		yuridikPhoneNumber,
		jismoniyFullname,
		jismoniyProfessiya,
		jismoniyPhone,
		jismoniyPhone2,
		postTitle,
		description,
		postPhoto,
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
	};
	if (shaxs == "yuridik") {
		post = {
			...post,
			yuridikNomi,
			yuridikFullname,
			yuridikProfessiya,
			yuridikPhone,
			yuridikPhoneNumber,
		};
	} else {
		post = {
			...post,
			jismoniyFullname,
			jismoniyProfessiya,
			jismoniyPhone,
			jismoniyPhone2,
		};
	}
	let imgName = Date.now() + ".png";
	req.files.postPhoto.mv(path.join(__dirname, "..", "public", "img", imgName));
	post.postPhoto = imgName;
	posts.push(post);

	await jsonWriter("posts", posts);
	res.redirect("/");
});
// GET POSTS

router.get("/", (req, res) => {
	res.render("index", {});
});

// GET ONE POST

module.exports = router;
