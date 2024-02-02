'use strict'

var gBooks

_getBooks()
function _getBooks() {
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
 return gBooks
}

function removeBook(bookId) {
 const book = gBooks.findIndex(book => book.id === bookId)
 gBooks.splice(book, 1)

}


function updatePrice() {
 const updatePrice = prompt('Enter a new book price')
 return updatePrice
}

function addBook() {
 const addTitle = prompt('Enter a book title')
 const addPrice = prompt('Enter a book price')
 const newBook = {
  id: makeId(),
  title: addTitle,
  price: addPrice,
  imgUrl: 'imgs/default.jpg'
 }
 gBooks.unshift(newBook)
 render()
}


// function _addBooks() {
//  // gTodos = loadFromStorage('todoDB')
//  if (!gBooks || gBooks.length === 0) {

//   gBooks = [
//    _createTodo('Do this'),
//    _createTodo('Do that'),
//    _createTodo('Try this')
//   ]
//   _saveTodos()
//  }
// }
