import { queryStrapi } from "../strapi"

export function getHomeInfo() {
    return queryStrapi("home?populate[0]=sliderItem&populate[1]=sliderItem.sliderBackground&populate[2]=sliderItem&populate[3]=firstCard&populate[4]=thirdCard&populate[5]=contactImage").then(data => data.data)
}