'use strict'
var gSearchTerm
var messageTimeout
const gQueryOptions = {
  filterBy: { txt: '', minRating: 0 },
  sortBy: {},
  page: { idx: 0, size: 4 }

}
function onInit() {
  renderBookTitles()
  render()
}


function render() {
  const elBookList = document.querySelector('.book-table')
  const elInput = document.querySelector('.search-book input')

  const books = getBooks(gSearchTerm, gQueryOptions)

  if (books.length === 0 && elInput.value) {
    elBookList.innerHTML = `
        <tr class="empty-search">
        
        <td class="empty-search" rowspan="3" colspan="3" >No matching books were found...</td>

        </tr>`
  } else {

    const strHtmls = books.map(book =>
      ` 
      <tr>
        <td class="title">${book.title}</td>
        <td class="price">${book.price}</td>
        <td class="price">${book.rating}</td>
        <td>
          <button class="read" onclick="onReadBook('${book.id}','${book.title}')">Read</button>
          <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
          <button class="delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button>
        </td>

      </tr>
      
      `
    )
    updateBookPriceCount()
    elBookList.innerHTML = strHtmls.join('')
  }
}


function renderBookTitles() {
  const bookTitles = getBookTitle()

  const strHtml = bookTitles.map(title => `
        <option>${title}</option>
    `).join('')

  const elList = document.querySelector('.book-list')
  elList.innerHTML += strHtml
}

function onSetFilterBy() {
  const elTitle = document.querySelector('.filter-by select')
  const elMinRating = document.querySelector('.filter-by input')

  gQueryOptions.filterBy.txt = elTitle.value
  gQueryOptions.filterBy.minRating = elMinRating.value

  render()
}

function onSetSortBy() {
  const elSortBy = document.querySelector('.sort-by select')
  const ascendingRadio = document.querySelector('.ascendingRadio')
  const descendingRadio = document.querySelector('.descendingRadio')

  const sortBy = elSortBy.value

  var dir = 1
  if (ascendingRadio.checked) {
    dir = 1
  } else if (descendingRadio.checked) {
    dir = -1
  }

  if (sortBy === 'title') {
    gQueryOptions.sortBy = { title: dir }
  } else if (sortBy === 'minRating') {
    gQueryOptions.sortBy = { rating: dir }
  } else if (sortBy === 'price') {
    gQueryOptions.sortBy = { price: dir }
  }


  render()
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

  render()
}


function onUpdateBook(bookId) {

  const price = prompt('Enter a new book price')
  if (price < 0 || isNaN(price) || !price) return alert('Invalid number input!')

  updatePrice(price, bookId)

  render()
}

function onAddBook() {

  const addTitle = prompt('Enter a book title')
  const addPrice = +prompt('Enter a book price')
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
  const txt = document.querySelector('.serach-input').value

  gSearchTerm = txt

  render()
}
function onClearSearch(ev) {
  ev.preventDefault()
  gSearchTerm = ''
  const txt = document.querySelector('.serach-input').value = ''
  document.querySelector('.filter-by select').value = ""
  document.querySelector('.filter-by input').value = 0

  gQueryOptions.filterBy.txt = ''
  gQueryOptions.filterBy.minRating = 0


  gSearchTerm = txt
  render()
}


function updateBookPriceCount() {
  const expensive = document.querySelector('.expensive')
  const average = document.querySelector('.average')
  const cheap = document.querySelector('.cheap')


  const countPrice = countBookPrice()

  expensive.innerText = 'Expensive Books: ' + countPrice[0]
  average.innerText = 'Mid-priced Books: ' + countPrice[1]
  cheap.innerText = 'Cheap Books: ' + countPrice[2]
}


