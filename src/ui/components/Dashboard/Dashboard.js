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
    this.ws = new ReconnectingWebSocket(process.env.SERVER_ADDRESS)
    this.ws.onmessage = e => this.setState({ dashboard: Object.values(JSON.parse(e.data)) })
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })
  }

  componentWillUnmount() {
    this.ws.close()
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
