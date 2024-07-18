import { Request, Response } from "express";
import prisma from "../db";

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
  });
  console.log(products);
  res.json({ products });
};
export const getProduct = async (req: Request, res: Response) => {};
export const updateProduct = async (req: Request, res: Response) => {
  res.json({ message: "Hello from put product endpoint" });
};
export const createNewProduct = async (req: Request, res: Response) => {
  res.json({ message: "Hello from post product endpoint" });
};
export const deleteProduct = async (req: Request, res: Response) => {};
