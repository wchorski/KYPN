
// cred - https://github.com/carlos815/3rd-shop-frontend/blob/main/components/Search.jsx
import Image from "next/image";
import { resetIdCounter, useCombobox } from "downshift";
import { useRouter } from "next/router";
import { useLazyQuery, gql } from "@apollo/client";
import { useMemo, useState, useEffect } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import { StyledDropDown, StyledDropDownItem, StyledSearch } from "../../styles/DropDown.styled";
import { MdClose, MdSearch } from "react-icons/md";
import { handlePhoto } from "../../lib/handleProductPhoto"
import styled from "styled-components"
// const { default: gql } = require("graphql-tag");

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
}`
export default function SearchCarlos() {

  const [inputItems, setInputItems] = useState([])
  const [inputValue, setInputValue] = useState<any>()

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



  return (
    <StyledSearch>
      <div className="input-cont">
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'search...',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
          data-testid="combobox-input"
        />
        {inputValue && <button
          className="absolute right-10 text-lg text-purple-dark opacity-50 hover:opacity-100 p-2 "
          aria-label="toggle menu"
          data-testid="clear-button"
          onClick={() => selectItem(null)}
        >
          <MdClose />
        </button>}

        <button > <MdSearch /> </button>
      </div>

      <StyledDropDown>
        <ul {...getMenuProps()}>
          {isOpen &&
            inputItems?.map((item: any, index) => (
              <StyledDropDownItem
                highlighted={index === highlightedIndex}

                key={item.id}
                // @ts-ignore
                {...getItemProps({ item, index, })}
              >
                <Link href={`/shop/product/${item.id}`}>
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

const StyledSearchCont = styled.div`
  background-color: yellow;
  width: 100%;
  display: flex;

  input{
    width: 100%;
    padding: 1em;
  }
`