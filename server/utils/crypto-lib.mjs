import crypto from 'crypto';

const computeHash = (...args) => {
  return crypto.createHash('sha256').update(args.sort().join('')).digest('hex');
};

export default computeHash