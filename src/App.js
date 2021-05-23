import "./styles.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readDevices } from "./redux/actions";
import { FormattedMessage } from "react-intl";
import { DataGrid } from "@material-ui/data-grid";

export default function App() {
  const dispatch = useDispatch();
  const historyList = useSelector(
    (state) => state.historyReducer.historyData.data || []
  );

  useEffect(() => {
    dispatch(readDevices("/todos"));
  }, [dispatch]);

  let rows = historyList.map((obj, index) => {
    return (rows = {
      id: index + 1,
      ID: obj.userId,
      title: obj.title,
      completed: obj.completed
    });
  });

  const columns = [
    {
      field: "ID",
      flex: 1,
      renderHeader: () => <FormattedMessage id={"User ID"} />
    },
    {
      field: "Communication Status",
      flex: 1,
      renderHeader: () => <FormattedMessage id={"Communication Status"} />
    },
    {
      field: "Last Reading",
      flex: 1,
      type: "dateTime",
      renderHeader: () => <FormattedMessage id={"Last Reading"} />
    }
  ];

  return (
    <div>
      <h1>
        <FormattedMessage id="History" />
      </h1>
      <div style={{ height: "90%", width: "100%" }}>
        <DataGrid
          pageSize={50}
          rowsPerPageOptions={[50, 100, 150]}
          rows={rows}
          columns={columns}
          pagination={true}
          hideFooterSelectedRowCount={true}
        />
      </div>
    </div>
  );
}
