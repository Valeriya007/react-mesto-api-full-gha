import { useEffect, useState } from "react"
import api from "../utils/api"


export default function CardLikeGroup({ likes, myId, cardId }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes.length)

  useEffect(() => {
    setIsLiked(likes.some(i => myId === i))
  }, [likes, myId])

  function handleCardLike() {
    if (isLiked) {
      api.deleteLike(cardId, localStorage.jwt)
        .then(res => {
          setIsLiked(false)
          setLikeCount(res.likes.length)
        })
        .catch((error => console.error(`Ошибка удаления лайка ${error}`)))
    } else {
      api.putLike(cardId, localStorage.jwt)
        .then(res => {
          setIsLiked(true)
          setLikeCount(res.likes.length)
        })
        .catch((error => console.error(`Ошибка добавления лайка ${error}`)))
    }
  }

  return (
    <div className="card__like-group">
      <button type="button"
        className={`card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`}
        onClick={handleCardLike}
      />
      <span className="card__like-counter">
        {likeCount}
      </span>
    </div>
  )
}