import { queryStrapi } from "../strapi"

export function getHomeInfo() {
    return queryStrapi("home?populate[0]=sliderItem&populate[1]=sliderItem.sliderBackground&populate[2]=sliderItem&populate[3]=firstCard&populate[4]=thirdCard&populate[5]=contactImage")
        .then(data => {
            // Handle both successful API response and fallback data
            return data?.data || data || {
                sliderItem: [],
                firstCard: { 
                    cardTitle: 'Welcome', 
                    cardDescription: [{ type: 'paragraph', children: [{ text: 'Content loading...', type: 'text' }] }]
                },
                thirdCard: { 
                    cardTitle: 'Contact', 
                    cardDescription: [{ type: 'paragraph', children: [{ text: 'Get in touch', type: 'text' }] }]
                },
                contactImage: { url: '' }
            }
        })
}
