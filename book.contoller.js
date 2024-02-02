'use strict'

function onInit() {
 render()
}

function render() {
 const elBookList = document.querySelector('.book-table')
 const books = _getBooks()
 const strHtmls = books.map(book =>
  ` <thead>
      <tr class="title">
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>
          <button class="read" onclick="onRead(this)">Read</button>
          <button class="update" onclick="onUpdate(this)">Update</button>
          <button class="delete" onclick="onDelete(this)">Delete</button>
        </td>
      </tr>`
 )
 elBookList.innerHTML = strHtmls.join('')
}

