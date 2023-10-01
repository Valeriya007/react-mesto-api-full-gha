export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_content_image ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_image" >
        <button
          className="popup__btn-close popup__btn-close_image"
          type="button"
          onClick={onClose}
        />
        <figure className="popup__figure">
          <img
            src={card.link}
            alt={card.name}
            className="popup__image"
          />
          <figcaption
            className="popup__image-caption">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}