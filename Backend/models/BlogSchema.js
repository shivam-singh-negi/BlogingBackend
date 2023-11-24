import mongoose from 'mongoose';

const contentSectionSchema = new mongoose.Schema({
  id:Number,
    type: { type: String },
    content: String
  });
  
  const sectionSchema = new mongoose.Schema({
    id:Number,
    subheading: String,
    contentSections: [contentSectionSchema]
  });
  
  const blogSchema = new mongoose.Schema({
    title: String,
    description:String,
    sections: [sectionSchema],
    createdAt: { type: Date, default: Date.now }
  });
  
  const Task = mongoose.model('Blog', blogSchema);
  
  export default Task;