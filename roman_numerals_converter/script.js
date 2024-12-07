const cash_field = document.querySelector("#customer-cash")
const submit_int = document.querySelector("#convert-cash")
const customer_due = document.querySelector("#change-due")
const cash_drawer = document.querySelector("#clash_drawer_display")
const price_monitor = document.querySelector("#price_screen")

let price = 1.87;
let cash;

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

submit_int.addEventListener('click', () => {
    convert_roman_numerals();
    number_field.value = '';
    string_array = [];
});

refresh_display();