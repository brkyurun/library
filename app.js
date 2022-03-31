let myLibrary = [
  {
    name: "The Lord of the Rings",
    author: "J. R. R. Tolkien",
    pages: 596,
    readStatus: false,
  },
  {
    name: "The Hobbit",
    author: "J. R. R. Tolkien",
    pages: 295,
    readStatus: false,
  },
  {
    name: "It",
    author: "Stephen King",
    pages: 1138,
    readStatus: true,
  },
];

function Book(name, author, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addToLibrary() {
  const bookName = prompt("Book name:");
  const bookAuthor = prompt("Book author:");
  const bookPages = +prompt("Book pages:");
  const bookReadStatus = prompt("Have you read it?:");

  let book = new Book(bookName, bookAuthor, bookPages, bookReadStatus);
  myLibrary.push(book);
  return `${bookName} has been added to your collection.`;
}

function createBookCard(object) {
  const bookGrid = document.querySelector("main");
  const bookCard = document.createElement("div");
  const bookTexts = document.createElement("div");
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookStatus = document.createElement("p");

  bookCard.className = "book-card";
  bookTexts.className = "book-texts";

  bookTitle.className = "book-title";
  bookTitle.textContent = object.name;
  bookTexts.appendChild(bookTitle);

  bookAuthor.className = "book-author";
  bookAuthor.textContent = object.author;
  bookTexts.appendChild(bookAuthor);

  bookPages.className = "book-pages";
  bookPages.textContent = object.pages;
  bookTexts.appendChild(bookPages);

  bookStatus.className = "book-status";
  if (object.readStatus) {
    bookStatus.textContent = "Read 👍🏻";
  } else {
    bookStatus.textContent = "Haven't read 👎🏻";
  }

  bookCard.appendChild(bookTexts);
  bookCard.appendChild(bookStatus);
  bookGrid.appendChild(bookCard);
}

function updateDisplay(array) {
  for (let book of array) {
    createBookCard(book);
  }
}
