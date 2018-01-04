//@flow

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Modal, Table } from 'react-bootstrap'

import faStyles from 'font-awesome/css/font-awesome.css'
import css from './interface.css'

class Interface extends Component {
  state = {
    inrefaceData: this.props.inrefaceData,
    showModal: false,
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ inrefaceData: nextProps.inrefaceData })
  }

  close = () => {
    this.setState({ showModal: false })
  }

  open = () => {
    this.setState({ showModal: true })
  }

  render() {
    const { inrefaceData } = this.state
    const { connectedClients } = inrefaceData
    // console.log(inrefaceData)
    return (
      <div>
        {inrefaceData.name !== 'br1-wan' && (
          <div>
            <h4>
              <span className={css.interfaceName}>{inrefaceData.name}: </span>
              <span onClick={this.open} className={css.interfaceInfo}>
                <FontAwesome
                  className={css.userIcon}
                  name="user-times"
                  cssModule={faStyles}
                />
                <span className={css.interfaceUsers}>
                  {connectedClients.length}
                </span>
              </span>
            </h4>
            <div>
              <Modal
                show={this.state.showModal}
                onHide={this.close}
                bsSize="large"
              >
                <Modal.Header closeButton>
                  <Modal.Title className={css.modalTitle}>
                    {inrefaceData.name}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table responsive striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th>Client's IP</th>
                        <th>RX Rate</th>
                        <th>TX Rate</th>
                        <th>TX CCQ</th>
                        <th>Uptime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {connectedClients.map((client, index) => {
                        return (
                          <tr key={index}>
                            <td>{client['last-ip']}</td>
                            <td>{client['rx-rate']}</td>
                            <td>{client['tx-rate']}</td>
                            <td>{client['tx-ccq']}</td>
                            <td>{client['uptime']}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={this.close} className={css.button}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Interface
