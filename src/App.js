import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./context/state";

import useStyles from "./styles";
import Navsidebar from "./components/Navsidebar";

import Routes from "./routes";

function App(props) {
  const classes = useStyles();

  return (
    <Provider>
      <Router>
        <div className={classes.root}>
          <Navsidebar />
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
