import React from "react";
import { Grid } from "semantic-ui-react";

import HeaderOverall from "../templates/header";

import CrimeModal from "../modals/crime/crime";

import { tooltipLine, tooltipBar, tooltipPie } from "../../shared-functions";

var BarChart = require("react-d3-components").BarChart;
const LineChart = require("react-d3-components").LineChart;
var PieChart = require("react-d3-components").PieChart;

class CrimeOverall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: null,
      loading: false
    };
  }

  handleShow = e => {
    this.setState({ currentModal: e.target.id });
  };

  handleHide = e => {
    this.setState({ currentModal: null });
  };

  finishLoading = () => {
    this.setState({ loading: false });
  };

  renderCrimeModal = () => {
    return (
      <React.Fragment>
        <CrimeModal
          handleHide={this.handleHide}
          crimes={this.props.crimes}
          currentModal={this.state.currentModal}
          finishLoading={this.finishLoading}
          stateName="United States"
        />
      </React.Fragment>
    );
  };

  renderMainCrimeContent = () => {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={16}>
            <LineChart
              data={this.props.crimeLineChartData}
              tooltipHtml={tooltipLine}
              tooltipContained
              width={1000}
              height={800}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            />
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Grid divided="vertically">
          <HeaderOverall
            handleShow={this.handleShow}
            yearsDropdown={this.props.yearsDropdown}
            modalToShow="crime"
            currentPane="Crime"
            currentPaneArray={this.props.crimes}
            stateName={this.props.stateName}
            stateCode={this.props.stateCode}
          />
        </Grid>

        {this.props.crimes.length > 0 && this.renderMainCrimeContent()}
        {this.renderCrimeModal()}
      </React.Fragment>
    );
  }
}

export default CrimeOverall;
