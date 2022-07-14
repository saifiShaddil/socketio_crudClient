import { createStore } from "redux";
import reducer from "./reduer";
import { composeWithDevTools } from "redux-devtools-extension"


export const store = createStore( reducer, composeWithDevTools());