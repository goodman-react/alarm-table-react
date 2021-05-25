import { READ_LIST_FAILURE, READ_ALARM_LIST, UPDATE_ALARM, UPDATE_ALARM_FAILURE } from "./actionCreators";
import { readList, updateList } from "../APIUtils";

export const readAlarms = (path) => {
  return (dispatch) => {
    readList(path)
      .then((data) =>
        dispatch(
          {
            type: READ_ALARM_LIST,
            payload: data
          }
        )
      )
      .catch((error) => {
        dispatch({
          type: READ_LIST_FAILURE,
          payload: error
        });
        console.log(error.response);
        throw error;
      });
  };
};

export const updateAlarm = (path, data, id) => {
  return (dispatch) => {
    updateList(path, data, id)
      .then((data) =>{
        dispatch(
          {
            type: UPDATE_ALARM,
            payload: true
          }
        );
      }
      )
      .catch((error) => {
        dispatch({
          type: UPDATE_ALARM_FAILURE,
          payload: error
        });
        console.log(error.response);
        throw error;
      });
  };
};