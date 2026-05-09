import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema(
  {
    fileName: String,
    url: String,
    publicId: String,
    mimeType: String,
    size: Number,
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }
  },
  { timestamps: true }
);

export default mongoose.model('Attachment', attachmentSchema);
