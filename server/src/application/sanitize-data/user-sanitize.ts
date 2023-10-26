import User from "@src/entities/user";

export const sanitizeUser = (user: User) => ({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
  