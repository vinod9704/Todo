const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update the updatedAt field before saving
taskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for formatted creation date
taskSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toISOString();
});

// Virtual for formatted updated date
taskSchema.virtual('formattedUpdatedAt').get(function() {
  return this.updatedAt.toISOString();
});

// Index for better query performance
taskSchema.index({ completed: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
