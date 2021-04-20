import { Typography, AppBar, Toolbar, makeStyles } from "@material-ui/core";
import React from "react";

import Weather from "../Features/Weather/Weather";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

export default () => {
  const classes = useStyles();

  const name = "thrivikram's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} EOG React Visualization Assessment
        </Typography>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};
