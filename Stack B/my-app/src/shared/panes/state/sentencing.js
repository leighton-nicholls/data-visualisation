import React from "react";
import {
  Container,
  Dropdown,
  Tab,
  Image,
  Grid,
  Header,
  Table,
  Button,
  List,
  Icon,
  Modal
} from "semantic-ui-react";

import HeaderOverall from "../templates/header";
import SentencesModal from "../modals/sentences/sentences";
import { tooltipLine, tooltipBar, tooltipPie } from "../../shared-functions";

import { generateSentencingTotalsByStateBarChartData } from "../../../shared/generation/sentencing/bar-charts";
import { throwStatement } from "@babel/types";

var BarChart = require("react-d3-components").BarChart;
const LineChart = require("react-d3-components").LineChart;
var PieChart = require("react-d3-components").PieChart;

class SentencingByState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: null,

      yearsDropdown: [],
      dropdownYear: null,
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

  renderSentencesModal = () => {
    return (
      <React.Fragment>
        <SentencesModal
          sentences={this.props.sentences}
          handleHide={this.handleHide}
          states={this.props.states}
          currentModal={this.state.currentModal}
          finishLoading={this.finishLoading}
          stateName={this.props.stateName}
        />
      </React.Fragment>
    );
  };

  renderMainSentencingContent = () => {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Sentencing over time overall</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <LineChart
              data={this.props.sentencingOverallLineChartData}
              tooltipHtml={tooltipLine}
              tooltipContained
              width={1000}
              height={800}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            />
          </Grid.Column>
        </Grid.Row>

        {this.renderSentencesModal()}
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
            modalToShow="sentencing"
            currentPane="Sentencing"
            currentPaneArray={this.props.sentences}
            stateName={this.props.stateName}
            stateCode={this.props.stateCode}
          />

          {this.props.sentences.length > 0 ? (
            this.renderMainSentencingContent()
          ) : (
            <Header size="small">No sentences recorded for this state</Header>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default SentencingByState;
