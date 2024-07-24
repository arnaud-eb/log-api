import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    // convert the errors into an array
    return res.json({ errors: errors.array() });
  }
  next();
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "auth") {
    return res.status(401).json({ message: "unauthorized" });
  }
  if (err.type === "input") {
    return res.status(400).json({ message: "invalid input" });
  }
  return res.status(500).json({ message: "oops, that's on us" });
};
