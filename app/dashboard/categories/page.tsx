import React from 'react'
import styles from './style.module.scss'
import CategoriesController from '@/prisma/controllers/categoriesController'
import ListOfCategories from './ListOfCategories'
import { Category } from '@/lib/DataModels/Category'

const Categories = async () => {
  const res = await CategoriesController.getCategories()
  const categories = res.map((category) => {
    return new Category(category)
  })
  const string = JSON.stringify(categories)
  const json = JSON.parse(string)

  return (
    <>
      <section className={styles.categoriesSection}>
        <ListOfCategories categories={json} />
      </section>
    </>
  )
}

export default Categories