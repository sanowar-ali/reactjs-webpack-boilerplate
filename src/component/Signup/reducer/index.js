import { SIGNUP_MODAL, LOGIN_MODAL, FORGOT_MODAL } from "../action";

export function signupModal(state = {}, action) {
  switch (action.type) {
    case SIGNUP_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export function loginModal(state = {}, action) {
  switch (action.type) {
    case LOGIN_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export function forgotpwdModal(state = {}, action) {
  switch (action.type) {
    case FORGOT_MODAL:
      return action.payload;
    default:
      return state;
  }
}
