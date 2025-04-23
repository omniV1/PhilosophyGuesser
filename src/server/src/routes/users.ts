import { Router, Response, Request, RequestHandler } from 'express';
import { AuthenticatedRequest, authenticateJWT } from '../middleware/auth';
import { prisma } from '../config/prisma';

const router = Router();

// Get current user's profile
const getCurrentUser: RequestHandler = async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;
  try {
    const user = await prisma.user.findUnique({
      where: { id: authenticatedReq.user.id },
      select: {
        id: true,
        email: true,
        displayName: true,
        createdAt: true,
        lastLogin: true,
        isVerified: true,
        role: true,
        gameSessions: {
          select: {
            totalScore: true,
            status: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate game statistics
    const gameStats = {
      gamesPlayed: user.gameSessions.length,
      totalScore: user.gameSessions.reduce((sum, session) => sum + session.totalScore, 0),
      completedGames: user.gameSessions.filter(session => session.status === 'completed').length,
    };

    res.json({
      data: {
        user: {
          ...user,
          gameSessions: undefined, // Remove raw game sessions from response
          stats: gameStats,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user profile
const updateUser: RequestHandler = async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;
  const { displayName } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: authenticatedReq.user.id },
      data: { displayName },
      select: {
        id: true,
        email: true,
        displayName: true,
        createdAt: true,
        lastLogin: true,
        isVerified: true,
        role: true,
      },
    });

    res.json({ data: { user: updatedUser } });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.get('/me', authenticateJWT, getCurrentUser);
router.patch('/me', authenticateJWT, updateUser);

export default router; 