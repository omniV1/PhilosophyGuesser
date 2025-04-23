import { Router, Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { validateRegistrationData, validateLoginData } from '../validators/auth';

const router = Router();
const prisma = new PrismaClient();

// Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { error } = validateRegistrationData(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, displayName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        displayName,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        createdAt: true,
        role: true,
      },
    });

    res.status(201).json({ data: { user } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { error } = validateLoginData(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    passport.authenticate(
      'local',
      { session: false },
      (err: Error | null, user: User | false | null, info: { message: string }) => {
        if (err || !user) {
          return res.status(401).json({ message: info?.message || 'Authentication failed' });
        }

        const token = jwt.sign(
          { sub: user.id },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '1d' }
        );

        res.json({
          data: {
            token,
            user: {
              id: user.id,
              email: user.email,
              displayName: user.displayName,
              role: user.role,
            },
          },
        });
      }
    )(req, res);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  }
);

export default router; 