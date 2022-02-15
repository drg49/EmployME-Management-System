export function createJobApplication(jobTitle, jobLocation, jobQuestions) {
    return fetch("app/applications/create-application", {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ jobTitle, jobLocation, jobQuestions })
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}
