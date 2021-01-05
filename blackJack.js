let startButton = document.getElementById("start")
let resetButton = document.getElementById("reset")
let hitButton = document.getElementById("hit")
let stayButton = document.getElementById("stay")
let winloose = document.getElementById("winloose")
let playerHandDOM = document.getElementById("playerhand")
let playerScoreDOM = document.getElementById("playerscore")
let dealerScoreDOM = document.getElementById("dealerscore")
let dealerHandDOM = document.getElementById("dealerhand")


const shapes = ['h','c','d','s']
const nums = ["A",'2','3','4','5','6','7','8','9','10','J','Q','K']

let count = 0
let cardSet = []
let playerHand = []
let dealerHand = []
let playerScore = 0
let dealerScore = 0


function resetCard() {
    playerHand = []
    dealerHand = []
    playerScore = 0
    dealerScore = 0

    playerHandDOM.innerHTML = playerHand;
    playerScoreDOM.innerHTML = playerScore;
    dealerHandDOM.innerHTML = playerHand;
    dealerScoreDOM.innerHTML = playerScore;
    count = 0
    var cards = [];
    for (s of shapes) {
        for (n of nums) {
            cards.push(s + n);
        }
    } return cards;
}


function calCardNum(card) { //card = 길이 2 문자열 "s8"
    let Num = 0;
    if (card.length === 3) {
        Num = 10;
    } else {
        cardNumASC = card.charCodeAt(1)
        if (cardNumASC < 58) {Num = Number(card[1])
        } else {cardNumASC === 65 ? Num = 11 : Num = 10}
    }
    return Num;}


function giveCard() { //플레이어 먼저 주고 돌아가면서 줌
    let randomCardIndex = Math.floor(Math.random()*cardSet.length);
    var randomCard = cardSet[randomCardIndex];
    if (count % 2 === 0) {
        playerHand.push(randomCard);
        playerScore += calCardNum(randomCard);
        playerHandDOM.innerHTML = playerHand;
        playerScoreDOM.innerHTML = playerScore;
    } else {
        dealerHand.push(randomCard);
        dealerScore += calCardNum(randomCard);
    }
    cardSet.splice(randomCardIndex, 1);
    count++;
}

function start() {
    cardSet = resetCard();
    for (var i=0; i < 4; i++) {
    giveCard() // 2장씩 나눠줌
    }
    if (playerScore === 21) {
        alert("BlackJack!! you Win!")
    } else if (dealerScore === 21) {
        alert("Oh no... dealer BlackJack")
    } else {
        startButton.disabled = true;
        hitButton.disabled = false;
        stayButton.disabled = false;
    }
}

function hit() {
    giveCard();
    count++
    if (playerScore > 21) {
        dealerHandDOM.innerHTML = dealerHand;
        dealerScoreDOM.innerHTML = dealerScore;
        alert("Burst..! You loose");
        resetButton.disabled=false;
        hitButton.disabled=true;
        stayButton.disabled=true;

    } else if (playerScore === 21){
        dealerHandDOM.innerHTML = dealerHand;
        dealerScoreDOM.innerHTML = dealerScore;
        alert("BlackJack!! you Win!");
        resetButton.disabled=false;
        hitButton.disabled=true;
        stayButton.disabled=true;

    } else {
        // 뭘 넣을까?
    }
}

function gameResult() {
    dealerHandDOM.innerHTML = dealerHand;
    dealerScoreDOM.innerHTML = dealerScore;
    let playerGap = 21 - playerScore; // 21에 누가 더 가까운지
    let dealerGap = 21 - dealerScore;

    if (playerGap < dealerGap) {
        alert("You win!");
    } else if (playerGap === dealerGap) {
        alert("Draw")
    }
    else {
        alert("you loose");
    }
    resetButton.disabled = false;
}

function stay() {//count = 짝수
    count++ //count = 홀수
    while (dealerScore <= 16) {
        giveCard(); //count = 짝수
        count++}
        if (dealerScore === 21) {
            dealerHandDOM.innerHTML = dealerHand;
            dealerScoreDOM.innerHTML = dealerScore;
            alert("Dealer Blackjack you loose..");
            resetButton.disabled=false;
            hitButton.disabled=true;
            stayButton.disabled=true;
        } else if (dealerScore > 21) {
            dealerHandDOM.innerHTML = dealerHand;
            dealerScoreDOM.innerHTML = dealerScore;
            alert("Dealer burst You win!");
            resetButton.disabled=false;
            hitButton.disabled=true;
            stayButton.disabled=true;
        } else if (dealerScore > 16 && dealerScore < 21){
        gameResult();
    }
}

function resetGame() {
    cardSet = resetCard();
    startButton.disabled = false;
    resetButton.disabled = true;
    hitButton.disabled = true;
    stayButton.disabled = true;
}

//----------------------------------------------------

// let cardSet = resetCard()

startButton.addEventListener("click", start);
hitButton.addEventListener("click",hit);
stayButton.addEventListener("click", stay);
resetButton.addEventListener("click", resetGame);