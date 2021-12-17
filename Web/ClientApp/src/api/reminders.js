export function getReminders() {
    return fetch("app/reminders", {
        method: "GET",
        headers: {
            Accept: "application/json"
        },
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function createReminder(reminder) {
    return fetch("app/reminders", {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ ReminderMessage: reminder })
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function updateReminder(updatedBody, reminderKey) {
    return fetch(`app/reminders/${reminderKey}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ ReminderMessage: updatedBody })
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function updateReminderCheck(reminderKey, updateStatus) {
    return fetch(`app/reminders/update-check/${reminderKey}/${updateStatus}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json"
        },
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function deleteReminders(reminderKeys) {
    return fetch('app/reminders', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reminderKeys)
    }).then((response) => response.ok ? response.json() : Promise.reject(response))
}
