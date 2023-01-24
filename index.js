import express from "express";
const app = express();
const PORT = 3333;
import { create } from "express-handlebars";

// IMPORT ROUTES
import UserRoutes from "./routes/user.js";

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
app.use(express.urlencoded({ extented: true }));

app.use(UserRoutes);

app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log("Server is running on port", PORT);
});
