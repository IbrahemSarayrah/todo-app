import React from 'react';
import SettingsProvider from './context/settings';
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
