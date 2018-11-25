import React from 'react';
import Modal from 'react-modal';
import './styles.css';

class PopUpModal extends React.Component {
  render() {
    const { headerText, bodyText, type, isDanger } = this.props;
    const modal =
      type === 'Confirmation' ? (
        <div>
          <div className="popUpModal-topic">{headerText}</div>
          <hr className="popUpModal-line" />
          <div>{bodyText}</div>
          <div className="popUpModal-button-container">
            <button
              className={'popUpModal-confirm' + (isDanger ? '-danger' : '')}
              onClick={() => {
                this.props.onConfirm();
                this.props.onCloseModal();
              }}
            >
              Confirm
            </button>
            <button
              className="popUpModal-cancel"
              onClick={() => {
                this.props.onCloseModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="popUpModal-topic">{this.props.headerText}</div>
          <hr className="popUpModal-line" />
          <div>{this.props.bodyText}</div>
          <div className="popUpModal-button-container">
            <button
              className="popUpModal-ok"
              onClick={() => {
                this.props.onCloseModal();
              }}
            >
              Ok
            </button>
          </div>
        </div>
      );
    return (
      <Modal
        className="modal-container-popUpModal"
        style={{
          overlay: {
            overflow: 'auto'
          }
        }}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseModal}
        ariaHideApp={false}
      >
        {modal}
      </Modal>
    );
  }
}

export default PopUpModal;
