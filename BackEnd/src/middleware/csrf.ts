import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt';
import config from 'config';

export const csrfCheck = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.method === 'GET' ||
    req.method === 'OPTIONS' ||
    req.method === 'HEAD'
  ) {
    return next();
  }

  const csrfHeader = req.get('_csrf-token');

  if (!csrfHeader) {
    console.warn('Missing required "_csrf-token" header.', req.headers.origin);
    return res.status(403).json({ message: 'Failed CSRF check' });
  }

  validateCsrfToken(csrfHeader)
    .then((valid) => {
      if (!valid) {
        console.warn(
          'Value provided in "_csrf-token" header does not validate.',
          req.headers.origin,
          csrfHeader
        );
        return res.status(403).json({ message: 'Failed CSRF check' });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    });
};

async function validateCsrfToken(csrfHeader: string) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
