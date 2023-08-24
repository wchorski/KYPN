import { resetIdCounter, useCombobox } from "downshift";
import { useLazyQuery, gql } from "@apollo/client";
import { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import { StyledDropDown, StyledDropDownItem, StyledSearch } from "../../styles/DropDown.styled";
import { Event } from "../../lib/types";
import { datePrettyLocalDay } from "../../lib/dateFormatter";
import { MdSearch } from "react-icons/md";

export function EventsSearch() {

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [animTrig, setAnimTrig] = useState(0)
  const [inputItems, setInputItems] = useState([])
  const [inputValueState, setInputValueState] = useState<any>()

  const [searchEvents, { loading, data, error }] = useLazyQuery(
    SEARCH_EVENTS,
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

      const inputDate = new Date(inputValue || '')
      let dateString = new Date().toISOString()
      // @ts-ignore
      if(!isNaN(inputDate)) dateString = inputDate.toISOString()
      // @ts-ignore
      if(isNaN(inputDate)) dateString = new Date().toISOString()
      console.log(dateString);
      
      

      setInputValueState(inputValue)
      
      searchEvents({
          variables: {
            where: {
              OR: [
                {
                  summary: {
                    contains: inputValue,   
                    mode: 'insensitive'
                  }
                },
                {
                  start: {
                    gte: dateString,
                  }
                },
              ]
            },
          }
      }).then(({ data }) => {
        
        if(!data?.events) return console.log('searching events failed');
        setInputItems(data.events)
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
            placeholder: 'search events...',
            id: 'search-events',
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
          {isOpen && inputItems?.map((item:Event, index) => (
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
                      href={`/events/${item.id}`} 
                      // onClick={() => setisSearchOpen(false)}
                    >
                      <h5>{item.summary}</h5>
                      <small>{ datePrettyLocalDay(item.start || '') }</small>
                    </Link>

                    <span className="location">{item.location?.name}</span>

                  </div>
              </StyledDropDownItem>
            ))}
        </ul>

      </StyledDropDown>
    </div>
  )
}

const SEARCH_EVENTS = gql`
  query Events($where: EventWhereInput!) {
    events(where: $where) {
      id
      summary
      location {
        name
        address
      }
      start
      price
      image
      status
    }
  }
`