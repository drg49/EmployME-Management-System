export function GetEmployees() {
    return fetch("app/employees", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}