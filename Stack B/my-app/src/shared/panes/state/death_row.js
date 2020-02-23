import React from "react";
import { Grid, Header } from "semantic-ui-react";

import HeaderOverall from "../templates/header";

import DeathRowModal from "../modals/death_row/death_row";

import { tooltipLine, tooltipBar, tooltipPie } from "../../shared-functions";

var BarChart = require("react-d3-components").BarChart;
const LineChart = require("react-d3-components").LineChart;
var PieChart = require("react-d3-components").PieChart;

class DeathRowByState extends React.Component {
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

  renderDeathRowModal = () => {
    return (
      <React.Fragment>
        <DeathRowModal
          inmates={this.props.inmates}
          handleHide={this.handleHide}
          currentModal={this.state.currentModal}
          finishLoading={this.finishLoading}
          stateName={this.props.stateName}
        />
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
            modalToShow="deathRow"
            currentPane="Death Row"
            currentPaneArray={this.props.inmates}
            stateName={this.props.stateName}
            stateCode={this.props.stateCode}
          />

          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="large">Death row convicts over time</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.convictsDeathRowLineChartData.length > 0 ? (
                <LineChart
                  data={this.props.convictsDeathRowLineChartData}
                  tooltipHtml={tooltipLine}
                  tooltipContained
                  width={1000}
                  height={800}
                  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                />
              ) : (
                <Header size="small">No breakdown available</Header>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="large">Race Breakdown</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.raceBreakdownDeathRowPieChartData.length > 0 ? (
                <PieChart
                  data={this.props.raceBreakdownDeathRowPieChartData}
                  tooltipOffset={{ top: 175, left: 200 }}
                  tooltipHtml={tooltipPie}
                  tooltipMode={"fixed"}
                  width={600}
                  height={400}
                  margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
                />
              ) : (
                <Header size="small">No breakdown available</Header>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="large">White Race Breakdown</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.whiteRaceDeathRowLineChartData.length > 0 ? (
                <LineChart
                  data={this.props.whiteRaceDeathRowLineChartData}
                  tooltipHtml={tooltipLine}
                  tooltipContained
                  width={1000}
                  height={800}
                  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                />
              ) : (
                <Header size="small">No breakdown available</Header>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="large">Black Race Breakdown</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.blackRaceDeathRowLineChartData.length > 0 ? (
                <LineChart
                  data={this.props.blackRaceDeathRowLineChartData}
                  tooltipHtml={tooltipLine}
                  tooltipContained
                  width={1000}
                  height={800}
                  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                />
              ) : (
                <Header size="small">No breakdown available</Header>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="large">
                Asian Race Breakdown (only available for post 2000)
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.asianRaceDeathRowLineChartData.length > 0 ? (
                <LineChart
                  data={this.props.asianRaceDeathRowLineChartData}
                  tooltipHtml={tooltipLine}
                  tooltipContained
                  width={1000}
                  height={800}
                  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                />
              ) : (
                <Header size="small">No breakdown available</Header>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="large">
                Native American Race Breakdown (only available for post 2000)
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.nativeAmericanRaceDeathRowLineChartData.length > 0 ? (
                <LineChart
                  data={this.props.nativeAmericanRaceDeathRowLineChartData}
                  tooltipHtml={tooltipLine}
                  tooltipContained
                  width={1000}
                  height={800}
                  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                />
              ) : (
                <Header size="small">No breakdown available</Header>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="large">
                Latino/a Race Breakdown (only available for post 2000)
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.latinoARaceDeathRowLineChartData.length > 0 ? (
                <LineChart
                  data={this.props.latinoARaceDeathRowLineChartData}
                  tooltipHtml={tooltipLine}
                  tooltipContained
                  width={1000}
                  height={800}
                  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                />
              ) : (
                <Header size="small">No breakdown available</Header>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="large">
                Unknown Race Breakdown (only available for post 2000)
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.unknownRaceDeathRowLineChartData.length > 0 ? (
                <LineChart
                  data={this.props.unknownRaceDeathRowLineChartData}
                  tooltipHtml={tooltipLine}
                  tooltipContained
                  width={1000}
                  height={800}
                  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                />
              ) : (
                <Header size="small">No breakdown available</Header>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.renderDeathRowModal()}
      </React.Fragment>
    );
  }
}

export default DeathRowByState;
