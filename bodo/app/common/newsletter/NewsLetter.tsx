
import styles from "./NewsLetter.module.css"
import { neueRegrade } from "@/lib/fonts/neueRegrade"
import { cn } from "@/lib/utils/cn"
import { NewsLetterForm } from "./NewsLetterForm/NewsLetterForm"

export const NewsLetter = () => {
    return (
        <div className={styles.container}>
            <h2 className={cn(styles.subtitle, neueRegrade.className)}>Subscribe</h2>
            <NewsLetterForm />
        </div>
    )}