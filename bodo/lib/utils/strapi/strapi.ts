const { STRAPI_HOST, STRAPI_TOKEN } = process.env

export function queryStrapi(url:string) {
    return fetch(`${STRAPI_HOST}/api/${url}`, {
        headers: {
            "Authorization": `Bearer ${STRAPI_TOKEN}`
        }
    }).then(res => res.json())
}