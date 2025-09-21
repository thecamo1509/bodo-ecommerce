import { sendNewsletterEmail } from "@/lib/utils/emails/sendNewsletterEmail"


export async function POST(request: Request) {
    try {
        const { email } = await request.json()
        
        if (!email) {
            return Response.json({ 
                error: "Email is required",
                success: false 
            }, { status: 400 })
        }

        const result = await sendNewsletterEmail(email)

        return Response.json({ 
            success: true, 
            messageId: result.messageId,
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