'use client'
import React from 'react'
import styles from './image.module.scss'
import { BiUpload } from 'react-icons/bi'

const ImageUpload = () => {
  return (
    <>
      <label className={styles.uploadFile}>
        Click here to Upload
        <BiUpload style={{ display: 'block', marginTop: '6px' }} size='1.5em'/>
        <input type='file' name='uploadFile'/>
      </label>
    </>
  )
}

export default ImageUpload