import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Flex, Box } from "rebass";
import autobind from "react-autobind";
import { Form, TextArea } from "semantic-ui-react";
import PopUpModal from "../PopUpModal/PopUpModal";
import { dateToString } from "../../utils/utils";
import {
  setImageSlip,
  cancelTrip,
  refundTrip,
  changeReview,
  reviewInputChange,
  deleteReview
} from "../../action/BookAction";
import {
  UNBOOKEDTRIP,
  BOOKEDTRIP,
  PAIDTRIP,
  APPROVETRIP,
  REFUNDREQUESTEDTRIP,
  REFUNDTRIP,
  FINISHEDTRIP,
  CANCELLEDTRIP
} from "../../utils/TripType";
import "./styles.css";

class BookedHistoryInfo extends React.Component {
  constructor() {
    super();
    autobind(this);
    this.state = {
      confirmationModal: false,
      inputImg: "",
      confirmModal: false,
      refund: false,
      cancel: false,
      editReview: false
    };
  }

  classNameStatus(statusNumber, isDanger = false) {
    let tempText = "";
    if (statusNumber === this.props.bookInfo._type)
      tempText = `bookedhistoryinfo-status-inprocess`;
    else if (statusNumber < this.props.bookInfo._type)
      return `bookedhistoryinfo-status-finish`;
    else tempText = `bookedhistoryinfo-status-coming`;

    if (isDanger) tempText = tempText + "-danger";
    return tempText;
  }

  classNameText(statusNumber) {
    if (statusNumber === this.props.bookInfo._type)
      return "bookedhistoryinfo-text-inprocess";
    else if (statusNumber < this.props.bookInfo._type)
      return "bookedhistoryinfo-text-finish";
    else return "bookedhistoryinfo-text-coming";
  }

  classNameColorButton(statusNumber) {
    if (statusNumber < this.props.bookInfo._type)
      return "bookedhistoryinfo-graybutton";
    else return "bookedhistoryinfo-bluebutton";
  }

  classNameRedColorButton(statusNumber) {
    if (statusNumber < this.props.bookInfo._type)
      return "bookedhistoryinfo-graybutton";
    else return "bookedhistoryinfo-redbutton";
  }

