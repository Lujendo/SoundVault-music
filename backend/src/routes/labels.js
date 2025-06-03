import express from 'express';
import {
  getLabels,
  getLabel,
  createLabel,
  updateLabel,
  deleteLabel
} from '../controllers/labelsController.js';

const router = express.Router();

router.route('/')
  .get(getLabels)
  .post(createLabel);

router.route('/:id')
  .get(getLabel)
  .put(updateLabel)
  .delete(deleteLabel);

export default router;
