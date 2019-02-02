export function getExcerpt (str, letters, dot = true) {
  let response = str
    .split('')
    .slice(0, letters)
    .join('')
  if (str.length > response.length) {
    if (dot) {
      response += '...'
    }
  }
  return response
}
export function formatDate (date) {
  let datef = new Date(date).toDateString()
  datef = datef.split(' ')
  return `${datef[1]} ${datef[2]}, ${datef[3]}`
}
