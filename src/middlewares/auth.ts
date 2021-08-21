import { Request, Response, NextFunction } from "express";
import * as sessionService from "../services/sessionService";

export async function authenticateToken(req: Request, res: Response, next: NextFunction ) {
    const token: string = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.sendStatus(401);
    const session = await sessionService.authSession(token);
    if (session === null) return res.sendStatus(401);
    res.locals.session = session;
    next();
}