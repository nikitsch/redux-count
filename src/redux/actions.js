import { CHANGE_THEME, DECREMENT, INCREMENT } from "./types";

export function increment() {
  return {
    type: INCREMENT
  }
}

export function decrement() {
  return {
    type: DECREMENT
  }
}

export function asyncIncrement() {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, 1000);
  }
}

export function changeTheme(newTheme) {
  return {
    type: CHANGE_THEME,
    payload: newTheme
  }
}