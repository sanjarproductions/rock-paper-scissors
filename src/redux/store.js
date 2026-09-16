import { combineReducers, createStore } from "redux";

import moveOfPlayer from "./reducers/moveOfPlayer";
import moveOfRobot from "./reducers/moveofRobot";
import roundResult from "./reducers/roundResult";
import themeChange from "./reducers/themeChange";

const rootReducer = combineReducers({
  playersChoise: moveOfPlayer,
  moveOfRobot: moveOfRobot,
  themeChange: themeChange,
  roundResult: roundResult,
});

const store = createStore(rootReducer);

export default store;
