import React from 'react'
import styles from './style.module.scss'
import CategoriesController from '@/prisma/controllers/categoriesController'
import ListOfCategories from './ListOfCategories'

const Categories = async () => {
  const res = await CategoriesController.getCategories()
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