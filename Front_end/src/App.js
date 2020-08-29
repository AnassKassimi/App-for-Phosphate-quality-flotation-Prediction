import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import { Home } from './pages/Home.jsx';

import suivie_flottation from './pages/suivie_flottation'

import prediction_unaire from './pages/prediction_unaire'
import { multi_predictions } from './pages/multi_predictions'
import optimisations from './pages/optimisations'
import users from './pages/users'
import HomeIcon from "@material-ui/icons/Home";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import SettingsIcon from "@material-ui/icons/Settings";
import Sidebarr from "./Components/Sidebarr";
import KeyboardArrowRightSharpIcon from '@material-ui/icons/KeyboardArrowRightSharp';
import Login from './Components/Login';
import Register from './Components/Register';
import jwt_decode from 'jwt-decode';

function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2));
}
if (localStorage.usertoken) {
  const token = localStorage.usertoken
  const decoded = jwt_decode(token)
}

const items_process = [
  'divider',


  {
    name: "suivi",
    label: "Suivi de Flottation",
    Icon: ShowChartIcon,
    path: "/suivie_flottation", onClick

  }, 'divider',

  {
    name: "prediction",
    label: "Prédictions",
    Icon: KeyboardArrowRightSharpIcon,
    items: [
      { name: "form", label: "Prédiction unaire", path: "/prediction_unaire", onClick },
      { name: "excel", label: "Multi Prédictions", path: "multi_predictions", onClick }
    ]
  }, 'divider',

  {
    name: "optimisation",
    label: "Optimisations",
    Icon: KeyboardArrowRightSharpIcon,
    path: "/optimisations",
    onClick
  },
  'divider',
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    items: [
      { name: "managing", label: "Gestion utilisateurs", onClick, path: '/users' },
      {
        name: "registering", label: "Ajout utilisateur", onClick,
        path: '/register'
      },
    ]
  }, 'divider',
];
const items_control = [
  'divider'

  ,

  {
    name: "prediction",
    label: "Prédictions",
    Icon: KeyboardArrowRightSharpIcon,
    path: "/prediction_unaire", onClick

  }, 'divider',

  {
    name: "optimisation",
    label: "Optimisations",
    Icon: KeyboardArrowRightSharpIcon,
    path: "/optimisations",
    onClick
  },
  'divider',
];

const Main = withRouter(({ location }) => {

  return (
    <React.Fragment>


      <Route path="/" render={() => (
        localStorage.usertoken ? (
          <Redirect to="/prediction_unaire" />
        ) : (
            <Redirect to="/login" />
          )
      )} />

      <Route exact path="/multi_predictions" render={() => (
        localStorage.usertoken ? (
          <Redirect to="/multi_predictions" />
        ) : (
            <Redirect to="/login" />
          )
      )} />
      <Route exact path="/prediction_unaire" render={() => (
        localStorage.usertoken ? (
          <Redirect to="/prediction_unaire" />
        ) : (
            <Redirect to="/login" />
          )
      )} />
      <Route exact path="/optimisations" render={() => (
        localStorage.usertoken ? (
          <Redirect to="/optimisations" />
        ) : (
            <Redirect to="/login" />
          )
      )} />
      <Route exact path="/suivie_flottation" render={() => (
        localStorage.usertoken ? (
          <Redirect to="/suivie_flottation" />
        ) : (
            <Redirect to="/login" />
          )
      )} />
      <Route exact path="/register" render={() => (
        localStorage.usertoken ? (
          <Redirect to="/register" />
        ) : (
            <Redirect to="/login" />
          )
      )} />
      <Route exact path="/users" render={() => (
        localStorage.usertoken ? (
          <Redirect to="/users" />
        ) : (
            <Redirect to="/login" />
          )
      )} />
      {location.pathname == '/login' || location.pathname == '/' || !localStorage.usertoken ? null : (<NavigationBar />)}
      {location.pathname == '/login' || location.pathname == '/' || !localStorage.usertoken ? null : (<Sidebarr items={jwt_decode(localStorage.usertoken).identity.role == 'Ingénieur de process' ? items_process : items_control} />)}

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/multi_predictions" component={multi_predictions} />
        <Route path="/prediction_unaire" component={prediction_unaire} />
        <Route path="/optimisations" component={optimisations} />
        <Route path="/suivie_flottation" component={suivie_flottation} />

        <Route path="/register" component={Register} />
        <Route path="/users" component={users} />


      </Switch>


    </React.Fragment>
  );
})

const App = () => (
  <Router>
    <Main />
  </Router>
)
export default App;

