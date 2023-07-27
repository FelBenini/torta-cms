export function splitString(string: string) {
  const array = string.split(', ')
  return array.filter((string) => string !== null).filter((string) => string !== '').filter((string) => string !== ' ')
}