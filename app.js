// Book Class: represents a book

/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store class
class store {
  static getBooks() {
    let bookstore;
    if (localStorage.getItem('bookstore') === null) {
      bookstore = [];
    } else {
      bookstore = JSON.parse(localStorage.getItem('bookstore'));
    }
    return bookstore;
  }

  static addBooks(book) {
    const books = store.getBooks();
    books.push(book);
    localStorage.setItem('bookstore', JSON.stringify(books));
  }

  static removeBooks(isbn) {
    const books = store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('bookstore', JSON.stringify(books));
  }
}

// UI Class: UI tasks
class UI {
  static displayBooks() {
    const books = store.getBooks();

    //  after that you have set up the local storage
    // set const books = store.getBooks();
    // delete the stored books array

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML += `
        <td class="fw-bold">${book.title}</td>
        <td class="fw-bold">${book.author}</td>
        <td class="fw-bold">${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

    list.appendChild(row);
  }

  static deleteBook(target) {
    target.parentElement.parentElement.remove();
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // vanish in 3 sec

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearField() {
    const form = document.getElementById('book-form');
    form.reset();
  }
}

// event: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// event: add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('ISBN').value;

  // validate
  if (title === ' ' || author === ' ' || isbn === ' ') {
    UI.showAlert('Fill all the inputs', 'danger');
  } else {
    // instantiate book
    const book = new Book(title, author, isbn);

    UI.addBookToList(book);
    //  add book to store
    store.addBooks(book);

    UI.clearField();

    //  alert for book added

    UI.showAlert('Book Added', 'success');
  }
});
// event: remove a book

// Remove book from UI
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  // remove book from the store

  store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

  //  alert for book added

  UI.showAlert('Book removed successfully', 'success');
});
