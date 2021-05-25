import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { updateAlarm } from "./../../redux/actions";

export default function ChangeSeverityDialog({ isOpen, handleClose, selectedRow }) {
    const [value, setValue] = useState(selectedRow ? selectedRow.severity : "")

    useEffect(() => {
        setValue(selectedRow ? selectedRow.severity : "")
    }, [selectedRow])
    const dispatch = useDispatch();
    const handleChangeSeverity = () => {
        selectedRow.severity = value;
        dispatch(updateAlarm(`/alarms/${selectedRow.id}`, selectedRow, selectedRow.id));
        handleClose();
    }
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Edit alarm severity</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">Select alarm severity</InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={value}
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left"
                                },
                                getContentAnchorEl: null
                            }}
                        >
                            <MenuItem value={"High"}>High</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Low"}>Low</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={handleChangeSeverity} variant="contained">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
