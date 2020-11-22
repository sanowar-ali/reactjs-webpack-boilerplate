import { combineReducers } from "redux";
import { loadState } from "./localStorage";
import { APP_API_KEY } from "../../component/Common/constant";
import initReducer from "./initReducer";
import {
  signupModal,
  loginModal,
  forgotpwdModal,
} from "../../component/Signup/reducer";
import {
  LOGIN,
  LOGIN_USER_DETAILS,
  LOGOUT,
  SESSION_TOKEN,
} from "../../component/Signup/action";

const LoginReducer = (state = {}, action) => {
  // need to change it to false
  let loadstate = loadState();

  if (loadstate === undefined) {
    state = { isLoggedIn: false };
  } else {
    state = { isLoggedIn: loadstate.isLoggedIn };
  }

  if (action.type === LOGIN) {
    state.isLoggedIn = action.payload;
  }
  if (action.type === LOGOUT) {
    state.isLoggedIn = action.payload;
  }
  //console.log("state.isLoggedIn", state.isLoggedIn);
  return state.isLoggedIn;
};

const TokensReducer = (state = {}, action) => {
  let loadstate = loadState();

  if (loadstate === undefined) {
    state = {
      session: {
        apiKey: APP_API_KEY,
        sessionToken: "",
        emailid: "",
        userid: "",
        username: "",
      },
    };
  } else {
    state = {
      session: {
        apiKey: APP_API_KEY,
        sessionToken: loadstate.session.session_token,
        emailid: loadstate.session.email,
        userid: loadstate.session.id,
        username: loadstate.session.name,
      },
    };
  }

  if (action.type === SESSION_TOKEN) {
    if (action.payload.session_token) {
      state.session.sessionToken = action.payload.session_token;
    }
  }

  // if (action.type === SESSION_TOKEN_PASSWORD) {
  //   if (action.payload.session_token) {
  //     state.session.sessionToken = action.payload.session_token;
  //   }
  // }

  if (action.type === LOGIN_USER_DETAILS) {
    if (action.payload.userid) {
      state.session.userid = action.payload.id;
      state.session.emailid = action.payload.email;
      state.session.username = action.payload.name;
    }
  }

  return state.session;
};

const rootReducer = combineReducers({
  initReducer,
  signupModal: signupModal,
  loginModal: loginModal,
  isLoggedIn: LoginReducer,
  session: TokensReducer,
  forgotpwdModal: forgotpwdModal,
});

export default rootReducer;
