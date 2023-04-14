
// cred - https://github.com/carlos815/3rd-shop-frontend/blob/main/components/Search.jsx
import Image from "next/image";
import { resetIdCounter, useCombobox } from "downshift";
import { useRouter } from "next/router";
import { useLazyQuery, gql } from "@apollo/client";
import { useMemo, useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import { StyledDropDown, StyledDropDownItem, StyledSearch } from "../../styles/DropDown.styled";
import { MdClose, MdSearch } from "react-icons/md";
import { handlePhoto } from "../../lib/handleProductPhoto"
import styled from "styled-components"
import { useSearch } from "../../lib/useGlobalContext";
// const { default: gql } = require("graphql-tag");

export default function SearchCarlos() {

  const { setisSearchOpen } = useSearch()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [inputItems, setInputItems] = useState([])
  const [inputValue, setInputValue] = useState<any>()
  const { isSearchOpen, openSearch, closeSearch } = useSearch()

  const router = useRouter()
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  resetIdCounter();

  const findItemsButChill = useMemo(() => debounce(findItems, 350), [findItems]);

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
      findItems({ variables: { searchTerm: inputValue } }).then(({ data }) => {
        // console.log(data);
        setInputItems(data.products)
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

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef?.current?.focus()
    }

  }, [isSearchOpen])

  return (
    <StyledSearch id="search-cont" className={isSearchOpen ? 'open' : ''}>

      <label className="input-cont">
        <input
          {...getInputProps({
            ref: searchInputRef,
            type: 'search',
            placeholder: 'search...',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
          data-testid="combobox-input"
        />

      </label>

      <StyledDropDown>
        <ul {...getMenuProps()}>
          {
            inputItems?.map((item: any, index) => (
              <StyledDropDownItem
                highlighted={index === highlightedIndex}

                key={item.id}
                // @ts-ignore
                {...getItemProps({ item, index, })}
              >
                <Link href={`/shop/product/${item.id}`} onClick={() => setisSearchOpen(false)}>
                  <Image
                    priority
                    src={handlePhoto(item.photo).image?.url}
                    alt={handlePhoto(item.photo).image?.altText ? handlePhoto(item.photo).image?.altText : 'no product photo'}
                    width={80}
                    height={80}
                  />
                  <article>
                    <h5>{item.name}</h5>
                    <p className="description">{item.description}</p>
                  </article>
                </Link>

              </StyledDropDownItem>
            ))}
        </ul>

      </StyledDropDown>

    </StyledSearch>
  )
}

const SEARCH_PRODUCTS_QUERY = gql`
query SEARCH_PRODUCTS_QUERY ($searchTerm: String!){
    products (where: {OR: [{name: {contains: $searchTerm}}, {description: {contains: $searchTerm}}]}, take: 5){
    name
    description
    id
    photo {
      altText
      image {
        url
      }
    }
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