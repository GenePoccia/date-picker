import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "dates-taken") {
    return {
      ...state,
      datesTaken: action.body
    };
  }

  if (action.type === "city-selection") {
    return {
      ...state,
      city: action.body
    };
  }

  if (action.type === "date-updated") {
    return {
      ...state,
      startDate: action.startDate,
      endDate: action.endDate
    };
  }
  return state;
};
const store = createStore(
  reducer,
  {
    datesTaken: {},
    startDate: null,
    endDate: null,
    city: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
