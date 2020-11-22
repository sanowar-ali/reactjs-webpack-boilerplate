import axios from "axios";
//import axiosFileupload from "axios-fileupload";
import { APP_API_KEY } from "../Common/constant";

import {
  getHeaders,
  getImageHeaders,
  getMultiPartHeaders,
  getHeadersWithParams,
  getExtraImageHeaders,
} from "./common-utils";

export function getRequestAccess(
  url,
  session = null,
  dispatch,
  successCallback,
  errorCallback
) {
  var config = {
    headers: {
      "content-type": "application/json",
      "X-DreamFactory-Api-Key": APP_API_KEY,
    },
  };

  _handleResponse(
    axios.get(url, config),
    dispatch,
    (session = null),
    successCallback,
    errorCallback
  );
}

export function postRequestAccess(
  url,
  postBody,
  session = null,
  dispatch,
  successCallback,
  errorCallback
) {
  var config = {
    headers: {
      "content-type": "application/json",
      "X-DreamFactory-Api-Key": APP_API_KEY,
    },
  };

  _handleResponse(
    axios.post(url, postBody, config),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

export function getRequest(
  url,
  session = null,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(
    axios.get(url, getHeaders(session)),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

export function getCustomRequest(
  url,
  params,
  session,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(
    axios.get(url, getHeadersWithParams(session, params)),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

export function postCustomRequest(
  url,
  postBody,
  session,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(
    axios.post(url, postBody, getHeadersWithParams(session, postBody)),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

export function postMultipartRequest(
  url,
  postBody,
  session,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(
    axios.post(url, postBody, getMultiPartHeaders(session)),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

export function postRequest(
  url,
  postBody,
  session,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(
    axios.post(url, postBody, getHeaders(session)),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

export function patchRequest(
  url,
  patchBody,
  session,
  dispatch,
  successCallback,
  errorCallback
) {
  dispatch(hideLoading());
  dispatch(showLoading());
  _handleResponse(
    axios.patch(url, patchBody, getHeaders(session)),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

export function deleteRequest(
  url,
  session,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(
    axios.delete(url, getHeaders(session)),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

export function deleteBulkRequest(
  url,
  session,
  deleteBody,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleResponse(
    axios.delete(url, { data: deleteBody, headers: getHeaders(session) }),
    dispatch,
    session,
    successCallback,
    errorCallback
  );
}

// export function fileUploadRequest(
//   url,
//   fileData,
//   dispatch,
//   successCallback,
//   errorCallback
// ) {
//   if (dispatch) {
//     dispatch(hideLoading());
//     dispatch(showLoading());
//   }
//   _handleResponse(
//     axiosFileupload(url, fileData),
//     dispatch,
//     successCallback,
//     errorCallback
//   );
// }

export function uploadEncodedFile(
  url,
  session,
  filedata,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleFileResponse(
    axios.post(url, filedata, getImageHeaders(session)),
    dispatch,
    successCallback,
    errorCallback
  );
}

export function deleteEncodedFile(
  url,
  session,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleFileResponse(
    axios.delete(url, getImageHeaders(session)),
    dispatch,
    successCallback,
    errorCallback
  );
}

export function uploadEncodedFileRemote(
  url,
  session,
  filedata,
  filename,
  dispatch,
  successCallback,
  errorCallback
) {
  if (dispatch) {
    dispatch(hideLoading());
    dispatch(showLoading());
  }
  _handleFileResponse(
    axios.post(url, filedata, getExtraImageHeaders(session, filename)),
    dispatch,
    successCallback,
    errorCallback
  );
}

function _handleFileResponse(
  response,
  dispatch,
  successCallback,
  errorCallback
) {
  response.then(
    (response) => {
      if (dispatch) dispatch(hideLoading());

      if (response && response.data && response.data.resource) {
        successCallback(response.data.resource[0]);
      } else {
        successCallback(response);
      }
    },
    (error) => {
      if (dispatch) dispatch(hideLoading());
      errorCallback(error);
    }
  );
}

function _handleResponse(
  response,
  dispatch,
  session = null,
  successCallback,
  errorCallback
) {
  response
    .then(({ data }) => {
      successCallback(data);
    })
    .catch((error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        if (dispatch) {
          // if (session) dispatch(logout(session));
          console.log("error.....api call");
        }
      } else {
        // if (error.response) errorCallback(error.response.data.error);
        // else errorCallback(error);
      }
    });
}
