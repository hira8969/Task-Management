import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: String,
    status: { type: String, enum: ['todo', 'in-progress', 'review', 'completed'], default: 'todo', index: true },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium', index: true },
    dueDate: Date,
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
