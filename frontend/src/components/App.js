import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import api from "../utils/api.js";
import * as apiAuth from "../utils/apiAuth.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import EditDeletePopup from "./EditDeletePopup.js";
import InfoTooltip from "./InfoTooltip.js";


function App() {
  const navigate = useNavigate()

  //стейт контекста
  const [currentUser, setCurrentUser] = useState({})

  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false)
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImgPopup, setImgPopup] = useState(false)

  //стейт карточки
  const [cards, setCards] = useState([])
  const [deleteCardId, setDeleteCardId] = useState("");

  //стейты авторизации  
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isSuccessful, setIsSuccessful] = useState(false)

  //закрытие всех попапов

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setDeletePopupOpen(false)
    setImgPopup(false)
    setIsInfoTooltipPopup(false)
    setSelectedCard({
      name: '',
      link: ''
    })
  }, [])

  //функции открытия попапов

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImgPopup(true)
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId)
    setDeletePopupOpen(true)
  }

  //начальный запрос на сервер

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser)
          setCards(dataCard)
        })
        .catch((error => console.error(`Ошибка ${error}`)))
    }
  }, [loggedIn])


  useEffect(() => {
    if (localStorage.jwt) {
      apiAuth
        .getDataUser(localStorage.jwt)
        .then((res) => {
          setLoggedIn(true)
          setUserEmail(res.email)
          navigate('/')
        })
        .catch((error => console.error(`Ошибка ${error}`)))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])

  function handleRegister(email, password) {
    apiAuth
      .register(email, password)
      .then((res) => {
        setIsInfoTooltipPopup(true)
        setIsSuccessful(true)
        navigate('/sign-in')
      })
      .catch((error) => {
        setIsInfoTooltipPopup(true)
        setIsSuccessful(false)
        console.error(`Ошибка регистрации ${error}`)
      })
  }

  function handleLogin(email, password) {
    apiAuth
      .login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/')
      })
      .catch((error) => {
        setIsInfoTooltipPopup(true)
        setIsSuccessful(false)
        console.error(`Ошибка авторизации ${error}`)
      })
  }

  function handleLogOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    navigate('/sign-in')
  }

  function handleCheckToken(token) {
    apiAuth
      .getDataUser(token)
      .then((res) => {
        setLoggedIn(res.data != null)
        setUserEmail(res.data.email)
        navigate('/')
      })
      .catch((error => console.error(`Ошибка ${error}`)))
  }


  //обработчик данных пользователя

  function handleUpdateUser(dataUser, reset) {
    api.setUserInfo(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
  }


  //обработчик изменения аватара 

  function handleUpdateAvatar(dataUser, reset) {
    api.setNewAvatar(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error => console.error(`Ошибка обновления аватара ${error}`)))
  }

  //обработчик добавления карточки

  function handleAddPlaceSubmit(dataCard, reset) {
    api.addNewCard(dataCard, localStorage.jwt)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error => console.error(`Ошибка добавления карточки ${error}`)))
  }

  //обработчик удаления карточки

  function handleCardDelete() {
    api.deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards((cards) =>
          cards.filter((item) =>
            item._id !== deleteCardId))
        closeAllPopups()
      })
      .catch((error => console.error(`Ошибка удаления карточки ${error}`)))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header
          email={userEmail}
          loggedIn={loggedIn}
          onLogOut={handleLogOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                email={userEmail}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleDeletePopupClick}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login onLogin={handleLogin}
                onCheckToken={handleCheckToken} />}
          />
          <Route
            path="/sign-up"
            element={
              <Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={<Navigate to='/' replace />}
          />

        </Routes>
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <EditDeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImgPopup}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name='infotooitip'
          isOpen={isInfoTooltipPopup}
          isSuccess={isSuccessful}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


