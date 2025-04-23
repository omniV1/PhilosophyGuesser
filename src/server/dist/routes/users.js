"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const prisma_1 = require("../config/prisma");
const router = (0, express_1.Router)();
// Get current user's profile
const getCurrentUser = async (req, res) => {
    const authenticatedReq = req;
    try {
        const user = await prisma_1.prisma.user.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Update user profile
const updateUser = async (req, res) => {
    const authenticatedReq = req;
    const { displayName } = req.body;
    try {
        const updatedUser = await prisma_1.prisma.user.update({
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
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
router.get('/me', auth_1.authenticateJWT, getCurrentUser);
router.patch('/me', auth_1.authenticateJWT, updateUser);
exports.default = router;
//# sourceMappingURL=users.js.map