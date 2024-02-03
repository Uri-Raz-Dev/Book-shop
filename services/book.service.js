'use strict'

var gBooks = [
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

function _getBooks() {
 return gBooks
}

function removeBook(bookId) {
 const book = gBooks.findIndex(book => book.id === bookId)
 gBooks.splice(book, 1)

}



function updatePrice(bookID) {
 const updatePrice = prompt('Enter a new book price')
 gBooks.findIndex(book => {

  if (book.id === bookID) {
   book.price = +updatePrice
  }
 }
 )
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

}

function readBook(bookId) {

 const book = gBooks.find(book => book.id === bookId)
 return book
}
