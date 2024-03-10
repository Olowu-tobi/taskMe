import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/tasksSlice";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

export default rootReducer;
