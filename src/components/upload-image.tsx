import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Separator } from './ui/separator'
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import { IAdicionarAluno } from './pedagogues/AddPedagogueDialog'

interface IUploadImage {
  setValue: UseFormSetValue<IAdicionarAluno>
  trigger: UseFormTrigger<IAdicionarAluno>
}

export function UploadImage({ setValue, trigger }: IUploadImage) {
  const [image, setImage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setImage(imageData)

        setValue('photo', imageData)
        trigger('photo')
      }
      reader.readAsDataURL(file)
    }
  }

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
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}
