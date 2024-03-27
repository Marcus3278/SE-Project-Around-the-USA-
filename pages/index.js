import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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


// Image preview handler

const handleImageClick = (cardData) => {
  console.log(`Previewing card: ${cardData.name}`);
  previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageElementName.textContent = cardData.name;
  openModal(previewImageModal);
};

// Form configuration
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Initialize form validation
const forms = document.querySelectorAll(config.formSelector);
forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});

// Modal and form elements
const editButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputTitle = document.querySelector(".modal__input-title");
const inputSubtitle = document.querySelector(".modal__input-subtitle");
const profileCloseButton = document.querySelector(".modal__close-button");
const profileEditForm = editProfileModal.querySelector(".modal__container");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");
const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#modal-add-card");
const closeAddFormButton = addCardModal.querySelector(".modal__close-button");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardName = addCardModal.querySelector(".modal__input-name");
const cardLink = addCardModal.querySelector(".modal__input-link");
const previewImageModal = document.querySelector("#modal-preview");
const closePreviewButton = previewImageModal.querySelector(
  ".modal__close-button"
);
const previewImageElement = previewImageModal.querySelector(
  ".modal__preview-image"
);
const previewImageElementName = previewImageModal.querySelector(
  ".modal__image-title"
);

// Modal control functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("click", clickOutsideHandler);
  document.addEventListener("keyup", escapeKeyHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("click", clickOutsideHandler);
  document.removeEventListener("keyup", escapeKeyHandler);
}

function clickOutsideHandler(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function escapeKeyHandler(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

// Profile and card form submission handlers
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  renderCard({ name, link });
  closeModal(addCardModal);
  addCardForm.reset();
}

// Event listeners for forms and modals
editButton.addEventListener("click", () => {
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  openModal(editProfileModal);
});
profileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
closePreviewButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

// Add new card button listener
addButton.addEventListener("click", () => {
  openModal(addCardModal);
});

// Close add form button listener
closeAddFormButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

// Card creation and rendering
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
};

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardList.append(cardElement);
});

function renderCard(cardData) {
  console.log(`Rendering new card: ${cardData.name}`);
  const card = createCard(cardData);
  cardList.prepend(card);
}