'use client'
import React, { useState } from 'react'
import styles from './image.module.scss'
import { BiUpload } from 'react-icons/bi'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const ImageUpload = ({postId, initialValue}: {postId: string, initialValue: string | undefined}) => {
  const [imgLink, setImgLink] = useState(initialValue || '')
  const router = useRouter()
  const handleUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (!target.files) {
      return
    }
    const file = target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const {data} = await axios.post(`/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    setImgLink(data.location)
    await saveImageUrl(data.location);
  }

  const saveImageUrl = async (img: string): Promise<void> => {
    await axios.put(`/api/update/image/${postId}`, {
      imageUrl: img
    })
    router.refresh()
  }

  return (
    <>
      {imgLink !== '' ? 
        <img className={styles.imgPreview} src={imgLink} alt='Main image preview'/>
      : <p style={{textAlign: 'center'}}>No image uploaded yet</p>
      }
      
      <label className={styles.uploadFile}>
        Click here to Upload
        <BiUpload style={{ display: 'block', marginTop: '6px' }} size='1.5em'/>
        <input onChange={handleUpload} type='file' name='uploadFile'/>  
      </label>
      <input className={styles.imgUrl} value={imgLink}
      onChange={(e) => {
        setImgLink(e.target.value);
      }}
      onBlur={() => {
        saveImageUrl(imgLink);
        }} placeholder='Paste your image url'/>
    </>
  )
}

export default ImageUpload