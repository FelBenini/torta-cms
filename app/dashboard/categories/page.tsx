import React from 'react'
import styles from './style.module.scss'
import categoriesController from '@/lib/mongodb/controllers/categoriesController'
import CategoryCard from './CategoryCard'
import { ICategory } from '@/lib/mongodb/models/Category'
import Topbar from './Topbar'
import { FiLayers } from 'react-icons/fi'

interface Category extends ICategory {
  _id: string
  childCategories: Array<Category>
}

const Categories = async () => {
  const res = await categoriesController.getCategories()
  const string = JSON.stringify(res)
  const categories = JSON.parse(string)

  const countSubCategories = (categories: Array<Category>) => {
    let count = 0;
    categories.map((category) => {
      category.childCategories?.map((category) => {
        count++
      })
    })
    return count
  }
  return (
    <>
      <section className={styles.categoriesSection}>
        <h1><FiLayers style={{marginBottom: '-4px', marginRight: '8px'}} />All Categories</h1>
        <Topbar length={categories.length + countSubCategories(categories)} categories={categories} />
        {categories.map((category: Category, index: number)  => (
          <CategoryCard id={category._id as string} key={index}/>
        ))}
      </section>
    </>
  )
}

export default Categories