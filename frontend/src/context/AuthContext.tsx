'use client'
import Alert from "@/components/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, createContext, ReactNode, useState } from "react";

interface User {
  username?: string,
  email: string,
  password: string,
}

interface AuthContextType {
  token: string,
  user: User | null,
  registerAction: ( data: User ) => Promise<void>
  loginAction: ( data: User ) => Promise<void>
  logoutAction: () => void
}

const AuthContext = createContext<AuthContextType | undefined>( undefined );

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ( { children } ) => {
  const [ user, setUser ] = useState( () => {
    if ( typeof window !== 'undefined' ) {
      const storedUser = localStorage.getItem( 'user' )
      return storedUser ? JSON.parse( storedUser ) : null
    } else {
      return null
    }
  } )

  const [ token, setToken ] = useState( () => {
    // to avoid error 'localStorage is not defined'
    if ( typeof window !== 'undefined' ) {
      return localStorage.getItem( 'token' ) || '';
    }
    return '';
  } );

  const router = useRouter();

  // register function
  const registerAction = async ( data: User ) => {
    try {
      const response = await axios.post( 'http://localhost:8000/users/register', data );

      if ( !response ) {
        Alert( {
          title: "Failed Sign Up",
          icon: "error"
        } )
        return;
      }

      setUser( response.data?.user );
      setToken( response.data?.token );
      // Store token and user in localStorage
      localStorage.setItem( 'token', response.data?.token );
      localStorage.setItem( 'user', JSON.stringify( response.data?.user ) );
      Alert( {
        title: "Sign Up Successfully",
        icon: "success"
      } )
      router.push( '/' )

    } catch ( error ) {
      console.error( error );
      return;
    }
  }

  // login function
  const loginAction = async ( data: User ) => {
    try {

      const response = await axios.post( 'http://localhost:8000/users/login', data )

      if ( !response ) {
        Alert( {
          title: "Failed Login Request",
          icon: "error"
        } )
        return;
      }

      setUser( response.data?.user );
      setToken( response.data?.token );
      // Store token and user in localStorage
      localStorage.setItem( 'token', response.data?.token );
      localStorage.setItem( 'user', JSON.stringify( response.data?.user ) );
      Alert( {
        title: "Login Successfully",
        icon: "success"
      } )
      router.push( '/' )
      return;
    } catch ( error ) {
      console.error( error );
    }
  }

  // logout function
  const logoutAction = () => {
    setUser( null );
    setToken( "" );

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'user' );
    Alert( {
      title: "Logout Successfully",
      icon: "success"
    } )
    router.push( '/login' )
  }

  return (
    <AuthContext.Provider value={ { token, user, registerAction, loginAction, logoutAction } }>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext( AuthContext );
  if ( !context ) {
    throw new Error( "useAuth must be used within an AuthProvider" );
  }
  return context;
};
