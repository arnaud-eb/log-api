import prisma from "../db.ts";
import { RequestHandler } from "../types.ts";

// Get all
export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
      include: {
        products: true,
      },
    });
    if (user?.products) res.json({ data: user.products });
  } catch (error) {
    next(error);
  }
};

// Get one
export const getOneProduct: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id || "";
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        // we have an index on the id_belongsToId column
        id_belongsToId: {
          id: productId,
          belongsToId: userId, // check that the product belongs to the signed in user
        },
      },
    });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user?.id || "";
    const { name } = req.body;
    const updated = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: productId,
          belongsToId: userId,
        },
      },
      data: {
        name,
      },
    });
    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
};

export const createNewProduct: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        belongsToId: req.user?.id || "",
      },
    });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user?.id || "";
    const deleted = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: productId,
          belongsToId: userId,
        },
      },
    });
    res.json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
