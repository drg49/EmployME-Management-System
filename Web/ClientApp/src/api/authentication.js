export function validateUser() {
    return fetch("app/users/validate", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    })
}

export function login(loginInfo) {
    return fetch("app/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
    })
}

export function register(registerInfo) {
    return fetch("app/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerInfo)
    })
}

export function logout() {
    return fetch("app/users/logout", {
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function updateUser(updatedUser) {
    return fetch("app/users/update-user", {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}