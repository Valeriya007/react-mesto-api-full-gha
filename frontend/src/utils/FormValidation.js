import { useCallback, useState } from "react";

export default function useFormValidation() {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(false)
    const [isInputValid, setIsInputValid] = useState({})

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        const validationMessage = e.target.validationMessage
        const valid = e.target.validity.valid
        const form = e.target.form

        setValues((Values) => {
            return { ...Values, [name]: value }
        })

        setErrors((Errors) => {
            return { ...Errors, [name]: validationMessage }
        })

        setIsInputValid((IsInputValid) => {
            return { ...IsInputValid, [name]: valid }
        })

        setIsValid(form.checkValidity())
    }

    function reset(data = {}) {
        setValues(data)
        setErrors({})
        setIsValid(false)
        setIsInputValid({})
    }

    const setValue = useCallback((name, value) => {
        setValues((Values) => {
            return { ...Values, [name]: value }
        })
    }, [])

    return { values, errors, isValid, isInputValid, handleChange, reset, setValue }
}