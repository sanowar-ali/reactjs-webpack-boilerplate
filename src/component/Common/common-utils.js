import { notification } from "antd";

export const getHeaders = (session) => ({
  headers: {
    "X-DreamFactory-Api-Key": session.apiKey,
    "X-DreamFactory-Session-Token": session.sessionToken,
    contentType: "application/json; charset=utf-8",
  },
});

export const getMultiPartHeaders = (session) => ({
  headers: {
    "X-DreamFactory-Api-Key": session.apiKey,
    "X-DreamFactory-Session-Token": session.sessionToken,
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const getHeadersWithParams = (session, params) => ({
  headers: {
    "X-DreamFactory-Api-Key": session.apiKey,
    "X-DreamFactory-Session-Token": session.sessionToken,
    "Content-Type": "multipart/form-data",
  },
  params: params,
});

export const getImageHeaders = (session) => ({
  headers: {
    "X-DreamFactory-Api-Key": session.apiKey,
    "X-DreamFactory-Session-Token": session.sessionToken,
    contentType: "application/json; charset=utf-8",
  },
});

export const getExtraImageHeaders = (session, filename) => ({
  headers: {
    "X-DreamFactory-Api-Key": session.apiKey,
    "X-DreamFactory-Session-Token": session.sessionToken,
    contentType: "application/json; charset=utf-8",
    "X-File-Name": filename,
  },
});

export const openNotificationWithIcon = (type, title, desc) => {
  notification[type]({
    message: title,
    description: desc,
  });
};
