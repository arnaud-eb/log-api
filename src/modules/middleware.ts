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
