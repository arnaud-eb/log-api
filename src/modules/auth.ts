import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { isUser } from "../type-guards";

/**
 * Compares a plaintext password with a hashed password to check if they match.
 */
export const comparePasswords = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

/**
 * hash user's password so we do not store them as plain text in the db.
 */
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};

/**
 * Creates a JSON Web Token (JWT) for the given user.
 */
// we pass the whole user object but we do not use all the properties on it
// to generate the token
export const createJWT = (user: User): string => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

// custom middleware that will sit in front of any routes that
// we do not want someone that is not authenticated accessing
export const protect = (req: Request, res: Response, next: NextFunction) => {
  // if you want to authenticate with me
  // you have to pass along an authorization value (e.g. "Bearer alsjkdfhlajksdhflkjahsdf")
  // on the authorization header - bearer token
  const bearer = req.headers.authorization;

  // protect rejects any request that does not have a bearer token in the authorization header
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // add the user to the request object - augment the request object
    if (isUser(user)) {
      req.user = user;
    }
    // go to the next thing in the stack which could be another middleware or the final handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "Not valid" });
    return;
  }
};
