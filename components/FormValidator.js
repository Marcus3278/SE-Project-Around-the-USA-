export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _toggleInputError(inputElement, isErrorVisible) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.toggle(this._settings.inputErrorClass, isErrorVisible);
    errorElement.textContent = isErrorVisible ? inputElement.validationMessage : '';
    errorElement.classList.toggle(this._settings.errorClass, isErrorVisible);
  }

  _checkInputValidity(inputElement) {
    const isValid = inputElement.validity.valid;
    this._toggleInputError(inputElement, !isValid);
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    const isInvalid = this._hasInvalidInput();
    this._submitButton.classList.toggle(this._settings.inactiveButtonClass, isInvalid);
    this._submitButton.disabled = isInvalid;
  }

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", event => {
      event.preventDefault();
      this._toggleButtonState();
    });

    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputList.forEach(input => {
      this._toggleInputError(input, false);
    });
    this._toggleButtonState();
  }
}