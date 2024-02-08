'use strict'

const gQueryOptions = {
  filterBy: { txt: '', minRating: 0 },
  sortBy: {},
  page: { idx: 0, size: 5 }
}

function onInit() {
  //   renderBookTitles()
  render()
}

function render() {
  const elBookList = document.querySelector('.book-table')
  const elInput = document.querySelector('.search-book input')

  const books = getBooks(gQueryOptions)

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
        <td class="rating">${book.rating}</td>
        <td>
          <button class="read" onclick="onReadBook('${book.id}','${book.title}')">Read</button>
            <button class="update" onclick="openUpdateBookModal('${book.id}')">Update</button>
<dialog id="updateBookModal-${book.id}" class="updateBookModal modal hidden">
      <form  onsubmit="onUpdateBook(event,'${book.id}')">
        <h2>Update Book</h2>
        <label for="title">Title:</label>
        <input type="text" class="upTitle" required>
        <label for="price">Price:</label>
        <input type="number" class="upPrice" required>
        <label for="rating">Rating:</label>
        <input type="number" class="upRating" min="1" max="5" required>
        <label for="imgUrl">Image URL:</label>
        <input type="text" class="upImgUrl">
        <button type="submit">Update</button>
        <button value="" formnovalidate onclick="closeUpdateBookModal()">Close</button>
      </form>
    </dialog>



          <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
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
  const elMinRating = document.querySelector('.filter-by .filter-min-rating')
  const elTxt = document.querySelector('.filter-by .filter-txt')

  gQueryOptions.filterBy.txt = elTxt.value
  gQueryOptions.filterBy.minRating = +elMinRating.value

  gQueryOptions.page.idx = 0
  render()
}

function onSetSortBy() {
  const elSortBy = document.querySelector('.sort-by select')
  const sortBy = elSortBy.value

  var dir = +document.querySelector('[name="sort-by"]:checked').value

  if (sortBy === 'title') {
    gQueryOptions.sortBy = { title: dir }
  } else if (sortBy === 'minRating') {
    gQueryOptions.sortBy = { rating: dir }
  } else if (sortBy === 'price') {
    gQueryOptions.sortBy = { price: dir }
  }

  gQueryOptions.page.idx = 0
  render()
}

function onRemoveBook(bookId) {

  removeBook(bookId)
  flashMsg(`Removed book ${bookId}`)

  render()
}

function onNextPage() {

  const bookCount = getBookCount(gQueryOptions.filterBy)

  if (bookCount > (gQueryOptions.page.idx + 1) * gQueryOptions.page.size) {
    gQueryOptions.page.idx++
  } else {
    gQueryOptions.page.idx = 0
  }
  render()
}
function onPreviousPage() {

  const bookCount = getBookCount(gQueryOptions.filterBy)

  if (gQueryOptions.page.idx > 0) {
    gQueryOptions.page.idx--
  } else {
    gQueryOptions.page.idx = Math.ceil(bookCount / gQueryOptions.page.size) - 1
  }
  render()
}



function openAddBookModal() {
  const elModal = document.querySelector('.add-book-modal')
  elModal.showModal()
}


function openUpdateBookModal(bookId) {
  const modal = document.querySelector(`#updateBookModal-${bookId}`)
  modal.style.display = 'flex'
}

function closeUpdateBookModal(ev) {
  const modal = document.querySelector(`.updateBookModal`)
  modal.close()
  modal.style.display = 'none'

}

function onAddBook() {

  const title = document.querySelector('.title').value
  const price = +document.querySelector('.price').value
  const rating = +document.querySelector('.rating').value
  const imgUrl = document.querySelector('.imgUrl').value

  addBook(title, price, rating, imgUrl)
  flashMsg(`Added book ${title}`)

  render()
}

function onUpdateBook(ev, bookId) {
  ev.preventDefault()
  const title = document.querySelector(`#updateBookModal-${bookId} .upTitle`).value
  const price = +document.querySelector(`#updateBookModal-${bookId} .upPrice`).value
  const rating = +document.querySelector(`#updateBookModal-${bookId} .upRating`).value
  const imgUrl = document.querySelector(`#updateBookModal-${bookId} .upImgUrl`).value
  updateBook(bookId, title, price, rating, imgUrl)
  closeUpdateBookModal()
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

function onClearSearch() {
  document.querySelector('.filter-by .filter-txt').value = ''
  document.querySelector('.filter-by .filter-min-rating').value = 0

  gQueryOptions.filterBy.txt = ''
  gQueryOptions.filterBy.minRating = 0

  render()
}


function updateBookPriceCount() {
  const expensive = document.querySelector('.expensive')
  const average = document.querySelector('.average')
  const cheap = document.querySelector('.cheap')
  const totalBooks = document.querySelector('.total')


  const countPrice = countBookPrice()

  expensive.innerText = 'Expensive Books: ' + countPrice[0]
  average.innerText = 'Mid-priced Books: ' + countPrice[1]
  cheap.innerText = 'Cheap Books: ' + countPrice[2]
  totalBooks.innerText = 'Total Books: ' + countPrice[3]
}


function flashMsg(msg) {
  const el = document.querySelector('.message')

  el.innerText = msg
  el.classList.remove('hidden')
  setTimeout(() => el.classList.add('hidden'), 3000)
}