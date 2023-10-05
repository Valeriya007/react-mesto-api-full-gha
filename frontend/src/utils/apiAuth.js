export const baseUrl = "http://localhost:3000";

function getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export function register(email, password) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then((res) => getResponse(res))
}

export function login(email, password) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then((res) => getResponse(res))
}

export function getDataUser(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then((res) => getResponse(res))
}

