import { mailtrapClient } from "./mailtrap.config"


export const sendVerificationEmail = async (MdEmail, verificationToken) => {
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
        console.error("Error sending verification.")

        throw new Error(`Error sending verification email: ${ error }`)
    }

}