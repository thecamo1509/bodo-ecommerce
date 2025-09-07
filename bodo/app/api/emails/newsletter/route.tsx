import { Resend } from "resend"
import { WelcomeNewsletter } from "@/components/emailTemplates/newsLetter/welcomeNewsletter"

export async function POST(request: Request) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not configured")
            return Response.json({ 
                error: "Email service not configured",
                success: false 
            }, { status: 500 })
        }

        const resend = new Resend(process.env.RESEND_API_KEY)
        
        const { email } = await request.json()
        
        if (!email) {
            return Response.json({ 
                error: "Email is required",
                success: false 
            }, { status: 400 })
        }

        console.log("Attempting to send email to:", email)

        const { data, error } = await resend.emails.send({
            from: "Bodo <no-reply@newsletter.bodo.com.co>", // Using default Resend domain for testing
            to: email,
            subject: "Welcome to the Bodo Family! 🚀 (Early Access)",
            html: WelcomeNewsletter({ email }),
        })

        if (error) {
            console.error("Resend error:", error)
            return Response.json({ 
                error: "Failed to send email",
                details: error.message || "Unknown error",
                success: false 
            }, { status: 500 })
        }

        console.log("Email sent successfully:", data?.id)

        return Response.json({ 
            success: true, 
            messageId: data?.id,
            message: "Welcome email sent successfully" 
        })
    } catch (error) {
        console.error("API error:", error)
        return Response.json({ 
            error: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error",
            success: false 
        }, { status: 500 })
    }
}