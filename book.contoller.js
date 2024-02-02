'use strict'

function onInit() {
  render()
}

function render() {
  const elBookList = document.querySelector('.book-table')
  const books = _getBooks()
  const strHtmls = books.map(book =>
    ` <thead>
      <tr>
        <td class="title">${book.title}</td>
        <td class="price">${book.price}</td>
        <td>
          <button class="read" onclick="onRead('${book.id}')">Read</button>
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
  ev.target.closest('tr').remove()
}

function onUpdateBook(bookPrice) {
  const elPrice = document.querySelector('.price')
  const newPrice = updatePrice(bookPrice)
  if (isNaN(newPrice) || newPrice === '') return alert('Invalid number input!')
  elPrice.innerText = newPrice
}

function onAddBook() {
  addBook()
  render()
}