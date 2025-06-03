import express from 'express';
import {
  getRecordings,
  getRecording,
  createRecording,
  updateRecording,
  deleteRecording
} from '../controllers/recordingsController.js';

const router = express.Router();

router.route('/')
  .get(getRecordings)
  .post(createRecording);

router.route('/:id')
  .get(getRecording)
  .put(updateRecording)
  .delete(deleteRecording);

export default router;
