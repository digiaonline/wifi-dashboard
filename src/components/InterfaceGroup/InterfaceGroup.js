import React, { Component } from 'react';
import Interface from '../Interface/Interface'
import css from './interfaceGroup.css'

class InterfaceGroup extends Component {

    state = {
        interfaceData: this.props.interfaceData
    }

    // componentDidMount() {
    //     setInterval(() => this.forceUpdate(), 1000);
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({interfaceData: nextProps.interfaceData})        
    }

    
    
    render() {
        console.log( new Date())
        return (
            <div className={css.component}>
                <h3>{this.state.interfaceData.name}</h3>
                <div className={css.interfaceData}>
                    {this.state.interfaceData.rxBps} / {this.state.interfaceData.txBps}
                </div>
                <div className={css.interfaces}>
                    {this.state.interfaceData.interfaces.map((inrefaceData) => {
                        return <Interface inrefaceData={inrefaceData}/>
                    })}
                </div>
            </div>
        );
    }
}

export default InterfaceGroup;