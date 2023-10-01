import Card from "./Card.js"
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import { useContext } from "react"

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  cards }) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар профиля" className="profile__image" />
          </div>
          <div className="profile__content">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name ? currentUser.name : ''}</h1>
              <button className="profile__edit-btn" type="button" onClick={onEditProfile} />
            </div>
            <p className="profile__info">{currentUser.about ? currentUser.about : ''}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace} />
      </section>
      <section className="photo-grid"
        aria-label="Карточки с фотографиями">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}