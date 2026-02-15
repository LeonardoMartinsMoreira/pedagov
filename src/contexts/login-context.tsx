'use client'

import { useSession } from 'next-auth/react'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IFirstLogin {
  isFirstLogin: boolean
  setIsFirstLogin: Dispatch<SetStateAction<boolean>>
}

const FirstLoginContext = createContext<IFirstLogin | undefined>(undefined)

export function FirstLoginProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = useSession()
  const [isFirstLogin, setIsFirstLogin] = useState(false)

  useEffect(() => {
    if (data?.user) {
      setIsFirstLogin(Boolean((data.user as { isFirstLogin?: boolean }).isFirstLogin))
    }
  }, [data?.user])

  return (
    <FirstLoginContext.Provider
      value={{
        isFirstLogin,
        setIsFirstLogin,
      }}
    >
      {children}
    </FirstLoginContext.Provider>
  )
}

export function useFirstLogin() {
  const context = useContext(FirstLoginContext)
  if (context === undefined) {
    throw new Error('useFirstLogin must be used within a FirstLoginProvider')
  }
  return context
}
