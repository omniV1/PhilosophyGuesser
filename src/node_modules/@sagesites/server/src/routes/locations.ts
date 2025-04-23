import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest, authenticateJWT } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all locations
router.get('/', async (req: Request, res: Response) => {
  try {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        description: true,
      },
    });

    res.json({ data: { locations } });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; 