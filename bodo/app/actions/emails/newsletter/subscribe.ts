"use server"

export const subscribe = async (email: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/emails/newsletter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    })
    return response.json()
}