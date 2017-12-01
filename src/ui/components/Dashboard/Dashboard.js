import React, {Component} from 'react'
import Device from '../Device/Device'
import css from './dashboard.css'


class Dashboard extends Component {
  state = {
    dashboard: []
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3000')
    this.ws.onmessage = e => this.setState({ dashboard: Object.values(JSON.parse(e.data)) })
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render () {
    const {dashboard} = this.state
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

export default Dashboard
