import { useState } from "react";

export default function Login({ onLogin }) {

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
        onLogin(email, password);

    }

    return (
        <section className="auth">
            <h3 className="auth__title">Вход</h3>
            <form
                className="auth__form"
                onSubmit={handleSubmit}>
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
                    placeholder="Введите пароль"
                    required
                    value={password}
                    onChange={handleChangePassword}
                />
                <button
                    className="auth__btn-submit"
                    type="submit">
                    Войти
                </button>
            </form>
        </section>
    )
}