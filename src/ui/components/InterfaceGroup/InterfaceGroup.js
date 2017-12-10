import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import Interface from '../Interface/Interface'
import FontAwesome from 'react-fontawesome'
import faStyles from 'font-awesome/css/font-awesome.css'
import css from './interfaceGroup.css'

const MAX_CHART_DATAPOINTS = 30

class InterfaceGroup extends Component {
  state = {
    interfaceData: this.props.interfaceData,
    rxBps: new Array(MAX_CHART_DATAPOINTS).fill({ bits: 0, time: '' }),
    txBps: new Array(MAX_CHART_DATAPOINTS).fill({ bits: 0, time: '' }),
  }

  formatBitrate = value => {
    if (value < 1000) {
      return `${value} bits`
    } else if (value < 1000 * 1000) {
      return `${Math.round(value / 1000)} kbit/s`
    }

    return `${Math.round(value / 1000 / 1000)} Mbit/s`
  }

  // componentDidMount() {
  //     setInterval(() => this.forceUpdate(), 1000);
  // }

  componentWillReceiveProps(nextProps) {
    const { rxBps, txBps } = this.state
    let time = moment().format('H:mm:ss')

    if (rxBps.length < MAX_CHART_DATAPOINTS) {
      let rxBpsTemp = rxBps.slice()
      rxBpsTemp.push({ bits: nextProps.interfaceData.rxBps, time })
      this.setState({ rxBps: rxBpsTemp })
    } else {
      let rxBpsTemp = rxBps.slice()
      rxBpsTemp.splice(0, 1)
      rxBpsTemp.push({ bits: nextProps.interfaceData.rxBps, time })
      this.setState({ rxBps: rxBpsTemp })
    }

    if (txBps.length < MAX_CHART_DATAPOINTS) {
      let txBpsTemp = txBps.slice()
      txBpsTemp.push({ bits: nextProps.interfaceData.txBps, time })
      this.setState({ txBps: txBpsTemp })
    } else {
      let txBpsTemp = txBps.slice()
      txBpsTemp.shift()
      txBpsTemp.push({ bits: nextProps.interfaceData.txBps, time })
      this.setState({ txBps: txBpsTemp })
    }

    this.setState({ interfaceData: nextProps.interfaceData })
  }

  render() {
    const { rxBps, txBps, interfaceData } = this.state

    let labels = []
    let recieved = []
    rxBps.map(item => {
      labels.push(item.time)
      recieved.push(item.bits)
    })

    let sent = []
    txBps.map(item => {
      sent.push(item.bits)
    })

    const options = {
      animation: false,
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              // Include a dollar sign in the ticks
              callback: this.formatBitrate,
            },
          },
        ],
      },
    }
    const data = {
      labels,
      datasets: [
        {
          label: 'rxBps',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192, .4)',
          fillColor: 'rgba(75,192,192, .4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 45,
          data: recieved,
        },
        {
          label: 'txBps',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(250,128,114, .4)',
          fillColor: 'rgba(250,128,114, .4)',
          borderColor: 'salmon',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'salmon',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'salmon',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 45,
          data: sent,
        },
      ],
    }

    return (
      <div className={css.component}>
        <h3>
          {interfaceData.name !== 'WAN' && (
            <FontAwesome
              className={css.titleIcon}
              name="signal"
              cssModule={faStyles}
            />
          )}
          {interfaceData.name}
        </h3>
        <div className={css.interfaceData}>
          {this.formatBitrate(this.state.interfaceData.rxBps)} /{' '}
          {this.formatBitrate(this.state.interfaceData.txBps)}
          <div className={css.chart}>
            <Line data={data} options={options} />
          </div>
        </div>
        <div className={css.interfaces}>
          {interfaceData.interfaces.map((inrefaceData, index) => {
            return (
              <Interface
                key={`${inrefaceData.name}-${index}`}
                inrefaceData={inrefaceData}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default InterfaceGroup
