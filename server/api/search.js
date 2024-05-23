export default defineEventHandler((event)=>{
    const{query} = getQuery(event);
    const config = useRuntimeConfig();
    return $fetch(`${config.apiBaseUrl}/search/movie?query=${query}`, {
        method: 'GET',
        headers:{
            "Authorization": `Vearer ${config.apiKey}`
        }
    })
})