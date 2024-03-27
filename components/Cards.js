class Card {
  constructor({ data, cardSelector, handleCardImageClick, handleCardDeleteClick, handleCardLikeClick }, cardId) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleCardLikeClick = handleCardLikeClick;
    this._cardElement = null;
    this._cardId = cardId;
    this._likeButton = null;
    this._deleteButton = null;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", this._handleCardLikeClick.bind(this));

    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    this._deleteButton.addEventListener("click", this._handleCardDeleteClick.bind(this));

    this._cardElement.querySelector(".card__image").addEventListener("click", this._handleCardImageClick.bind(this));
  }

  _handleCardDeleteClick() {
    this._handleCardDeleteClick(this._cardId);
    this._cardElement.remove();
  }

  _handleCardLikeClick() {
    this._handleCardLikeClick(this._cardId);
    this.toggleLike();
  }

  toggleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  updateLikesCount(newLikesCount) {
    this._cardElement.querySelector(".card__like-count").textContent = newLikesCount;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__title").textContent = this._data.name;
    this._cardElement.querySelector(".card__image").src = this._data.link;
    this._cardElement.querySelector(".card__like-count").textContent = this._data.likes.length;
    this._updateCardDeleteButton();
    return this._cardElement;
  }

  _updateCardDeleteButton() {
    if (this._data.owner._id !== this._userId) {
      this._deleteButton.remove();
    }
  }
}

function openModal(modalElement, closeModalOnEscape = true) {
  if (closeModalOnEscape) {
    document.addEventListener("keydown", closeModalOnEscape);
  }
  modalElement.classList.add("modal_open");
}

function closeModalOnEscape(evt) {
  if (evt.key === "Escape") {
    const activeModalElement = document.querySelector(".modal_open");
    closeModal(activeModalElement);
  }
}

function closeModal(modalElement) {
  if (typeof closeModalOnEscape === "function") {
    document.removeEventListener("keydown", closeModalOnEscape);
  }
  modalElement.classList.remove("modal_open");
}