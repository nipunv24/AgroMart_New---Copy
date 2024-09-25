const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

const app = express();
const prisma = new PrismaClient();
const secretKey = 'your-secret-key'; // Replace with a more secure secret key

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// User sign-up endpoint
app.post('/signup', async (req, res) => {
  const { name, email, password, address, phoneNum, province, district, area } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.buyer.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.buyer.create({
      data: {
        name,
        email,
        address,
        phoneNum,
        province,
        district,
        area,
        userId: hashedPassword, // Storing the hashed password
      },
    });

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Failed to sign up user' });
  }
});

// User sign-in endpoint
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await prisma.buyer.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.userId); // userId is storing hashed password

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ error: 'Failed to sign in user' });
  }
});

// Endpoint to fetch products (already exists)
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        name: true,
        description: true,
        imageUrls: true
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Example protected route
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.buyer.findUnique({
      where: { id: req.user.userId },
      select: {
        name: true,
        email: true,
        address: true,
        phoneNum: true,
        province: true,
        district: true,
        area: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
