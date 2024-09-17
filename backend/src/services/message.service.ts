import messageModel from '../models/message.model';

// Save a new message
export const createMessage = async ({
  projectId,
  sender,
  content,
}: {
  projectId: string;
  sender: string;
  content: string;
}) => {
  return messageModel.create({ projectId, sender, content });
};

// Get chat history for a project
export const getMessagesByProjectId = async (projectId: string) => {
  return messageModel
    .find({ projectId })
    .populate('sender', 'name')  // Get sender's name for display
    .sort({ timestamp: 1 });  // Sort messages by timestamp in ascending order
};
