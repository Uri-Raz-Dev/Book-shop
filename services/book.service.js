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