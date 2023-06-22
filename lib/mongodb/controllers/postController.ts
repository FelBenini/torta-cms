import dbConnect from "..";
import Post, { type PostType } from "../models/Post";
import PublishedPosts from "../models/PublishedPosts";
import User from "../models/User";

export class postController {
  public static updatePost = async (id: string, title: string, content: string) => {
    await dbConnect();
    const post = await Post.findById(id)
    if (!post) {
      return null
    }

    post.title = title;
    post.content = content;
    post.updatedAt = Date.now()
    await post.save()
    return post
  }

  public static createPost = async (username: string) => {
    await dbConnect();
    const userPosting = await User.findOne({ username: username }).exec()
    const postDraft: PostType = {
      title: 'Your title here',
      content: '<p>Write your content here</p>',
      postedBy: userPosting.username,
      published: false,
    }
    const post = new Post(postDraft)
    await post.save()
    return post._id
  }

  public static getAllPosts = async (page: number) => {
    await dbConnect();
    const posts = await Post.find()
      .limit(15)
      .skip((page - 1) * 15)
      .populate('postedBy', '-_id -password -email -__v -apiKey')
      .sort('-createdAt')
      .exec()

    const count = await Post.find().count()
    return {
      numOfPosts: count,
      posts: posts
    }
  }

  public static getPublishedPosts = async (page: number, limit: number) => {
    await dbConnect();
    const posts = await PublishedPosts.find({}, '-__v, -createdAt')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort('-publishedAt')
      .lean();

    const count = await PublishedPosts.find().count().exec();
    const numOfPages = Math.ceil(count / 15)
    return {
      number_of_pages: numOfPages,
      number_of_posts: count,
      posts: posts
    }
  }

  public static getOnePostById = async (id: string) => {
    await dbConnect();
    const post = await Post.findById(id).exec();
    if (post) {
      return post;
    }
    return null
  }

  public static publishAPost = async (id: string) => {
    await dbConnect();
    const post = await Post.findById(id).exec()
    if (!post.published) {
      const publishedPost = new PublishedPosts({
        title: post.title,
        content: post.content,
        publishedAt: Date.now(),
        backgroundImage: post?.backgroundImage || null,
        categories: post?.categories || null,
        tags: post?.tags || null,
        summary: post?.summary || null,
        postedBy: post.postedBy,
        draftPost: post._id
      })
      await publishedPost.save()
      post.published = true
      post.publishedAt = Date.now()
      post.publishedPost = publishedPost._id
      await post.save()
      return publishedPost
    }
    const dbPublishedPost = await PublishedPosts.findById(post.publishedPost)
    dbPublishedPost.title = post.title
    dbPublishedPost.content = post.content
    dbPublishedPost.publishedAt = Date.now()
    dbPublishedPost.updatedAt = Date.now()
    dbPublishedPost.backgroundImage = post?.backgroundImage || null
    dbPublishedPost.categories = post?.categories || null
    dbPublishedPost.tags = post?.tags || null
    dbPublishedPost.summary = post?.summary || null
    dbPublishedPost.postedBy = post.postedBy
    dbPublishedPost.draftPost = post._id
    await dbPublishedPost.save()
    post.published = true
    post.publishedAt = Date.now()
    await post.save()
    return dbPublishedPost
  }
}