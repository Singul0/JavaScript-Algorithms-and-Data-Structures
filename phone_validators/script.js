const number_field = document.querySelector("#user-input");
const submit_int = document.querySelector("#check-btn");
const clear_result = document.querySelector("#clear-btn");
const results = document.querySelector("#results-div");
const phone_regex = /(?:^|\D)\(([2-9])(?:\d(?!\1)\d|(?!\1)\d\d)\)\s*[2-9]\d{2}-\d{4}/;

//Clear button
clear_result.addEventListener('click', () => {
    clear_results();
    number_field.value = '';
});

function clear_results() {
    results.innerHTML = null;
}

//Check/Submit button
submit_int.addEventListener('click', () => {
    check_number();
    number_field.value = '';
});

// Regexes untuk validasi US phone numbers, dikumpulin dalam satu function (thanks sarixfauzah :) )
const createPhoneNumberRegex = () => {
    const countryCode = '^(1\\s?)?';
    const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';
    const spacesDashes = '[\\s\\-]?';
    const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$';

    return new RegExp(`${countryCode}${areaCode}${spacesDashes}${phoneNumber}`);
};

function check_number() {
    const phone_input = String(number_field.value);
    const phone_regex = createPhoneNumberRegex();
    if(phone_input === ""){
        alert("Please provide a phone number");
        return false;
    }
    const is_valid = phone_regex.test(phone_input);

    results.innerHTML += `${is_valid ? "Valid" : "Invalid"} US number: ${phone_input}`;
}