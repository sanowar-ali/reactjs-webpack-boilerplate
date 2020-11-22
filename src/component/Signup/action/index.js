import axios from "axios";
import { BASE_URL, APP_API_KEY } from "../../Common/constant";
import { getRequestAccess } from "../../Common/network-call";
import { saveState } from "../../../redux/reducer/localStorage";
import { getHeaders } from "../../Common/common-utils";

export const SIGNUP_MODAL = "SIGNUP_MODAL";
export const LOGIN_MODAL = "LOGIN_MODAL";
export const FORGOT_MODAL = "FORGOT_MODAL";
export const SESSION_TOKEN = "SESSION_TOKEN";
export const LOGIN = "LOGIN";
export const LOGIN_USER_DETAILS = "LOGIN_USER_DETAILS";
export const LOGOUT = "LOGOUT";

export function openSignUpModal(showModal = false) {
  return { type: SIGNUP_MODAL, payload: { showModal: showModal } };
}

export function openLoginModal(showModal = false) {
  return { type: LOGIN_MODAL, payload: { showModal: showModal } };
}

export function openForgotModal(showModal = false) {
  return { type: FORGOT_MODAL, payload: { showModal: showModal } };
}

export function addUser(values, callback) {
  var config = {
    headers: {
      "content-type": "application/json",
      "X-DreamFactory-Api-Key": APP_API_KEY,
    },
  };

  var url = `${BASE_URL}/api/v2/klout/_table/appuser`;

  var body = {
    resource: [{ ...values }],
  };
  var response = axios.post(url, body, config);
  response.then(({ data }) => {
    if (
      data &&
      data.resource &&
      data.resource.length > 0 &&
      data.resource[0].id
    ) {
      callback({ success: 1 });
    } else {
      callback({ success: 0 });
    }
  });
}

export function validateEmailForAppUser(values, callback) {
  var url = `${BASE_URL}/api/v2/klout/_table/appuser?filter=(email=${values.email})`;
  return (dispatch) => {
    getRequestAccess(url, null, dispatch, (data) => {
      if (data.resource.length > 0) {
        callback({ success: 2 });
      } else {
        callback({ success: 1 });
      }
    });
  };
  //   var config = {
  //     headers: {
  //       "content-type": "application/json",
  //       "X-DreamFactory-Api-Key": APP_API_KEY,
  //     },
  //   };
  //   var response = axios.get(url, config);
  //   response
  //     .then(({ data }) => {
  //       if (data.resource.length > 0) {
  //         callback({ success: 2 });
  //       } else {
  //         callback({ success: 1 });
  //       }
  //     })
  //     .catch((error) => {
  //       callback({ success: 0, message: error });
  //     });
}

export function login(values, callback) {
  var config = {
    headers: {
      "content-type": "application/json",
      "X-DreamFactory-Api-Key": APP_API_KEY,
    },
  };

  var data = {
    email: values.email,
    password: values.password,
    type: "email",
    //duration: 0
  };

  var url = `${BASE_URL}/api/v2/user/session`;
  var response = axios.post(url, data, config);
  return (dispatch) => {
    response
      .then(({ data }) => {
        if (data) {
          if (data.isactive) {
            data.apiKey = APP_API_KEY;
            var stateToSave = {
              isLoggedIn: true,
              session: data,
            };
            saveState(stateToSave);
            dispatch({ type: SESSION_TOKEN, payload: data });
            dispatch({ type: LOGIN_USER_DETAILS, payload: data });
            dispatch({ type: LOGIN, payload: true });
            callback({ success: 1 });
          } else {
            callback({
              success: 2,
              message: "Profile Inactive",
            });
          }
        }
      })
      .catch((error) => {
        callback({ success: 0, message: error });
      });
  };
}

export function logout(session) {
  var url = `${BASE_URL}/api/v2/user/session`;
  var response = axios.delete(url, getHeaders(session));
  return (dispatch) => {
    response
      .then(({ data }) => {
        var stateToSave = {
          isLoggedIn: false,
          session: {},
        };
        saveState(stateToSave);
        dispatch({ type: "RESET" });
        dispatch({ type: LOGOUT, payload: false });
      })
      .catch((error) => {
        var stateToSave = {
          isLoggedIn: false,
          session: {},
        };
        saveState(stateToSave);
        // nothing to do
        dispatch({ type: LOGOUT, payload: false });
      });
  };
}

export function initiateReset(values, callback) {
  //This function is used To initiate Reset
  var config = {
    headers: {
      contentType: "application/json; charset=utf-8",
      "X-DreamFactory-Api-Key": APP_API_KEY,
    },
  };

  var data = {
    email: values.email,
  };

  var url = `${BASE_URL}api/v2/user/password?reset=true`;
  var response = axios.post(url, data, config);
  console.log("response", response);
  return (dispatch) => {
    response
      .then(({ data }) => {
        callback({ success: 1, message: "Success" });
      })
      .catch((error) => {
        callback({ success: 0, message: error });
      });
  };
}
