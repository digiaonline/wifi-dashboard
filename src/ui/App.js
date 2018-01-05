//@flow

import React, { Component } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import logo from './assets/digia-logo.png'
import css from './App.css'

class App extends Component<> {
  static defaultProps: {};
  render() {
    return (
      <div className={css.App}>
        <header className={css.AppHeader}>
          <img src={logo} className={css.appLogo} alt="logo" />
          <h1 className={css.appTitle}>WiFi Dashboard</h1>
        </header>
        <Dashboard />
      </div>
    )
  }
}

export default App
