const { STRAPI_HOST, STRAPI_TOKEN } = process.env

export function queryStrapi(url:string) {
    return fetch(`${STRAPI_HOST}/api/${url}`, {
        headers: {
            "Authorization": `Bearer ${STRAPI_TOKEN}`
        }
    }).then(res => res.json()).catch(error => {
        console.warn(`Failed to fetch from Strapi (${url}): ${error.message}`);
        // Return appropriate default structure based on the endpoint
        if (url.includes('projects')) {
            return { data: [] };
        }
        // Default for home page
        return {
            data: {
                sliderItem: [],
                firstCard: { 
                    cardTitle: 'Default Title', 
                    cardDescription: [{ type: 'paragraph', children: [{ text: 'Default Description', type: 'text' }] }]
                },
                thirdCard: { 
                    cardTitle: 'Default Title', 
                    cardDescription: [{ type: 'paragraph', children: [{ text: 'Default Description', type: 'text' }] }]
                },
                contactImage: { url: '' }
            }
        };
    })
}
