import { User } from "@prisma/client";

export const isUser = (user: any): user is User => {
  return (
    user &&
    typeof user === "object" &&
    "id" in user &&
    typeof user.id === "string" &&
    "username" in user &&
    typeof user.username === "string"
  );
};
