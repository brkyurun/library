const modal = document.querySelector(".modal");
const openModal = document.querySelector("#openModal");
const closeModal = document.querySelector("#closeModal");
const addBookButton = document.querySelector("#addBook");
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
let firstRun = null;
let myLibrary = [];

openModal.addEventListener("click", () => {
  addBlur();
  modal.classList.add("is-visible");
});

closeModal.addEventListener("click", () => {
  removeBlur();
  clearFormFields();
  modal.classList.remove("is-visible");
});

addBookButton.addEventListener("click", () => {
  const bookName = document.querySelector("#bookName").value;

  addToLibrary();
  alert(`${bookName} has been added to your collection 😁.`);
  updateDisplay(myLibrary);
  removeBlur();
  clearFormFields();
  modal.classList.remove("is-visible");
});

class Book {
  constructor(name, author, pages, readStatus) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
  changeStatus() {
    if (this.readStatus === false) {
      this.readStatus = true;
    } else {
      this.readStatus = false;
    }
  }
}

function addToLibrary() {
  const bookName = document.querySelector("#bookName").value;
  const bookAuthor = document.querySelector("#bookAuthor").value;
  const bookPages = document.querySelector("#bookPages").value;
  const bookStatus = document.querySelector("#bookStatus").checked;

  let book = new Book(bookName, bookAuthor, bookPages, bookStatus);
  myLibrary.push(book);
}

function addBlur() {
  const elements = [header, main, footer];
  for (let element of elements) {
    element.classList.add("blur");
  }
}

function removeBlur() {
  const elements = [header, main, footer];
  for (let element of elements) {
    element.classList.remove("blur");
  }
}

function createBookCard(object) {
  const bookGrid = document.querySelector("main");
  const bookCard = document.createElement("div");
  const bookTexts = document.createElement("div");
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookStatus = document.createElement("p");
  const bookButtons = document.createElement("div");
  const bookRemoveButton = document.createElement("button");
  const bookStatusChange = document.createElement("button");
  const bookIndex = myLibrary.findIndex((book) => book.name === object.name);

  bookCard.className = "book-card";
  bookCard.dataset.index = bookIndex;
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

  bookButtons.className = "book-buttons-container";
  bookRemoveButton.textContent = "Remove";
  bookRemoveButton.addEventListener("click", () => {
    const index = bookRemoveButton.parentNode.dataset.index;
    myLibrary.splice(index, 1);
    bookRemoveButton.parentNode.parentElement.remove();
  });
  bookButtons.appendChild(bookRemoveButton);

  bookStatusChange.textContent = "Update";
  bookStatusChange.addEventListener("click", () => {
    const index = bookStatusChange.parentNode.parentElement.dataset.index;
    const book = myLibrary[index];
    book.changeStatus();
    if (object.readStatus) {
      bookStatus.textContent = "Read 👍🏻";
    } else {
      bookStatus.textContent = "Haven't read 👎🏻";
    }
  });
  bookButtons.appendChild(bookStatusChange);

  bookCard.appendChild(bookTexts);
  bookCard.appendChild(bookStatus);
  bookCard.appendChild(bookButtons);
  bookGrid.appendChild(bookCard);
}

function updateDisplay(arr) {
  if (firstRun) {
    createBookCard(arr[arr.length - 1]);
  } else if (firstRun === null) {
    for (let book of arr) {
      createBookCard(book);
    }
    firstRun = true;
  }
}

function clearFormFields() {
  const bookName = document.querySelector("#bookName");
  const bookAuthor = document.querySelector("#bookAuthor");
  const bookPages = document.querySelector("#bookPages");
  const bookStatus = document.querySelector("#bookStatus");

  const toBeCleared = [bookName, bookAuthor, bookPages];
  for (let text of toBeCleared) {
    text.value = "";
  }
  bookStatus.checked = false;
}
