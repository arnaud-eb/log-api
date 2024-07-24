import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { RequestHandler } from "../types";

// allow user to be able to sign up
export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
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
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

// allow user to be able to sign in
// like for createNewUser, user has no token yet
export const signIn: RequestHandler = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
