export default function PopupWithForm({
  name,
  title,
  button,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true }) {

  return (
    <section
      className={`popup popup_content_${name} 
        ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__btn-close"
          type="button"
          onClick={onClose}
        />
        <form className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}>
          <h3 className={`popup__title`}>
            {title}
          </h3>

          {children}

          <button
            className={`popup__btn-save 
            ${isValid ? '' : 'popup__btn-save_disabled'}`}
            type="submit">
            {button || 'Сохранить'}
          </button>
        </form>
      </div>
    </section>
  )
}