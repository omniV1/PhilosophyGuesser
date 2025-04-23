import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        email: string;
        displayName?: string;
    };
}
export declare const authenticateJWT: (req: Request, res: Response, next: NextFunction) => void;
