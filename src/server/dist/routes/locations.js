"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Get all locations
router.get('/', async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=locations.js.map