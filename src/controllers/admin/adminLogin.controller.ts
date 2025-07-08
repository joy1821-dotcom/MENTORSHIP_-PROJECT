
import { RequestHandler } from "express";
import { Admin } from "../../models/u-index.js";
import { checkPassword } from "../../checkPassw/checkPassword.js";
import { generateJwtPayload} from "../../JWT/generateJwt.js";
import { signJwt} from "../../JWT/signJwt.js";

export const adminLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isValidPassword = await checkPassword(password, admin.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT payload using your function
    const payload = generateJwtPayload({
      id: admin.id.toString(),
      role: "admin",
      email: admin.email,
    });

    // Sign the token using your signJwt helper
    const token = signJwt(payload);

    // Send back the JWT token
    res.json({
      message: "Login successful",
      user: {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
