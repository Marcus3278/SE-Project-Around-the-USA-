// Helper function to handle card image click
const handleImageClick = (evt) => {
  // handle image click logic
}

// Function to handle like button click
const handleLikeButtonClick = (button) => {
  button.classList.toggle("card__like-button_active");
}

// Function to handle delete button click
const handleDeleteButtonClick = (cardElement) => {
  cardElement.remove();
}

// Function to create card element
const createCardElement = (cardData) => {
  const cardElement = createElement('div', ['card']);

  const cardImage = createElement('img', ['card__image'], null, cardData.link, cardData.name);
  cardElement.appendChild(cardImage);

  const cardHeader = createElement('h2', ['card__title'], cardData.name);
  cardElement.appendChild(cardHeader);

  const cardButtons = createElement('div', ['card__buttons']);

  const likeButton = createElement('button', ['card__like-button'], null, '', 'like');
  likeButton.addEventListener('click', () => handleLikeButtonClick(likeButton));
  cardButtons.appendChild(likeButton);

  const deleteButton = createElement('button', ['card__delete-button'], null, '', 'delete');
  deleteButton.addEventListener('click', () => handleDeleteButtonClick(cardElement));
  cardButtons.appendChild(deleteButton);

  cardElement.appendChild(cardButtons);

  return cardElement;
}

// Helper function to create an element
const createElement = (tag, classNames, text, src, alt) => {
  const element = document.createElement(tag);

  if (classNames) {
    element.classList.add(...classNames);
  }

  if (text) {
    element.textContent = text;
  }

  if (src && alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;

    element.appendChild(img);
  }

  return element;
}

// Function to render card element
const renderCard = (cardData, cardList) => {
  const cardElement = createCardElement(cardData);

  cardImage.addEventListener("click", (evt) => {
    handleImageClick(evt);
  });

  cardList.appendChild(cardElement);
}

// Add event listener to edit button
edit.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});