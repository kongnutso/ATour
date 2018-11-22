import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import "./styles.css";
// import { registerModal } from "../../action/modalAction";
// import autobind from "react-autobind";
import classNames from "classnames";
import { Container, Segment, Grid, Button, Icon } from "semantic-ui-react";
import Tours from "../Tours/Tours";
import SearchBar from "../SearchBar";
import { getGuideInfo } from "../../action/UserInfoAction";
import { publishNewTour } from "../../action/ModalAction";
import PublishNewTourModal from "./PublishNewTourModal/PublishNewTourModal";
import axios from "axios";
import { Flex } from "rebass";
import Cards from "../Cards/Cards";

function Field(props) {
  const { inputType, error, label, onChange, value } = props;
  const className =
    "form-group " + (error ? (error !== true ? "has-danger" : "") : "");
  return (
    <div className={className}>
      <label className="publish-new-tour-label">{label}</label>
      <div>
        <input
          onChange={onChange}
          className="publish-new-tour-input"
          className="form-control"
          type={inputType || "text"}
          value={value}
        />
        <div className="error-text">{error && error !== true ? error : ""}</div>
      </div>
    </div>
  );
}

const Dec = ({ label, value, onChange }) => {
  let extractedValue = value.maximumSize;
  return <Field label={label} onChange={onChange} value={extractedValue} />;
};

function maximumSizeValidation(sizes) {
  let minimumSize = sizes.minimumSize ? sizes.minimumSize : 0;
  let maximumSize = sizes.maximumSize;
  let regex = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;

  console.log("min ", parseInt(minimumSize));
  console.log("max ", parseInt(maximumSize));
  let passed = maximumSize.match(regex);
  if (
    passed == null ||
    maximumSize.length > 50 ||
    !minimumSize ||
    !maximumSize ||
    parseInt(minimumSize) > parseInt(maximumSize)
  ) {
    return "maximum group size must ...";
  }
  return false;
}

class PublishNewTourModal extends React.Component {
  constructor() {
    super();
    this.state = {
      value: {
        tourName: "",
        price: "",
        minimumSize: "",
        maximumSize: "",
        detail: "",
        imageUrl: ""
      },
      error: {
        tourName: true,
        price: true,
        minimumSize: true,
        maximumSize: true,
        detail: true,
        imageUrl: true
      }
    };

    autobind(
      this,
      "renderPublishNewTour",
      "onSubmitNewTourInfo",
      "onCloseModal",
      "onFieldChange",
      "maximumSizeValidation",
      "onSubmitNewTourInfo",
      "onSubmitted"
    );
  }

  async onSubmitNewTourInfo() {
    console.log("SUBMITTING...");
    console.log(this.state.error);
    const {
      error: { tourName, price, minimumSize, maximumSize, detail, imageUrl }
    } = this.state;
    if (!tourName && !price && !minimumSize && !maximumSize && !detail) {
      const url = "http://localhost:3000/tour";
      const value = this.state.value;
      const res = await axios
        .post(url, {
          guideId: this.props.guideId,
          tourName: value.tourName,
          minSize: value.minimumSize,
          maxSize: value.maximumSize,
          price: value.price,
          detail: value.detail,
          imageUrl: value.imageUrl
        })
        .then(res => {
          console.log("submitted: ", res.data);
          this.onSubmitted();
        });
    }
  }

  onSubmitted() {
    // update reducers
    this.props.getGuideInfo(this.props.guideId);
    this.onCloseModal();
  }

  onCloseModal() {
    this.setState({});
    // this.props.updateGuideHome();
    this.props.onCloseModal();
  }

  onFieldChange(
    field,
    value,
    validate = null,
    isCompare = false,
    mainValue = null
  ) {
    const newValue = this.state.value;
    const newError = this.state.error;
    if (validate !== null) {
      const error = validate(value);
      newError[field] = error;
    }
    console.log("compare", isCompare);
    if (isCompare) {
      newValue[field] = mainValue;
    } else {
      newValue[field] = value;
    }
    this.setState({ value: newValue, error: newError });
  }

  renderPublishNewTour() {
    const { value, asCustomer } = this.state;
    return (
      <div className="publish-new-tour-form-control">
        <h2>Publish New Tour</h2>
        <hr color="black" size="50" />
        <Field
          label="Tour name"
          value={value.tourName}
          onChange={e =>
            this.onFieldChange(
              "tourName",
              e.target.value,
              validation.validateTourName
            )
          }
          error={this.state.error.tourName}
        />
        <Field
          label="Tour image"
          value={value.imageUrl}
          onChange={e =>
            this.onFieldChange(
              "imageUrl",
              e.target.value,
              validation.validateDetail
            )
          }
          error={this.state.error.tourName}
        />
        <Field
          label="price"
          value={value.price}
          onChange={e =>
            this.onFieldChange(
              "price",
              e.target.value,
              validation.validatePrice
            )
          }
          error={this.state.error.price}
        />
        <div class="form-group">
          <label>Group size</label>
          <Field
            label="from"
            value={value.minimumSize}
            onChange={e =>
              this.onFieldChange(
                "minimumSize",
                e.target.value,
                validation.validateMinimumSize
              )
            }
            error={this.state.error.minimumSize}
          />
          <Dec
            label="to"
            value={value.maximumSize}
            onChange={e =>
              this.onFieldChange(
                "maximumSize",
                e.target.value,
                validation.validateMinimumSize
              )
            }
            error={this.state.error.minimumSize}
          />
        </div>
        <Field
          label="Details"
          value={value.detail}
          onChange={e =>
            this.onFieldChange(
              "detail",
              e.target.value,
              validation.validateDetail
            )
          }
          error={this.state.error.detail}
        />

        <Grid columns={2}>
          <Grid.Column width={8}>
            <Button
              onClick={() => this.onSubmitNewTourInfo()}
              // className="btn btn-primary"
              primary
              fluid
            >
              Submit
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <Button
              onClick={() => this.onCloseModal()}
              // className="btn btn-danger"
              color="red"
              fluid
            >
              Cancel
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
  render() {
    return (
      <Modal
        className="publish-new-tour-modal-container"
        style={{
          overlay: {
            overflow: "auto"
          }
        }}
        isOpen={this.props.isOpen == "publishNewTour"}
        onRequestClose={this.onCloseModal}
        ariaHideApp={false}
      >
        {this.renderPublishNewTour()}
      </Modal>
    );
  }
}

const PublishNewTourPage = props => (
  <Container>
    {/* <PublishNewTourModal updateGuideHome={this.updateGuideHome} /> */}
    <PublishNewTourModal />
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid stackable>
        <Grid.Row textAlign="center" columns={2}>
          <Grid.Column textAlign="left" width={14}>
            <h2>Published Tours</h2>
          </Grid.Column>
          <Grid.Column textAlign="center" width={2}>
            <Link>
              <Button animated onClick={this.props.onClickPublishNewTour}>
                <Button.Content hidden>Add</Button.Content>
                <Button.Content visible>
                  <Icon name="plus" />
                </Button.Content>
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
        <hr color="black" size="50" width="1100" />
      </Grid>
    </Segment>
  </Container>
);

const mapStateToProps = state => {
  return {
    isOpen: state.modal.modalName,
    guideId: state.user.guideInfo.guideId
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(publishNewTour(false)),
  getGuideInfo: guideId => dispatch(getGuideInfo(guideId))
});

connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishNewTourModal);
