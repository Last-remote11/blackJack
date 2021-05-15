export class Component {
  $state;
  $target;
  $props;

  constructor($target, $props) {
    this.$target = $target
    this.$props = $props
    this.setup();
    this.setEvent(); 
    this.render();
  }

  setup () {} // 초기 상태 설정
  mounted () {}
  template () { return ''; } // 템플릿

  render () {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent();

  setState(newState) {
    this.$state = {...this.$state, ...newState};
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)]
    const isTarget = (target) => children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      callback (event)
    })
  }
}