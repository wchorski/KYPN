import { StyledDropDown, StyledDropDownItem, StyledSearch } from "@/styles/DropDown.styled"
import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { resetIdCounter, useCombobox } from "downshift"
import { useCallback, useState } from "react"
import styled from "styled-components"
import {debounce} from 'lodash'
import Image from "next/image"
import { handlePhoto } from "@/lib/handleProductPhoto"
import { useRouter } from "next/router"

const colors = [
  'Black',
  'Red',
  'Green',
  'Blue',
  'Orange',
  'Purple',
  'Pink',
  'Orchid',
  'Aqua',
  'Lime',
  'Gray',
  'Brown',
  'Teal',
  'Skyblue',
]

export const SearchInput = () => {

  const router = useRouter()

  const [query, {loading, data, error}] = useLazyQuery(QUERY_SEARCH_PRODUCTS, {fetchPolicy: 'no-cache'})
  
  // ? old way
  // const findItemsLazy = debounce(query, 350)

  // constricts waterfall of queries made to the server
  const findItemsLazy = useCallback(debounce(query, 350), [query]);
  
  // async function handleQuery(searchTerm:string) {
  //   const res = await query({
  //     fetchPolicy: 'no-cache',
  //     variables: {
  //       where: {
  //         name: {
  //           contains: searchTerm
  //         },
  //         description: {
  //           contains: searchTerm
  //         }
  //       }
  //     }
  //   })
  // }

  resetIdCounter();

  // const [foundItems, setfoundItems] = useState(colors)
  // const [foundItems, setfoundItems] = useState(data?.products || [])

  const foundItems = data?.products || []

  const { getMenuProps, getInputProps, getLabelProps, selectItem, selectedItem, getToggleButtonProps, isOpen, getItemProps, highlightedIndex } = useCombobox({
    items: foundItems,
    onInputValueChange: ({inputValue}) => {

      // TODO why is this caps sensative?
      // console.log(selectedItem, inputValue)

      findItemsLazy({
        variables: {
          where: {
            OR: [
              {
                name: {
                  contains: inputValue
                }
              },
              {
                description: {
                  contains: inputValue
                }
              }
            ]
          }
          
        }
      })
      
      // setfoundItems(
      //   // @ts-ignore
      //   // colors.filter(c => c.toLowerCase().startsWith(inputValue.toLowerCase()))
      //   data?.products || []
      // )
    },
    onSelectedItemChange({selectedItem}){
      // @ts-ignore
      router.push({ pathname: `/shop/product/${selectedItem.id}` })
    },
    // @ts-ignore
    itemToString: (item) => item?.name || ''
  })


  return (
    <StyledSearch>
      {/* <StyledSearchCont> */}
      <div>
        <label
          style={{ color: selectedItem ? selectedItem : 'blue' }}
          {...getLabelProps()}
        >
          Choose an element:
        </label>

        <div>
          <input
            {...getInputProps({
              type: 'search', 
              placeholder: 'search color...',
              id: 'search',
              className: loading ? 'loading' : '',
            })}
            data-testid="combobox-input"
          />

          <button
            aria-label="toggle menu"
            data-testid="combobox-toggle-button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>

          <button
            aria-label="toggle menu"
            data-testid="clear-button"
            onClick={() => selectItem(null)}
          >
            &#10007; clear
          </button>

        </div>
      <StyledDropDown>
        <ul {...getMenuProps()} >
          {isOpen && foundItems.map((item:any, index:any) => (
              <StyledDropDownItem
                highlighted={index === highlightedIndex}
                key={index}
                // @ts-ignore
                {...getItemProps({ item, index,})}
              >
                <Image 
                  priority
                  src={handlePhoto(item.photo).image?.url} 
                  alt={handlePhoto(item.photo).image?.altText}
                  width={handlePhoto(item.photo).image?.width}
                  height={handlePhoto(item.photo).image?.height}
                />
                ----- {item.name}
              </StyledDropDownItem>
            ))}
          {isOpen && !foundItems.length && !loading && (
            <StyledDropDownItem>No items found</StyledDropDownItem>
          )}
        </ul>
      </StyledDropDown>
      </div>


      {/* <div>
        <input type="search" placeholder='search...'/>
        <button> search </button>
      </div>
      <StyledDropDown>
        <StyledDropDownItem> 1 </StyledDropDownItem>
        <StyledDropDownItem> 2 </StyledDropDownItem>
        <StyledDropDownItem> 3 </StyledDropDownItem>
      </StyledDropDown> */}

    </StyledSearch>
  )
}

const QUERY_SEARCH_PRODUCTS = gql`
  query Products($where: ProductWhereInput!) {
    products(where: $where) {
      id
      name
    }
  }
`


const StyledSearchCont = styled.div`
  background-color: yellow;
  width: 100%;
  display: flex;

  input{
    width: 100%;
    padding: 1em;
  }
`