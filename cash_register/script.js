const cash_field = document.querySelector("#cash")
const submit_int = document.querySelector("#purchase-btn")
const customer_due = document.querySelector("#change-due")
const cash_drawer = document.querySelector("#cash_drawer_display")
const price_monitor = document.querySelector("#price_screen")

let price = 3 ;
let cash;
const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]

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
    sanitize_cash_input()
    calculate_change();
    refresh_display();
    cash_field.value = '';
});

function sanitize_cash_input () {
  cash = Number(cash_field.value);
  //TODO: ADD CHECKS FOR NOT ENOUGH CASH TO PAY/EXACT CHANGE IS 0
  let cash_change = cash - price
  let reversed_cid = cid.reverse(); //needs this so that I can sort from highest currency to give change to lowest
  calculate_change(cash_change, reversed_cid);

}

function calculate_change(cash_to_return, reversed_cash_in_drawer) { 
  /*Function that goes through highest --> lowest denomination, 
  uses greedy algorithm to figure out least amount of change needed
  */


  /*for loop on reversed_cid, inconjunction with denominations. 
  gets the highest denomination to take out, 
  remove the amount of denomination and add to cash to give */
  for(let index_i in reversed_cash_in_drawer) {
    if(denominations[index_i] <= cash_to_return) {
      let cash_to_be_given_out = Math.floor((cash_to_return / denominations[index_i])) * denominations[index_i];
      if(reversed_cash_in_drawer[index_i][1] < cash_to_be_given_out) {//if more cash is needed than we have in drawer, output all denominations in drawer.
        cash_to_be_given_out = reversed_cash_in_drawer[index_i][1];
      }
      reversed_cash_in_drawer[index_i][1] -= cash_to_be_given_out;
      cash_to_return -= cash_to_be_given_out;
      cash_to_give_change.push([reversed_cash_in_drawer[index_i][0], cash_to_be_given_out]);
      
      //TODO: ADD CHECKS TO SEE IF THERE'S ENOUGH CASH IN DRAWER TO BE GIVEN OUT FOR
      if(cash_to_return <= 0){
        break
      }
    }
  }

}

function refresh_display () {
  
}
