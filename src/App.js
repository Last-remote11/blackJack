import Component from './core/Component.js'
import CurrentMoney from './components/CurrentMoney.js'

export default class App extends Component {
  setup() {
    this.$state = {
      count: 0,
      currentMoney:10000,
      cardSet: [],
      playerHand: [],
      dealerHand: [],
      betMoney: 0,
      playerScore: 0,
      dealerScore: 0,
      inGame: false
    }
  }

  template() {
    return `
    <div data-component="currentMoney">heheheheh</div>
    <div data-component="buttons"></div>
    <div data-component="playerHand"></div>
    <div data-component="dealerHand"></div>
    `
  }

  mounted() {
    const { start, resetCard, calCardNum, hit, bet, stay, allIn } = this
    const { currentMoney } = this.$state
    const $currentMoney = this.$target.querySelector('[data-component="currentMoney"]')
    const $buttons = this.querySelector('[data-component="buttons"]')
    const $playerHand = this.querySelector('[data-component="playerHand"]')
    const $dealerHand = this.querySelector('[data-component="dealerHand"]')

    new CurrentMoney($currentMoney, 
      currentMoney
    )
  }

  start() {
    const { betMoney, currentMoney } = this.$state
    if (betMoney <= 0 || betMoney > currentMoney) {
      alert("Please input valid money.");
      return;
    }

    const cardSet = this.state.cardSet();
    this.setState({
      currentMoney: currentMoney -= Number(betMoney),
    })

    for (var i=0; i < 4; i++) {
    this.giveCard() // 2장씩 나눠줌
    }
    if (playerScore === 21 && dealerScore === 21) {
      this.setState({ inGame: false })
      setTimeout(() => alert("PUSH (double BlackJack)"), 1000);
      this.setState({ currentMoney: currentMoney += Number(betMoney.value) });

    } else if (playerScore === 21) {
      this.setState({ inGame: false })
      setTimeout(() => alert("BlackJack!! you Win!"), 1000);
      this.setState({ currentMoney: currentMoney += Number(betMoney.value) * 2.5 });

    } else if (dealerScore === 21) {
      this.setState({ inGame: false })
      setTimeout(() => alert("Oh no... dealer BlackJack"), 1000);
    } 
    else {
      this.setState({inGame: true})
    }
  };

  resetCard() {
    let shapes = ['h','c','d','s']
    let nums = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    let cards = [];
    for (let s of shapes) {
        for (let n of nums) {
            cards.push(s + n);
        }
    }
    this.setState(
      {
        playerHand: [],
        dealerHand: [],
        playerScore: 0,
        dealerScore: 0,
        inGame: true,
        count: 0,
        cardSet: cards
      }
    )
  }

  calCardNum(card) { //card = 길이 2 문자열 "s8"
    let Num = 0;
    if (card.length === 3) {
        Num = 10;
    } else {
        cardNumASC = card.charCodeAt(1)
        if (cardNumASC < 58) {Num = Number(card[1])
        } else {cardNumASC === 65 ? Num = 11 : Num = 10}
    }
    return Num;
  };

  giveCard() { //플레이어 먼저 주고 돌아가면서 줌
    
    const { cardSet, playerHand, playerScore, count, dealerHand, dealerScore } = this.$state
    const nextCardSet = [...cardSet]
    const nextPlayerHand = [...playerHand]
    const nextDealerHand = [...dealerHand]

    let randomCardIndex = Math.floor(Math.random() * cardSet.length);
    let randomCard = cardSet[randomCardIndex];
    if (count % 2 === 0) {
      nextPlayerHand.push(randomCard)
      this.setState({
        playerHand: nextPlayerHand,
        playerScore: playerScore += calCardNum(randomCard),
      })
        // playerHand.push(randomCard);
        // playerScore += calCardNum(randomCard);
        // playerHandDOM.innerHTML = playerHand;
        // playerScoreDOM.innerHTML = playerScore;
    } else {
      nextDealerHand.push(randomCard)
      this.setState({ 
        dealerHand: nextDealerHand,
        dealerScore: dealerScore += calCardNum(randomCard)
      })
    }
    nextCardSet.splice(randomCardIndex, 1)
    this.setState({ 
      cardSet: nextCardSet,
      count: this.$state.count + 1
     });
  };

  hit() {
    this.giveCard(); // 플레이어에게 한장
    if (this.$state.playerScore > 21) {
      this.setState({inGame: false});
      setTimeout(() => alert("Burst..! You lose"),1000);
      return;
    }
    if (this.$state.dealerScore <= 16) { // Dealer hit 규칙에 의해 16이하면 무조건 hit
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

  bet(money) {
    this.setState({ betMoney: money })
  }

  allIn() {
    const currentMoney = this.$state.currentMoney
    this.setState({ betMoney: currentMoney})
  }

}