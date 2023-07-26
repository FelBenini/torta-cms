import React from 'react'
import styles from './style.module.scss'
import CategoriesController from '@/prisma/controllers/categoriesController'
import ListOfCategories from './ListOfCategories'

const Categories = async () => {
  const categories = await CategoriesController.getCategories()

  return (
    <>
      <section className={styles.categoriesSection}>
        <ListOfCategories categories={categories} />
      </section>
    </>
  )
}

export default Categories