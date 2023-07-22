import { prisma } from "../prismaClient"

type StorageStats = Array<{
  storageStats: {
    size: number
  }
}>

export default class dbController {
  public static getSizeOfDatabase = async () => {
    const userCollection = await prisma.user.aggregateRaw({
      pipeline: [{
        $collStats: { storageStats: { scale: 1 } }
      }]
    }) as unknown as StorageStats
    const postCollection = await prisma.post.aggregateRaw({
      pipeline: [{
        $collStats: { storageStats: { scale: 1 } }
      }]
    }) as unknown as StorageStats
    const categoryCollection = await prisma.category.aggregateRaw({
      pipeline: [{
        $collStats: { storageStats: { scale: 1 } }
      }]
    }) as unknown as StorageStats
    const imageCollection = await prisma.image.aggregateRaw({
      pipeline: [{
        $collStats: { storageStats: { scale: 1 } }
      }]
    }) as unknown as StorageStats
    const sizeOfCategoryCollection = categoryCollection[0]?.storageStats.size || 0;
    const sizeOfPostCollection = postCollection[0]?.storageStats.size || 0
    const sizeOfUserCollection = userCollection[0]?.storageStats.size || 0
    const sizeOfImageCollection = imageCollection[0]?.storageStats.size || 0
    return {
      userCollection: sizeOfUserCollection,
      postCollection: sizeOfPostCollection,
      categoryCollection: sizeOfCategoryCollection,
      imageCollection: sizeOfImageCollection
    }
  }
}