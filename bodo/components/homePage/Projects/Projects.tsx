import { Button } from "@/components/ui/button"
import styles from "./Projects.module.css"
import Link from "next/link"
import { neueRegrade } from "@/lib/fonts/neueRegrade"
import { cn } from "@/lib/utils/cn"
import { CommonSlider } from "@/app/common/CommonSlider/CommonSlider"
import type { ProjectsProps } from "./Projects.types"
import { getProjectsInfoMin } from "@/lib/utils/strapi/common/projects/get-projects-info-min"

export const Projects = async (props: ProjectsProps) => {
    const {  baseHost } = props
    const projects = await getProjectsInfoMin() || []
    const adaptedProjects = projects.map((project: any) => ({
        title: project.projectName,
        image: project.mainImage.url,
        isActive: true
    }))
    
    console.log("--------->", baseHost)
    return (
        <div className={cn(styles.container, neueRegrade.className)}>
            <h2 className={styles.number}>(02)</h2>
            <Button variant={"outline"} className={styles.button}>
                <Link href="/projects">Our Projects</Link>
            </Button>
            <div>
                <h1 className={styles.title}>Creating experiences through design</h1>
            </div>
            <CommonSlider intervalMs={5000} pauseOnHover={true} baseHost={baseHost} items={adaptedProjects} />
        </div>
    )
}