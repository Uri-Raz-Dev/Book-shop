'use strict'

var messageTimeout
function onInit() {
  render()
}
countBookPrice()

function render() {
  const elBookList = document.querySelector('.book-table')
  const elInput = document.querySelector('.search-book input')

  const searchText = elInput.value.trim()

  const books = _getBooks(searchText)

  if (books.length === 0) {
    elBookList.innerHTML = `
      <div class="empty-search">
        <p>No matching books were found...</p>
      </div>
    `
  } else {

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
}

function onRemoveBook(ev, bookId) {
  ev.stopPropagation()

  const elMessage = document.querySelector(`.message`)
  clearTimeout(messageTimeout)

  removeBook(bookId)
  elMessage.innerText = 'Book removed successfully!'
  elMessage.classList.remove('hidden')
  messageTimeout = setTimeout(() => {
    elMessage.innerText = ''
    elMessage.classList.add('hidden')
  }
    , 2000)
  countBookPrice()

  render()
}


function onUpdateBook(bookId) {

  const elPrice = document.querySelector(`.price.${bookId}`)
  const elMessage = document.querySelector(`.message`)
  const newPrice = updatePrice(bookId)
  clearTimeout(messageTimeout)
  if (isNaN(newPrice) || !newPrice) return alert('Invalid number input!')
  elPrice.innerText = newPrice
  elMessage.innerText = 'Price updated successfully!'
  elMessage.classList.remove('hidden')
  messageTimeout = setTimeout(() => {
    elMessage.innerText = ''
    elMessage.classList.add('hidden')
  }
    , 2000)
  countBookPrice()

  render()
}

function onAddBook() {

  const addTitle = prompt('Enter a book title')
  const addPrice = prompt('Enter a book price')
  const elMessage = document.querySelector('.message')
  clearTimeout(messageTimeout)

  if (!addTitle || !addPrice || isNaN(addPrice)) return alert('Invalid Input!')

  addBook(addTitle, addPrice)

  elMessage.innerText = 'Book added successfully!'
  elMessage.classList.remove('hidden')
  messageTimeout = setTimeout(() => {
    elMessage.innerText = ''
    elMessage.classList.add('hidden')
  }, 2000)
  countBookPrice()

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
function onClearSearch(ev) {
  ev.preventDefault()
  const elInput = document.querySelector('.search-book input')
  elInput.value ? elInput.value = '' : elInput.value
  render()
}


function countBookPrice() {
  const expensive = document.querySelector('.expensive')
  const average = document.querySelector('.average')
  const cheap = document.querySelector('.cheap')

  let expensiveCount = 0
  let averageCount = 0
  let cheapCount = 0

  gBooks.forEach(book => {
    if (book.price > 200) {
      expensiveCount++
    } else if (book.price >= 80 && book.price <= 200) {
      averageCount++
    } else if (book.price < 80) {
      cheapCount++
    }
  })

  expensive.innerText = `Expensive Books: ${expensiveCount}`
  average.innerText = `Average price Books: ${averageCount}`
  cheap.innerText = `Cheap Books: ${cheapCount}`
}



