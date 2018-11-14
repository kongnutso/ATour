import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import autobind from 'react-autobind';
import { Rating, Form, TextArea } from 'semantic-ui-react';
import PopUpModal from '../PopUpModal/PopUpModal';
import './styles.css';

class BookedHistoryInfo extends React.Component {
  constructor() {
    super();
    autobind(this);
    this.state = { confirmationModal: false };
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
                Submit
              </div>
            </Box>
          </Flex>
        </div>
      );
  }

  renderRedButton() {
    const { status } = this.props;
    let text;
    if (status < 3) text = 'Cancel';
    else if (status === 3) text = 'Refund';
    if (this.props.status <= 3) {
      return (
        <div
          className="bookedhistoryinfo-headbutton"
          onClick={() => {
            this.setState({ confirmationModal: true });
          }}
        >
          {text}
        </div>
      );
    } else {
      return <div className="bookedhistoryinfo-headbutton-gray">Refund</div>;
    }
  }

  render() {
    const { status } = this.props;
    let message;
    if (status <= 2) {
      message = 'Cancel';
    } else if (status === 3) {
      message = 'Refund';
    }
    return (
      <div className="bookedhistoryinfo-page">
        <div className="bookedhistoryinfo-header">
          <i className="fa fa-calendar topbanner-icon" />
          <Link to="/bookedHistory">Booked History</Link> / Book ID :
          {this.props.bookedId}
          {this.renderRedButton()}
        </div>
        <PopUpModal
          isOpen={this.state.confirmationModal}
          onCloseModal={() => this.setState({ confirmationModal: false })}
          headerText={`${message} Confirmation`}
          bodyText={`Do you want to [${message}] ? `}
          // onConfirm
          isDanger
          type="Confirmation"
        />
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
                    Choose file
                  </div>
                  <div className="bookedhistoryinfo-upliadfile">
                    {this.props.slip}
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
    slip: state.bookedHistoryInfo.slip
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookedHistoryInfo);
