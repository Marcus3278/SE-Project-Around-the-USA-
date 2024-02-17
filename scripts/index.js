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

console.log(initialCards);

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const editSaveButton = document.querySelector("#edit-save-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const saveCardButton = document.querySelector("#save-add-card-button");
const cardTitleInput = document.querySelector("#add-title-input");
const cardLinkInput = document.querySelector("#add-image-input");
const addModalForm = document.querySelector("#add-card-modal");
const previewCardModal = document.querySelector("#modal-preview");
const closeButtons = document.querySelectorAll(".modal__close");
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleEditProfileSubmit);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addModalForm.addEventListener("submit", handleAddCardSubmit);

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const data = { name, link };

  const newCard = getCardElement(data);
  cardListEl.prepend(newCard);
  e.target.reset();
  closeModal(addCardModal);
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewCardModal);
    previewImage.src = data.link;
    previewDescription.textContent = data.name;
    previewImage.alt = `${data.name}`;
  });

  cardTextEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  return cardElement;
}
