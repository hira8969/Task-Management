import mongoose from 'mongoose';

const labelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: '#22d3ee' },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Label', labelSchema);
