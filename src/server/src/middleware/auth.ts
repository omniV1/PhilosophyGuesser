import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    displayName?: string;
  };
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error | null, user: User | false | null, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user || typeof user === 'boolean') {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      (req as AuthenticatedRequest).user = {
        id: user.id,
        email: user.email,
        displayName: user.displayName || undefined
      };
      next();
    }
  )(req, res, next);
}; 