  onClickSaveSlip(statusNumber) {
    const {
      bookInfo: { _type, tripId, tourId }
    } = this.props;
    if (statusNumber !== _type) return;
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

  reviewInputChange(event) {
    this.props.reviewInputChange(event.target.value);
  }

  submitReview() {
    console.log("submit review");
    this.props.changeReview(
      this.props.bookInfo.review //bla aaaaa
    );
  }

  deleteReview() {
    this.props.deleteReview();
  }

  renderReview(statusNumber) {
    if (statusNumber > this.props.bookInfo._type) return <div />;
    else {
      if (this.props.bookInfo.oldReview === "" || this.state.editReview) {
        return (
          <div>
            <Flex>
              <Box p={2} width={1 / 15} />
              <Box p={3} width={14 / 15}>
                <Form>
                  <TextArea
                    autoHeight
                    value={this.props.bookInfo.review}
                    onChange={this.reviewInputChange}
                  />
                </Form>
              </Box>
            </Flex>
            <Flex>
              <Box p={2} width={1 / 15} />
              <Box p={3} width={14 / 15}>
                <div
                  className={this.classNameColorButton(statusNumber)}
                  onClick={() => this.submitReview()}
                >
                  Submit
                </div>
              </Box>
            </Flex>
          </div>
        );
      } else {
        return (
          <div>
            <Flex>
              <Box p={2} width={1 / 15} />
              <Box p={3} width={14 / 15}>
                <div className="bookedhistoryinfo-reviewhistory">
                  {this.props.bookInfo.oldReview}
                </div>
              </Box>
            </Flex>
          </div>
        );
      }
    }
  }

  renderRedButton() {
    const {
      bookInfo: { _type }
    } = this.props;
    let text;
    if (_type < APPROVETRIP) text = "Cancel";
    else text = "Refund";
    if (_type <= APPROVETRIP && _type > UNBOOKEDTRIP) {
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
      bookInfo: {
        _type,
        bookDate,
        uploadedFileDate,
        slip,
        tripDate,
        tourName,
        guideId,
        groupSize,
        price,
        tripId,
        tourId
      },
      customerId
    } = this.props;
    let message;
    // const { refund, cancel } = this.state;
    const cancel = _type === CANCELLEDTRIP || _type === UNBOOKEDTRIP;
    const refund = _type === REFUNDREQUESTEDTRIP || _type === REFUNDTRIP;
    if (_type < APPROVETRIP) {
      message = "Cancel";
    } else if (_type === APPROVETRIP) {
      message = "Refund";
    }
    return (
      <div className="bookedhistoryinfo-page">
        <PopUpModal
          isOpen={this.state.confirmModal}
          onCloseModal={() => this.setState({ confirmModal: false })}
          headerText={"Upload Confirmation"}
          bodyText="Do you want to upload this link? "
          type="Confirmation"
          onConfirm={() => this.onClickSaveSlip(BOOKEDTRIP)} //change from 2
        />
        <PopUpModal
          isOpen={this.state.confirmationModal}
          onCloseModal={() => this.setState({ confirmationModal: false })}
          headerText={`${message} Confirmation`}
          bodyText={`Do you want to [${message}] ? `}
          onConfirm={() => {
            if (message === "Refund") {
              console.log(message);
              this.setState({ refund: true });
              this.props.refundTrip(tourId, tripId, customerId);
            } else if (message === "Cancel") {
              this.setState({ cancel: true });
              this.props.cancelTrip(tourId, tripId, customerId);
            }
          }}
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
                  {tourName || "test"}
                </div>
              </div>
            </div>
            <div className="bookedHistoryInfo-info-each">
              <div className="bookedHistoryInfo-info-each-1">
                <div className="bookedHistoryInfo-info-topic">Trip date :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {dateToString(tripDate) || "test"}
                </div>
              </div>
              <div className="bookedHistoryInfo-info-each-2">
                <div className="bookedHistoryInfo-info-topic">Guide :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {guideId || "test"}
                </div>
              </div>
            </div>
            <div className="bookedHistoryInfo-info-each">
              <div className="bookedHistoryInfo-info-each-1">
                <div className="bookedHistoryInfo-info-topic">Group size :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {groupSize || "test"}
                </div>
              </div>
              <div className="bookedHistoryInfo-info-each-2">
                <div className="bookedHistoryInfo-info-topic">Price :</div>
                <div className="bookedHistoryInfo-info-each-value">
                  {price || "test"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="bookedhistoryinfo-line" />

        <div>
          Status
          <div>
            <div className={this.classNameText(UNBOOKEDTRIP)}>
              <Flex>
                <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                  <div className={this.classNameStatus(UNBOOKEDTRIP)}>1</div>
                </Box>
                <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                  Booked Date: {bookDate}
                </Box>
              </Flex>
            </div>
            <div className={this.classNameText(BOOKEDTRIP)}>
              {/*change from 2*/}
              <Flex>
                <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                  <div className={this.classNameStatus(BOOKEDTRIP)}>2</div>
                  {/*change from 2*/}
                </Box>
                <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                  <div className="bookedHistoryInfo-payment-header">
                    Payment slip upload
                  </div>
                  <div className="bookedHistoryInfo-bank-account">
                    SCB 1234567 ATour-Corp
                  </div>
                  <div className="bookedHistoryInfo-slip-date">
                    Uploaded slip date:{" "}
                    {uploadedFileDate ? dateToString(uploadedFileDate) : "-"}
                  </div>
                </Box>
              </Flex>
              <Flex>
                <Box width={1 / 15} />
                <Box p={3} width={1} style={{ display: "flex" }}>
                  <input
                    value={this.state.inputImg}
                    onChange={this.inputChange}
                  />
                  <div
                    className={this.classNameColorButton(
                      BOOKEDTRIP
                    )} /*change from 2*/
                    onClick={() => this.setState({ confirmModal: true })}
                  >
                    Save
                  </div>
                </Box>
              </Flex>
              <Flex>
                <Box width={1 / 15} />
                <Box p={3} width={1} style={{ display: "flex" }}>
                  <div className="bookedhistoryinfo-upliadfile">{slip}</div>
                </Box>
              </Flex>
            </div>
            {refund ? (
              <div style={{ color: "#ec424b" }}>
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div
                      className={this.classNameStatus(
                        REFUNDREQUESTEDTRIP,
                        refund
                      )}
                    >
                      3
                    </div>
                  </Box>
                  <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                    Request to Refund
                  </Box>
                </Flex>
              </div>
            ) : cancel ? (
              <div style={{ color: "#ec424b" }}>
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div
                      className={this.classNameStatus(CANCELLEDTRIP, cancel)}
                    >
                      3
                    </div>
                  </Box>
                  <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                    Cancel
                  </Box>
                </Flex>
              </div>
            ) : this.props.status === PAIDTRIP ? (
              <div className={this.classNameText(PAIDTRIP)}>
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div className={this.classNameStatus(PAIDTRIP)}>3</div>
                  </Box>
                  <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                    WAIT FOR APPROVE
                  </Box>
                </Flex>
              </div>
            ) : (
              <div className={this.classNameText(APPROVETRIP)}>
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div className={this.classNameStatus(APPROVETRIP)}>3</div>
                  </Box>
                  <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                    Approved Payment
                  </Box>
                </Flex>
              </div>
            )}
            {refund ? (
              <div className={this.classNameText(REFUNDTRIP)}>
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div className={this.classNameStatus(REFUNDTRIP, refund)}>
                      4
                    </div>
                  </Box>
                  <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                    Refunded
                  </Box>
                </Flex>
              </div>
            ) : (
              cancel == false && (
                <div className={this.classNameText(APPROVETRIP)}>
                  {" "}
                  {/*change from 4*/}
                  <Flex>
                    <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                      <div className={this.classNameStatus(APPROVETRIP)}>4</div>{" "}
                      {/*change from 4*/}
                    </Box>
                    <Box p={3} width={[3 / 4, 7 / 8, 14 / 15]}>
                      Take a Trip!
                    </Box>
                  </Flex>
                </div>
              )
            )}

            {(refund || cancel) == false && (
              <div className={this.classNameText(FINISHEDTRIP)}>
                {" "}
                {/*change from 5*/}
                <Flex>
                  <Box p={2} width={[1 / 4, 1 / 8, 1 / 15]}>
                    <div className={this.classNameStatus(FINISHEDTRIP)}>5</div>{" "}
                    {/*change from 5*/}
                  </Box>
                  <Box p={3} width={[1 / 4, 2 / 8, 2 / 15, 2 / 20]}>
                    Review
                  </Box>
                  <Box p={3} width={[1 / 4, 2 / 8, 3 / 15, 3 / 20]}>
                    {(this.props.bookInfo.oldReview !== "" ||
                      this.state.editReview) && (
                      <div
                        className={this.classNameColorButton(FINISHEDTRIP)}
                        onClick={() => {
                          this.setState({ editReview: true });
                        }}
                      >
                        Edit
                      </div>
                    )}
                  </Box>
                  <Box p={3} width={[1 / 4, 2 / 8, 3 / 15, 3 / 20]}>
                    {console.log(this.props.bookInfo.review)}
                    {(this.props.bookInfo.oldReview !== "" ||
                      this.state.editReview) && (
                      <div
                        className={this.classNameRedColorButton(FINISHEDTRIP)}
                        onClick={() => {
                          this.deleteReview();
                        }}
                      >
                        Delete
                      </div>
                    )}
                  </Box>
                </Flex>
                {this.renderReview(FINISHEDTRIP)} {/*change from 5*/}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    bookInfo: state.bookedHistoryInfo,
    customerId: state.user.customerId
  };
};

const mapDispatchToProps = dispatch => ({
  setImageSlip: (img, bookedId, tourId, customerId) =>
    dispatch(setImageSlip(img, bookedId, tourId, customerId)),
  cancelTrip: (tourId, tripId, customerId) =>
    dispatch(cancelTrip(tourId, tripId, customerId)),
  refundTrip: (tourId, tripId, customerId) =>
    dispatch(refundTrip(tourId, tripId, customerId)),
  changeReview: (review, customerId) =>
    dispatch(changeReview(review, customerId)),
  reviewInputChange: review => dispatch(reviewInputChange(review)),
  deleteReview: () => dispatch(deleteReview())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookedHistoryInfo);
