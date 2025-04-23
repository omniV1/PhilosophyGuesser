"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegistration = exports.validateLoginData = exports.validateRegistrationData = void 0;
const joi_1 = __importDefault(require("joi"));
const registrationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
    displayName: joi_1.default.string().min(2).max(100).optional(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const validateRegistrationData = (data) => {
    return registrationSchema.validate(data);
};
exports.validateRegistrationData = validateRegistrationData;
const validateLoginData = (data) => {
    return loginSchema.validate(data);
};
exports.validateLoginData = validateLoginData;
const validateRegistration = (req, res, next) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: error.details[0].message,
        });
    }
    next();
};
exports.validateRegistration = validateRegistration;
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: error.details[0].message,
        });
    }
    next();
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=auth.js.map