"use client"
import TextEditor from "@/components/TextEditor"
import { useState } from "react"

export default function Home() {
  const [editorValue, setEditorValue] = useState('')
  return (
    <div>
      <TextEditor value={editorValue}  setValue={setEditorValue}/>
      <div>{editorValue}</div>
    </div>
  )
}