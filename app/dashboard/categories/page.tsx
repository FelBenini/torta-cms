import React from 'react'
import styles from './style.module.scss'
import categoriesController from '@/lib/mongodb/controllers/categoriesController'
import CategoryCard from './CategoryCard'
import { ICategory } from '@/lib/mongodb/models/Category'
import Topbar from './Topbar'

interface Category extends ICategory {
  _id: string
}

const Categories = async () => {
  const res = await categoriesController.getCategories()
  const string = JSON.stringify(res)
  const categories = JSON.parse(string)
  return (
    <>
      <section className={styles.categoriesSection}>
        <Topbar length={categories.length} categories={categories}/>
        {categories.map((category: Category, index: number)  => (
          <CategoryCard id={category._id as string} key={index}/>
        ))}
      </section>
    </>
  )
}

export default Categories