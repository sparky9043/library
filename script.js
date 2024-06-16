const addButton = document.querySelector('.add-button');

const modal = document.querySelector('.modal');
const modalButtons = document.querySelectorAll('.modal button');

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

  console.log(title, author, pages);
}