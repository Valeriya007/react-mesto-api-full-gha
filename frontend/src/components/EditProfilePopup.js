import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";
import useFormValidation from "../utils/FormValidation";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

  useEffect(() => {
    setValue("username", currentUser.name)
    setValue("info", currentUser.about)
  }, [currentUser, setValue])

  function resetForClose() {
    onClose()
    reset({ username: currentUser.name, info: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ username: values.username, info: values.info }, reset)
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          name="username"
          id="username"
          className={`popup__input popup__input_type_username ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_invalid'}`}
          type="text"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required
          value={values.username ? values.username : ''}
          onChange={handleChange}
        />
        <span
          id="error-username"
          className="popup__error popup__error_type_username">
          {errors.username}
        </span>
      </div>
      <div className="popup__field">
        <input
          name="info"
          id="info"
          className={`popup__input popup__input_type_info ${isInputValid.info === undefined || isInputValid.info ? '' : 'popup__input_invalid'}`}
          type="text"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required
          value={values.info ? values.info : ''}
          onChange={handleChange}
        />
        <span
          id="error-info"
          className="popup__error popup__error_type_info">
          {errors.info}
        </span>
      </div>
    </PopupWithForm>
  )
}