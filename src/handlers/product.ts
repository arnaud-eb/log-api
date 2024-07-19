import { Request, Response } from "express";
import prisma from "../db";

// Get all
export const getProducts = async (req: Request, res: Response) => {
  const { products } = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: products });
};

// Get one
export const getOneProduct = async (req: Request, res: Response) => {
  const userId = req.user.id;
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
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const userId = req.user.id;
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
};

export const createNewProduct = async (req: Request, res: Response) => {
  const { name } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: userId,
      },
    },
  });
  res.json({ data: deleted });
};
