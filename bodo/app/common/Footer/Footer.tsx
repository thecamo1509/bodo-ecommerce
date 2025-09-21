import { neueRegrade } from "@/lib/fonts/neueRegrade"
import { cn } from "@/lib/utils"
import styles from "./Footer.module.css"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
    return(
        <div className={cn(styles.container, neueRegrade.className)}>
            <div className={styles.leftContainer}>
                <Image className={styles.logo} src={"/whiteLogoSecondary.png"} alt="" width={250} height={100}/>
                <h2 className={styles.logoHeadline}><span className={styles.italic}>(in)</span>terior design studio</h2>
                <div className={styles.smallHeadline}>
                    <small>MED - COL</small>
                    <small>EST - 2024</small>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <h4><strong>Office</strong></h4>
                        <h4>Medellin, Colombia</h4>
                    </div>
                    <div className={styles.contactItem}>
                        <h4><strong>Contact</strong></h4>
                        <h4>bododesign@gmail.com</h4>
                    </div>
                </div>
                <div className={styles.navMenu}>
                    <ul className={styles.navList}>
                        <Link href={"/products"} className={styles.menuItem}>
                            <li>Products</li>
                            <ArrowUpRight className={styles.icon}/>
                        </Link>
                        <Link href={"/products"} className={styles.menuItem}>
                            <li>Work</li>
                            <ArrowUpRight className={styles.icon}/>
                        </Link>
                        <Link href={"/products"} className={styles.menuItem}>
                            <li>Studio</li>
                            <ArrowUpRight className={styles.icon}/>
                        </Link>
                        <Link href={"/products"} className={styles.menuItem}>
                            <li>Contact</li>
                            <ArrowUpRight className={styles.icon}/>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}