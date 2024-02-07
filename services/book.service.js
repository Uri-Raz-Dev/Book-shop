'use strict'

var gBooks

const STORAGE_KEY = 'booksDB'

const gBookTitles = ['The Return of the king', 'A Clash of Kings', 'Harry Potter and the Order of the Phoenix']

_createBooks()

function getBooks(searchText, options = {}) {
  var books = _filterBooks(options.filterBy)

  if (options.sortBy.title) {
    books.sort((book1, book2) => book1.title.localeCompare(book2.title) * options.sortBy.title)
  } else if (options.sortBy.rating) {
    books.sort((book1, book2) => (book1.rating - book2.rating) * options.sortBy.rating)
  } else if (options.sortBy.price) {
    books.sort((book1, book2) => (book1.price - book2.price) * options.sortBy.price)
  }
  if (options.page) {
    var startIdx = options.page.idx * options.page.size
    books = books.slice(startIdx, startIdx + options.page.size)
  }


  if (!searchText) {
    return books
  } else {
    searchText = searchText.trim().toLowerCase()
    return books.filter(book => book.title.toLowerCase().includes(searchText))
  }

}


function getBookTitle() {
  return gBookTitles
}

function getBookCount(filterBy) {
  return _filterBooks(filterBy).length
}

function removeBook(bookId) {
  const book = gBooks.findIndex(book => book.id === bookId)
  gBooks.splice(book, 1)
  _saveBooks()
}
// function updateBook(bookId, title, price, rating, imgUrl) {
//   const bookToUpdate = gBooks.find(book => book.id === bookId)
//   bookToUpdate.title = title
//   bookToUpdate.price = +price
//   bookToUpdate.rating = +rating
//   bookToUpdate.imgUrl = imgUrl
//   _saveBooks()
// }


function addBook(title, price, rating, imgUrl) {
  const newBook = {
    id: makeId(),
    title,
    price,
    rating,
    imgUrl,
  }

  gBooks.unshift(newBook);
  _saveBooks();
}

function readBook(bookId) {

  const book = gBooks.find(book => book.id === bookId)
  _saveBooks()

  return book
}



function _createBooks() {
  gBooks = loadFromStorage('booksDB')
  if (!gBooks || gBooks.length === 0) {

    gBooks = [
      {
        id: makeId(),
        title: 'A Clash of Kings',
        price: 55,
        rating: getRandomIntInc(1, 5),
        imgUrl: 'imgs/A-Clash-of-Kings.jpg'
      },
      {
        id: makeId(),
        title: 'The Return of the king',
        price: 100,
        rating: getRandomIntInc(1, 5),
        imgUrl: 'imgs/The-Return-of-the-King.jpg'
      },
      {
        id: makeId(),
        title: 'Harry Potter and the Order of the Phoenix',
        price: 75,
        rating: getRandomIntInc(1, 5),
        imgUrl: 'imgs/Harry-Potter.jpg'
      },

    ]
    _saveBooks()
  }
}

function _saveBooks() {
  saveToStorage(STORAGE_KEY, gBooks)
}

function countBookPrice() {
  var expensiveCount = 0
  var averageCount = 0
  var cheapCount = 0

  gBooks.forEach(book => {
    if (book.price > 200) {
      expensiveCount++
    } else if (book.price >= 80 && book.price <= 200) {
      averageCount++
    } else if (book.price < 80) {
      cheapCount++
    }
  })
  return [expensiveCount, averageCount, cheapCount]
}

function _filterBooks(filterBy) {
  const txt = filterBy.txt.toLowerCase()
  const minRating = filterBy.minRating

  const books = gBooks.filter(book =>
    book.title.toLowerCase().includes(txt) &&
    book.rating >= minRating)

  return books
}