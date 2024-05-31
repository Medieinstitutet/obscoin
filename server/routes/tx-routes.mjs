import express from 'express';
import {
  createTx,
  getAllTx,
  getTxById,
} from '../controllers/tx-controller.mjs';

const router = express.Router();

router.route('/').get(getAllTx);
router.route('/:id').get(getTxById);
router.route('/transaction').post(createTx);

export default router;
