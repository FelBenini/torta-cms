import { prisma } from '../prismaClient'

export default class PostController {
  public static updatePost = async (id: number, title: string, content: string) => {
    const post = await prisma.post.update({
      where: { id: id },
      data: {
        title: title,
        content: content,
        updatedAt: new Date(Date.now())
      }
    })
    return post
  }

  public static createPost = async (username: string, type: string) => {
    const userPosting = await prisma.user.findFirst({ where: { username: username } })
    if (!userPosting) {
      return
    }
    const post = await prisma.post.create({
      data: {
        title: 'Your title here',
        content: '# Write your content here',
        postedBy: userPosting?.username,
        published: false,
        type: type
      }
    })
    return post.id
  }

  public static getAllPosts = async (page: number) => {
    const posts = await prisma.post.findMany({
      take: 15,
      skip: (page - 1) * 15,
      orderBy: [{ createdAt: 'desc' }],
      where: {
        NOT: {
          type: 'page'
        }
      }
    })
    const count = await prisma.post.count({
      where: {
        NOT: {
          type: 'page'
        }
      }
    })
    return {
      numOfPosts: count,
      posts: posts
    }
  }

  public static getPublishedPosts = async (page: number, limit: number, sort: 'desc' | 'asc' = 'desc', type: 'post' | 'page') => {
    const posts = await prisma.publishedPost.findMany({
      where: {
        type: type
      },
      orderBy: [
        { createdAt: sort }
      ],
      take: limit,
      skip: (page - 1) * limit
    })
    const count = await prisma.publishedPost.count({
      where: {
        type: type
      }
    })
    const numOfPages = Math.ceil(count / 15)
    return {
      number_of_pages: numOfPages,
      number_of_posts: count,
      posts: posts
    }
  }

  public static updateSummary = async (id: number, summary: string) => {
    if (summary === '') {
      return
    }
    const post = await prisma.post.update({
      where: {
        id: id
      },
      data: {
        summary: summary
      }
    })
    return post.summary
  }

  public static getOnePostById = async (id: number) => {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
        NOT: {
          type: 'page'
        }
      }
    })
    if (post) {
      return post
    }
    return null
  }

  public static updateTags = async (id: string, initialTags: Array<string>) => {
    if (initialTags.length <= 0) {
      return null
    }
    const tags: string = initialTags.filter(tag => tag !== null).filter(tag => tag !== '').join(', ')
    let tagsToUpdate: string | null = tags
    if (tags === '' || tags === ', ') {
      tagsToUpdate = null
    }
    const post = await prisma.post.update({
      where: {
        id: parseInt(id)
      },
      data: {
        tags: tagsToUpdate
      }
    })
    return post.tags
  }

  public static publishAPost = async (id: number) => {
    const searchTitle = (title: string): string => {
      return title.replaceAll('-', '').replaceAll(' ', '-')
    }
    const post = await prisma.post.findFirst({
      where: { id: id }
    })
    if (!post) {
      return
    }
    if (!post?.published) {
      const publishedPost = await prisma.publishedPost.create({
        data: {
          title: post.title,
          content: post.content,
          searchTitle: searchTitle(post.title),
          publishedAt: new Date(Date.now()),
          published: true,
          backgroundImage: post?.backgroundImage || null,
          categories: post?.categories || ' ',
          tags: post?.tags || ' ',
          summary: post?.summary || null,
          postedBy: post.postedBy,
          draftPost: post.id,
          type: post.type
        }
      })
      await prisma.post.update({
        where: {
          id: id
        },
        data: {
          published: true,
          publishedAt: new Date(Date.now()),
          publishedPost: publishedPost.id
        }
      })
      return publishedPost
    }
    if (!post.publishedPost) {
      return
    }
    const publishedPost = await prisma.publishedPost.update({
      where: {
        id: post.publishedPost
      },
      data: {
        title: post.title,
        content: post.content,
        updatedAt: new Date(Date.now()),
        published: true,
        backgroundImage: post?.backgroundImage || null,
        categories: post?.categories || ' ',
        tags: post?.tags || ' ',
        summary: post?.summary || null,
        postedBy: post.postedBy,
        draftPost: post.id,
        type: post.type
      }
    })
    return publishedPost
  }

  public static searchForPublishedPosts = async (query: string, page: number, limit: number, type: 'post' | 'page') => {
    const whereQuery = {
      OR: [{
        title: {
          contains: query
        }
      },
      {
        content: {
          contains: query
        }
      }],
      type: type
    }
    const posts = await prisma.publishedPost.findMany({
      where: whereQuery,
      take: limit,
      skip: (page - 1) * limit
    })
    const count = await prisma.publishedPost.count({where: whereQuery})
    const numOfPages = Math.ceil(count / 15)
    return {
      number_of_pages: numOfPages,
      number_of_posts: count,
      posts: posts
    }
  }
}
