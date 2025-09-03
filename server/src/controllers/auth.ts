import { Response, Request } from "express";
import { User } from "../models/User";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken } from "../middleware/auth";
import { StatusCodes } from "http-status-codes";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

type RegisterUser = {
    name: string;
    email: string;
    password: string
}

type LoginUser = {
    password: string;
    email: string;
}

export const register = async(req: Request, res: Response) => {
    const { name, email, password } = req.body as RegisterUser

    try {
        const existUser = await User.findOne({ email })
        if(existUser) {
            return res.status(StatusCodes.CONFLICT).json({
                error: 'Email already in use'
            })
        }

        const passwordHash = await hashPassword(password);
        const user = await User.create({ name, email, password: passwordHash })
        const token = signToken({userId: user._id.toString()})
        res.status(StatusCodes.CREATED).json({
            token,
            user: user
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error
        })
    }
}


export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body as LoginUser

    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: 'Invalid credentials'
            })
        }

        const compareUserPassword = await comparePassword(password, user.password!)
        if(!compareUserPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: 'Invalid credentials'
            })
        }

        const token  = signToken({userId: user._id.toString()})
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        })
        .json({user: { name: user.name, email: user.email, _id: user._id}})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    console.log('server', res.clearCookie(env.COOKIE_NAME))
    res.clearCookie(env.COOKIE_NAME)
    res.clearCookie(env.COOKIE_NAME, {
        httpOnly: true,
        secure: true,
        sameSite: "strict" as const,
        path: "/",
        maxAge: 0,
        expires: new Date(0)
    })
    res.cookie(env.COOKIE_NAME, "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.end()
}

export const isUserLogin = async (req: Request, res: Response) => {
    const token = req.cookies?.[env.COOKIE_NAME]
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ ok: false });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select("_id name email");
    if(!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ ok: false });
    }

    res.json({ _id: user._id, name: user.name, email: user.email });
}

export const me = async (req: Request, res: Response) => {
    const userId = req.userId
    if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized"})
    }

    try {
        const user = await User.findById(userId).select("_id name email")
        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({error: "User Not Found"})
        }
        res.status(StatusCodes.OK).json({_id: user._id, name: user.name, email: user.email})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

export const updateMe = async (req: Request, res: Response) => {
    const userId = req.userId
    const {name, email} = req.body
    const updates: any = {}

    if(!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized'})
    }

    try {
        if(email) {
            const isEmailExists = await User.findOne({email: email, _id: {$ne: userId}})
            if(isEmailExists) {
                return res.status(StatusCodes.CONFLICT).json({ error: "Email already in use"})
            }
        }
        const user = await User.findByIdAndUpdate(userId, {name, email}, {new: true}).select("_id name email")
        res.status(StatusCodes.OK).json(user)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error})
    }
}

export const changePassword = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    if(!changePassword || !newPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing fields" })
    }

    try {
        const user = await User.findById(userId)
        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" })
        }

        const isPasswordMuch = await comparePassword(currentPassword, user.password!)
        if(!isPasswordMuch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Current password is incorrect" })
        }
        user.password = await hashPassword(newPassword)
        await user.save()
        res.status(StatusCodes.OK).json({ok: true})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}