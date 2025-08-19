import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    if (!user)
      return res.status(401).json({ message: "Unauthorized", success: false });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid request", success: false });
  }
};

export default auth;
