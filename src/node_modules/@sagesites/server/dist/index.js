"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const passport_1 = require("./config/passport");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const games_1 = __importDefault(require("./routes/games"));
const locations_1 = __importDefault(require("./routes/locations"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, passport_1.configurePassport)(app);
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/games', games_1.default);
app.use('/api/locations', locations_1.default);
// Error handling
app.use(errorHandler_1.errorHandler);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await prisma.$disconnect();
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});
//# sourceMappingURL=index.js.map