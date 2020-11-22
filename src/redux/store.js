import { createLogger } from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import { loadState, saveState } from "../redux/reducer/localStorage";

const loggerMiddleware = createLogger();

export const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
