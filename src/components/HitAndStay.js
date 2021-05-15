import Component from '../core/Component.js'

export default class HitAndStay extends Component {

  template() {
    return `
    <button class='hitBtn'/>
    <button class='stayBtn'/>
    `
  }

  setEvent() {

    const { hit, stay } = this.$props

    addEvent('click', '.hitBtn', hit)
    addEvent('click', '.stayBbtn', stay)
  }
}