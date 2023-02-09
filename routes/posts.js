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
	req.body.isOnline = req.body.isOnline ? "online" : "offline";
	req.body.ismSharif = req.body.ismSharif || req.body.ismSharif1;
	let {
		date,
		time,
		route,
		initRoute,
		isOnline,
		link,
		shaxs,
		ismSharif,
		ismSharif1,
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
	if (!req.files || !date || !time || !route || !initRoute || !link) {
		console.log("To'ldir");
		return res.render("create", {});
	}
	let post = {
		id: Date.now().toString(),
		date,
		time,
		ismSharif: ismSharif ? ismSharif : ismSharif1,
		route,
		isOnline,
		initRoute,
		link,
		// POST
		postTitle,
		description,
		postMatni,
		tasdiqlangan: false,
	};
	if (shaxs == "yuridik") {
		post = {
			...post,
			yuridikNomi,
			yuridikProfessiya,
			yuridikPhone,
			yuridikPhoneNumber,
		};
	} else {
		post = {
			...post,
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
	let result = [];
	if (req.query) {
		for (let i in posts) {
			if (
				posts[i].date == date ||
				posts[i].route == route ||
				posts[i].initRoute == initRoute ||
				posts[i].isOnline == isOnline ||
				posts[i].ismSharif == ismSharif
			) {
				result.push(posts[i]);
			}
		}
	}
	console.log(result, posts);
	res.render("index", {
		posts,
		filters: result.length ? result : posts,
	});
});

module.exports = router;
