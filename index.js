const express = require("express");
const { create } = require("express-handlebars");
const app = express();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// IMPORT ROUTES
const PostRoutes = require("./routes/posts.js");
const AdminRoutes = require("./routes/admin.js");

const UserMiddleware = require("./middleware/user.js");

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const hbs = create({
	defaultLayout: "main",
	extname: "hbs",
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true,
	},
});
app.use(express.static("public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// USE MIDDLEWARE
app.use(UserMiddleware);

app.use(PostRoutes);
app.use(AdminRoutes);

const PORT = 3333;
app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log("Server is running on port", PORT);
});
