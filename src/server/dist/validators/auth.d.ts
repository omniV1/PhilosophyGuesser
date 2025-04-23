import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
export declare const validateRegistrationData: (data: any) => Joi.ValidationResult<any>;
export declare const validateLoginData: (data: any) => Joi.ValidationResult<any>;
export declare const validateRegistration: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateLogin: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
