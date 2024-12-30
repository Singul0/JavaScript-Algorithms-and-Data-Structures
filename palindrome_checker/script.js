const palindrome_field = document.querySelector("#text-input")
const submit_palindrome = document.querySelector("#check-btn")
const is_a_palindrome_answer = document.querySelector("#result")

submit_palindrome.addEventListener('click', () => {
    guess_palindrome();
    palindrome_field.value = '';
});

function guess_palindrome() {
    if(palindrome_field.value === ``) {
        alert("Please input a value");
        return
    }
    
    let palindrome_text = String(palindrome_field.value);
    let palindrome_text_sanitary = palindrome_text.toLowerCase().replace(/[^0-9a-z]/gi, '');

    let reversed_text = reverse_string(palindrome_text_sanitary);
    console.log(`${palindrome_text_sanitary}, reversed is:${reversed_text}`)

    if(palindrome_text_sanitary === reversed_text) {
        is_a_palindrome_answer.textContent = `${palindrome_text} is a palindrome.`;
    }
    else {
        is_a_palindrome_answer.textContent = `${palindrome_text} is not a palindrome.`;
    }
}

// ugly function to reverse a string by changing it into an array, reversing said array, and turning that array to a string again. annoying and hard to read, I know...
function reverse_string(string_to_reverse) {
    let string_array = string_to_reverse.split("");
    string_array.reverse();
    let reversed_string = string_array.join("");
    return reversed_string;
}