import Component from '../core/Component.js'

export default class Start extends Component {

  template() {
    return `
    <button class='startBtn' />
    `
  }

  setEvent() {

    const { start } = this.$props

    addEvent('click', '.startBtn', start)
  }
}