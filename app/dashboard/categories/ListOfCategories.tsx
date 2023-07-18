'use client'
import React from 'react'
import { ICategory } from '@/lib/mongodb/models/Category'
import Topbar from './Topbar'
import { FiLayers } from 'react-icons/fi'
import CategoryCard from './CategoryCard'

interface Category extends ICategory {
  _id: string
  childCategories: Array<Category>
}

const ListOfCategories = ({ categories }: { categories: Array<Category> }) => {
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
      <h1><FiLayers style={{ marginBottom: '-4px', marginRight: '8px' }} />All Categories</h1>
      <Topbar length={categories.length + countSubCategories(categories)} categories={categories} />
      {categories.map((category: Category, index: number) => (
        <CategoryCard id={category._id as string} key={index} />
      ))}
    </>
  )
}

export default ListOfCategories