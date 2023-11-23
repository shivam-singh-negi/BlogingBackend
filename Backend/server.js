import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv for environment variables
import Task from './BlogSchema.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT
app.use(express.json());

// MongoDB connection
const dbUrl = process.env.URL

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Render HTML on connection success
    app.get('/', (req, res) => {
      res.send('<h1>Server is running and connected to MongoDB!</h1>');
    });

    // Get all tasks
    app.get('/api/tasks', async (req, res) => {
      try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Create a new task
    app.post('/api/tasks', async (req, res) => {
      try {
        const text = new Task(req.body);
         console.log(text)
        const response = await text.save();
        res.status(201).json(response);
      } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Update a task
    app.put('/api/tasks/:id', async (req, res) => {
      const taskId = req.params.id;
      const taskData = req.body;
      try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
        res.status(200).json(updatedTask);
      } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(400).json({ error: 'Bad Request' });
      }
    });

    // Delete a task
    app.delete('/api/tasks/:id', async (req, res) => {
      const taskId = req.params.id;
      try {
        const deletedTask = await Task.findByIdAndRemove(taskId);
        res.status(200).json(deletedTask);
      } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(400).json({ error: 'Bad Request' });
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if there's an error connecting to MongoDB
  });
