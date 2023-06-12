import TextEditor from "@/components/TextEditor"

export default function Home() {
  return (
    <div>
      <TextEditor initialValue={'<p>Hello, world!</p>'}/>
    </div>
  )
}