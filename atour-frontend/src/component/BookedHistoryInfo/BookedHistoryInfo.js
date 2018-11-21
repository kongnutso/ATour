import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import autobind from 'react-autobind';
import { Rating, Form, TextArea } from 'semantic-ui-react';
import PopUpModal from '../PopUpModal/PopUpModal';
import { setImageSlip } from '../../action/BookAction';
import './styles.css';

class BookedHistoryInfo extends React.Component {
  constructor() {
    super();
    autobind(this);
    this.state = {
      confirmationModal: false,
      inputImg: '',
      confirmModal: false,
      refund: false
    };
  }

  classNameStatus(statusNumber, isDanger = false) {
    let tempText = '';
    if (statusNumber === this.props.bookInfo._type)
      tempText = `bookedhistoryinfo-status-inprocess`;
    else if (statusNumber < this.props.bookInfo._type)
      return `bookedhistoryinfo-status-finish`;
    else tempText = `bookedhistoryinfo-status-coming`;

    if (isDanger) tempText = tempText + '-danger';
    return tempText;
  }

  classNameText(statusNumber) {
    if (statusNumber === this.props.bookInfo._type)
      return 'bookedhistoryinfo-text-inprocess';
    else if (statusNumber < this.props.bookInfo._type)
      return 'bookedhistoryinfo-text-finish';
    else return 'bookedhistoryinfo-text-coming';
  }

  classNameColorButton(statusNumber) {
    if (statusNumber < this.props.bookInfo._type)
      return 'bookedhistoryinfo-graybutton';
    else return 'bookedhistoryinfo-bluebutton';
  }

  onClickSaveSlip(statusNumber) {
    const {
      bookInfo: { _type, tripId, tourId }
    } = this.props;
    if (statusNumber !== 2) return;
    else {
      this.props.setImageSlip(
        this.state.inputImg,
        tripId,
        tourId,
        this.props.customerId
      );
    }
  }

  inputChange(event) {
    this.setState({ inputImg: event.target.value });
  }

  renderRate(statusNumber) {
    if (statusNumber > this.props.bookInfo._type) return <div />;
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
    if (statusNumber > this.props.bookInfo._type) return <div />;
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
    const {
      bookInfo: { _type }
    } = this.props;
    let text;
    if (_type < 3) text = 'Cancel';
    else if (_type === 3) text = 'Refund';
    if (_type <= 3) {
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
    const {
      _type,
      bookDate,
      uploadedFileDate,
      slip,
      tripDate,
      tourName,
      guideId,
      groupSize,
      price,
      tripId
    } = this.props.bookInfo;
    const { refund } = this.state;
    let message;
    if (_type <= 2) {
      message = 'Cancel';
    } else if (_type === 3 || _type === 4) {
      message = 'Refund';
    }
    return (
      <div className="bookedhistoryinfo-page">
        <PopUpModal
          isOpen={this.state.confirmModal}
          onCloseModal={() => this.setState({ confirmModal: false })}
          headerText={'Upload Confirmation'}
          bodyText="Do you want to upload this link? "
          type="Confirmation"
          onConfirm={() => this.onClickSaveSlip(2)}
        />
        <PopUpModal
          isOpen={this.state.confirmationModal}
          onCloseModal={() => this.setState({ confirmationModal: false })}
          headerText={`${message} Confirmation`}
          bodyText={`Do you want to [${message}] ? `}
          onConfirm={() => this.setState({ refund: true })}
          isDanger
          type="Confirmation"
        />
        <div className="bookedhistoryinfo-header">
          <i className="fa fa-calendar topbanner-icon" />
          <Link to="/bookedHistory">Booked History</Link> / Trip ID :{tripId}
          {this.renderRedButton()}
        </div>
        <hr className="bookedhistoryinfo-line" />
        <div className="bookedHistoryInfo-info-container">
          Book Detail
          <div className="bookedHistoryInfo-info">
            <div className="bookedHistoryInfo-info-each">
              <div className="bookedHistoryInfo-info-each-1">
                <div className="bookedHistoryInfo-info-topic">Tour name :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {tourName || 'test'}
                </div>
              </div>
            </div>
            <div className="bookedHistoryInfo-info-each">
              <div className="bookedHistoryInfo-info-each-1">
                <div className="bookedHistoryInfo-info-topic">Trip date :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {tripDate || 'test'}
                </div>
              </div>
              <div className="bookedHistoryInfo-info-each-2">
                <div className="bookedHistoryInfo-info-topic">Guide :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {guideId || 'test'}
                </div>
              </div>
            </div>
            <div className="bookedHistoryInfo-info-each">
              <div className="bookedHistoryInfo-info-each-1">
                <div className="bookedHistoryInfo-info-topic">Group size :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {groupSize || 'test'}
                </div>
              </div>
              <div className="bookedHistoryInfo-info-each-2">
                <div className="bookedHistoryInfo-info-topic">Price :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {price || 'test'}
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  Booked Date: {bookDate}
                </Box>
              </Flex>
            </div>
            <div className={this.classNameText(2)}>
              <Flex>
                <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                  <div className={this.classNameStatus(2)}>2</div>
                </Box>
                <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                  Uploaded File Date: {uploadedFileDate}
                </Box>
              </Flex>
              <Flex>
                <Box width={1 / 15} />
                <Box p={3} width={1} style={{ display: 'flex' }}>
                  <input
                    value={this.state.inputImg}
                    onChange={this.inputChange}
                  />
                  <div
                    className={this.classNameColorButton(2)}
                    onClick={() => this.setState({ confirmModal: true })}
                  >
                    Save
                  </div>
                  {/* <div
                    className={this.classNameColorButton(2)}
                    onClick={() => this.onClickChooseFile(2)}
                  >
                    Choose file
                  </div> */}
                </Box>
              </Flex>
              <Flex>
                <Box width={1 / 15} />
                <Box p={3} width={1} style={{ display: 'flex' }}>
                  <div className="bookedhistoryinfo-upliadfile">{slip}</div>
                </Box>
              </Flex>
            </div>
            {refund ? (
              <div style={{ color: '#ec424b' }}>
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div className={this.classNameStatus(3, refund)}>3</div>
                  </Box>
                  <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                    Request to Refund
                  </Box>
                </Flex>
              </div>
            ) : (
              <div className={this.classNameText(3)}>
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div className={this.classNameStatus(3)}>3</div>
                  </Box>
                  <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                    Approve
                  </Box>
                </Flex>
              </div>
            )}
            {refund ? (
              <div className={this.classNameText(4)}>
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div className={this.classNameStatus(4, refund)}>4</div>
                  </Box>
                  <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                    Refunded
                  </Box>
                </Flex>
              </div>
            ) : (
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
            )}

            {refund == false && (
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.bookedHistoryInfo);
  return {
    bookInfo: state.bookedHistoryInfo,
    customerId: state.user.customerId
  };
};

const mapDispatchToProps = dispatch => ({
  setImageSlip: (img, bookedId, tourId, customerId) =>
    dispatch(setImageSlip(img, bookedId, tourId, customerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookedHistoryInfo);
