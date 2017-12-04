import React, { Component } from 'react'
import css from './interface.css'

class Interface extends Component {
    render() {
        const {inrefaceData, formatter} = this.props
        return (
            <div>
                <h4>{inrefaceData.name}</h4>
                <div className={css.interfaceData}>
                    rxBps: {formatter(inrefaceData.rxBps)} / txBps: {formatter(inrefaceData.txBps)}
                </div>
            </div>
        );
    }
}

export default Interface;
