import React from "react";

export default function InfoTooltip({ name, isOpen, isSuccess, onClose }) {
    return (
        <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_infotooltip">
                <div className={`popup__success 
                    ${isSuccess
                        ?
                        "popup__success_type_ok"
                        :
                        "popup__success_type_fail"
                    }`}>
                </div>
                <h2 className="popup__title">
                    {isSuccess
                        ?
                        "Вы успешно зарегистрировались!"
                        :
                        "Что-то пошло не так! Попробуйте еще раз"
                    }
                </h2>
                <button
                    className="popup__btn-close"
                    type="button"
                    onClick={onClose}>
                </button>
            </div>
        </section>
    )
}