import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/FormValidation";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = useRef()
  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({ avatar: input.current.value }, reset)
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__field">
        <input
          ref={input}
          id="avatar"
          name="avatar"
          type="url"
          className={`popup__input popup__input_type_url ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_invalid'}`}
          placeholder="Ссылка на картинку"
          required
          value={values.avatar ? values.avatar : ''}
          onChange={handleChange}
        />
        <span
          id="error-avatar"
          className="popup__error popup__error_type_avatar">
          {errors.avatar}
        </span>
      </div>
    </PopupWithForm>
  )
}
