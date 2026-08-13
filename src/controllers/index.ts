import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../model/users";
import { Request, Response } from "express";

export const postRegister = async function (req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password required." });
  }

  try {
    const existingUser = await userModel.findByUsername(username);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists." });
    }

    await userModel.createUser(username, password);
    return res
      .status(201)
      .json({ success: true, message: "Registration successful." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const postLogin = async function (req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" },
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
