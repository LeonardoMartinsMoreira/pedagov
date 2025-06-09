import { Loader } from 'lucide-react'

export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )
}
