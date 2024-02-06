'use strict'

var gBooks
_createBooks()

function getBooks(searchText) {

  if (!searchText) {
    return gBooks;
  } else {
    searchText = searchText.trim().toLowerCase()
    return gBooks.filter(book => book.title.toLowerCase().includes(searchText))
  }
}


function removeBook(bookId) {
  const book = gBooks.findIndex(book => book.id === bookId)
  gBooks.splice(book, 1)
  _saveBooks()
}



function updatePrice(newPrice, bookID) {
  const bookToUpdate = gBooks.find(book => book.id === bookID)
  bookToUpdate.price = +newPrice
  _saveBooks()
}


function addBook(title, price) {
  const newBook = {
    id: makeId(),
    title: title,
    price: price,
    imgUrl: 'imgs/The-Hobbit.jpg'
  }

  gBooks.unshift(newBook)
  _saveBooks()
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
  saveToStorage('booksDB', gBooks)
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