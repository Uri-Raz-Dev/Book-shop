'use strict'
function onInit() {
  render()
}

function render() {
  const elBookList = document.querySelector('.book-table')
  const elInput = document.querySelector('.search-book input')

  const searchText = elInput.value

  const books = _getBooks(searchText)
  const strHtmls = books.map(book =>
    ` 
      <tr>
        <td class="title">${book.title}</td>
        <td class="price ${book.id}">${book.price}</td>
        <td>
          <button class="read" onclick="onReadBook('${book.id}','${book.title}')">Read</button>
          <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
          <button class="delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button>
        </td>
      </tr>
      
      `
  )
  elBookList.innerHTML = strHtmls.join('')
}


function onRemoveBook(ev, bookId) {
  ev.stopPropagation()
  removeBook(bookId)
  render()
}


function onUpdateBook(bookId) {
  const elPrice = document.querySelector(`.price.${bookId}`)
  const newPrice = updatePrice(bookId);
  if (isNaN(newPrice) || newPrice === '') return alert('Invalid number input!')
  elPrice.innerText = newPrice
  render()
}

function onAddBook() {
  addBook()
  render()
}

function onReadBook(bookId, bookTitle) {
  const elModal = document.querySelector('.book-details')
  const elTxt = elModal.querySelector('h2 span')
  const elLeftColumn = elModal.querySelector('.left-column')
  const elRightColumn = elModal.querySelector('.right-column')
  const elImageContainer = elModal.querySelector('.image-container')

  const book = readBook(bookId)
  const bookKeys = Object.keys(book).filter(key => key !== 'imgUrl')

  elTxt.innerText = bookTitle

  elLeftColumn.innerHTML = ''
  elRightColumn.innerHTML = ''
  elImageContainer.innerHTML = ''

  bookKeys.forEach(key => {
    const bookKey = key.toUpperCase()
    const value = book[key]

    elLeftColumn.innerHTML += `<div class="grid-item">${bookKey}</div>`
    elRightColumn.innerHTML += `<div class="grid-item">${value}</div>`
  })

  const imgUrl = book.imgUrl
  if (imgUrl) {
    elImageContainer.innerHTML = `<img src="${imgUrl}" alt="Book Cover" class="book-image">`
  }

  elModal.showModal()
}

function onSearchBook(ev) {
  ev.preventDefault()
  render()
}