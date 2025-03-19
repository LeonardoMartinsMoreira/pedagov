import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { Separator } from './ui/separator'

export default function UploadImage({
  setValue,
}: {
  setValue: UseFormSetValue<FieldValues>
}) {
  const [image, setImage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    setValue('profileImage', image)
  }, [image])

  return (
    <div className="flex flex-col">
      <div className="h-32 w-full bg-black rounded dark:bg-white items-center justify-center">
        {image && (
          <Image
            src={image}
            alt="Preview"
            className="object-fill h-32 w-full rounded"
            width={128}
            height={128}
          />
        )}
      </div>
      <div>
        <span className="text-xs text-muted-foreground">
          São permitidos JPG, GIF ou PNG. Tamanho máximo 1.5MB
        </span>
        <label htmlFor="file-upload">
          <Button variant="outline" className="border-primary w-full" asChild>
            <span>Selecionar Foto</span>
          </Button>
        </label>

        <div className="mt-4">
          <Separator className="h-0.5 rounded" />
        </div>

        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}
