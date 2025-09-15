import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing
    await Tenant.deleteMany();
    await User.deleteMany();

    // Create tenants
    const acme = await Tenant.create({ name: "Acme", slug: "acme", plan: "free" });
    const globex = await Tenant.create({ name: "Globex", slug: "globex", plan: "free" });

    // Password hash
    const hashedPassword = await bcrypt.hash("password", 10);

    // Create users
    await User.create([
      { email: "admin@acme.test", password: hashedPassword, role: "admin", tenant: acme._id },
      { email: "user@acme.test", password: hashedPassword, role: "member", tenant: acme._id },
      { email: "admin@globex.test", password: hashedPassword, role: "admin", tenant: globex._id },
      { email: "user@globex.test", password: hashedPassword, role: "member", tenant: globex._id },
    ]);

    console.log("Seed data created successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
