const number_field = document.querySelector("#number")
const submit_int = document.querySelector("#convert-btn")
const results = document.querySelector("#output")

let string_array = []; // array (should probably use an object for this, but whatever I don't have time)

submit_int.addEventListener('click', () => {
    convert_roman_numerals();
    number_field.value = '';
    string_array = [];
});

function convert_roman_numerals() {
    let int_number = Number(number_field.value);
    if(int_number === 0) { //non-valid numbers default to 0
        results.textContent = "Please enter a valid number";
        return
    }
    if(int_number < 0) {
        results.textContent = "Please enter a number greater than or equal to 1";
        return
    }
    if(int_number > 3999) {
        results.textContent = "Please enter a number less than or equal to 3999";
        return
    }
    
    int_to_numerals(int_number);
    results.textContent = string_array.join('');
    

}

function int_to_numerals(number_remaining) { //Hashmaps! :)
    const hashmap_roman_arab = [
        ['M', 1000],
        ['CM', 900],
        ['D', 500],
        ['CD', 400],
        ['C', 100],
        ['XC', 90],
        ['L', 50],
        ['XL', 40],
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1],
    ];

    /*This loops through every roman, arabic numerals pair from highest to lowest, 
        checks if number_remaining is bigger than the arabic pair, if so. 
            adds roman numeral pair to the string_array and substract that arabic numeral pair number from number remaining
            loops continously until number_remaining is lower than 0.
            I really need to be able to read hashmaps better... I can understand them just fine thankfully
     */
    hashmap_roman_arab.forEach(function (array) {
        while (number_remaining >= array[1]) {
            string_array.push(array[0]);
            number_remaining -= array[1];
        }
    });
}