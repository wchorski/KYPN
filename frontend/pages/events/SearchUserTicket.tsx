import Image from "next/image";
import { resetIdCounter, useCombobox } from "downshift";
import { useLazyQuery, gql } from "@apollo/client";
import { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import { StyledDropDown, StyledDropDownItem, StyledSearch } from "../../styles/DropDown.styled";

import styled from "styled-components"
import { useSearch } from "../../lib/useGlobalContext";
import { Ticket, User } from "../../lib/types";
import { tTicketPopup } from "../../components/events/TicketPopup";

type Props = {
  eventId:string
  setIsPopup:Dispatch<SetStateAction<boolean>>,
  setPickedUser: Dispatch<SetStateAction<User|undefined>>,
  setTicketPopupData: Dispatch<SetStateAction<tTicketPopup>>,
}

export function SearchUserTicket({eventId = '', setIsPopup, setPickedUser, setTicketPopupData}:Props) {

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [animTrig, setAnimTrig] = useState(0)
  const [inputItems, setInputItems] = useState([])
  const [inputValueState, setInputValueState] = useState<any>()

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
    reset,
    closeMenu,
  } = useCombobox({
    items: inputItems ?? [],
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === '') {
        setInputItems([])
        return console.log('empty search string')
      }

      setInputValueState(inputValue)
      
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

  function handlePopup(tixPopupData:tTicketPopup){
    setAnimTrig(animTrig+1)
    // setIsPopup(true)
    // setPickedUser(user)
    setTicketPopupData(tixPopupData)
  }

  useEffect(() => {
    reset()
    closeMenu()
    // return () => 
  }, [animTrig])
  

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
            onBlur: () => {reset(); closeMenu()},
            onKeyDown: event => {
              // console.log(event.target)
              // todo route push to link when enter key is pressed, or better yet simulate mouse right click if a whole link
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
          {isOpen && inputItems?.map((item: User, index) => (
              <StyledDropDownItem
                highlighted={index === highlightedIndex}

                key={item.id}
                // @ts-ignore
                {...getItemProps({ item, index,})}
              >
                  {/* <Image
                    priority
                    src={handlePhoto(item.photo).image?.url}
                    alt={handlePhoto(item.photo).image?.altText ? handlePhoto(item.photo).image?.altText : 'no product photo'}
                    width={80}
                    height={80}
                  /> */}
                  <div className='meta'>
                    <Link 
                      href={`/users/${item.id}`} 
                      // onClick={() => setisSearchOpen(false)}
                    >
                      <h5>{item.name} {item.nameLast}</h5>
                    </Link>

                    <span className="email">{item.email}</span>

                  </div>
                  <div className='edit-button-cont'>
                    {handleEventsAttending(item.tickets).includes(eventId) ? (
                      <button 
                        onClick={() => handlePopup( {isDelete: true, ticket: item.tickets.find(t => t.event.id === eventId)}) }
                        className="delete"
                      >
                        remove
                      </button>
                    ) : (
                      <button 
                        onClick={() => handlePopup({user: item, event: {id: eventId}})} 
                      >
                        rsvp
                      </button>
                    )}
                  </div>
  

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
        holder{
          id
          name
          email
        }
      }
    }
  }
`