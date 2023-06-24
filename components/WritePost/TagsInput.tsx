'use client'
import React, { useState } from 'react'
import styles from './tags.module.scss'
import { TiDelete } from 'react-icons/ti'

const TagsInput = ({tagsData}: {tagsData: Array<string>}) => {
  const [tags, setTags] = useState(tagsData)
  const [inputValue, setInputValue] = useState('')

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue !== '') {
      setTags([...tags, inputValue])
      setInputValue('')
    }
  }

  const handleDelete = (index: number) => {
    setTags([
      ...tags.slice(0, index),
      ...tags.slice(index + 1)
    ]);
  }

  return (
    <div className={styles.tagInput}>
      {tags.map((tag, index) => (<p key={index}>{tag} <TiDelete size={24} style={{marginBottom: -7, cursor: 'pointer'}} onClick={() => handleDelete(index)}/></p>))}
      <input type='text' value={inputValue}
        placeholder='Write your tags here'
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        onKeyDown={handleKeyPress}/>
    </div>
  )
}

export default TagsInput