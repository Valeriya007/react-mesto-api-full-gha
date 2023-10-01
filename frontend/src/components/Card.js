import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext"
import CardLikeGroup from "./CardLikeGroup";

export default function Card({ card, onCardClick, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)

  const isOwn = card.owner === currentUser._id;

  function handleClick() {
    onCardClick({ link: card.link, name: card.name })
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }


  return (
    <article className="card">
      {isOwn &&
        <button className="card__delete-btn"
          type="button"
          onClick={handleDeleteClick}
        />}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">
          {card.name}
        </h2>
        <CardLikeGroup
          likes={card.likes}
          myId={currentUser._id}
          cardId={card._id}
        />
      </div>
    </article>
  )
}