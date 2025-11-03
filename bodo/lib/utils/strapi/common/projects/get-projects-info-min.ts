import { queryStrapi } from "../../strapi"

export const getProjectsInfoMin = async () => {
    const projects = await queryStrapi("projects?fields[0]=projectName&fields[1]=projectSlug&populate[2]=mainImage")
    return projects.data
}