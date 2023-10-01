import { useState } from "react";
import { Link } from "react-router-dom";


export default function Register({ onRegister }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);

    }

    return (
        <section className="auth">
            <h3 className="auth__title">Регистрация</h3>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                    className="auth__input"
                    name="email"
                    type="email"
                    placeholder="Введите email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                />
                <input
                    className="auth__input"
                    name="password"
                    type="password"
                    placeholder="Придумайте пароль"
                    required
                    value={password}
                    onChange={handleChangePassword}
                />
                <button
                    className="auth__btn-submit"
                    type="submit">
                    Зарегистрироваться
                </button>
            </form>
            <Link to="/sign-in"
                className="auth__link">
                Уже зарегистрированы? Войти
            </Link>
        </section>
    )
}
