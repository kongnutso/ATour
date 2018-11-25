import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Dropdown } from "semantic-ui-react";
import StarRatingComponent from "react-star-rating-component";
import PopUpModal from "../PopUpModal/PopUpModal";
import { bookTrip, clearBookMessage } from "../../action/BookAction";
import autobind from "react-autobind";
import { Redirect } from "react-router-dom";
import { viewProfile, getGuideInfo } from "../../action/UserInfoAction";
import tourImage from "../../image/TourImage.png";
import { dateToString } from "../../utils/utils";
import Review from "../Review/Review";
import { Parallax, Background } from "react-parallax";

class TourInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedTrip: {},
      openConfirm: false,
      errorDialog: false,
      groupSize: 0,
      redirect: false,
      to: "/"
    };
    autobind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookMessage !== this.props.bookMessage) {
      if (nextProps.bookMessage === "done") {
        this.props.clearBookMessage();
        this.setState({ redirect: true, to: "/bookedHistoryInfo" });
      } else if (nextProps.bookMessage) {
        this.setState({
          errorDialog: true,
          errorMessage: nextProps.bookMessage
        });
      }
    }
  }

  componentDidMount() {
    this.setState({ groupSize: this.props.tourInfo.minGroupSize });
    this.props.getGuideInfo(this.props.tourInfo.guideId);
  }

  onConfirm() {
    this.props.bookTrip(
      this.props.tourInfo.tourName,
      this.props.tourInfo.tourId,
      this.state.selectedTrip,
      this.props.tourInfo.price,
      this.state.groupSize,
      this.props.user.customerId,
      this.props.guide
    );
    this.setState({ openConfirm: false });
  }

  onSubmit() {
    const { maximumSize, minimumSize } = this.props.tourInfo;
    const { groupSize, selectedTrip } = this.state;
    if (!selectedTrip || !selectedTrip.tripId) {
      this.setState({
        errorDialog: true,
        errorMessage: "Please select booking date"
      });
    } else if (groupSize <= maximumSize && groupSize >= minimumSize) {
      this.setState({ openConfirm: true });
    } else {
      this.setState({
        errorDialog: true,
        errorMessage: `Group size must in between ${minimumSize} and ${maximumSize}`
      });
    }
  }

  render() {
    const { tourName, price, detail, maximumSize, trips } = this.props.tourInfo;
    const tripsInfo = trips.map(t => {
      const showDate = dateToString(t.tripDate);
      return { key: t.tripDate, text: showDate, value: t };
    });
    tripsInfo.unshift({
      key: "starter",
      text: "Please choose date",
      value: {}
    });
    if (this.state.redirect) {
      return <Redirect to={this.state.to} />;
    }
    console.log("IMAGEURL: ", this.props.tourInfo.imageUrl);
    return (
      <div style={{ marginBottom: "100px" }}>
        <PopUpModal
          isOpen={this.state.openConfirm}
          onCloseModal={() => this.setState({ openConfirm: false })}
          headerText={"Book Confirmation"}
          bodyText={"Are you sure to book this trip ?"}
          type="Confirmation"
          onConfirm={this.onConfirm}
        />
        <PopUpModal
          isOpen={this.state.errorDialog}
          onCloseModal={() => {
            this.props.clearBookMessage();
            this.setState({ errorDialog: false });
          }}
          headerText={"Book Fail"}
          bodyText={this.state.errorMessage}
        />
        {/* <img src={tourImage} className="tourInfo-image" alt="" /> */}
        <div className="tourInfo-container">
          <div className="tourInfo-above-divider">
            <div className="tourInfo-header">
              <div className="tourInfo-headerText">{tourName}</div>
              {/* <StarRatingComponent
                className="tourInfo-stars"
                starCount={5}
                value={tourRating}
                name="tour rating"
                editing={false}
              /> */}
            </div>
            <div className="tourInfo-guide-container">
              <div
                onClick={() => {
                  this.props.viewProfile();
                  this.setState({ redirect: true, to: "/editProfile" });
                }}
                className="tourInfo-guideName"
              >
                by {this.props.guide ? this.props.guide.userName : ""}
              </div>
            </div>
          </div>
          <hr className="tourInfo-divider" />
          <Parallax
            bgImage={
              this.props.tourInfo.imageUrl === null
                ? tourImage
                : this.props.tourInfo.imageUrl
            }
            bgImageAlt="the cat"
            strength={300}
            style={{ width: "100%", height: "400px", marginBottom: "50px" }}
          />
          <div className="tourInfo-detail-container">
            <div className="tourInfo-detail">{detail}</div>
            <div className="tourInfo-booking-container">
              Available date
              <Dropdown
                style={{
                  marginTop: "10px",
                  width: "100%",
                  marginBottom: "10px",
                  minWidth: "30%"
                }}
                placeholder="Choose Date"
                selection
                value={this.state.selectedTrip}
                onChange={(e, { value }) =>
                  this.setState({ selectedTrip: value })
                }
                options={tripsInfo}
              />
              Group size
              <br />
              <input
                className="tourInfo-booking-group-size"
                value={this.state.groupSize}
                onChange={e => this.setState({ groupSize: e.target.value })}
              />
              {` / ${maximumSize}`}
              <br />
              Price <br />
              <div className="tourInfo-booking-price-container">
                THB
                <div className="tourInfo-booking-price">{price} bath</div>
              </div>
              <button
                onClick={() => this.onSubmit()}
                className={
                  "tourInfo-booking-submit" +
                  (!this.props.user.userName ? "-disabled" : "")
                }
                disabled={!this.props.user.userName}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="tourInfo-review">Review</div>
          <Review />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tourInfo: state.tour.selectedTour,
    bookMessage: state.tour.bookMessage,
    guide: state.user.guideInfo,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  bookTrip: (
    tourName,
    tourInfo,
    tripInfo,
    price,
    size,
    customerId,
    guideName
  ) =>
    dispatch(
      bookTrip(tourName, tourInfo, tripInfo, price, size, customerId, guideName)
    ),
  viewProfile: () => dispatch(viewProfile()),
  getGuideInfo: guideId => dispatch(getGuideInfo(guideId)),
  clearBookMessage: () => dispatch(clearBookMessage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourInfo);
