import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles
// import MaterialTheme from "../../../assets/stylesheets/themeOverride/MaterialTheme";

export default function IconBtn({ click, iconLabel }) {
  return (
    <MuiThemeProvider>
      <IconButton onClick={click}>
        <Icon>{iconLabel}</Icon>
      </IconButton>
    </MuiThemeProvider>
  );
}
