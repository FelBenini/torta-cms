'use client'
import React, { useState } from 'react'
import styles from './image.module.scss'
import { BiUpload } from 'react-icons/bi'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'

const loadingStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  padding: '5%',
  bgcolor: '#ffffffdb',
  borderRadius: '8px',
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const ImageUpload = ({ postId, initialValue }: { postId: number, initialValue: string | undefined }) => {
  const [loading, setLoading] = useState(false)
  const [imgLink, setImgLink] = useState(initialValue || '')
  const router = useRouter()
  const handleUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    setLoading(true);
    const target = e.target as HTMLInputElement;
    if (!target.files) {
      return;
    }
    const file = target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axios.post(`/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    setImgLink(data.location)
    await saveImageUrl(data.location);
    setLoading(false);
  }

  const saveImageUrl = async (img: string): Promise<void> => {
    await axios.put(`/api/update/image/${postId}`, {
      imageUrl: img
    })
    router.refresh()
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {loading ? <Box sx={loadingStyle}>
        <CircularProgress />
      </Box>
        : <></>}
      {imgLink !== '' ?
        <img style={{ borderRadius: '8px', width: '96.5%' }} className={styles.imgPreview} src={imgLink} alt='Main image preview' />
        : <p style={{ textAlign: 'center', width: '96.5%' }}>No image uploaded yet</p>
      }

      <label className={styles.uploadFile}>
        Click here to Upload
        <BiUpload style={{ display: 'block', marginTop: '6px' }} size='1.5em' />
        <input onChange={handleUpload} type='file' name='uploadFile' />
      </label>
      <input className={styles.imgUrl} value={imgLink}
        onChange={(e) => {
          setImgLink(e.target.value);
        }}
        onBlur={() => {
          saveImageUrl(imgLink);
        }} placeholder='Paste your image url' />
    </Box>
  )
}

export default ImageUpload