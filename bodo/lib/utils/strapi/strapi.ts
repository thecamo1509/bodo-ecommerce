const { STRAPI_HOST, STRAPI_TOKEN } = process.env

export function queryStrapi(url:string) {
    // Check if STRAPI_HOST is defined
    if (!STRAPI_HOST) {
        console.warn(`STRAPI_HOST is not defined, using fallback data for: ${url}`);
        // Return appropriate default structure based on the endpoint
        if (url.includes('projects')) {
            return Promise.resolve({ data: [] });
        }
        // Default for home page
        return Promise.resolve({
            data: {
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
        });
    }

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
                    cardTitle: 'Welcome', 
                    cardDescription: [{ type: 'paragraph', children: [{ text: 'Content loading...', type: 'text' }] }]
                },
                thirdCard: { 
                    cardTitle: 'Contact', 
                    cardDescription: [{ type: 'paragraph', children: [{ text: 'Get in touch', type: 'text' }] }]
                },
                contactImage: { url: '' }
            }
        };
    })
}
