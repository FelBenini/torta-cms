"use client";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

export default function TextEditor({ value, setValue, onChange }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>>, onChange: () => void }) {
  const editorRef = useRef<any>();

  const handleEditorChange = (content: string) => {
    setValue(content);
    onChange()
  };

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
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: '96.5svh',
          width: '100%',
          resize: false,
          menubar: true,
          skin_url: "/skin/light",
          //skin_url: '/skin/dark',
          content_css: "light",
          plugins: [
            "image",
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect blocks insertfile | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | image | bullist numlist outdent indent | " +
            "removeformat emoticons | help",
          images_upload_url: "/api/upload", // @ts-ignore
          images_upload_handler: handleUpload,
          content_style: "body { font-family: 'Inter', sans-serif; }"
        }}
      />
    </>
  );
}
