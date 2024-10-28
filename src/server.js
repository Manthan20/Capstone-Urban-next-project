import express from 'express';
import { login, signup } from './api/auth.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'; // Import Prisma Client

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Prisma Client
const prisma = new PrismaClient();

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const user = await signup(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const user = await login(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Get All Users Route
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create New User Route
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { firstName, lastName, email, password, role },
    });
    res.status(201).json(newUser); // Respond with the created user
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User Route
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // Respond with no content on successful deletion
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
