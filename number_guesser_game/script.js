
    let correct_number = Math.floor(Math.random() * (100)) + 1; //Selects a random number between 1-100

    //Pulls html elements into variables inside javascript:
    const guesses = document.querySelector(".guesses")
    const last_result = document.querySelector(".last_result")
    const low_or_high = document.querySelector(".low_or_high")
    const guessed_number = document.querySelector("#guessed_number");
    const submit_guess = document.querySelector("#submit_guess");
    let round_count = 1;
    const max_round = 10;
    let reset_button;

    function guess_number () { //Called when the Guess Number button is pressed
        let number_guess = Number(guessed_number.value);
        let round_remaining = max_round - round_count;
        console.log(`Correct Number: ${correct_number}, Guessed number: ${number_guess}`)

        if (round_count === 1) { //inits previous guesses
            guesses.textContent = "Previous guesses:";
          }
        guesses.textContent = `${guesses.textContent} ${number_guess}`;
        
        if(number_guess === correct_number) { //if win no need to recheck round
            last_result.textContent = "Congrats! Ya won!";
            last_result.style.backgroundColor = "lightgreen";
            low_or_high.textContent = "";
            itsjoever();
            console.log("win")
        } else if (round_count === 10) {
            last_result.textContent = "You ran out of tries, you lost.";
            last_result.style.backgroundColor = "red"
            low_or_high.textContent = '';
            itsjoever();
            console.log("lose")
        }
        else {
            last_result.textContent = `Wrong, you have ${round_remaining} guesses remaining`;
            console.log("wrong")
                last_result.style.backgroundColor = "yellow";
                if(number_guess > correct_number) {
                    low_or_high.textContent = "Your last guess was too high";
                    console.log("too high")
                }
                else if(number_guess < correct_number) {
                    low_or_high.textContent = "Your last guess was too low";
                    console.log("too low")
                }
        }

        round_count++
        guessed_number.value = '';
        guessed_number.focus();
    }

    function itsjoever() {
        //disables inputs
        guessed_number.disabled = true;
        submit_guess.disabled = true;
        //adds restart button
        reset_button = document.createElement('button');
        reset_button.textContent = "Restart Game";
        document.body.appendChild(reset_button);
        reset_button.addEventListener('click', restart_game);
    }
    
    function restart_game() {
        correct_number = Math.floor(Math.random() * (100)) + 1;
        round_count = 1;
        guessed_number.disabled = false;
        guessed_number.value = "";
        guessed_number.focus();
        submit_guess.disabled = false;
        document.body.removeChild(reset_button);
        
        const result_parameters = document.querySelectorAll('.result_parameters p');
        for (const result_parameter of result_parameters) {
            result_parameter.textContent = '';
        }
        last_result.style.backgroundColor = 'white';
        
    }

    submit_guess.addEventListener('click', guess_number);