import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
    type: { type: String, default: 'system' },
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);
