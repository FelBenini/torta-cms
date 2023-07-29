"use client";
import dynamic from 'next/dynamic';
import { useState, useCallback } from "react";
import axios from "axios";
import type { ContextStore } from '@uiw/react-md-editor';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
type OnChange = (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void;

export default function TextEditor({ value, setValue, onChange }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>>, onChange: () => void }) {

  const handleEditorChange = useCallback<OnChange>((content) => {
    setValue(content || '');
    onChange()
    console.log('callback')
  }, [setValue, onChange]);

  const handleUpload = async (
    blobInfo: any,
    success: (url: string) => void
  ) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            if (blobInfo && blobInfo.progress) {
              blobInfo.progress(progress);
            }
          }
        }
      });

      const imageUrl = response.data.location; // Adjust the response data structure based on your API response
      success(imageUrl);
      return imageUrl
    } catch (error) {
      // Handle upload failure within TinyMCE
      if (blobInfo && blobInfo.failure) {
        blobInfo.failure('Image upload failed.');
      }
    }
  };
  return (
    <MDEditor data-color-mode='light' style={{ width: '99%', margin: '0 auto', height: '60dvh' }} height='78dvh' value={value} onChange={handleEditorChange} />
  );
}
