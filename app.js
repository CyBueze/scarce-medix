import "dotenv/config";
import express from "express";
import expressLayout from "express-ejs-layouts";
import session from "express-session"
import morgan from "morgan"
import indexRoutes from "./routes/indexRoutes.js"


const app = express();

app.use(expressLayout);
// set default layout for app
app.set('layout', './layouts/main');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET, // use a strong secret in production
  resave: false,
  saveUninitialized: false,
}));

app.use(morgan("dev"))

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
