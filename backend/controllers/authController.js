import User from "../models/authModels"
import bcryptjs from "bcryptjs"


export const SignUp = async (req, res) => {
    const { email, password, name } = req.body
    
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required.")
        }

        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({success: false, message: "User already exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })
        await user.save()

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}



export const Login = async (req, res) => {
    res.send("Login route")
}


export const Logout = async (req, res) => {
    res.send("Logout route")
}