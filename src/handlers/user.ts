import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

// allow user to be able to sign up
export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

// allow user to be able to sign in
// like for createNewUser, user has no token yet
export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // 1st step: check that the username exists
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  // 2nd step: check that the password passed by user matches the hashed password stored in db
  const isValid = await comparePasswords(password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: "nope" });
    return;
  }

  // let's create a token for the user
  const token = createJWT(user);
  res.json({ token });
};
