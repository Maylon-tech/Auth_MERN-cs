import bcryptjs from "bcryptjs"
import crypto from 'crypto'

import User from "../models/authModels.js"

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail } from "../mailtrap/emails.js"


export const SignUp = async (req, res) => {
    const { email, password, name } = req.body
    
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required.")
        }

        const userAlreadyExists = await User.findOne({ email })
        console.log("userAlreadyExist", userAlreadyExists)
        if (userAlreadyExists) {
            return res.status(400).json({success: false, message: "User already exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        // JWT
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })
        await user.save()
        generateTokenAndSetCookie(res, user._id)

        // Send Verification Email
        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json(({ success: false, message: "Invalid Credentials" }))
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json(({ success: false, message: "Invalid Credentials" }))
        }
        generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            success: true,
            message: "Logged in Successfully.",
            user: {
                ...user._id,
                password: undefined,
            },
        })

    } catch (error) {
        console.log("Error in Login", error)
        res.status(400).json(({ success: false, message: error.message }))
    }
}

export const Logout = async (req, res) => {
    res.clearCookie("token")

    res.status(200).json({ success: true, message: "Logged out successfully" })
}


export const verifyEmail = async (req, res) => {
    // VEr_code ****** = 123456
    const { code } = req.body

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code."})
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        await sendWelcomeEmail(user.email, user.name)

        res.status(200).json({
            success: true,
            message: "Email verified successfully. Welcome email sent.",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {   
        console.log("Error Verifying Email", error)
        res.status(400).json(({ success: false, message: error.message }))
    }

}

export const forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found.!" })
        }

        // Generate Reset Token
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000  // 24 hours

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email.",
        })

    } catch (error) {   
        console.log("Error in ForgotPassword", error)
        res.status(400).json(({ success: false, message: error.message }))
    }

}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body
        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" })
        }

        // update password
        const hashedPassword = await bcryptjs.hash(password, 10)
        
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save()

        await sendResetSuccessEmail(user.email)

        res.status(200).json({ success: true, message: "Password reset successfully"})
    } catch (error) {
        console.log("Error in resetPassword", error)
        res.status(400).json({ success: false, message: error.message })
    }
}
 