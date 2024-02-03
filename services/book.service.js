'use strict'

var gBooks
_createBooks()

function _getBooks(searchText) {
 if (!searchText) {
  return gBooks;
 } else {
  searchText = searchText.toLowerCase()
  return gBooks.filter(book => book.title.toLowerCase().includes(searchText))
 }
}


function removeBook(bookId) {
 const book = gBooks.findIndex(book => book.id === bookId)
 gBooks.splice(book, 1)
 _saveBooks()
}



function updatePrice(bookID) {
 const updatePrice = prompt('Enter a new book price')
 gBooks.findIndex(book => {

  if (book.id === bookID) {
   book.price = +updatePrice
  }
 }
 )
 _saveBooks()

 return updatePrice
}


function addBook() {
 const addTitle = prompt('Enter a book title')
 const addPrice = prompt('Enter a book price')
 const newBook = {
  id: makeId(),
  title: addTitle,
  price: addPrice,
  imgUrl: 'imgs/The-Hobbit.jpg'
 }
 if (isNaN(newBook.price) || newBook.price === '' || newBook.name === '' || newBook.price === null || newBook.name === null) return alert('Invalid input!')

 gBooks.unshift(newBook)
 _saveBooks()


}

function readBook(bookId) {

 const book = gBooks.find(book => book.id === bookId)
 _saveBooks()

 return book
}

function searchBook(txt) {
 if (!txt) return gBooks
 const searchResult = gBooks.filter(book => book.title.toLowerCase().includes(txt.toLowerCase()));
 return searchResult
}


function _createBooks() {
 gBooks = loadFromStorage('booksDB')
 if (!gBooks || gBooks.length === 0) {

  gBooks = [
   {
    id: makeId(),
    title: 'A Clash of Kings',
    price: 55,
    imgUrl: 'imgs/A-Clash-of-Kings.jpg'
   },
   {
    id: makeId(),
    title: 'The Return of the king',
    price: 100,
    imgUrl: 'imgs/The-Return-of-the-King.jpg'
   },
   {
    id: makeId(),
    title: 'Harry Potter and the Order of the Phoenix',
    price: 75,
    imgUrl: 'imgs/Harry-Potter.jpg'
   },

  ]
  _saveBooks()
 }
}

function _saveBooks() {
 saveToStorage('booksDB', gBooks)
}

