import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createForms } from "react-redux-form";
import { composeWithDevTools } from "redux-devtools-extension";
import { newForumFeedback } from "./newForum";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      ...createForms({
        createNewForum: newForumFeedback,
      }),
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
