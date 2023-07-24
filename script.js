let currentDraggingElementId = null;

function createNewCardInColumn(id) {         
    var newCard = document.createElement('div');
    var text = document.createElement('p');
    text.textContent = "edit task";
    text.contentEditable = true;
    const button = document.createElement('button');
    button.textContent = 'delete card';
    button.onclick = deleteThisCard;      
    newCard.classList.add("card");
    newCard.draggable = true;
    newCard.addEventListener('dragstart', dragStart);
    newCard.id = Math.random()
    newCard.classList.add("card-draggable");
    id.appendChild(newCard);
    newCard.appendChild(text);
    newCard.appendChild(button);      
}

function deleteThisCard() {
    this.parentElement.remove();
}

function dragStart(event) {
    currentDraggingElementId = event.target.id;
    event.dataTransfer.setData("text/plain", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();    
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);

    if (draggedElement.classList.contains("card-draggable")) {
      event.preventDefault();
    }
  }

  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    const targetElement = event.target;  
    
    if (draggedElement.classList.contains("card-draggable")) {
      if (targetElement.classList.contains("menu")) {        
        targetElement.appendChild(draggedElement);
      } else if (targetElement.parentNode.classList.contains("menu")) {        
        targetElement.parentNode.insertBefore(draggedElement, targetElement.nextSibling);
      }
    }
  
    currentDraggingElementId = null;
  }