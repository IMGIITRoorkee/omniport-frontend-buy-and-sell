export function getExcerpt(str, letters) {
    let response = str.split('').slice(0, letters).join('');
    if (str.length > response.length)
        response += '...'
    return response
}
export function formatDate(date) {
    let datef = new Date(date).toDateString()
    datef = datef.split(' ')
    return `${datef[1]} ${datef[2]}, ${datef[3]}`
}