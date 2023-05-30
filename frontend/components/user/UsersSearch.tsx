import { resetIdCounter, useCombobox } from "downshift";
import { useLazyQuery, gql } from "@apollo/client";
import { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import { StyledDropDown, StyledDropDownItem, StyledSearch } from "../../styles/DropDown.styled";
import { Event, User } from "../../lib/types";
import { MdSearch } from "react-icons/md";


export function UsersSearch() {

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [animTrig, setAnimTrig] = useState(0)
  const [inputItems, setInputItems] = useState([])
  const [inputValueState, setInputValueState] = useState<any>()

  const [searchUsers, { loading, data, error }] = useLazyQuery(
    SEARCH_USERS,
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
                    mode: 'insensitive'
                  }
                },
                {
                  role: { name: {
                    contains: inputValue,   
                    mode: 'insensitive'
                  }}
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

  return (
    <div>
      <label className="input-cont">
        <input
          {...getInputProps({
            ref: searchInputRef,
            type: 'search',
            placeholder: 'search users...',
            id: 'search-users',
            className: loading ? 'loading' : '',
            // onBlur: () => {reset(); closeMenu()},
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
        <MdSearch />
      </label>

      <StyledDropDown>
        <ul {...getMenuProps()}>
          {isOpen && inputItems?.map((item:User, index) => (
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
                    <small>{item.email}</small>
                    <br />
                    <small className="role">role: {item.role?.name}</small>

                  </div>

              </StyledDropDownItem>
            ))}
        </ul>

      </StyledDropDown>
    </div>
  )
}

const SEARCH_USERS = gql`
  query Users($where: UserWhereInput!) {
    users(where: $where) {
      id
      name
      email
      role {
        name
      }
    }
  }
`