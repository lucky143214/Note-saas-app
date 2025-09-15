import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("tenant");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Include slug and plan in JWT for frontend
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role,
        tenantSlug: user.tenant.slug,
        tenantPlan: user.tenant.plan
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        tenant: user.tenant.slug,
        plan: user.tenant.plan
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
