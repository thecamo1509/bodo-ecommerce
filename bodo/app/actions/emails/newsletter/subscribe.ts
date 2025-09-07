"use server"

import { sendNewsletterEmail } from "@/lib/utils/emails/sendNewsletterEmail"
export const subscribe = async (email: string) => {
    try {
        const result = await sendNewsletterEmail(email)
        return { 
            success: true, 
            messageId: result.messageId,
            message: "Welcome email sent successfully" 
        }
    } catch (error) {
        console.error("Newsletter subscription error:", error)
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to send email"
        }
    }
}