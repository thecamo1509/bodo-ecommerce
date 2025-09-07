import { Resend } from "resend"
import { WelcomeNewsletter } from "@/components/emailTemplates/newsLetter/welcomeNewsletter"

export async function sendNewsletterEmail(email: string) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured")
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const { data, error } = await resend.emails.send({
        from: "Bodo <no-reply@newsletter.bodo.com.co>",
        to: email,
        subject: "Welcome to the Bodo Family! 🚀 (Early Access)",
        html: WelcomeNewsletter({ email }),
    })

    if (error) {
        throw new Error(`Failed to send email: ${error.message}`)
    }

    return { success: true, messageId: data?.id }
}