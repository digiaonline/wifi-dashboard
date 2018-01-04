//@flow

import React, { Component } from 'react'
import InterfaceGroup from '../InterfaceGroup/InterfaceGroup'
import css from './device.css'
import FontAwesome from 'react-fontawesome'
import faStyles from 'font-awesome/css/font-awesome.css'

type State = {
  device: Object
}

type Props = {
  device: Object,
}


class Device extends Component<Props, State> {
  state = {
    device: this.props.device,
  }

  componentWillReceiveProps(nextProps: Object) {
    this.setState({ device: nextProps.device })
  }

  render() {
    const { device } = this.state

    return (
      <div className={css.component}>
        <h2>
          <FontAwesome
            className={css.titleIcon}
            name={device.interfaceGroups[0].name === 'WAN' ? 'server' : 'wifi'}
            cssModule={faStyles}
          />
          {device.name}
        </h2>
        <div className={css.interfaces}>
          {device.interfaceGroups &&
            device.interfaceGroups.map((interfaceData, index) => {
              return (
                <InterfaceGroup
                  key={`${interfaceData.name}-${index}`}
                  interfaceData={interfaceData}
                />
              )
            })}
        </div>
      </div>
    )
  }
}

export default Device
