import React from 'react';
import SettingsProvider from './context/settings';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import Login from './components/login/login';
import Auth from './components/login/auth';
import AuthProvider from './context/authentication';

import './app.scss';

import ToDo from './components/todo/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Login/>
        <Auth capability="read">
          <SettingsProvider>
            <ToDo />
          </SettingsProvider>
        </Auth>
      </AuthProvider>
    );
  }
}
