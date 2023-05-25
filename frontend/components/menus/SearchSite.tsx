// downsift docs - https://www.downshift-js.com/use-combobox

import { useCombobox } from "downshift"
import { useState } from "react"

export function SearchSite() {
  const books = [
    {author: 'Harper Lee', title: 'To Kill a Mockingbird'},
    {author: 'Lev Tolstoy', title: 'War and Peace'},
    {author: 'Fyodor Dostoyevsy', title: 'The Idiot'},
    {author: 'Oscar Wilde', title: 'A Picture of Dorian Gray'},
    {author: 'George Orwell', title: '1984'},
    {author: 'Jane Austen', title: 'Pride and Prejudice'},
    {author: 'Marcus Aurelius', title: 'Meditations'},
    {author: 'Fyodor Dostoevsky', title: 'The Brothers Karamazov'},
    {author: 'Lev Tolstoy', title: 'Anna Karenina'},
    {author: 'Fyodor Dostoevsky', title: 'Crime and Punishment'},
  ]
  function getBooksFilter(inputValue:any) {
    const lowerCasedInputValue = inputValue.toLowerCase()

    return function booksFilter(book:any) {
      return (
        !inputValue ||
        book.title.toLowerCase().includes(lowerCasedInputValue) ||
        book.author.toLowerCase().includes(lowerCasedInputValue)
      )
    }
  }

  function ComboBox() {
    const [items, setItems] = useState(books)
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
      reset,
    } = useCombobox({
      onInputValueChange({inputValue}) {
        setItems(books.filter(getBooksFilter(inputValue)))
      },
      items,
      itemToString(item) {
        return item ? item.title : ''
      },
    })

    return (
      <div>
        <div className="w-72 flex flex-col gap-1">
          <label className="w-fit" {...getLabelProps()}>
            Choose your favorite book:
          </label>
          <div className="flex shadow-sm bg-white gap-0.5">
            <input
              placeholder="Best book ever"
              className="w-full p-1.5"
              {...getInputProps()}
            />
            <button
              aria-label="toggle menu"
              className="px-2"
              type="button"
              {...getToggleButtonProps()}
            >
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
            <button onClick={reset}>
              reset
            </button>
          </div>
        </div>
        <ul
          className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 ${
            !(isOpen && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item:any, index) => (
              <li
                className={'item'}
                key={`${item.value}${index}`}
                {...getItemProps({item, index})}
              >
                <span>{item.title}</span>
                <span className="text-sm text-gray-700">{item.author}</span>
                <button onClick={reset}>
                  reset
                </button>
              </li>
            ))}
        </ul>
      </div>
    )
  }
  return <ComboBox />
}