import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  displayName: Joi.string().min(2).max(100).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateRegistrationData = (data: any) => {
  return registrationSchema.validate(data);
};

export const validateLoginData = (data: any) => {
  return loginSchema.validate(data);
};

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registrationSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });
  }

  next();
}; 