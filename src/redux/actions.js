import { READ_LIST, READ_LIST_FAILURE } from "./actionCreators";
import { readList } from "../APIUtils";

/**
 * Read the list, according page, page size and sorting.
 * @param path is the endpoint of the API.
 */
export const readDevices = (path) => {
  return (dispatch) => {
    readList(path)
      .then((data) =>
        dispatch(
          {
            type: READ_LIST,
            payload: data
          },
          console.log("Actions historyData: ", data)
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
