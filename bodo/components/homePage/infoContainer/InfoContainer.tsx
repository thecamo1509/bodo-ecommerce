import styles from "./InfoContainer.module.css"
import { cn } from "@/lib/utils"
import { neueRegrade } from "@/lib/fonts/neueRegrade"
import { ArrowRight } from "lucide-react"
import { InfoContainerProps } from "./InfoContainer.types"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"


export const InfoContainer = ({ cardInfo }: InfoContainerProps) => {
    const title = cardInfo.cardTitle
    const description = cardInfo.cardDescription
    return (
        <div className={cn(styles.container, neueRegrade.className)}>
            <div className={styles.content}>
                <div className={styles.leftContainer}>
                    <h2>(01)</h2>
                    <div className={styles.leftAction}>
                        <h2>{cardInfo.cardTitle}</h2>
                        <ArrowRight />
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <BlocksRenderer content={description} />
                </div>
            </div>
        </div>
    )
}
