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
      console.log(this);
      break;
    case "close":
      modal.close();
      break;
    default:
      break;
  }
}));