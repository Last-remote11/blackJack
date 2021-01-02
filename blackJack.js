const shapes = ['h','c','d','s']
const nums = ["A",'2','3','4','5','6','7','8','9','10','J','Q','K']

let count = 0
let playerHand = []
let dealerHand = []
let playerScore = 0
let dealerScore = 0


function resetCard() {
    playerHand = []
    dealerHand = []
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
    cardNumASC = card.charCodeAt(1)
        if (cardNumASC < 58) {Num = Number(card[1])
        } else {cardNumASC === 65 ? Num = 1 : Num = 10}
    return Num;}


function hit() {
    let randomCardIndex = Math.floor(Math.random()*cardSet.length);
    var randomCard = cardSet[randomCardIndex];
    if (count % 2 === 0) {
        playerHand.push(randomCard);
        playerScore += calCardNum(randomCard);
    } else {
        dealerHand.push(randomCard);
        dealerScore += calCardNum(randomCard);
    }
    cardSet.splice(randomCardIndex, 1);
    count++;
}

let cardSet = resetCard()


// start를 누르면
hit()
if (playerScore > 21) {
    // burst
} else if (dealerScore > 21){
    // you win
}