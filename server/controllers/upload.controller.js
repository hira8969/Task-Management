import { cloudinary } from '../config/cloudinary.js';
import Attachment from '../models/Attachment.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const uploadFile = asyncHandler(async (req, res) => {
  const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, { folder: 'orbitflow' });
  const attachment = await Attachment.create({
    fileName: req.file.originalname,
    url: result.secure_url,
    publicId: result.public_id,
    mimeType: req.file.mimetype,
    size: req.file.size,
    uploadedBy: req.user._id,
    workspace: req.user.workspace,
    task: req.body.task
  });
  res.status(201).json(attachment);
});
