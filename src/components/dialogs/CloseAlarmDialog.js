import React from 'react';
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { updateAlarm } from "./../../redux/actions";

export default function CloseAlarmDialog({isOpen, handleClose, selectedRow}) {
    const dispatch = useDispatch();
    const handleCloseTime = () => {
        selectedRow.closeTime = Date.now();
        dispatch(updateAlarm(`/alarms/${selectedRow.id}`, selectedRow, selectedRow.id));
        handleClose();
    }
    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Closed alarm</DialogTitle>
                <DialogContent>
                    <DialogContentText>Do you want to close the selected alarm?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={handleCloseTime} variant="contained">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
