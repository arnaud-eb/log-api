import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();

// allows requests from any origin
app.use(cors());
// logs requests
app.use(morgan("dev"));
// parses json bodies - client can send json data
app.use(express.json());
// parse urlencoded bodies - client can add query strings or params
// this middleware will parse them and make them available on the req object (req.query or req.params)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Hello" });
});

// for everyting that has "/api" in the url, use this router
// e.g. /api/product, /api/update, /api/updatepoint
// mount the router back to the main express app on the /api path
app.use("/api", router);

export default app;

// next(): go to the next thing in the stack which could be another middleware or the final handler
