'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSettings } from '@/contexts/settings-context'
import { useState } from 'react'
import { toast } from 'sonner'

export const defaultAvatars = [
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9439775.jpg-4JVJWOjPksd3DtnBYJXoWHA5lc1DU9.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg',
]

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings()
  const [selectedAvatar, setSelectedAvatar] = useState(settings.avatar)

  const handleSaveAccount = () => {
    updateSettings({
      avatar: selectedAvatar,
      name: settings.name,
    })
    toast.success('Account settings saved successfully')
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da conta</CardTitle>
              <CardDescription>
                Altere as informações da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Current Avatar</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedAvatar} alt={settings.name} />
                    <AvatarFallback>
                      {settings
                        .name!.split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Label>Escolha um novo avatar</Label>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {defaultAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className={`h-20 w-20 rounded-lg cursor-pointer hover:ring-2 hover:ring-primary shrink-0 ${
                        selectedAvatar === avatar ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      <AvatarImage
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="object-cover"
                      />
                      <AvatarFallback>{index + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <Label htmlFor="custom-avatar">
                    Or upload a custom avatar
                  </Label>
                  <Input
                    id="custom-avatar"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  value={settings.name}
                  onChange={(e) => updateSettings({ name: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccount}>Save Account Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Configurações de segurança</CardTitle>
                <CardDescription>
                  Altere as configurações de segurança da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar alterações</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
