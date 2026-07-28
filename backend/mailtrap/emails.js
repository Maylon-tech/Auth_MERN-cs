import { mailtrapClient, sender } from "../mailtrap/mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

// Email verification functionality
export const sendVerificationEmail = async (email, verificationToken) => {
   const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })
        console.log("Email sent Successfully.", response)
    } catch (error) {
        console.error("Error sending verification.", error)

        throw new Error(`Error sending verification email: ${ error }`)
    }

} 

// Welcome Email functionality
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "f3e1c8b0-4d2a-4b9e-9f5e-1c2b3d4e5f6a", // Replace with your actual template UUID
            template_variables: {
                company_info_name:"Auth Company",
                name: name,
            },
        })
        console.log("Welcome Email sent Successfully.", response)
    } catch (error) {
        console.error("Error sending welcome email.", error)

        throw new Error(`Error sending welcome email: ${ error }`)
    }
}


export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
    } catch (error) {
        console.error(`Error sending password reset email`, error)

        throw new Error(`Error sending password reset email: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email, resetURL) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully.",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        })

        console.log("Password reset email sent successfully", response)

    } catch (error) {
        console.error("Error sending password reset success email", error)

        throw new Error(`Error sending password reset success email: ${error}`)
    }
}