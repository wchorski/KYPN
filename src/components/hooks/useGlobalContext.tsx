'use client'
import { createContext, useContext, useState } from "react";

const defaultCtx = {
  isSearchOpen: false,
  setisSearchOpen: (isSearchOpen: boolean) => { },
  toggleSearch: () => { },
  closeSearch: () => { },
  openSearch: () => { },

  isNavOpen: false,
  setisNavOpen: (isSearchOpen: boolean) => { },
  toggleNav: () => { },

}

const GlobalContext = createContext(defaultCtx)

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [isSearchOpen, setisSearchOpen] = useState<boolean>(false)
  const [isNavOpen, setisNavOpen] = useState<boolean>(false)

  function toggleSearch() { setisSearchOpen(!isSearchOpen) }
  function closeSearch() { setisSearchOpen(false) }
  function openSearch() { setisSearchOpen(true) }

  function toggleNav() {
   setisNavOpen(!isNavOpen) 
  }


  return (
    <GlobalContext.Provider value={{
      isSearchOpen, setisSearchOpen, toggleSearch, closeSearch, openSearch,
      isNavOpen, setisNavOpen, toggleNav,
    }}>
      {children}
    </GlobalContext.Provider>
  )
};

export function useSearch() {
  const { isSearchOpen, setisSearchOpen, toggleSearch, closeSearch, openSearch } = useContext(GlobalContext)
  return { isSearchOpen, setisSearchOpen, toggleSearch, closeSearch, openSearch }
}

export function useNavControl() {
  const { isNavOpen, setisNavOpen, toggleNav, } = useContext(GlobalContext)
  return { isNavOpen, setisNavOpen, toggleNav, }
}

export const useGlobalContext = () => useContext(GlobalContext);