import useFormValidation from "../utils/FormValidation";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({ name: values.name, link: values.link }, reset)
  }

  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      button='Создать'
    >
      <div className="popup__field">
        <input
          id="title"
          className={`popup__input popup__input_type_title ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_invalid'}`}
          type="text"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={values.name ? values.name : ''}
          onChange={handleChange}
        />
        <span
          id="error-title"
          className="popup__error popup__error_type_title">
          {errors.name}
        </span>
      </div>
      <div className="popup__field">
        <input
          id="url"
          className={`popup__input popup__input_type_url ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_invalid'}`}
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={values.link ? values.link : ''}
          onChange={handleChange}
        />
        <span id="error-url"
          className="popup__error popup__error_type_url">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  )
}