import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type JWTPayload = { userId: string };

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
  }

export const signToken = (payload: JWTPayload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1d' });
}


export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.[env.COOKIE_NAME];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}
