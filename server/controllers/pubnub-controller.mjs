import { pubnub } from '../server.mjs';

export const getAllNodes = (req, res) => {
  const nodes = pubnub.getNodes();
  res.status(200).json({ nodes });
};
