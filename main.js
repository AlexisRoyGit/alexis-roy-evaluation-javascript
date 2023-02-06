const stockScoreJ1 = document.getElementById('stockNumberJ1');
const stockScoreJ2 = document.getElementById('stockNumberJ2');
const currentScoreJ1 = document.getElementById('currentNumberJ1');
const currentScoreJ2 = document.getElementById('currentNumberJ2');
const playerTitle1 = document.getElementById('title1');
const playerTitle2 = document.getElementById('title2');
const rollDiceButton = document.getElementById('rollDice');
const holdPointsButton = document.getElementById('hold');
const diceDisplay = document.getElementById('diceDisplayArea');
const newGameButton = document.getElementById('newGame');
let newGame = false;
let endGame = false;
let player = 'player1';


//Debut de la partie
function beginGame() {
    newGame = true;
    if(player === 'player1') {
        alert('Joueur 1 c\'est à vous de jouer');
        currentScoreJ1.innerText = '';
        diceDisplay.innerHTML = '';
        playerTitle1.setAttribute("class", "currentPlayer");
        playerTitle2.removeAttribute("class", "currentPlayer");
    } else {
        alert('Joueur 2 à votre tour !');
        currentScoreJ2.innerText = '';
        player = 'player2';
        playerTitle2.setAttribute("class","currentPlayer");
        playerTitle1.removeAttribute("class", "currentPlayer");
    }
}


//Arret de la partie si un des deux scores atteint 100
function stopGame() {
    if(stockScoreJ1.innerText >= 100) {
        alert('Bien joué joueur 1 vous avez gagné');
        endGame = true;
    } else if(stockScoreJ2.innerText >= 100) {
        alert('Félicitations joueur 2 vous remportez la partie');
        endGame = true;
    } else {
    }
}

//Changement de joueur lié au hold
function changePlayer() {
    player === 'player1' ? player = 'player2' : player = 'player1';
    if(endGame === true) {
        newGame = false;
    } else {
        beginGame();
    }
}

//Declenchement du début de la partie
newGameButton.addEventListener('click', beginGame);

//Retourne nombre aléatoire entier entre 1 et 6
function aleatoryDice() {
    return Math.floor(Math.random() * (7 - 1) + 1);
}

//Retire l'image de dé au bout d'un certain temps
function removeDice(dice) {
    setTimeout(() => {
        dice.remove();
    }, 1000)
}

//Recupere la valeur correspondant au lancer de dé et change de joueur si la valeur est égale à 1
function getValue(image) {
    let value = image.getAttribute('value');
    if(player === 'player1') {
        currentScoreJ1.innerText += `${value},`;
    } else {
        currentScoreJ2.innerText += `${value},`;
    }

    if(value === '1'){
        alert('Dommage vous avez fait 1 ! C\'est maintenant à l\'autre joueur de jouer')
        if(player === 'player1') {
            currentScoreJ1.innerText = '';
            changePlayer()
        } else {
            currentScoreJ2.innerText = '';
            changePlayer();
        }
    } else {

    }
}

//Gestion du lancer de dé 
function rollingDice() {
    if(newGame === true) {
        let image  = document.createElement("img");
    switch (aleatoryDice()) {
        case 1 :
        image.setAttribute("src","./images/dice1.png");
        image.setAttribute("value", 1)
        image.setAttribute("class", "dice");
        diceDisplay.append(image);
        getValue(image)
        removeDice(image)
        break;
        case 2 :
        image.setAttribute("src", "./images/dice2.png");
        image.setAttribute("value", 2)
        image.setAttribute("class", "dice");
        diceDisplay.append(image);
        getValue(image)
        removeDice(image)
        break;
        case 3 :
        image.setAttribute("src", "./images/dice3.png");
        image.setAttribute("value", 3)
        image.setAttribute("class", "dice");
        diceDisplay.append(image);
        getValue(image)
        removeDice(image)
        break;
        case 4 :
        image.setAttribute("src", "./images/dice4.png");
        image.setAttribute("value", 4)
        image.setAttribute("class", "dice");
        diceDisplay.append(image);
        getValue(image)
        removeDice(image)
        break;
        case 5 :
        image.setAttribute("src", "./images/dice5.png");
        image.setAttribute("value", 5)
        image.setAttribute("class", "dice");
        diceDisplay.append(image);
        getValue(image)
        removeDice(image)
        break;
        case 6 :
        image.setAttribute("src", "./images/dice6.png");
        image.setAttribute("value", 6)
        image.setAttribute("class", "dice");
        diceDisplay.append(image);
        getValue(image)
        removeDice(image)
        break;
        default : 
        alert('Un erreur s\'est produite veuillez relancer le dé');
        }
    } else {
        alert('Veuillez tout d\'abord instancier une nouvelle partie');
    }

}


//Converti les valeurs recupérées a chaque lancer de dés et les additionne
function arrayNumberSum(tab) {
    let sum = 0;
    for(let i = 0; i < tab.length; i++) {
        sum += parseInt(tab[i]);
    }
    return sum;
}

//Envoi des points courants dans la zone globale
function holdPoints() {
    if(player === 'player1') {
        let textScore1 = currentScoreJ1.innerText;
        let tab = textScore1.split(',');
        tab.pop();
        let newtab1 = arrayNumberSum(tab)
        stockScoreJ1.innerText += newtab1;
        currentScoreJ1.innerText = '';
        stopGame();
        changePlayer();
    } else {
        let textScore2 = currentScoreJ2.innerText;
        let tab = textScore2.split(',');
        tab.pop();
        let newtab2 = arrayNumberSum(tab)
        stockScoreJ2.innerHTML += newtab2;
        currentScoreJ2.innerText = '';
        stopGame();
        changePlayer();
    }
}


//Declenchement du lancer de dé au clic sur "Lancer le dé"
rollDice.addEventListener('click', rollingDice)

//Declenchement de la sauvegarde des points au clic sur "Recuperer les points"
holdPointsButton.addEventListener('click', holdPoints)