"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Get active game session
router.get('/active', auth_1.authenticateJWT, async (req, res) => {
    const authenticatedReq = req;
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
    }
    catch (error) {
        console.error('Error fetching active game:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=games.js.map