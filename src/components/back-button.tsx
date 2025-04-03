'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button onClick={router.back} className="-ml-2 flex gap-1 items-center">
      <ChevronLeft size={32} />
      Voltar
    </button>
  )
}
