import React from 'react'
import styles from './style.module.scss'
import categoriesController from '@/lib/mongodb/controllers/categoriesController'
import { ICategory } from '@/lib/mongodb/models/Category'
import ListOfCategories from './ListOfCategories'

interface Category extends ICategory {
  _id: string
  childCategories: Array<Category>
}

const Categories = async () => {
  const res = await categoriesController.getCategories()
  const string = JSON.stringify(res)
  const categories = JSON.parse(string)

  return (
    <>
      <section className={styles.categoriesSection}>
        <ListOfCategories categories={categories} />
      </section>
    </>
  )
}

export default Categories