import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Modal from 'react-bootstrap/lib/Modal'
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
              <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Text in a modal</h4>
                  <p>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={this.close}>Close</button>
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
