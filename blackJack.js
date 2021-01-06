let startButton = document.getElementById("start")
let resetButton = document.getElementById("reset")
let hitButton = document.getElementById("hit")
let stayButton = document.getElementById("stay")
let winloose = document.getElementById("winloose")
let playerHandDOM = document.getElementById("playerhand")
let playerScoreDOM = document.getElementById("playerscore")
let dealerScoreDOM = document.getElementById("dealerscore")
let dealerHandDOM = document.getElementById("dealerhand")

let allInButton = document.getElementById("allin")
let currentMoneyDOM = document.getElementById("currentmoney")
let currentMoney = 10000;
let betMoney = document.getElementById("betmoney")

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

    betMoney.disabled = false;
    allInButton.disabled = false;

    playerHandDOM.innerHTML = playerHand;
    playerScoreDOM.innerHTML = playerScore;
    dealerHandDOM.innerHTML = playerHand;
    dealerScoreDOM.innerHTML = playerScore;
    currentMoneyDOM.innerHTML = currentMoney;

    count = 0
    var cards = [];
    for (s of shapes) {
        for (n of nums) {
            cards.push(s + n);
        }
    } return cards;
}

function openHand() {
    playerHandDOM.innerHTML = playerHand;
    playerScoreDOM.innerHTML = playerScore;
    dealerHandDOM.innerHTML = dealerHand;
    dealerScoreDOM.innerHTML = dealerScore;
    resetButton.disabled=false;
    hitButton.disabled=true;
    stayButton.disabled=true;
};

function calCardNum(card) { //card = 길이 2 문자열 "s8"
    let Num = 0;
    if (card.length === 3) {
        Num = 10;
    } else {
        cardNumASC = card.charCodeAt(1)
        if (cardNumASC < 58) {Num = Number(card[1])
        } else {cardNumASC === 65 ? Num = 11 : Num = 10}
    }
    return Num;};


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
};

function start() {

    if (betMoney.value <= 0 || betMoney.value > currentMoney) {
        alert("Please input valid money.");
        return;
    }

    cardSet = resetCard();

    currentMoney -= Number(betMoney.value);
    currentMoneyDOM.innerHTML = currentMoney;

    for (var i=0; i < 4; i++) {
    giveCard() // 2장씩 나눠줌
    }
    if (playerScore === 21 && dealerScore === 21) {
        openHand();
        setTimeout(()=>alert("PUSH (double BlackJack)"),1000);
        currentMoney += Number(betMoney.value);

    } else if (playerScore === 21) {
        openHand();
        setTimeout(()=>alert("BlackJack!! you Win!"),1000);
        currentMoney += Number(betMoney.value) * 2.5;

    } else if (dealerScore === 21) {
        openHand();
        setTimeout(()=>alert("Oh no... dealer BlackJack"),1000);
    } 
    else {
        startButton.disabled = true;
        allInButton.disabled = true;
        betMoney.disabled = true;
        hitButton.disabled = false;
        stayButton.disabled = false;
    }
};

function hit() {
    giveCard(); // 플레이어에게 한장
    if (playerScore > 21) {
        openHand();
        setTimeout(() => alert("Burst..! You lose"),1000);
        return;
    }
    if (dealerScore <= 16) { // Dealer hit 규칙에 의해 16이하면 무조건 hit
        giveCard();
        if (dealerScore > 21) {
            openHand();
            setTimeout(() => alert("Dealer Burst! You Win!"),1000)
            currentMoney += Number(betMoney.value) * 2;
    
        };
    } else {
        count++; // 16이상이면 패스
    }
};

function gameResult() {
    openHand();
    let playerGap = 21 - playerScore; // 21에 누가 더 가까운지
    let dealerGap = 21 - dealerScore;

    if (playerGap < dealerGap) {
        setTimeout(()=>alert("You win!"),1000);
        currentMoney += Number(betMoney.value) * 2;
    } else if (playerGap === dealerGap) {
        setTimeout(()=>alert("Draw"),1000);
        currentMoney += Number(betMoney.value);
    }
    else {
        setTimeout(()=>alert("you lose"),1000);
    }
    resetButton.disabled = false;
};

function stay() {//count = 짝수
    count++ //count = 홀수
    while (dealerScore <= 16) {
        giveCard(); //count = 짝수
        count++}
        if (dealerScore > 21) {
            openHand();
            setTimeout(()=>alert("Dealer burst You win!"),1000);
            currentMoney += Number(betMoney.value) * 2;
        } else if (dealerScore > 16 && dealerScore <= 21){
        gameResult();
    }
};

function resetGame() {
    if (currentMoney === 0) {
        alert("파산했습니다. 새 게임을 하려면 새로고침해주세요")
    }

    cardSet = resetCard();
    startButton.disabled = false;
    resetButton.disabled = true;
    hitButton.disabled = true;
    stayButton.disabled = true;
};

//----------------------------------------------------


startButton.addEventListener("click", start);
hitButton.addEventListener("click",hit);
stayButton.addEventListener("click", stay);
resetButton.addEventListener("click", resetGame);
allInButton.addEventListener("click", () =>
betMoney.value = currentMoney)