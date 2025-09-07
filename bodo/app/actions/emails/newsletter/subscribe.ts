"use server"

export const subscribe = async (email: string) => {
    // Usar URL relativa - siempre funciona
    const response = await fetch('/api/emails/newsletter', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    })
    return response.json()
}