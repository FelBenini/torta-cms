import React from 'react'
import { AiOutlineCluster } from 'react-icons/ai'
import styles from './styles.module.scss'
import { headers } from "next/headers";
import ApiRefCard from '@/components/API/RefCard';

const ApiRefPage = () => {
  const headersList = headers();
  const referer = headersList.get("referer");
  const headerHost = headersList.get("host")
  const host = referer?.replace('/dashboard/api-ref', '').replace('/dashboard/posts', '')
  return (
    <section className={styles.apiRefSection}>
      <h1><AiOutlineCluster size='2.8rem' style={{marginBottom: '-0.5rem'}}/> API References</h1>
      <ApiRefCard method='GET' url={`${host}/api/posts`} description='Fetch all the published posts of the blog from newest to oldest'/>
      <ApiRefCard method='GET' url={`${host}/api/posts?page={page}&limit={limit}`} description="Fetch posts with pagination, page's default is 1 and limit is 15"/>
      <ApiRefCard method='GET' url={`${host}/api/posts?order=oldest`} description='Fetch all the published posts of the blog starting from the older posts'/>
      <ApiRefCard method='GET' url={`${host}/api/posts?search={query}`} description='Search for posts using this endpoint with the search query parameter'/>
      <ApiRefCard method='GET' url={`${host}/api/posts?category={category}`} description='Search for posts based on a category'/>
      <ApiRefCard method='GET' url={`${host}/api/post/{day}/{month}/{year}/{slug}`} description='Get a single post content based on its date and slug'/>
    </section>
  )
}

export default ApiRefPage