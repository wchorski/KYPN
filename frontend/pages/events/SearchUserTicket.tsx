import Image from "next/image";
import { resetIdCounter, useCombobox } from "downshift";
import { useLazyQuery, gql } from "@apollo/client";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { StyledDropDown, StyledDropDownItem, StyledSearch } from "../../styles/DropDown.styled";

import styled from "styled-components"
import { useSearch } from "../../lib/useGlobalContext";
import { Ticket, User } from "../../lib/types";

type Props = {
  ticketId:string
  setIsPopup:Dispatch<SetStateAction<boolean>>,
  setPickedUser: Dispatch<SetStateAction<User|undefined>>,
}

export function SearchUserTicket({ticketId = '', setIsPopup, setPickedUser}:Props) {

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [inputItems, setInputItems] = useState([])
  const [inputValue, setInputValue] = useState<any>()

  const [searchUsers, { loading, data, error }] = useLazyQuery(
    QUERY_USERS_SEARCH,
    {fetchPolicy: 'no-cache',}
  )

  resetIdCounter();

  // const findItemsButChill = useMemo(() => debounce(findItems, 350), [findItems]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    items: inputItems ?? [],
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === '') {
        setInputItems([])
        return console.log('empty search string')
      }

      setInputValue(inputValue)
      searchUsers({
          variables: {
            where: {
              OR: [
                {
                  name: {
                    contains: inputValue,
                    mode: 'insensitive'
                  }
                },
                {
                  email: {
                    contains: inputValue,
                    mode: 'insensitive',
                  }
                },
              ]
            },
          }
      }).then(({ data }) => {
        
        if(!data.users) return console.log('searching users failed');
        setInputItems(data.users)
      })
    },
    onSelectedItemChange: (state) => {
      // console.log(state)
      if (state.type == useCombobox.stateChangeTypes.InputBlur) return
      // state.selectedItem && router.push(`/product/${state.selectedItem.id}`)
      // selectItem(null)

    },
    // @ts-ignore
    itemToString: (item) => item?.name || '',

  })

  function handleEventsAttending(tickets:Ticket[]){
    return tickets.flatMap(t => t.event.id)
  }

  function handlePopup(user:User){
    setIsPopup(true)
    setPickedUser(user)
  }

  return (
    <StyledSearch id="search-cont" className={'open'}>

      <label className="input-cont">
        <input
          {...getInputProps({
            ref: searchInputRef,
            type: 'search',
            placeholder: 'search users...',
            id: 'search',
            className: loading ? 'loading' : '',
            onKeyDown: event => {
              // console.log(event.target)
              // todo route push to link when enter key is pressed
              switch (event.key) {
                case 'Enter':
                  // router.push(`/shop/product/${item.id}`)
                  break;

                default:
                  break;
              }
            }
          })}
          data-testid="combobox-input"
        />

      </label>

      <StyledDropDown>
        <ul {...getMenuProps()}>
          {
            inputItems?.map((item: User, index) => (
              <StyledDropDownItem
                highlighted={index === highlightedIndex}

                key={item.id}
                // @ts-ignore
                {...getItemProps({ item, index, })}
              >
                  {/* <Image
                    priority
                    src={handlePhoto(item.photo).image?.url}
                    alt={handlePhoto(item.photo).image?.altText ? handlePhoto(item.photo).image?.altText : 'no product photo'}
                    width={80}
                    height={80}
                  /> */}
                  <article>
                    <Link 
                      href={`/users/${item.id}`} 
                      // onClick={() => setisSearchOpen(false)}
                    >
                      <h5>{item.name} {item.nameLast}</h5>
                    </Link>

                    <span className="email">{item.email}</span>

                    {handleEventsAttending(item.tickets).includes(ticketId) ? (
                      <button>
                        remove
                      </button>
                    ) : (
                      <button onClick={() => handlePopup(item)}>
                        rsvp
                      </button>
                    )}
                  </article>

              </StyledDropDownItem>
            ))}
        </ul>

      </StyledDropDown>

    </StyledSearch>
  )
}


const QUERY_USERS_SEARCH = gql`
  query Users($where: UserWhereInput!) {
    users(where: $where) {
      id
      name
      nameLast
      email
      tickets {
        id
        event {
          id
          summary
        }
      }
    }
  }
`