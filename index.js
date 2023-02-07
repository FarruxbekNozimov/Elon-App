const express = require("express");
const { create } = require("express-handlebars");
const app = express();
const fileUpload = require("express-fileupload");

// IMPORT ROUTES
const UserRoutes = require("./routes/posts.js");

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
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

app.use(UserRoutes);

const PORT = 3333;
app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log("Server is running on port", PORT);
});
