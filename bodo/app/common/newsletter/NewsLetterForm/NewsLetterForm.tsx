"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "./NewsLetterForm.type"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./NewsLetterForm.module.css"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { subscribe } from "@/app/actions/emails/newsletter/subscribe"

export const NewsLetterForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await subscribe(data.email)
            if(response.success){
                toast.success("Thank you for subscribing!", {
                    description: "You will receive an email with the newsletter",
                })
                form.reset()
            } else {
                toast.error("Failed to send email", {
                    description: response.error || "Please try again",
                })
            }
        } catch (error) {
            console.error("Newsletter subscription error:", error)
            toast.error("Something went wrong", {
                description: "Please try again later",
            })
        }
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.container}>
            <FormField control={form.control} name="email" render={({field}) => (
                <FormItem className={styles.formItem}>
                    <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className={styles.formMessage} />
                </FormItem>
            )} />
        <Button className={styles.button} variant="outline" type="submit">Submit</Button>
        </form>
    </Form>
}