import React from "react";
import { Grid, Header, List } from "semantic-ui-react";

import HeaderOverall from "../templates/header";

import InnocenceModal from "../modals/innocence/innocents";

import { generateReasonBreakdownsByStateBarChartData } from "../../../shared/generation/innocence/bar-charts";

import { tooltipLine, tooltipBar, tooltipPie } from "../../shared-functions";
var BarChart = require("react-d3-components").BarChart;
const LineChart = require("react-d3-components").LineChart;
var PieChart = require("react-d3-components").PieChart;

class InnocenceByState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: null,
      column: null,
      data: this.props.innocents,
      direction: null,
      loading: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.innocents !== prevProps.innocents &&
      this.props.innocents.length > 0
    ) {
      generateReasonBreakdownsByStateBarChartData(this.props.innocents);
    }
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

  renderInnocenceModal = () => {
    return (
      <React.Fragment>
        <InnocenceModal
          handleHide={this.handleHide}
          innocents={this.props.innocents}
          currentModal={this.state.currentModal}
          finishLoading={this.finishLoading}
          stateName={this.props.stateName}
        />
      </React.Fragment>
    );
  };

  renderSpentOnDeathRowFacts = () => {
    return (
      <React.Fragment>
        <Grid.Column width={4}>
          <Header size="medium">
            Average number of years spent on death row:{" "}
            {this.props.innocenceFacts.averageNumberOfYearsSpentOnDeathRow.toFixed(
              2
            )}
          </Header>
        </Grid.Column>

        <Grid.Column width={4}>
          <Header size="medium">
            Shortest time spent on death row:{" "}
            {this.props.innocenceFacts.shortestTimeOnDeathRow.map(
              (innocent, index) => {
                return (
                  <React.Fragment key={index}>
                    {innocent.name}, {innocent.convicted} to{" "}
                    {innocent.exonerated}, {innocent.years_between}{" "}
                    {innocent.years_between === 1 ? "year" : "years"}.{" "}
                  </React.Fragment>
                );
              }
            )}
          </Header>
        </Grid.Column>

        <Grid.Column width={4}>
          <Header size="medium">
            Longest time spent on death row:{" "}
            {this.props.innocenceFacts.longestTimeOnDeathRow.map(
              (innocent, index) => {
                return (
                  <React.Fragment key={index}>
                    {innocent.name}, {innocent.convicted} to{" "}
                    {innocent.exonerated}, {innocent.years_between}{" "}
                    {innocent.years_between === 1 ? "year" : "years"}.{" "}
                  </React.Fragment>
                );
              }
            )}
          </Header>
        </Grid.Column>
      </React.Fragment>
    );
  };

  renderMainInnocenceContent = () => {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Fast Facts</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4}>
            <Header size="medium">
              Number of innocents: {this.props.innocents.length}
            </Header>
          </Grid.Column>

          {Object.keys(this.props.innocenceFacts).length > 0 &&
            this.renderSpentOnDeathRowFacts()}
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Convictions over time overall</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            {this.props.innocenceConvictionsOverallLineChartData.values.length >
              0 && (
              <LineChart
                data={this.props.innocenceConvictionsOverallLineChartData}
                tooltipHtml={tooltipLine}
                tooltipContained
                width={1000}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
              />
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Exonerations over time overall</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            {this.props.innocenceExonerationsOverallLineChartData.values
              .length > 0 && (
              <LineChart
                data={this.props.innocenceExonerationsOverallLineChartData}
                tooltipHtml={tooltipLine}
                tooltipContained
                width={1000}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
              />
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">DNA Breakdown</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.dnaBreakdownPieChartData}
              tooltipOffset={{ top: 175, left: 200 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={600}
              height={400}
              margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="large">Race Breakdown</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.raceBreakdownInnocencePieChartData}
              tooltipOffset={{ top: 175, left: 200 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={600}
              height={400}
              margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="large">Reasons Breakdown</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">
              Most common number of reasons (number of reasons, number of times
              that number of reasons happened){" "}
            </Header>
            <List ordered size="large">
              {Object.keys(this.props.innocenceFacts).length > 0 &&
                Object.keys(
                  this.props.innocenceFacts.mostCommonNumberOfReasons
                ).map((key, index) => {
                  let values = Object.values(
                    this.props.innocenceFacts.mostCommonNumberOfReasons
                  );
                  return (
                    <React.Fragment key={index}>
                      <List.Item as="">{values[index]}</List.Item>
                    </React.Fragment>
                  );
                })}
            </List>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <svg
              id="reasonsBreakdownByStateBarChartData"
              width="1150"
              height="500"
            ></svg>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="large">Exoneration Procedure Breakdown</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.exonerationBreakdownPieChartData}
              tooltipOffset={{ top: 175, left: 300 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={1000}
              height={400}
              margin={{ top: 10, bottom: 10, left: 300, right: 100 }}
            />
          </Grid.Column>
        </Grid.Row>

        {this.renderInnocenceModal()}
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
            modalToShow="innocence"
            currentPane="Innocents"
            currentPaneArray={this.props.innocents}
            stateName={this.props.stateName}
            stateCode={this.props.stateCode}
          />

          {this.props.innocents.length > 0 ? (
            this.renderMainInnocenceContent()
          ) : (
            <Header size="small">No innocents recorded for this state</Header>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default InnocenceByState;
