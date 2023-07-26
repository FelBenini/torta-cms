import { prisma } from "../prismaClient"

type ResultSize = Array<{
  table_size_bytes: string
}>

function parseToNumber(str: string) {
  const type = str.split(' ')[1]
  let multiplier: number = 1;
  if (type === 'kb') {
    multiplier = 1
  }  else if (type === 'mB') {
    multiplier = 1000
  } else if (type === 'gB') {
    multiplier = 1000000
  } else if (type === 'tB') {
    multiplier = 1000000000
  }
  const num = str.replace(' kB', '').replace(' mB', '').replace(' gB', '').replace('tB', '')
  return parseInt(num) * multiplier
}

export default class dbController {
  public static getSizeOfDatabase = async () => {
    const userCollection = await prisma.$queryRaw`SELECT pg_size_pretty(pg_total_relation_size('"User"')) AS table_size_bytes` as ResultSize
    console.log(parseToNumber(userCollection[0].table_size_bytes))
    const postCollection = await prisma.$queryRaw`SELECT pg_size_pretty(pg_total_relation_size('"Post"')) AS table_size_bytes` as ResultSize
    const categoryCollection = await prisma.$queryRaw`SELECT pg_size_pretty(pg_total_relation_size('"Category"')) AS table_size_bytes` as ResultSize
    const imageCollection = await prisma.$queryRaw`SELECT pg_size_pretty(pg_total_relation_size('"Image"')) AS table_size_bytes` as ResultSize
    const sizeOfCategoryCollection = categoryCollection[0].table_size_bytes
    const sizeOfPostCollection = postCollection[0].table_size_bytes
    const sizeOfUserCollection = userCollection[0].table_size_bytes
    const sizeOfImageCollection = imageCollection[0].table_size_bytes
    return {
      userCollection: parseToNumber(sizeOfUserCollection),
      postCollection: parseToNumber(sizeOfPostCollection),
      categoryCollection: parseToNumber(sizeOfCategoryCollection),
      imageCollection: parseToNumber(sizeOfImageCollection)
    }
  }
}