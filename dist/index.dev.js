"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = require("express-handlebars");

var _user = _interopRequireDefault(require("./routes/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 3333;
var hbs = (0, _expressHandlebars.create)({
  defaultLayout: "main",
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});
app.use(_express["default"]["static"]("public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(_express["default"].urlencoded({
  extented: true
}));
app.use(_user["default"]);
app.listen(PORT, function (err) {
  if (err) console.log(err);else console.log("Server is running on port", PORT);
});