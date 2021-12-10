import specialCharacters from "./specialCharacters";

// If any of these functions return TRUE, then the provided string failed the validation test

export const usernameValidation = (username) => {
    const usernameArray = username.split("");
    if(usernameArray.some(e => specialCharacters.includes(e))) {
        return true;
    }
    return false;
}

export const nameValidation = (name) => {
    let onlyLetters = /^[a-zA-Z]+$/.test(name);
    if (!onlyLetters){
        return true;
    }
    return false;
}