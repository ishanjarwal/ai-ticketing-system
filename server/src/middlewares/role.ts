import { RequestHandler } from "express";
import { UserRoleValues } from "../models/User";

const role =
  (allowed: (typeof UserRoleValues)[number][]): RequestHandler =>
  async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) throw new Error();

      const hasRole = allowed.some((role) => user.roles.includes(role));
      if (!hasRole) throw new Error();
      return next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }
  };

export default role;
