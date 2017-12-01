import React, { Component } from 'react'
import css from './interface.css'

class Interface extends Component {
    render() {
        const {inrefaceData} = this.props
        return (
            <div>
                <h4>{inrefaceData.name}</h4>
                <div className={css.interfaceData}>
                    rxBps: {inrefaceData.rxBps} / txBps: {inrefaceData.txBps}
                </div>
            </div>
        );
    }
}

export default Interface;