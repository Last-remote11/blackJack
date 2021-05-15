import Component from '../core/Component.js'

export default class Bet extends Component {

  template() {
    return `
    <input type='number' class='betInput' placeHolder='배팅할 금액을 입력'/>
    <button class='allInBtn'/>
    `
  }

  setEvent() {

    const { bet, allIn } = this.$props

    addEvent('change', '.betInput', ({ target }) => {
      bet(target.value)
    })
    addEvent('click', '.allInBtn', allIn)
  }
}