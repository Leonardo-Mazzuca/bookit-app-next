

import checkAuth from '@/app/actions/check-auth'
import {createContext,useContext,useState,useEffect, PropsWithChildren} from 'react'


type AuthState = {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
    currentUser: User | null
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({children}:PropsWithChildren) => {


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(()=> {

        const checkAuthentication = async () => {
    
          const result = await checkAuth();
          
          setIsAuthenticated(result.isAuthenticated);

          if(result.user){
              setCurrentUser(result.user);
          }
          
        }
    
        checkAuthentication();
    
      },[])

    return (
        <AuthContext.Provider 
        value={{ 
            isAuthenticated, setIsAuthenticated,
            currentUser, setCurrentUser
         }}>

            {children}

        </AuthContext.Provider>

        
    )

}

export const useAuth = () => {

    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context

}