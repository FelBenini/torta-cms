'use client'
import React from 'react'
import styles from './image.module.scss'
import { BiUpload } from 'react-icons/bi'
import axios from 'axios'

const ImageUpload = () => {
  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.filename);
    axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  }

  return (
    <>
      <label className={styles.uploadFile}>
        Click here to Upload
        <BiUpload style={{ display: 'block', marginTop: '6px' }} size='1.5em'/>
        <input onChange={handleUpload} type='file' name='uploadFile'/>
      </label>
    </>
  )
}

export default ImageUpload