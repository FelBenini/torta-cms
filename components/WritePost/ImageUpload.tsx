'use client'
import React, { useState } from 'react'
import styles from './image.module.scss'
import { BiUpload } from 'react-icons/bi'
import axios from 'axios'

const ImageUpload = () => {
  const [imgLink, setImgLink] = useState('')
  const handleUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (!target.files) {
      return
    }
    const file = target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const {data} = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    setImgLink(data.location)
  }

  return (
    <>
      <img className={styles.imgPreview} src={imgLink}/>
      <label className={styles.uploadFile}>
        Click here to Upload
        <BiUpload style={{ display: 'block', marginTop: '6px' }} size='1.5em'/>
        <input onChange={handleUpload} type='file' name='uploadFile'/>  
      </label>
      <input defaultValue={imgLink} onBlur={(e) => {setImgLink(e.target.value)}}/>
    </>
  )
}

export default ImageUpload