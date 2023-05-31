import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { asyncIncrement, decrement, increment } from './redux/actions'
import { rootReducer } from './redux/rootReducer'
import './styles.css'

const counter = document.getElementById("counter")
const addBtn = document.getElementById("add")
const subBtn = document.getElementById("sub")
const asyncBtn = document.getElementById("async")
const themeBtn = document.getElementById("theme")

const store = createStore(rootReducer, 0, applyMiddleware(thunk))

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
  // document.body.classList.toggle('dark');
})

store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state
})

store.dispatch({ type: "INIT_APPLICATION" })