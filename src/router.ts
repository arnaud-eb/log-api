import { UPDATE_STATUS } from "@prisma/client";
import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createNewProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createNewUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import {
  createNewUpdatePoint,
  deleteUpdatePoint,
  getUpdatePoint,
  getUpdatePoints,
  updateUpdatePoint,
} from "./handlers/updatePoint";

const router = Router();

// create a route for every CRUD action for every resource

/**
 * Product routes
 */

// get all products
router.get("/product", getProducts);
// get a product by id
router.get("/product/:id", getOneProduct);
// update a product by id
router.put(
  "/product/:id",
  // input validator (middleware): req.body that is an object
  // should have a field on it called "name" of string type
  [body("name").exists().isString().isLength({ max: 255 }), handleInputErrors],
  updateProduct
);
// create a product
router.post(
  "/product",
  [body("name").exists().isString().isLength({ max: 255 }), handleInputErrors],
  createNewProduct
);
// delete a product by id
router.delete("/product/:id", deleteProduct);

/**
 * Update routes
 */

// get all updates
router.get("/update", getUpdates);
// get an update by id
router.get("/update/:id", getOneUpdate);
// update an update by id
router.put(
  "/update/:id",
  [
    // you could also enforce that at least one of them should be present
    body("title").optional().isString(),
    body("body").optional().isString(),
    body("status").optional().isIn(Object.values(UPDATE_STATUS)),
    body("version").optional().isString(),
    handleInputErrors,
  ],
  updateUpdate
);
// create an update
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("status").optional().isIn(Object.values(UPDATE_STATUS)),
    body("version").optional().isString(),
    body("productId").exists().isString(),
    handleInputErrors,
  ],
  createNewUpdate
);
// delete an update by id
router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint routes
 */

// get all update points
router.get("/updatepoint", getUpdatePoints);
// get an update point by id
router.get("/updatepoint/:id", getUpdatePoint);
// update an update point by id
router.put(
  "/updatepoint/:id",
  [
    // you could also enforce that at least one of them should be present
    body("name").optional().isString(),
    body("description").optional().isString(),
    handleInputErrors,
  ],
  updateUpdatePoint
);
// create an update point
router.post(
  "/updatepoint",
  [
    body("name").exists().isString(),
    body("description").exists().isString(),
    body("updateId").exists().isString(),
    handleInputErrors,
  ],
  createNewUpdatePoint
);
// delete an update point by id
router.delete("/updatepoint/:id", deleteUpdatePoint);

export default router;
