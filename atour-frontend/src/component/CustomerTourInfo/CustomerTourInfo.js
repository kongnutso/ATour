import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { Dropdown } from 'semantic-ui-react';
import StarRatingComponent from 'react-star-rating-component';
import PopUpModal from '../PopUpModal/PopUpModal';
import { bookTrip } from '../../action/BookAction';
import autobind from 'react-autobind';
import { Redirect } from 'react-router-dom';
import { viewProfile, getGuideInfo } from '../../action/UserInfoAction';
import tourImage from '../../image/TourImage.png';

class TourInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      bookingDate: '',
      openConfirm: false,
      errorDialog: false,
      groupSize: 0,
      redirect: false,
      to: '/'
    };
    autobind(this);
  }

  componentDidMount() {
    this.setState({ groupSize: this.props.tourInfo.minGroupSize });
    this.props.getGuideInfo(this.props.tourInfo.guideId);
  }

  onConfirm() {
    this.setState({ openConfirm: false });
    this.props.bookTrip(
      this.props.tourInfo,
      this.state.bookingDate,
      this.state.groupSize,
      this.props.guide
    );
    this.setState({ redirect: true, to: '/bookedHistoryInfo' });
  }

  onSubmit() {
    const { maximumSize, minimumSize } = this.props.tourInfo;
    const { groupSize, bookingDate } = this.state;
    if (!bookingDate) {
      this.setState({
        errorDialog: true,
        errorMessage: 'Please select booking date'
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
    const {
      tourName,
      // tourimage,
      // tourRating,
      price,
      //   tourLocation,
      detail,
      maximumSize,
      guideName
    } = this.props.tourInfo;
    const availableDates = [
      { key: 1, text: '01/01/2561', value: '01/01/2561' },
      { key: 2, text: '02/01/2561', value: '02/01/2561' },
      { key: 3, text: '03/01/2561', value: '03/01/2561' }
    ];
    if (this.state.redirect) {
      return <Redirect to={this.state.to} />;
    }
    return (
      <div>
        <PopUpModal
          isOpen={this.state.openConfirm}
          onCloseModal={() => this.setState({ openConfirm: false })}
          headerText={'Book Confirmation'}
          bodyText={'Are you sure to book this trip ?'}
          type="Confirmation"
          onConfirm={this.onConfirm}
        />
        <PopUpModal
          isOpen={this.state.errorDialog}
          onCloseModal={() => this.setState({ errorDialog: false })}
          headerText={'Book Fail'}
          bodyText={this.state.errorMessage}
        />
        <img src={tourImage} className="tourInfo-image" alt="" />
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
                  this.setState({ redirect: true, to: '/editProfile' });
                }}
                className="tourInfo-guideName"
              >
                by {this.props.guide}
              </div>
            </div>
          </div>
          <hr className="tourInfo-divider" />
          <div className="tourInfo-detail-container">
            <div className="tourInfo-detail">{detail}</div>
            <div className="tourInfo-booking-container">
              Available date
              <Dropdown
                style={{
                  marginTop: '10px',
                  width: '100%',
                  marginBottom: '10px',
                  minWidth: '30%'
                }}
                placeholder="Choose Date"
                selection
                value={this.state.bookingDate}
                onChange={(e, { value }) =>
                  this.setState({ bookingDate: value })
                }
                options={availableDates}
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
                  'tourInfo-booking-submit' +
                  (!this.props.user ? '-disabled' : '')
                }
                disabled={!this.props.user}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tourInfo: state.tour.selectedTour,
    guide: state.user.guideInfo.userName,
    user: state.user.username
  };
};

const mapDispatchToProps = dispatch => ({
  bookTrip: (tourInfo, date, size, guideName) =>
    dispatch(bookTrip(tourInfo, date, size, guideName)),
  viewProfile: () => dispatch(viewProfile()),
  getGuideInfo: guideId => dispatch(getGuideInfo(guideId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourInfo);
