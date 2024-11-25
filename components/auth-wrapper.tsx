'use client'


import { AuthProvider } from '@/context/auth-context'
import React, { PropsWithChildren } from 'react'

const AuthWrapper = ({children}:PropsWithChildren) => {

  return (

    <AuthProvider>
        {children}
    </AuthProvider>

  )
}

export default AuthWrapper