import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest, authenticateJWT } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Create new game session
router.post('/', authenticateJWT, async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;
  try {
    // Get a random location set
    const locationSet = await prisma.locationSet.findFirst({
      where: {
        // You can add conditions here to filter sets based on difficulty, etc.
      },
      include: {
        locations: {
          include: {
            location: {
              include: {
                images: true
              }
            }
          }
        }
      }
    });

    if (!locationSet) {
      return res.status(404).json({ message: 'No location sets available' });
    }

    // Create a new game session
    const gameSession = await prisma.gameSession.create({
      data: {
        userId: authenticatedReq.user.id,
        setId: locationSet.id,
        status: 'active',
        difficulty: 'normal', // You can make this configurable
      },
      include: {
        set: {
          include: {
            locations: {
              include: {
                location: {
                  include: {
                    images: true
                  }
                }
              }
            }
          }
        }
      }
    });

    res.json({ 
      data: {
        id: gameSession.id,
        currentLocation: locationSet.locations[0]?.location || null,
        score: 0,
        hintsUsed: 0,
        guessesRemaining: locationSet.locations.length,
        status: 'active'
      } 
    });
  } catch (error) {
    console.error('Error creating game session:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get active game session
router.get('/active', authenticateJWT, async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;
  try {
    const activeGame = await prisma.gameSession.findFirst({
      where: {
        userId: authenticatedReq.user.id,
        status: 'active',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
          },
        },
      },
    });

    if (!activeGame) {
      return res.status(404).json({ message: 'No active game session found' });
    }

    res.json({ data: { game: activeGame } });
  } catch (error) {
    console.error('Error fetching active game:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; 