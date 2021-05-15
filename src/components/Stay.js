import Component from '../core/Component.js'

export default class Stay extends Component {

  template() {
    return `
    <button class='stay'/>
    `
  }

  setEvent() {

    const { hit, stay } = this.$props

    addEvent('click', '.hitBtn', hit)
    addEvent('click', '.stayBbtn', stay)
  }
}