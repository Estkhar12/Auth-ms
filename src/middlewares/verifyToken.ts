import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";
dotenv.config();

const jwt_secret: string = process.env.JWT_SECRET as string;
interface JwtPayload {
  _id: string;
}

export const verify_token = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const decode = jwt.verify(token, jwt_secret) as JwtPayload;

    const result = await User.findById(decode?._id).lean();
    if (!result) {
      return res.status(400).json({ error: "Invalid user" });
    }
    // @ts-ignore: Unreachable code error
    req.user = User;
    next();
  } catch (error) {
    console.log("something went wront while verifing the token", error);
    res.status(500).json({ error: error });
  }
};
