export function GetEmployees() {
    return fetch("app/employees", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then(response => response.json())
    .then(data => {
        console.log(data)
    });
}