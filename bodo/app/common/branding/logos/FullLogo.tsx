"use client"
import Image from "next/image"
import { FullLogoProps } from "./FullLogo.type"
import styles from "./FullLogo.module.css"
import {cn} from '@/lib/utils/cn'
import {motion } from "motion/react"

export const FullLogo = (props: FullLogoProps) => {
    const { align = "center" } = props;
    return (
        <div className={cn(styles.container, styles[align])}>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
            <Image src="/whiteLogo.png" alt="Full Logo" width={120} height={120} />
            </motion.div>
        </div>
    )
}