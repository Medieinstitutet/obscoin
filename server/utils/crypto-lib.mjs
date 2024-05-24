import crypto from 'crypto';

export const computeHash = (...args) => {
  return crypto.createHash('sha256').update(args.sort().join('')).digest('hex');
};
