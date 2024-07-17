import { UPDATE_STATUS } from "@prisma/client";
import { Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

export const errorHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    // convert the errors into an array
    res.json({ errors: errors.array() });
    return;
  }
};

// TODO: check req and res ts types in route handlers

// create a route for every CRUD action for every resource

/**
 * Product routes
 */

// get all products
router.get("/product", (req, res) => {
  res.json({ message: "Hello from get product endpoint" });
});
// get a product by id
router.get("/product/:id", (req, res) => {});
// update a product by id
router.put("/product/:id", body("name").isString(), (req, res) => {
  // input validator: req.body that is an object
  // should have a field on it called "name" of string type
  errorHandler(req, res);
  res.json({ message: "Hello from put product endpoint" });
});
// create a product
router.post(
  "/product",
  [body("name").isString(), body("belongsToId").isString()],
  (req, res) => {
    errorHandler(req, res);
    res.json({ message: "Hello from post product endpoint" });
  }
);
// delete a product by id
router.delete("/product/:id", (req, res) => {});

/**
 * Update routes
 */

// get all updates
router.get("/update", (req, res) => {});
// get an update by id
router.get("/update/:id", (req, res) => {});
// update an update by id
router.put(
  "/update/:id",
  [
    body("title").isString(),
    body("body").isString(),
    body("status").isIn(Object.values(UPDATE_STATUS)),
    body("version").isString(),
    body("asset").isString(),
  ],
  (req, res) => {
    errorHandler(req, res);
    res.json({ message: "Hello from put update endpoint" });
  }
);
// create an update
router.post("/update", (req, res) => {});
// delete an update by id
router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint routes
 */

// get all update points
router.get("/updatepoint", (req, res) => {});
// get an update point by id
router.get("/updatepoint/:id", (req, res) => {});
// update an update point by id
router.put("/updatepoint/:id", (req, res) => {});
// create an update point
router.post("/updatepoint", (req, res) => {});
// delete an update point by id
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
