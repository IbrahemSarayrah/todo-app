import React from 'react';
import SettingsProvider from './context/settings';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import './app.scss';

import ToDo from './components/todo/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
      <ToDo />
      </SettingsProvider>
    );
  }
}
