import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import User  from "../models/user.model.js";

dotenv.config();

// Extend Express Request type to add userId
interface CustomRequest extends Request {
  userId?: string;
}
const authenticateUser = async(req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
     res
      .status(401)
      .json({ message: "Login Token Not Found || Unauthorized access", states: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
    res
        .status(401)
        .json({ message: "User not found || Unauthorized access", states: false });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
     res
      .status(401)
      .json({ message: "Invalid token || Unauthorized access", states: false });
  }
};

export default authenticateUser;
