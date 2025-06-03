import express from 'express';
import {
  getPublishers,
  getPublisher,
  createPublisher,
  updatePublisher,
  deletePublisher
} from '../controllers/publishersController.js';

const router = express.Router();

router.route('/')
  .get(getPublishers)
  .post(createPublisher);

router.route('/:id')
  .get(getPublisher)
  .put(updatePublisher)
  .delete(deletePublisher);

export default router;
