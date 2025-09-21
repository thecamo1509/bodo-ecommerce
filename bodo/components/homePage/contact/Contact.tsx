import { cn } from "@/lib/utils"
import { neueRegrade } from "@/lib/fonts/neueRegrade"
import styles from "./Contact.module.css"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

export const Contact = (props: {cardTitle:string, cardDescription:any,cardImageUrl:string, baseHost:string}) => {
    const {cardTitle, cardDescription, cardImageUrl,baseHost} = props
    const imageUrl = baseHost + cardImageUrl

    return (
        <div className={cn(styles.container, neueRegrade.className)}>
            <div className={styles.actionContainer}>
                <div className={styles.actionTop}>
                    <h2>(03)</h2>
                    <div className={styles.actionLink}>
                        <h2>{cardTitle}</h2>
                        <ArrowRight />
                    </div>
                </div>
                <div className={styles.actionBottom}>
                    <h1 className={styles.title}><BlocksRenderer content={cardDescription}></BlocksRenderer> </h1>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <Image className={styles.image} src={imageUrl} alt="Contact" width={500} height={500} />
            </div>
        </div>
    )
}