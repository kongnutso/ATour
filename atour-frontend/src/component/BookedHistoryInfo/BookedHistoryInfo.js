import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import autobind from 'react-autobind';
import { Rating, Form, TextArea } from 'semantic-ui-react';
import WarningModal from '../WarningModal/WarningModal';
import { warningModal } from '../../action/ModalAction';
import { setWarningType } from '../../action/ApplicationAction';
import './styles.css';

class BookedHistoryInfo extends React.Component {
  constructor() {
    super();
    autobind(
      this,
      'classNameStatus',
      'classNameColorButton',
      'classNameText',
      'renderReview',
      'onClickChooseFile',
      'renderRedButton',
      'setWarningType'
    );
  }

  classNameStatus(statusNumber) {
    if (statusNumber === this.props.status)
      return 'bookedhistoryinfo-status-inprocess';
    else if (statusNumber < this.props.status)
      return 'bookedhistoryinfo-status-finish';
    else return 'bookedhistoryinfo-status-coming';
  }

  classNameText(statusNumber) {
    if (statusNumber === this.props.status)
      return 'bookedhistoryinfo-text-inprocess';
    else if (statusNumber < this.props.status)
      return 'bookedhistoryinfo-text-finish';
    else return 'bookedhistoryinfo-text-coming';
  }

  classNameColorButton(statusNumber) {
    if (statusNumber < this.props.status) return 'bookedhistoryinfo-graybutton';
    else return 'bookedhistoryinfo-bluebutton';
  }

  onClickChooseFile(statusNumber) {
    if (statusNumber !== this.props.status) return;
    else {
      console.log('choose file');
    }
  }

  setWarningType() {
    if (this.props.status <= 2) this.props.setWarningType('Cancel');
    else if (this.props.status === 3) this.props.setWarningType('Refund');
  }

  renderRate(statusNumber) {
    if (statusNumber > this.props.status) return <div />;
    else
      return (
        <div>
          <Rating
            maxRating={5}
            clearable
            className="bookedhistoryinfo-rating"
          />
        </div>
      );
  }

  renderReview(statusNumber) {
    if (statusNumber > this.props.status) return <div />;
    else
      return (
        <div>
          <Flex>
            <Box p={2} width={1 / 15} />
            <Box p={3} width={14 / 15}>
              <Form>
                <TextArea autoHeight />
              </Form>
            </Box>
          </Flex>
          <Flex>
            <Box p={2} width={1 / 15} />
            <Box p={3} width={14 / 15}>
              <div
                className={this.classNameColorButton(5)}
                onClick={() => console.log('submit')}
              >
                submit
              </div>
            </Box>
          </Flex>
        </div>
      );
  }

  renderRedButton() {
    if (this.props.status < 3) {
      return (
        <div
          className="bookedhistoryinfo-headbutton"
          onClick={() => {
            this.props.openWarningModal();
          }}
        >
          Cancel
        </div>
      );
    } else if (this.props.status === 3) {
      return (
        <div
          className="bookedhistoryinfo-headbutton"
          onClick={() => {
            this.props.openWarningModal();
          }}
        >
          Refund
        </div>
      );
    } else {
      return <div className="bookedhistoryinfo-headbutton-gray">refund</div>;
    }
  }

  render() {
    this.setWarningType();
    return (
      <div className="bookedhistoryinfo-page">
        <div className="bookedhistoryinfo-header">
          <i className="fa fa-calendar topbanner-icon" />
          <Link to="/bookedHistory">Booked History</Link> / Book ID :
          {this.props.bookedId}
          {this.renderRedButton()}
        </div>
        <WarningModal />
        <hr className="bookedhistoryinfo-line" />
        <div>
          Status
          <div>
            <div className={this.classNameText(1)}>
              <Flex>
                <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                  <div className={this.classNameStatus(1)}>1</div>
                </Box>
                <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                  Booked Date: {this.props.bookedDate}
                </Box>
              </Flex>
            </div>
            <div className={this.classNameText(2)}>
              <Flex>
                <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                  <div className={this.classNameStatus(2)}>2</div>
                </Box>
                <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                  Uploaded File Date: {this.props.uploadedFileDate}
                </Box>
              </Flex>
              <Flex>
                <Box width={1 / 15} />
                <Box p={3} width={1} style={{ display: 'flex' }}>
                  <div
                    className={this.classNameColorButton(2)}
                    onClick={() => this.onClickChooseFile(2)}
                  >
                    choose file
                  </div>
                  <div className="bookedhistoryinfo-upliadfile">
                    {this.props.image}
                  </div>
                </Box>
              </Flex>
            </div>
            <div className={this.classNameText(3)}>
              <Flex>
                <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                  <div className={this.classNameStatus(3)}>3</div>
                </Box>
                <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                  Approved
                </Box>
              </Flex>
            </div>
            <div className={this.classNameText(4)}>
              <Flex>
                <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                  <div className={this.classNameStatus(4)}>4</div>
                </Box>
                <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                  Take a Trip!
                </Box>
              </Flex>
            </div>
            <div className={this.classNameText(5)}>
              <Flex>
                <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                  <div className={this.classNameStatus(5)}>5</div>
                </Box>
                <Box p={3} width={[1 / 4, 2 / 8, 2 / 15]}>
                  Review
                </Box>
                <Box p={3} width={[2 / 4, 5 / 8, 12 / 15]}>
                  {this.renderRate(5)}
                </Box>
              </Flex>
              {this.renderReview(5)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.bookedHistoryInfo.tourStatus,
    bookedDate: state.bookedHistoryInfo.bookedDate,
    uploadedFileDate: state.bookedHistoryInfo.uploadedFileDate,
    bookedId: state.bookedHistoryInfo.bookedId,
    image: state.bookedHistoryInfo.image,
    modalType: state.bookedHistoryInfo.modalType
  };
};

const mapDispatchToProps = dispatch => ({
  openWarningModal: () => dispatch(warningModal(true)),
  setWarningType: type => dispatch(setWarningType(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookedHistoryInfo);
