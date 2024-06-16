const addButton = document.querySelector('.add-button');
const modal = document.querySelector('.modal');
const modalButtons = document.querySelectorAll('.modal button');
const library = document.querySelector('.main__library');
const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = false;
}

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  
  modal.showModal();
});

modalButtons.forEach(button => button.addEventListener("click", function(event) {
  event.preventDefault();
  
  switch (event.target.className) {
    case "add":
      const inputs = modal.querySelectorAll('ul input');
      getBookInfo(inputs);
      break;
    case "close":
      modal.close();
      break;
    default:
      break;
  }
}));

function getBookInfo(inputList) {
  let title;
  let author;
  let pages;

  for (const input of inputList) {
    if (input.id.includes('title')) title = input.value;
    else if (input.id.includes('author')) author = input.value;
    else if (input.id.includes('pages')) pages = input.value;
  }

  addBookToLibrary(title, author, pages);
}


function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);

  copyInfoToCard(library, book);
}

function copyInfoToCard(target, bookObject) {
  const card = document.createElement('div');
  const container = document.createElement('div');
  const title = document.createElement('h3');
  const author = document.createElement('p');
  const pages = document.createElement('p');

  card.classList.add('card');
  container.classList.add('container');
  card.dataset.id = myLibrary.length - 1;

  title.textContent = bookObject.title;
  author.textContent = bookObject.author;
  pages.textContent = bookObject.pages;

  const buttonContainer = document.createElement('div');
  const removeButton = document.createElement('button');
  const readStatusButton = document.createElement('button');

  buttonContainer.classList.add('button-container');
  removeButton.classList.add('remove-book');
  readStatusButton.classList.add('read-status');

  removeButton.textContent = "Remove";
  readStatusButton.textContent = "Not Read";

  buttonContainer.appendChild(removeButton);
  buttonContainer.appendChild(readStatusButton);

  container.appendChild(title);
  container.appendChild(author);
  container.appendChild(pages);
  card.appendChild(container);
  card.appendChild(buttonContainer);

  target.appendChild(card);

  attachListenerToButtons(card, removeButton, readStatusButton);
}

function attachListenerToButtons(card, remove, readStatus) {
  remove.addEventListener('click', function() {
    function removeCard() {
      const index = this.dataset.id;
      myLibrary.splice(index, 1);
      this.remove();
      reassignDataID(index);
      console.log(myLibrary);
    }

    removeCard.call(card);
  });

  readStatus.addEventListener('click', function() {
    function updateReadStatus() {
      console.log(this);
    }
  });
}

function reassignDataID(index) {
  const cards = document.querySelectorAll('.main__library .card');
  for (let i = index; i < cards.length; i++) {
    cards[i].dataset.id = i;
  }
}