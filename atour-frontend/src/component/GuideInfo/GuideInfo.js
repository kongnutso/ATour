import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Dropdown } from "semantic-ui-react";
import StarRatingComponent from "react-star-rating-component";
import PopUpModal from "../PopUpModal/PopUpModal";
import { bookTrip } from "../../action/BookAction";
import autobind from "react-autobind";
import tourImage from "../../image/TourImage.png";
import { selectTour } from "../../action/SelectAction";
import axios from "axios"; //for demo
import Cards from "../Cards/Cards";
import { Card } from "semantic-ui-react";
class GuideInfo extends React.Component {
  render() {
    if (!this.props.guide) return <div />;
    const {
      profile: { phoneNumber, firstName, lastName },
      email,
      publishedTours
    } = this.props.guide;
    const fullName = firstName + " " + lastName;
    return (
      <div>
        <img src={tourImage} className="guideInfo-image" alt="" />
        <div className="guideInfo-container">
          <div className="guideInfo-above-divider">
            <div className="guideInfo-header">
              <div className="guideInfo-headerText">{fullName}</div>
            </div>
          </div>
          <hr className="guideInfo-divider" />
          <div className="guideInfo-contact-container">
            <div className="guideInfo-contact">
              <div className="guideInfo-contact-header">Contact Info</div>
              <div className="guideInfo-contact-info">
                <div className="guideInfo-contact-info-topic">
                  {"Phone Number"}
                  <br />
                  {"Email"}
                </div>
                <div className="guideInfo-contact-info-value">
                  {phoneNumber} <br /> {email}
                </div>
              </div>
            </div>
          </div>
          <div className="guideInfo-tour-container">
            <div className="guideInfo-tour-header">Tours</div>
            <div className="guideInfo-tour">
              <Cards items={publishedTours} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    guide: state.guide.selectedGuide
  };
};

const mapDispatchToProps = dispatch => ({
  selectTour: tour => dispatch(selectTour(tour))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideInfo);
