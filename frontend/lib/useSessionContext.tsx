//@ts-nocheck
// cred - https://github.com/pagecow/nextjs-13-context-api/blob/main/app/Context/store.tsx
// cred - https://felixgerschau.com/react-typescript-context/
// cred - https://stackoverflow.com/questions/58193424/passing-state-with-usecontext-in-typescript

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface DataType {
  id: string | null,
  email: string | null,
  name: string | null,
  isAdmin: boolean | null,
}

const defaultCtx= {
  session:{
    id: '',
    email: '',
    name: '',
    isAdmin: false,
  },
  setSession: (session:DataType | null) => {}
}

const GlobalContext = createContext(defaultCtx)

export const GlobalContextProvider = ({ children }: {children: React.ReactNode}) => {

  const [session, setSession] = useState(null);
  
  return (
    <GlobalContext.Provider value={{session, setSession}}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);