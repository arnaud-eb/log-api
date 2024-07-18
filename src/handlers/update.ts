import { Request, Response } from "express";

export const getUpdates = async (req: Request, res: Response) => {};
export const getUpdate = async (req: Request, res: Response) => {};
export const updateUpdate = async (req: Request, res: Response) => {
  res.json({ message: "Hello from put update endpoint" });
};
export const createNewUpdate = async (req: Request, res: Response) => {
  res.json({ message: "Hello from post update endpoint" });
};
export const deleteUpdate = async (req: Request, res: Response) => {};
