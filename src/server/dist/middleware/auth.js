"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const passport_1 = __importDefault(require("passport"));
const authenticateJWT = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user || typeof user === 'boolean') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = {
            id: user.id,
            email: user.email,
            displayName: user.displayName || undefined
        };
        next();
    })(req, res, next);
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.js.map