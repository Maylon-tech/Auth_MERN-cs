import mongoose from 'mongoose'


const authSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email:  {
            Type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true        
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    { timestamps: true }
)

const User = mongoose.model("User", authSchema)

export default User