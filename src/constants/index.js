export * from './urls'
export * from './categories'
export * from './action-types'
export * from './utils'

export const sortOptions = [
  {
    text: 'Latest',
    value: 'latest',
    content: 'Latest'
  },
  {
    text: 'Price: Low to High',
    value: 'price: low to high',
    content: 'Price: Low to High'
  },
  {
    text: 'Price: High to Low',
    value: 'price: high to low',
    content: 'Price: High to Low'
  }
]

export function stringifyNumber (n) {
  const year = ['Zeroth', 'I', 'II', 'III', 'IV']
  return year[n]
}
