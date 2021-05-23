import { READ_LIST, READ_LIST_FAILURE } from "./actionCreators";

export const initialState = {
  historyData: [],
  historyError: {}
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_LIST:
      return {
        ...state,
        historyData: action.payload
      };
    case READ_LIST_FAILURE:
      return {
        ...state,
        historyError: action.payload
      };

    default:
      return state;
  }
};

export default historyReducer;
