import "./styles.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readAlarms } from "./redux/actions";
import { FormattedMessage } from "react-intl";
import { DataGrid } from "@material-ui/data-grid";
import { FormControlLabel, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { orange } from '@material-ui/core/colors';

import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import ChangeSeverityDialog from "./components/dialogs/ChangeSeverityDialog";
import AcknowledgeDialog from "./components/dialogs/AcknowledgeDialog";

import { ToastContainer, toast } from 'react-toast';
import { green } from '@material-ui/core/colors';
import CloseAlarmDialog from "./components/dialogs/CloseAlarmDialog";


export const EditButton = ({
  selectedRow,
  isAcknowledge,
  isClosed,
  setOpenSeverityDialog,
  setOpenAcknowledgeDialog,
  setOpenCloseAlarmDialog,
  setSelectedRow
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setSelectedRow(selectedRow)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeverity = () => {
    setOpenSeverityDialog(true);
    handleClose();
  };

  const handleAcknowledge = () => {
    setOpenAcknowledgeDialog(true);
    handleClose();
  };

  const handleCloseAlarm = () => {
    setOpenCloseAlarmDialog(true);
    handleClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return <FormControlLabel
    control={
      <div>
        <IconButton color="secondary"
          aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
          <EditIcon style={{ color: orange[500] }} />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleSeverity}>Change Alarm Severity</MenuItem>
          {!isAcknowledge &&
            <MenuItem onClick={handleAcknowledge}>Acknowledge Alarm</MenuItem>
          }
          {!isClosed &&
            <MenuItem onClick={handleCloseAlarm}>Close Alarm</MenuItem>
          }
        </Popover>
      </div>
    }
  />
};

export default function App() {
  const dispatch = useDispatch();
  const [openSeverityDialog, setOpenSeverityDialog] = useState(false);
  const [openAcknowledgeDialog, setOpenAcknowledgeDialog] = useState(false);
  const [openCloseAlarmDialog, setOpenCloseAlarmDialog] = useState(false);

  const [selectedRow, setSelectedRow] = useState();

  const historyList = useSelector(
    (state) => state.historyReducer.historyData || []
  );
  const isUpdate = useSelector(
    (state) => state.historyReducer.status || false
  );

  const handleDialogClose = () => {
    setOpenSeverityDialog(false);
    setOpenAcknowledgeDialog(false);
    setOpenCloseAlarmDialog(false);
  }

  useEffect(() => {
    if(isUpdate){
      toast('Alarm updated', {
        backgroundColor: green[900],
        color: "#ffffff"
      })
    }
    dispatch(readAlarms("/alarms"))
  }, [isUpdate]);

  let rows = historyList.map((obj, index) => {
    return (rows = {
      id: obj.id,
      severity: obj.severity,
      acknowledgeTime: obj.acknowledgeTime,
      closeTime: obj.closeTime,
      realTime: obj.realTime
    });
  });
  console.log(rows);

  const columns = [
    {
      field: "severity",
      flex: 1,
      renderHeader: () => <FormattedMessage id={"severity"} defaultMessage="Severity" />
    },
    {
      field: "acknowledgeTime",
      flex: 1,
      type: "dateTime",
      renderHeader: () => <FormattedMessage id={"acknowledgeTime"} defaultMessage="AcknowledgeTime" />
    },
    {
      field: "closeTime",
      flex: 1,
      type: "dateTime",
      renderHeader: () => <FormattedMessage id={"closeTime"} defaultMessage="CloseTime" />
    },
    {
      field: "realTime",
      flex: 1,
      type: "boolean",
      renderHeader: () => <FormattedMessage id={"realTime"} defaultMessage="RealTime" />
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
            <EditButton
              selectedRow={params.row}
              isAcknowledge={Boolean(params.row.acknowledgeTime)}
              isClosed={Boolean(params.row.closeTime)}
              setOpenSeverityDialog={setOpenSeverityDialog}
              setOpenAcknowledgeDialog={setOpenAcknowledgeDialog}
              setOpenCloseAlarmDialog={setOpenCloseAlarmDialog}
              setSelectedRow={setSelectedRow}
            />
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <h1>
        <FormattedMessage id="history" defaultMessage="History" />
      </h1>
      <div style={{ height: "90vh", width: "100%" }}>
        <DataGrid
          pageSize={50}
          rowsPerPageOptions={[50, 100, 150]}
          rows={rows}
          columns={columns}
          pagination={true}
          hideFooterSelectedRowCount={true}
        />
      </div>
      <ChangeSeverityDialog isOpen={openSeverityDialog} handleClose={handleDialogClose} selectedRow={selectedRow} />
      <AcknowledgeDialog isOpen={openAcknowledgeDialog} handleClose={handleDialogClose} selectedRow={selectedRow} />
      <CloseAlarmDialog isOpen={openCloseAlarmDialog} handleClose={handleDialogClose} selectedRow={selectedRow} />
      <ToastContainer position="bottom-center" delay={5000} />
    </div>
  );
}
