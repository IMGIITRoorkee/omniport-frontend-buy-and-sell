export function getExcerpt(str, words) {
    let response = str.split(/\s+/).slice(0, words).join(" ");
    if (str.length > response.length)
        response += '...'
    return response
}
export function formatDate(date) {
    let datef = new Date(date).toDateString()
    return datef.split(' ').slice(1).join(' ')
}