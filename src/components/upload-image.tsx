import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function UploadImageModal() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
      <Button onClick={handleButtonClick}>Select Image</Button>
      {image && (
        <img src={image} alt="Preview" className="w-32 h-32 object-cover" />
      )}
    </div>
  )
}
