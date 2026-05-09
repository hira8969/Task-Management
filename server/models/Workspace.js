import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, role: String }],
    settings: {
      theme: { type: String, default: 'system' },
      allowInvites: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Workspace', workspaceSchema);
