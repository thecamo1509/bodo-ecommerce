import { Resend } from "resend"
import { WelcomeNewsletter } from "@/components/emailTemplates/newsLetter/welcomeNewsletter"


export async function POST(request: Request) {
    try {
        // Debug específico para Dockploy
        console.log("=== DOCKPLOY ENVIRONMENT DEBUG ===")
        console.log("Node environment:", process.env.NODE_ENV)
        console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
        console.log("RESEND_API_KEY length:", process.env.RESEND_API_KEY?.length || 0)
        console.log("RESEND_API_KEY first 10 chars:", process.env.RESEND_API_KEY?.substring(0, 10) || "undefined")
        
        // Verificar todas las variables que contengan "RESEND"
        const resendVars = Object.keys(process.env).filter(key => 
            key.toUpperCase().includes('RESEND')
        )
        console.log("All RESEND-related env vars:", resendVars)
        
        // Verificar si hay variables con nombres similares
        const allEnvKeys = Object.keys(process.env).sort()
        console.log("All environment variables:", allEnvKeys)
        
        if (!process.env.RESEND_API_KEY) {
            console.error("❌ RESEND_API_KEY is not configured")
            console.error("Available RESEND vars:", resendVars)
            return Response.json({ 
                error: "Email service not configured - RESEND_API_KEY missing",
                debug: {
                    hasResendKey: !!process.env.RESEND_API_KEY,
                    resendVars: resendVars,
                    nodeEnv: process.env.NODE_ENV
                },
                success: false 
            }, { status: 500 })
        }

        console.log("✅ RESEND_API_KEY found, initializing Resend...")
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
            from: "Bodo <no-reply@newsletter.bodo.com.co>",
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