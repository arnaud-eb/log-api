import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Compares a plaintext password with a hashed password to check if they match.
 *
 * @param {string} password - The plaintext password to compare.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the passwords match.
 */
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// hash user's password so we do not store them as plain text in the db
export const hashPassword = (password) => {
  return bcrypt.hash(password);
};

/**
 * Creates a JSON Web Token (JWT) for the given user.
 *
 * @param {object} user - The user object containing at least an id and username.
 * @returns {string} The generated JWT as a string.
 */
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

// custom middleware that will sit in front of any routes that
// we do not want someone that is not authenticated accessing
export const protect = (req, res, next) => {
  // if you want to authenticate with me
  // you have to pass along an authorization value (e.g. "Bearer alsjkdfhlajksdhflkjahsdf")
  // on the authorization header
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
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "Not valid token" });
    return;
  }
};

// allow user to be able to sign up

// allow user to be able to sign in
