import React, { Fragment, useContext } from 'react';
import { useUser } from '../components/menus/Session';
import { Table } from '../components/elements/Table';
import { SearchSite } from '../components/menus/SearchSite';
import { StyledDropDownItem } from '../styles/DropDown.styled';
import Link from 'next/link';


export default function IndexPage() {
  // const seshCtx = useContext(SessionContext)
  // const {session} = useGlobalContext()
  const session = useUser()

  return (<>
    <h1>Index Page</h1>
    {session && (
      <p>Welcome, {session.name}</p>
    )}

    {/* <SearchSite /> */}

    <StyledDropDownItem>
      <div className='meta'>
        <Link  href={`/users/1`} >
          <h5> My name</h5>
        </Link>
        <span className="email"> me@mail.lan</span>
      </div>


      <div className='edit-button-cont'>
        <button className="delete">
          remove
        </button>
      </div>
            
    </StyledDropDownItem>

  </>)
}