import './styles.css'

const counter = document.getElementById("counter")
const addBtn = document.getElementById("add")
const subBtn = document.getElementById("sub")
const asyncBtn = document.getElementById("async")
const themeBtn = document.getElementById("theme")

console.log(localStorage.getItem('stateSession'));
let state
if (localStorage.getItem('stateSession') == null) {
  state = 0
} else {
  state = localStorage.getItem('stateSession')

}


function render() {
  counter.textContent = state.toString()
}

addBtn.addEventListener("click", () => {
  state++
  render()
  console.log(state);
})

subBtn.addEventListener("click", () => {
  state--
  render()
})

asyncBtn.addEventListener("click", () => {
  setTimeout(() => {
    state++
    render()
  }, 2000)
})

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle('dark');
})


localStorage.setItem('stateSession', state)
// localStorage.clear()
render()