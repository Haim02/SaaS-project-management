import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";
import { User } from "../models/User";
import { signToken } from "../middleware/auth";
import { StatusCodes } from "http-status-codes";

const client = new OAuth2Client({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    redirectUri: env.GOOGLE_REDIRECT_URI,
});


export const googleLogin = async (req: Request, res: Response) => {
    const url = client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["googleId", "email", "profile"],
    })
    return res.redirect(url)
}

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string | undefined;
        if(!code) {
            return res.redirect("/login?error=google")
        }

        const { tokens } = await client.getToken(code)
        const idToken = tokens.id_token
        if (!idToken) {
            return res.redirect("/")
        }

        const ticket = await client.verifyIdToken({
            idToken,
            audience: env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()
        if(!payload?.email) {
            return res.redirect("http://localhost:5173/login?error=google")
        }

        const email = payload.email.toLowerCase();
        const name = payload.name || email.split("@")[0];
        const googleId = payload.sub;

        let user = await User.findOne({email})
        if(!user) {
            user = await User.create({
                name,
                email,
                googleId,
                provider: "google",
            })
        } else if (!user.googleId) {
            user.googleId = googleId;
            user.provider = user.provider ?? "local";
            await user.save();
        }

                const token  = signToken({userId: user._id.toString()})
                res.cookie('access_token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60 * 1000,
                })
        res.json({ user: { name: user.name, email: user.email, _id: user._id } }).redirect("http://localhost:5173/")
    } catch (error) {

    }
}

export const googleStatus = async (req: Request, res: Response) => {
    if(!req.cookies?.[env.COOKIE_NAME]){
        return res.status(StatusCodes.UNAUTHORIZED).json({ok: false})
    }
    return res.json({ok: true})
}