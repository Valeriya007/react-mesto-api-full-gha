import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header({ loggedIn, email, onLogOut }) {
  const { pathname } = useLocation()

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип Место"
        className="header__logo"
      />
      <div className="header__wrapper">
        {loggedIn && <p className="header__email">{email}</p>}

        {loggedIn
          ? (
            <Link to="/sign-in" className="header__url" onClick={onLogOut}>
              Выйти
            </Link>
          )
          : (
            pathname === '/sign-in'
              ?
              <Link to="/sign-up" className="header__button">
                Регистрация
              </Link>
              :
              <Link to="/sign-in" className="header__button">
                Войти
              </Link>
          )
        }
      </div>
    </header>
  )
}