import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { warningModal } from '../../action/ModalAction';
import autobind from 'react-autobind';
import './styles.css';

class WarningModal extends React.Component {
  constructor() {
    super();
    // autobind(this, '', '');
  }

  render() {
    return (
      <Modal
        className="modal-container-warningModal"
        style={{
          overlay: {
            overflow: 'auto'
          }
        }}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseModal}
        ariaHideApp={false}
      >
        <div>
          <div className="warninModal-topic">
            {this.props.modalType} Confirmation
          </div>
          <hr className="warninModal-line" />
          <div>Do you want to [{this.props.modalType}] ? </div>
          <div className="warninModal-button">
            <div
              className="warninModal-confirm"
              onClick={() => {
                console.log('confirm');
              }}
            >
              Confirm
            </div>
            <div
              className="warninModal-cancel"
              onClick={() => {
                this.props.onCloseModal();
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.modal.warning,
    modalType: state.bookedHistoryInfo.modalType
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(warningModal(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(WarningModal);
