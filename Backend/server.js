// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Blog from './BlogSchema.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const dbUrl = process.env.DB_URI; // Set this to your MongoDB connection string
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/blogs', async (req, res) => {
  const blogData = req.body;
  try {
    const newBlog = new Blog(blogData);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add other CRUD routes as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
