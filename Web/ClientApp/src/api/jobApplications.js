export function createJobApplication(jobTitle, applicationQuestions) {
    return fetch("app/reminders", {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ jobTitle, applicationQuestions })
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}
