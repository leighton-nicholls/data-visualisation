import React from "react";
import { Grid, Header } from "semantic-ui-react";

import HeaderOverall from "../templates/header";
import SentencesModal from "../modals/sentences/sentences";
import { tooltipLine, tooltipBar, tooltipPie } from "../../shared-functions";

import { generateSentencingTotalsByStateBarChartData } from "../../../shared/generation/sentencing/bar-charts";

var BarChart = require("react-d3-components").BarChart;
const LineChart = require("react-d3-components").LineChart;
var PieChart = require("react-d3-components").PieChart;

class SentencingOverall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: null,

      yearsDropdown: [],
      dropdownYear: null,
      loading: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.sentences !== prevProps.sentences) {
      generateSentencingTotalsByStateBarChartData(
        this.props.sentences,
        this.props.executions
      );
    }
  }

  renderMinSentencingFacts = () => {
    return (
      <React.Fragment>
        {this.props.sentencingFacts.sentencingRatios
          .statesWithLowestExecutionToSentencingRatio.length == 1
          ? "State"
          : "States"}{" "}
        with highest execution-sentencing ratio:{" "}
        {this.props.sentencingFacts.sentencingRatios
          .statesWithLowestExecutionToSentencingRatio.length === 1
          ? this.props.sentencingFacts.sentencingRatios
              .statesWithLowestExecutionToSentencingRatio[0].state
          : this.props.sentencingFacts.sentencingRatios.statesWithLowestExecutionToSentencingRatio.map(
              (state, index) => {
                return (index ? ", " : "") + state.state;
              }
            )}{" "}
        (
        {this.props.sentencingFacts.sentencingRatios.minDifferenceRatio.toFixed(
          2
        )}
        %)
      </React.Fragment>
    );
  };

  renderMaxSentencingFacts = () => {
    return (
      <React.Fragment>
        {this.props.sentencingFacts.sentencingRatios
          .statesWithHighestExecutionToSentencingRatio.length == 1
          ? "State"
          : "States"}{" "}
        with highest execution-sentencing ratio:{" "}
        {this.props.sentencingFacts.sentencingRatios
          .statesWithHighestExecutionToSentencingRatio.length === 1
          ? this.props.sentencingFacts.sentencingRatios
              .statesWithHighestExecutionToSentencingRatio[0].state
          : this.props.sentencingFacts.sentencingRatios.statesWithHighestExecutionToSentencingRatio.map(
              (state, index) => {
                return (index ? ", " : "") + state.state;
              }
            )}{" "}
        (
        {this.props.sentencingFacts.sentencingRatios.maxDifferenceRatio.toFixed(
          2
        )}
        %)
      </React.Fragment>
    );
  };

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
          stateName="United States"
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

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">
              Overall number of states carrying out sentences by year
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <LineChart
              data={
                this.props.statesCarryingOutSentencesByYearOverallLineChartData
              }
              tooltipHtml={tooltipLine}
              tooltipContained
              width={1000}
              height={800}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Sentencing over time by state</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <LineChart
              data={this.props.sentencingByStateLineChartData}
              tooltipHtml={tooltipLine}
              tooltipContained
              width={1000}
              height={800}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Sentencing overview by state</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <svg
              id="sentencingTotalsByStateBarChart"
              width="1050"
              height="500"
            ></svg>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Header size="medium">
              {Object.keys(this.props.sentencingFacts).length > 0 &&
                this.renderMaxSentencingFacts()}
            </Header>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header size="medium">
              {Object.keys(this.props.sentencingFacts).length > 0 &&
                this.renderMinSentencingFacts()}
            </Header>
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
            modalToShow="sentencing"
            currentPane="Sentencing"
            currentPaneArray={this.props.sentences}
            stateName={this.props.stateName}
            stateCode={this.props.stateCode}
          />

          {this.props.sentences.length > 0 &&
            this.renderMainSentencingContent()}
        </Grid>
        {this.renderSentencesModal()}
      </React.Fragment>
    );
  }
}

export default SentencingOverall;
