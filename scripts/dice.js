function generateRandomValue(minValue, maxValue) {
    var random = Math.floor(Math.random() * maxValue) + minValue;
    return random;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (currentPlayerName != player1Name) {
        document.getElementById("current").innerText = player1Name;
        currentPlayerName = player1Name;
    }
    else if (currentPlayerName != player2Name) {
        document.getElementById("current").innerText = player2Name;
        currentPlayerName = player2Name;
    }
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    var player1Score = 0;
    document.getElementById("score1").value = player1Score.toString();
    var player2Score = 0;
    document.getElementById("score2").value = player2Score.toString();
    if (document.getElementById("player1").value == ""
        || document.getElementById("player2").value == "") {
        alert("Must provide a name");
    }
    else {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    var dice = generateRandomValue(1, 6);
    if (dice == 1) {
        alert("OOPS! You rolled a 1!");
        currTotal = 0;
        document.getElementById("total").value = currTotal.toString();
        changePlayers();
    }
    if (dice > 1) {
        currTotal += dice;
    }
    if (dice == 1) {
        document.getElementById("die").value = "";
    }
    else {
        document.getElementById("die").value = dice.toString();
    }
    document.getElementById("total").value = currTotal.toString();
}
function holdDie() {
    document.getElementById("die").value = "";
    var currTotal = parseInt(document.getElementById("total").value);
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (currentPlayerName == player1Name) {
        currTotal += parseInt(document.getElementById("score1").value);
        document.getElementById("score1").value = currTotal.toString();
    }
    if (currentPlayerName == player2Name) {
        currTotal += parseInt(document.getElementById("score2").value);
        document.getElementById("score2").value = currTotal.toString();
    }
    var turnTotal = 0;
    document.getElementById("total").value = turnTotal.toString();
    determineWinner();
    changePlayers();
}
function determineWinner() {
    var score1 = parseInt(document.getElementById("score1").value);
    var score2 = parseInt(document.getElementById("score2").value);
    var currentPlayerName = document.getElementById("current").innerText;
    if (score1 >= 100) {
        alert(currentPlayerName + " wins!");
    }
    if (score2 >= 100) {
        alert(currentPlayerName + " wins!");
    }
}
