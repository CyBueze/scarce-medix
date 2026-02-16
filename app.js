import express from "express";
import expressLayout from "express-ejs-layouts";
import session from "express-session";
import morgan from "morgan";
import indexRoutes from "./routes/indexRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// layouts & views
app.use(expressLayout);
app.set('layout', path.join(__dirname, 'views', 'layouts', 'main'));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// static & form parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// logging
app.use(morgan("dev"));

// sessions (simple MemoryStore, fine for testing but not production)
app.use(session({
  secret: process.env.SESSION_SECRET || "fallback_secret",
  resave: false,
  saveUninitialized: false,
}));

// routes
app.use("/", indexRoutes);

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
