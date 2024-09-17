import { Router } from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { getChatHistoryHandler } from '../controllers/chat.controller';

const router = Router();

// Route to get chat history for a project
router.get('/:projectId', deserializeUser, getChatHistoryHandler);

export default router;
