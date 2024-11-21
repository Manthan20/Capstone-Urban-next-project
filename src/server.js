import express from "express";
import { login, signup } from "./api/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import {
  getProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  getPropertiesById,
} from "./api/properties.js";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

const generateToken = (user) => {
  const payload = { user: { id: user.id, role: user.role } }; // Include user ID and role
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }); // Token expires in 1 day
  return token;
};

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const stripe = new Stripe(
  "sk_test_51QNT2WCf659AUZpmujq8B0AB9Cl2frrhdedYayEd14AKSBegKKdYxRekgto8UsCHxcA4OuWlh4geQ5iA4HDZnmMY005R6cp7p5"
);

// Initialize Prisma Client
const prisma = new PrismaClient();

// Authentication Middleware to check JWT Token
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get the token from Authorization header

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT token
    req.user = decoded.user; // Attach user data to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const user = await signup(req.body);
    const token = generateToken(user); // Generate JWT token
    res.status(201).json({ token, user }); // Send token and user data
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const user = await login(req.body); // Use the existing login logic
    const token = generateToken(user); // Generate JWT token

    res.status(200).json({ token, user }); // Send token and user data
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Get User Profile (Protected route)
app.get("/api/user/profile", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }, // Use user ID from decoded token
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Update User Profile (Protected route)
app.put("/api/user/profile", authMiddleware, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: req.user.id }, // Use user ID from decoded token
      data: {
        firstName,
        lastName,
        email,
        password, // Optionally hash the password if it's updated
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

// Get All Users Route
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Create New User Route
app.post("/api/users", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { firstName, lastName, email, password, role },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User Route
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

// Stripe Payment
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "cad",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      message: "Payment intent created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to create payment intent",
    });
  }
});

// Properties Routes
app.get("/api/properties", getProperties);
app.post("/api/properties", addProperty);
app.put("/api/properties/:id", updateProperty);
app.delete("/api/properties/:id", deleteProperty);
app.get("/api/properties/:id", getPropertiesById);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});