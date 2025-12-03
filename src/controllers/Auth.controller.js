import { AccessToken, RefreshToken } from "../utils/TokenGen.js";
import User from '../models/user.model.js'
import CustomError from "../utils/CustomError.js";
import bcrypt from "bcrypt";

export async function signup(req, res, next) {
  try {
    const { name, email, password, role, subscriptions } = req.body;

    if (!name || !email || !password || !role) {
      throw new CustomError("All fields are required", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError("User already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
      role,
      subscriptions: subscriptions || null,
    });

    await newUser.save();

    const accessToken = AccessToken({ id: newUser._id, role: newUser.role });
    const refreshToken = RefreshToken({ id: newUser._id, role: newUser.role });

    res.cookie("TradecloneAI-Accesstoken", accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("TradecloneAI-Refreshtoken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        subscriptions: newUser.subscriptions,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError("Missing fields", 400);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new CustomError("Incorrect email or password", 400);
    }

    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!isMatch) {
      throw new CustomError("Incorrect email or password", 400);
    }

    const accessToken = AccessToken({
      id: existingUser._id,
      role: existingUser.role,
    });
    const refreshToken = RefreshToken({
      id: existingUser._id,
      role: existingUser.role,
    });

    res.cookie("TradecloneAI-Accesstoken", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("TradecloneAI-Refreshtoken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        subscriptions: existingUser.subscriptions,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
}
