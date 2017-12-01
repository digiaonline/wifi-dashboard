import React, {Component} from 'react'
import InterfaceGroup from '../InterfaceGroup/InterfaceGroup'
import css from './device.css'


class Device extends Component {
  state = {
    device: this.props.device
  }

  componentWillReceiveProps(nextProps) {
     this.setState({device: nextProps.device})        
  }

  render () {
    const {device} = this.state
    return (
      <div className={css.component}>
        <h2>{device.name}</h2>
        <div className={css.interfaces}>
          {device.interfaceGroups && device.interfaceGroups.map(interfaceData => {
            return <InterfaceGroup interfaceData={interfaceData} />
          })}
        </div>        
      </div>
    )
  }
}

export default Device;
