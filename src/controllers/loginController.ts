import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const User = prisma.user;

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const payload = {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      const secret = process.env.JWT_SECRET as string;
      const expiresIn = 60 * 60 * 1;

      const token = jwt.sign(payload, secret, { expiresIn });

      return res.json({
        data: {
          id: user.id,
          email: user.email,
        },
        token: token,
      });
    } else {
      return res.status(403).json({
        message: "wrong pasword",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
