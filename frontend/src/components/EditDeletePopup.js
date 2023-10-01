import PopupWithForm from "./PopupWithForm";

export default function EditDeletePopup({ isOpen, onClose, onSubmit }) {

    function handleSubmit(evt) {
        evt.preventDefault()
        onSubmit()
    }

    return (
        <PopupWithForm
            name='delete'
            title='Вы уверены?'
            button='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    )
}