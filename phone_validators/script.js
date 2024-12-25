const number_field = document.querySelector("#user-input");
const submit_int = document.querySelector("#check-btn");
const clear_result = document.querySelector("#clear-btn");
const results = document.querySelector("#results-div");

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

function check_number() {
    const phone_input = number_field.value;

    if(phone_input === ""){
        alert("Please provide a phone number");
        return;
    }
}