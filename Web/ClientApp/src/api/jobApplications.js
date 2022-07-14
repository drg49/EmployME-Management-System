export function getCompanyJobApps(status) {
    return fetch(`app/applications/get-by-company/${status}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        }
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function createJobApplication(jobTitle, jobLocation, defaultQuestions, customJobAppQuestions, description) {
    return fetch("app/applications/create-application", {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ jobTitle, jobLocation, defaultQuestions, customJobAppQuestions, description })
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function getCustomJobAppQuestions(appId) {
    return fetch(`app/applications/get-custom-job-questions/${appId}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        },
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function pauseApplication(appId) {
    return fetch(`app/applications/pause-application/${appId}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        }
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function resumeApplication(appId) {
    return fetch(`app/applications/resume-application/${appId}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        }
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function deleteApplication(appId) {
    return fetch(`app/applications/delete-application/${appId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        }
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}