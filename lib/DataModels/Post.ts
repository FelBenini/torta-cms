import { Prisma } from "@prisma/client";
import { splitString } from "./splitString";

interface PostType extends Prisma.PostCreateInput {
  id: number
}

interface PublishedPostType extends Prisma.PublishedPostCreateInput {
  id: number
}

export class Post {
  id: number;
  title: string;
  content: string;
  tags?: Array<string> | undefined;
  categories?: Array<string> | undefined;
  type?: string | null | undefined;
  published: boolean;
  publishedAt?: string | Date | null | undefined;
  publishedPost?: number | null | undefined;
  updatedAt?: string | Date | null | undefined;
  postedBy: string;
  summary?: string | null | undefined;
  createdAt?: string | Date | null | undefined;
  backgroundImage?: string | null | undefined;
  constructor(post: PostType) {
    this.id = post.id;
    this.title = post.title
    this.postedBy = post.postedBy
    this.summary = post.summary
    this.createdAt = post.createdAt
    this.backgroundImage = post.backgroundImage
    this.content = post.content
    this.tags = post.tags?.split(', ')
    this.categories = post.categories?.split(', ')
    this.type = post.type
    this.published = post.published
    this.publishedAt = post.publishedAt
    this.publishedPost = post.publishedPost
  }
}

export class PublishedPost {
  id?: number | undefined;
  title: string;
  searchTitle: string;
  content: string;
  tags?: Array<string> | undefined;
  categories?: Array<string> | undefined;
  type?: string | null | undefined;
  published: boolean;
  publishedAt?: string | Date | null | undefined;
  draftPost: number | null | undefined;
  updatedAt?: string | Date | null | undefined;
  postedBy: string;
  summary?: string | null | undefined;
  createdAt?: string | Date | null | undefined;
  backgroundImage?: string | null | undefined;
  constructor(post: PublishedPostType) {
    this.id = post.id;
    this.title = post.title
    this.postedBy = post.postedBy
    this.summary = post.summary
    this.createdAt = post.createdAt
    this.backgroundImage = post.backgroundImage
    this.content = post.content
    this.tags = splitString(post.tags as string)
    this.categories = splitString(post.categories as string)
    this.type = post.type
    this.published = post.published
    this.publishedAt = post.publishedAt
    this.draftPost = post.draftPost
    this.searchTitle = post.searchTitle
  }
}