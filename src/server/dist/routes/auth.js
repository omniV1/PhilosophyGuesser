"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../validators/auth");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Register new user
router.post('/register', async (req, res) => {
    try {
        const { error } = (0, auth_1.validateRegistrationData)(req.body);
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
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
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
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Login user
router.post('/login', async (req, res) => {
    try {
        const { error } = (0, auth_1.validateLoginData)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: info?.message || 'Authentication failed' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });
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
        })(req, res);
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Get current user
router.get('/me', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map