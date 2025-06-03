import express from 'express';
import {
  getReleases,
  getRelease,
  createRelease,
  updateRelease,
  deleteRelease
} from '../controllers/releasesController.js';

const router = express.Router();

router.route('/')
  .get(getReleases)
  .post(createRelease);

router.route('/:id')
  .get(getRelease)
  .put(updateRelease)
  .delete(deleteRelease);

export default router;
