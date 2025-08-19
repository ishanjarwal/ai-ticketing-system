import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { inngest } from "../inngest/client";
import { RequestHandler } from "express";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { email, name, password, skills } = req.body;
    if (!email || !name || !password || !skills)
      return res
        .status(400)
        .json({ message: "Fields missing", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      skills,
    });
    await newUser.save();

    // fire welcome message event
    await inngest.send({ name: "user/signup", data: { email } });

    const token = jwt.sign(
      { name, email, _id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET!
    );

    return res.status(200).json({
      message: "User created",
      success: true,
      data: { user: newUser, token },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
        success: false,
      });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Fields missing", success: false });

    const check = await User.findOne({ email });
    if (!check) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const checkPassword = await bcrypt.compare(password, check.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const payload = {
      name: check.name,
      email,
      _id: check._id,
      role: check.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    return res.status(200).json({
      message: "Logged in",
      success: true,
      data: { user: payload, token },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
        success: false,
      });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const logoutUser: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[0];
    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorized access", success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (error, decoded) => {
      if (error) {
        return res

          .status(400)
          .json({ message: "Unauthorized access", success: false });
      }
    });

    return res.status(200).json({
      message: "Logged out",
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
        success: false,
      });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const email = req.params.email;
    const { skills = [], role, name } = req.body;

    const updates: Record<string, any> = {};
    if (name) updates.name = name;
    if (skills) updates.skills = skills;

    const user = await User.findOneAndUpdate({ email }, { $set: updates });
    if (!user) {
      return res.status(400).json({
        message: "No users found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Details updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
        success: false,
      });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        message: "No users found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User fetched",
      data: req.user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
        success: false,
      });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      message: "Users fetched",
      data: users,
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
        success: false,
      });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
