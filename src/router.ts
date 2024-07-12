import { Router } from "express";

const router = Router();

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
router.put("/product/:id", (req, res) => {});
// create a product
router.post("/product", (req, res) => {});
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
router.put("/update/:id", (req, res) => {});
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
