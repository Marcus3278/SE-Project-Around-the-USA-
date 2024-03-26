const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */

const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector("#modal__close-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#card__add-modal");
const addNewCardModalCloseBtn = addNewCardModal.querySelector("#modal__close-button");

const previewImgModal = document.querySelector("#preview__img-modal");
const imageModalElement = previewImgModal.querySelector(".popup__img");
const imageModalCaption = previewImgModal.querySelector(".preview__img_caption");
const previewImgModalCloseBtn = previewImgModal.querySelector("#modal__close-button");

// Form data
const profileEditForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];

const profileNameInput = document.querySelector("#profile__name-input");
const profileDescriptionInput = document.querySelector("#profile__description-input");

const cardTitleInput = addCardForm.querySelector(".modal__input_title");
const cardLinkInput = addCardForm.querySelector(".modal__input_link");

const cardListElement = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template").content.firstElementChild;

// Functions

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardNameElement = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-btn");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    imageModalElement.src = cardData.link;
    imageModalElement.alt = cardData.name;
    imageModalCaption.textContent = cardData.name;

    openModal(previewImgModal);
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardNameElement.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
}

// Event Handlers

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link });
  event.target.reset();
  closePopup(addNewCardModal);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

function handleCloseModal(evt) {
  const modal = evt.target.closest('.modal');
  if (modal && (evt.target.classList.contains("modal_opened") || evt.target.classList.contains("modal__close"))) {
    closePopup(modal);
  }
}

// Event Listeners

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", handleCloseModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

initialCards.forEach((cardData) => renderCard(cardData));
