//@flow

import React, { Component } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Device from '../Device/Device'
import css from './dashboard.css'

type State = {
  dashboard: Array<any>,
  error: string
}

type Props = { /* ... */ };

class Dashboard extends Component<Props, State> {
  state = {
    dashboard: [],
    error: ''
  }

  componentDidMount() {
    this.rws = new ReconnectingWebSocket('ws://localhost:3000')
    this.rws.onmessage = e => this.setState({ dashboard: Object.values(JSON.parse(e.data)) })
    this.rws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.rws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })
  }

  componentWillUnmount() {
    this.rws.close()
  }

  render () {
    const {dashboard, error} = this.state
    if (error !== '') {
      return (
        <h1>{error} (probably server isn't launched)</h1>
      )
    } else {
      return (
        <div className={css.component}>
          {dashboard[0] &&
            dashboard[0].map(device => {
              return <Device key={device.address} device={device} />
          })}
        </div>
      )
    }
  }
}

export default Dashboard
