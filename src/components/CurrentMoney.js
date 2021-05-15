import Component from '../core/Component.js'

export default class CurrentMoney extends Component {

  template() {
    const { currentMoney } = this.$props

    return `
    <h1>${currentMoney}</h1>
    `
  }
}