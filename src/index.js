import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { asyncIncrement, changeTheme, decrement, increment } from './redux/actions'
import { rootReducer } from './redux/rootReducer'
import './styles.css'

const counter = document.getElementById("counter")
const addBtn = document.getElementById("add")
const subBtn = document.getElementById("sub")
const asyncBtn = document.getElementById("async")
const themeBtn = document.getElementById("theme")

// function logger(state) {
//   return function (next) {
//     return function (action) {
//       console.log("State", state.getState());
//       console.log("Action", action);
//       return next(action)
//     }
//   }
// }

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

addBtn.addEventListener("click", () => {
  store.dispatch(increment())
})

subBtn.addEventListener("click", () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener("click", () => {
  store.dispatch(asyncIncrement())
})

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light")
    ? "dark"
    : "light"
  store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state.counter
  document.body.className = state.theme.value;

  document.querySelector(".card").querySelectorAll(".btn").forEach(btn => btn.disabled = state.theme.disabled);
})

// store.dispatch({ type: "INIT_APPLICATION" })

window.addEventListener("DOMContentLoaded", () => {
  store.dispatch({ type: "INIT_STATE", payload: sessionStorage.getItem("sessionState") || 0 })
})

window.addEventListener("unload", () => {
  store.dispatch({ type: "SAVE_STATE" })
})