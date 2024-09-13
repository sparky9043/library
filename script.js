const addButton = document.querySelector('.add-button');
const modal = document.querySelector('.modal');
const modalButtons = document.querySelectorAll('.modal button');
const library = document.querySelector('.main__library');
const myLibrary = [];

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = false;
  }

  updateReadStatus() {
    this.readStatus = this.readStatus === false ? true : false;
  }
}

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  
  modal.showModal();
});

modalButtons.forEach(button => button.addEventListener("click", function(event) {
  
  switch (event.target.className) {
    case "add":
      const inputs = modal.querySelectorAll('ul input');
      checkValidity(inputs);
      getBookInfo(inputs);
      // clearInput(inputs);
      break;
    case "close":
      modal.close();
      break;
    default:
      break;
  }
}));

function checkValidity(inputs) {
  const [title, author, pages] = inputs;

  if (title.validity.valueMissing) {
    title.setCustomValidity("Please enter a valid title!");
  } else if (author.validity.valueMissing) {
    author.setCustomValidity("Please enter a valid author!");
  } else if (pages.validity.valueMissing) {
    pages.setCustomValidity('Please enter a number');
  }

}

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

function clearInput(inputList) {
  for (const input of inputList) {
    if (input.id.includes('title')) input.focus();
    input.value = '';
  }
}


function addBookToLibrary(title, author, pages) {
  if (!title || !author || !pages) {
    return;
  }
  const book = new Book(title, author, pages);
  myLibrary.push(book);
  console.log(book, myLibrary);

  copyInfoToCard(library, myLibrary);
}

function copyInfoToCard(target, libraryArray) {
  const card = document.createElement('div');
  const container = document.createElement('div');
  const title = document.createElement('h3');
  const author = document.createElement('p');
  const pages = document.createElement('p');

  card.classList.add('card');
  container.classList.add('container');
  card.dataset.id = libraryArray.length - 1;

  title.textContent = libraryArray[libraryArray.length - 1].title;
  author.textContent = libraryArray[libraryArray.length - 1].author;
  pages.textContent = libraryArray[libraryArray.length - 1].pages;

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
    }

    removeCard.call(card);
  });

  readStatus.addEventListener('click', function(event) {
    function toggleReadStatus() {
      const index = this.dataset.id;
      myLibrary[index].updateReadStatus();
      event.target.textContent = myLibrary[index].readStatus === true ? 'Read' : 'Not Read';
      this.classList.toggle('green');
    }

    toggleReadStatus.call(card);
  });
}

function reassignDataID(index) {
  const cards = document.querySelectorAll('.main__library .card');
  for (let i = index; i < cards.length; i++) {
    cards[i].dataset.id = i;
  }
}