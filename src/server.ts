import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

// middleware that allows requests from any origin
app.use(cors());
// middleware that logs requests
app.use(morgan("dev"));
// middleware that parses json bodies - client can send json data
app.use(express.json());
// middleware that parses urlencoded bodies - client can add query strings or params
// this middleware will parse them and make them available on the req object (req.query or req.params)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Hello" });
});

// for everyting that has "/api" in the url, use this router
// e.g. /api/product, /api/update, /api/updatepoint
// mount the router back to the main express app on the /api path
// before letting access to the route handlers
// we are checking authentication with a custom middleware (protect)
app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

export default app;
