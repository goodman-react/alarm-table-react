import { READ_LIST_FAILURE, READ_ALARM_LIST, UPDATE_ALARM, UPDATE_ALARM_FAILURE } from "./actionCreators";

export const initialState = {
  historyData: [],
  historyError: {},
  status: false
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_ALARM_LIST:
      return {
        ...state,
        historyData: action.payload,
        status: false
      };
    case READ_LIST_FAILURE:
      return {
        ...state,
        historyError: action.payload
      };
    case UPDATE_ALARM:
      return {
        ...state,
        status: action.payload
      };
    case UPDATE_ALARM_FAILURE:
      return {
        ...state,
        historyError: action.payload
      };

    default:
      return state;
  }
};

export default historyReducer;
