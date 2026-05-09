import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: String,
    status: { type: String, enum: ['todo', 'in-progress', 'review', 'completed'], default: 'todo', index: true },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium', index: true },
    startDate: Date,
    dueDate: Date,
    reminderAt: Date,
    progress: { type: Number, min: 0, max: 100, default: 0 },
    estimatedHours: { type: Number, min: 0, default: 0 },
    actualHours: { type: Number, min: 0, default: 0 },
    billingType: { type: String, enum: ['non-billable', 'billable'], default: 'non-billable' },
    recurrence: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
    tags: [{ type: String, trim: true }],
    checklist: [
      {
        title: { type: String, required: true, trim: true },
        completed: { type: Boolean, default: false }
      }
    ],
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true, index: true },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
    completedAt: Date,
    order: { type: Number, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

taskSchema.virtual('commentsCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'task',
  count: true
});

taskSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Task', taskSchema);
