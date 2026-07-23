import { MailtrapClient } from "mailtrap"
import dotenv from "dotenv"

dotenv.config()

export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.co", // ONLY send Email to yourself - same as the mailtrap account logged.
  name: "NemotoDev",
}



// const recipients = [
//   {
//     email: "minatokiroisen77@gmail.com",  // Destination email address
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome! Keep doing your best,",
//     text: "Congrats for sending test email with Mailtrap! by NemotoDev",
//     category: "Integration Test for small MERN project",
//   })
//   .then(console.log, console.error);