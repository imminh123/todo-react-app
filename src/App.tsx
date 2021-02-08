import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./index.scss";

import { ListTodo } from './screens/list-todo/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ListTodo} /> 
      </Switch>
    </Router>
  );
}

export default App;
 