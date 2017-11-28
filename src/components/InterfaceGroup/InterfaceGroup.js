import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import moment from 'moment'
import Interface from "../Interface/Interface";
import css from "./interfaceGroup.css";

class InterfaceGroup extends Component {
  state = {
    interfaceData: this.props.interfaceData,
    rxBps: [],
    txBps: []
  };

  // componentDidMount() {
  //     setInterval(() => this.forceUpdate(), 1000);
  // }

  componentWillReceiveProps(nextProps) {
    

    const {rxBps, txBps } = this.state
    let time = moment().format('H:mm:ss')

    if ( rxBps.length < 11 )  {
        let rxBpsTemp = rxBps.slice()
        rxBpsTemp.push({ bites: nextProps.interfaceData.rxBps, time })
        this.setState({rxBps: rxBpsTemp})
    }  else {
        let rxBpsTemp = rxBps.slice()
        rxBpsTemp.splice(0, 1)
        rxBpsTemp.push({ bites: nextProps.interfaceData.rxBps, time })
        this.setState({rxBps: rxBpsTemp})
    }
   
    
    if ( txBps.length < 11 )  {
        let txBpsTemp = txBps.slice()
        txBpsTemp.push({ bites: nextProps.interfaceData.txBps, time })
        this.setState({ txBps: txBpsTemp })
    }  else {
        let txBpsTemp = txBps.slice()
        txBpsTemp.shift()
        txBpsTemp.push({ bites: nextProps.interfaceData.txBps, time })
        this.setState({ txBps: txBpsTemp })
    }

    this.setState({ interfaceData: nextProps.interfaceData });
    
  }

  render() {
      const {rxBps, txBps} = this.state
      
      let labels = []
      let recieved = []
      rxBps.map(item => {
        labels.push(item.time)
        recieved.push(item.bites)
      })

      let sent = []
      txBps.map(item => {
        sent.push(item.bites)
      })

      const options = {
        animation: false,
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return `${value} bites`;
                    }
                }
            }]
        }
      }
    const data = {
      labels,
      datasets: [
        {
          label: "rxBps",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192, .4)",
          fillColor: "rgba(75,192,192, .4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 45,
          data: recieved
        },
        {
          label: "txBps",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(250,128,114, .4)",
          fillColor: "rgba(250,128,114, .4)",
          borderColor: "salmon",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "salmon",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "salmon",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 45,
          data: sent
        }
      ]
    };

    return (
      <div className={css.component}>
        <h3>{this.state.interfaceData.name}</h3>
        <div className={css.interfaceData}>
          {this.state.interfaceData.rxBps} / {this.state.interfaceData.txBps}
          <div className={css.chart}>
            <Line data={data} options={options} />
          </div>
        </div>
        <div className={css.interfaces}>
          {this.state.interfaceData.interfaces.map(inrefaceData => {
            return <Interface inrefaceData={inrefaceData} />;
          })}
        </div>
      </div>
    );
  }
}

export default InterfaceGroup;
