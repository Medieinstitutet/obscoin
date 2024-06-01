import express from 'express';
import { getAllNodes } from '../controllers/pubnub-controller.mjs';

const router = express.Router();

router.route('/').get(getAllNodes);

export default router;
