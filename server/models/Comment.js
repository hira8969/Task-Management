import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
