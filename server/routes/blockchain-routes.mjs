import express from 'express';
import {
  addBlock,
  listBlocks,
} from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(listBlocks);
router.route('/mine').post(addBlock);

export default router;