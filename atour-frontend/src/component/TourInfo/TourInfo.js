import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { Dropdown } from 'semantic-ui-react';
import StarRatingComponent from 'react-star-rating-component';
import PopUpModal from '../PopUpModal/PopUpModal';
import { bookTrip } from '../../action/BookAction';
import autobind from 'react-autobind';
import { Redirect } from 'react-router-dom';
import { viewProfile } from '../../action/UserInfoAction';

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
  }

  onConfirm() {
    this.setState({ openConfirm: false });
    this.props.bookTrip(
      this.props.tourInfo,
      this.state.bookingDate,
      this.state.groupSize
    );
    this.setState({ redirect: true, to: '/bookedHistoryInfo' });
  }

  onSubmit() {
    const { maxGroupSize, minGroupSize } = this.props.tourInfo;
    const { groupSize, bookingDate } = this.state;
    if (!bookingDate) {
      this.setState({
        errorDialog: true,
        errorMessage: 'Please select booking date'
      });
    } else if (groupSize <= maxGroupSize && groupSize >= minGroupSize) {
      this.setState({ openConfirm: true });
    } else {
      this.setState({
        errorDialog: true,
        errorMessage: `Group size must in between ${minGroupSize} and ${maxGroupSize}`
      });
    }
  }

  render() {
    const {
      tourName,
      tourimage,
      tourRating,
      price,
      //   tourLocation,
      tourDetail,
      maxGroupSize,
      availableDates,
      guideName
    } = this.props.tourInfo;
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
        <img src={tourimage} className="tourInfo-image" alt="" />
        <div className="tourInfo-container">
          <div className="tourInfo-above-divider">
            <div className="tourInfo-header">
              <div className="tourInfo-headerText">{tourName}</div>
              <StarRatingComponent
                className="tourInfo-stars"
                starCount={5}
                value={tourRating}
                name="tour rating"
                editing={false}
              />
            </div>
            <div className="tourInfo-guide-container">
              <div
                onClick={() => {
                  this.props.viewProfile();
                  this.setState({ redirect: true, to: '/editProfile' });
                }}
                className="tourInfo-guideName"
              >
                by {guideName}
              </div>
            </div>
          </div>
          <hr className="tourInfo-divider" />
          <div className="tourInfo-detail-container">
            <div className="tourInfo-detail">{tourDetail}</div>
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
              {` / ${maxGroupSize}`}
              <br />
              Price <br />
              <div className="tourInfo-booking-price-container">
                THB
                <div className="tourInfo-booking-price">{price}</div>
              </div>
              <button
                onClick={() => this.onSubmit()}
                className="tourInfo-booking-submit"
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
    tourInfo: state.tourInfo
  };
};

const mapDispatchToProps = dispatch => ({
  bookTrip: (tourInfo, date, size) => dispatch(bookTrip(tourInfo, date, size)),
  viewProfile: () => dispatch(viewProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourInfo);
