import { Request, Response } from "express";

export const getUpdatePoints = async (req: Request, res: Response) => {};
export const getUpdatePoint = async (req: Request, res: Response) => {};
export const updateUpdatePoint = async (req: Request, res: Response) => {
  res.json({ message: "Hello from put updatepoint endpoint" });
};
export const createNewUpdatePoint = async (req: Request, res: Response) => {
  res.json({ message: "Hello from post updatepoint endpoint" });
};
export const deleteUpdatePoint = async (req: Request, res: Response) => {};
