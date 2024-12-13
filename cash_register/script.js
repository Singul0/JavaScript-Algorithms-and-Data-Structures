const cash_field = document.querySelector("#cash")
const submit_int = document.querySelector("#purchase-btn")
const customer_due_display = document.querySelector("#change-due")
const cash_drawer = document.querySelector("#cash_drawer_display")
const price_monitor = document.querySelector("#price_screen")

let price = 19.5;
let cash;
let checkout_status = "OPEN";

const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

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

let cash_to_give_change = []


submit_int.addEventListener('click', () => {
  cash = Number(cash_field.value);
  sanitize_cash_input();
  cash_field.value = '';
});

function sanitize_cash_input () {
  //Clears previous change_due display
  customer_due_display.innerHTML = null;

  //Prepares for calculating change by removing decimals
  const cash_cents = Math.round(cash * 100);
  const price_cents = Math.round(price * 100);

  //Reverses CID to go from highest --> lowest
  let reversed_cid = cid.reverse().map(([name, amount]) => [name, Math.round(amount * 100)]);

  //TODO: ADD CHECKS FOR NOT ENOUGH CASH TO PAY/EXACT CHANGE IS 0
  if(price > cash) {
    alert("Customer does not have enough money to purchase the item")
  }

  let cash_change = cash_cents - price_cents;
  calculate_change(cash_change, reversed_cid);

}

function calculate_change(cash_to_return, reversed_cash_in_drawer) { 
  /*Function that goes through highest --> lowest denomination, 
  uses greedy algorithm to figure out least amount of change needed
  */

  /*for loop on reversed_cid, inconjunction with denominations. 
  gets the highest denomination to take out, 
  remove the amount of denomination and add to cash to give */
  let total_cid = 0;
  for(let index_i in reversed_cash_in_drawer) {
    if(denominations[index_i] <= cash_to_return) {
      let cash_to_be_given_out = Math.floor((cash_to_return / denominations[index_i])) * denominations[index_i];
      if(reversed_cash_in_drawer[index_i][1] < cash_to_be_given_out) {//if more cash is needed than we have in drawer, output all denominations in drawer.
        cash_to_be_given_out = reversed_cash_in_drawer[index_i][1];
      }
      if(cash_to_be_given_out != 0) {
        reversed_cash_in_drawer[index_i][1] -= cash_to_be_given_out;
        cash_to_return -= cash_to_be_given_out;
        cash_to_be_given_out /= 100 //returns to decimals after everything is mathed out
        cash_to_give_change.push([reversed_cash_in_drawer[index_i][0], cash_to_be_given_out]);
      }
      
      if(cash_to_return <= 0){
        break;
      }
      
    }
    total_cid += reversed_cash_in_drawer[index_i][1];
  }

  if(total_cid === 0) {
    checkout_status = "CLOSED";
  }
  if(cash_to_return > 0) {
    checkout_status = "INSUFFICIENT_FUNDS";
  }
  display_results(checkout_status, cash_to_give_change);
}

function display_results (status, change_due) { //TODO: Learn more how below codeblock works (map() function)
  customer_due_display.innerHTML = `<p>Status: ${status}</p>`;
  if(status === "INSUFFICIENT_FUNDS") {
    return
  }
  let change_due_array = change_due.map(
    ([denomination, amount]) => `<p>${denomination}: $${amount}</p>`
  ).join('');
  customer_due_display.innerHTML += change_due_array;

  if(cash === price) {
    customer_due_display.innerHTML = "No change due - customer paid with exact cash";
  }
}

function quick_debug (item_price, c_cash, cash_in_drawer) {
  price = item_price;
  cash = c_cash;
  cid = cash_in_drawer;
  sanitize_cash_input();
}