function generateRandomValue(minValue:number, maxValue:number):number{
    let random = Math.floor(Math.random() * maxValue) + minValue;   

    return random;
}

function changePlayers():void{
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;  

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if(currentPlayerName != player1Name){
        document.getElementById("current").innerText = player1Name;
        currentPlayerName = player1Name;
    }
    else if(currentPlayerName != player2Name){
        document.getElementById("current").innerText = player2Name;
        currentPlayerName = player2Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game"); //assigns newGameBtn variable to the element with the id of "new_game"
    newGameBtn.onclick = createNewGame; //once the new game button gets clicked, it calls createNewGame method

    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
}

function createNewGame(){
    //Set player scores to 0
    let player1Score = 0;
    (<HTMLInputElement>document.getElementById("score1")).value = player1Score.toString();
    let player2Score = 0;
    (<HTMLInputElement>document.getElementById("score2")).value = player2Score.toString();

    //verify each player has a name
    //if both players don't have a name display error
    if((<HTMLInputElement>document.getElementById("player1")).value == "" 
    || (<HTMLInputElement>document.getElementById("player2")).value == "" ){
        alert("Must provide a name");
    }
    else if((<HTMLInputElement>document.getElementById("player1")).value == (<HTMLInputElement>document.getElementById("player2")).value){
        alert("Both players must have unique names");
    }
    else{
        //if both players do have a name start the game!
        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}

function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let dice = generateRandomValue(1, 6);

    //if the roll is 1
    if(dice == 1){
        alert("OOPS! You rolled a 1!");

        //  set current turn total to 0
        currTotal = 0;
        (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();

        //  change players
        changePlayers();
    }
    
    //if the roll is greater than 1
    if(dice > 1){
        //  add roll value to current total
        currTotal += dice;
    }

    //If the player rolls a 1, clear die text box
    if(dice == 1){
        (<HTMLInputElement>document.getElementById("die")).value = "";
    }
    //set the die roll to value player rolled
    else{ 
        (<HTMLInputElement>document.getElementById("die")).value = dice.toString();    
    }

    //display current total on form
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
}

function holdDie():void{
    //Clear the die box
    (<HTMLInputElement>document.getElementById("die")).value = "";

    //get the current turn total
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //determine who the current player is
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;  

    //add the current turn total to the player's total score
    if(currentPlayerName == player1Name){
        currTotal += parseInt((<HTMLInputElement>document.getElementById("score1")).value); 
        (<HTMLInputElement>document.getElementById("score1")).value = currTotal.toString(); 
    }
    if(currentPlayerName == player2Name){   
        currTotal += parseInt((<HTMLInputElement>document.getElementById("score2")).value); 
        (<HTMLInputElement>document.getElementById("score2")).value = currTotal.toString(); 

    }

    //reset the turn total to 0
    let turnTotal = 0;
    (<HTMLInputElement>document.getElementById("total")).value = turnTotal.toString();

    //Find out if there's a winner
    determineWinner();

    //change players
    changePlayers();
}

function determineWinner():void{
    //Get player's score
    let score1 = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let score2 = parseInt((<HTMLInputElement>document.getElementById("score2")).value);

    //Get current player's name
    let currentPlayerName = document.getElementById("current").innerText;

    if(score1 >= 100){
        alert(currentPlayerName + " wins!");
    }
    if(score2 >= 100){
        alert(currentPlayerName + " wins!");
    }
}