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
      {headerHost}
      <h1><AiOutlineCluster size='2.8rem' style={{marginBottom: '-0.5rem'}}/> API References</h1>
      <ApiRefCard method='GET' url={`${host}/api/posts`} description='Fetch all the published posts of the blog from newest to oldest'/>
      <ApiRefCard method='GET' url={`${host}/api/posts?order=oldest`} description='Fetch all the published posts of the blog starting from the older posts'/>
      <ApiRefCard method='GET' url={`${host}/api/posts?search={query}`} description='Search for posts using this endpoint with the search query parameter'/>
    </section>
  )
}

export default ApiRefPage