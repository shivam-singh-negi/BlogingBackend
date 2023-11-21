// BlogSchema.js
import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    validate: {
      validator: (value) => ['text', 'media'].includes(value),
      message: 'Type must be either "text" or "media"',
    },
    required: true,
  },
  content: {
    type: String,
  },
});

const sectionSchema = new mongoose.Schema({
  subheading: {
    type: String,
    required: true,
  },
  contentSections: [contentSchema],
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sections: [sectionSchema],
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
