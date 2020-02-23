import React from "react";
import { Image, Grid, Header, Button, List, Icon } from "semantic-ui-react";

import HeaderOverall from "../templates/header";

import CountiesModal from "../modals/executions/counties";
import ExecutionsModal from "../modals/executions/executions";
import { generateCountyTotalsBarChartData } from "../../generation/execution/bar-charts";

import moment from "moment";

import { tooltipLine, tooltipBar, tooltipPie } from "../../shared-functions";

var BarChart = require("react-d3-components").BarChart;
const LineChart = require("react-d3-components").LineChart;
var PieChart = require("react-d3-components").PieChart;

class ExecutionsByState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: null,
      column: null,
      data: this.props.executions,
      direction: null,
      loading: false
    };
  }

  handleShow = e => {
    this.setState({ currentModal: e.target.id });
  };

  handleHide = () => {
    this.setState({ currentModal: null });
  };

  renderExecutionsModal = () => {
    return (
      <React.Fragment>
        <ExecutionsModal
          handleHide={this.handleHide}
          executions={this.props.executions}
          currentModal={this.state.currentModal}
          finishLoading={this.finishLoading}
          stateName={this.props.stateName}
        />
      </React.Fragment>
    );
  };

  renderCountiesModal = () => {
    return (
      <React.Fragment>
        <CountiesModal
          handleHide={this.handleHide}
          countiesSummary={this.props.countiesSummary}
          currentModal={this.state.currentModal}
          stateName={this.props.stateName}
        />
      </React.Fragment>
    );
  };

  finishLoading = () => {
    this.setState({ loading: false });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.executions !== prevProps.executions &&
      this.props.executions.length > 0
    ) {
      generateCountyTotalsBarChartData(this.props.executions);
    }
  }

  renderMainExecutionsContent = () => {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Fast Facts</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Header size="medium">
              Number of Executions: {this.props.executions.length}
            </Header>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header size="medium">
              First Execution Date:{" "}
              {this.props.firstExecutionSummary.firstExecutionDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header size="medium">
              Latest Execution Date:{" "}
              {this.props.latestExecutionSummary.latestExecutionDate}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header size="medium">
              First Execution by Lethal Injection:{" "}
              {this.props.firstExecutionSummary
                .firstExecutionByLethalInjectionDate === "Invalid date"
                ? "N/A"
                : this.props.firstExecutionSummary
                    .firstExecutionByLethalInjectionDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              First Execution by Electrocution:{" "}
              {this.props.firstExecutionSummary
                .firstExecutionByElectrocutionDate === "Invalid date"
                ? "N/A"
                : this.props.firstExecutionSummary
                    .firstExecutionByElectrocutionDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              First Execution by Gas:{" "}
              {this.props.firstExecutionSummary.firstExecutionByGasDate ===
              "Invalid date"
                ? "N/A"
                : this.props.firstExecutionSummary.firstExecutionByGasDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              First Execution by Firing Squad:{" "}
              {this.props.firstExecutionSummary
                .firstExecutionByFiringSquadDate === "Invalid date"
                ? "N/A"
                : this.props.firstExecutionSummary
                    .firstExecutionByFiringSquadDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              First Execution by Hanging:{" "}
              {this.props.firstExecutionSummary.firstExecutionByHangingDate ===
              "Invalid date"
                ? "N/A"
                : this.props.firstExecutionSummary.firstExecutionByHangingDate}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header size="medium">
              Latest Execution by Lethal Injection:{" "}
              {this.props.latestExecutionSummary
                .latestExecutionByLethalInjectionDate === "Invalid date"
                ? "N/A"
                : this.props.latestExecutionSummary
                    .latestExecutionByLethalInjectionDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Latest Execution by Electrocution:{" "}
              {this.props.latestExecutionSummary
                .latestExecutionByElectrocutionDate === "Invalid date"
                ? "N/A"
                : this.props.latestExecutionSummary
                    .latestExecutionByElectrocutionDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Latest Execution by Gas:{" "}
              {this.props.latestExecutionSummary.latestExecutionByGasDate ===
              "Invalid date"
                ? "N/A"
                : this.props.latestExecutionSummary.latestExecutionByGasDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Latest Execution by Firing Squad:{" "}
              {this.props.latestExecutionSummary
                .latestExecutionByFiringSquadDate === "Invalid date"
                ? "N/A"
                : this.props.latestExecutionSummary
                    .latestExecutionByFiringSquadDate}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Latest Execution by Hanging:{" "}
              {this.props.latestExecutionSummary.latestExecutionByHangingDate ==
              "Invalid date"
                ? "N/A"
                : this.props.latestExecutionSummary
                    .latestExecutionByHangingDate}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}>
            <Header size="medium">
              Most Executions in a single year:{" "}
              {this.props.mostExecutions.mostExecutionsInSingleYear.number} (
              {this.props.mostExecutions.mostExecutionsInSingleYear.year})
            </Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <Header size="medium">
              Most Executions in a single year by Lethal Injection:{" "}
              {
                this.props.mostExecutions
                  .mostExecutionsInSingleYearByLethalInjection.number
              }{" "}
              {this.props.mostExecutions
                .mostExecutionsInSingleYearByLethalInjection.year != null &&
                `(${this.props.mostExecutions.mostExecutionsInSingleYearByLethalInjection.year})`}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Most Executions in a single year by Gas:{" "}
              {this.props.mostExecutions.mostExecutionsInSingleYearByGas.number}{" "}
              {this.props.mostExecutions.mostExecutionsInSingleYearByGas.year !=
                null &&
                `(${this.props.mostExecutions.mostExecutionsInSingleYearByGas.year})`}
            </Header>
          </Grid.Column>

          <Grid.Column width={3}>
            <Header size="medium">
              Most Executions in a single year by Electrocution:{" "}
              {
                this.props.mostExecutions
                  .mostExecutionsInSingleYearByElectrocution.number
              }{" "}
              {this.props.mostExecutions
                .mostExecutionsInSingleYearByElectrocution.year != null &&
                `(${this.props.mostExecutions.mostExecutionsInSingleYearByElectrocution.year})`}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Most Executions in a single year by Firing Squad:{" "}
              {
                this.props.mostExecutions
                  .mostExecutionsInSingleYearByFiringSquad.number
              }{" "}
              {this.props.mostExecutions.mostExecutionsInSingleYearByFiringSquad
                .year != null &&
                `(${this.props.mostExecutions.mostExecutionsInSingleYearByFiringSquad.year})`}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Most Executions in a single year by Hanging:{" "}
              {
                this.props.mostExecutions.mostExecutionsInSingleYearByHanging
                  .number
              }{" "}
              {this.props.mostExecutions.mostExecutionsInSingleYearByHanging
                .year != null &&
                `(${this.props.mostExecutions.mostExecutionsInSingleYearByHanging.year})`}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header size="medium">
              Total executions by Lethal Injection:{" "}
              {
                this.props.totalExecutions
                  .totalNumberofExecutionsByLethalInjection
              }
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Total executions by Gas:{" "}
              {this.props.totalExecutions.totalNumberofExecutionsByGas}
            </Header>
          </Grid.Column>

          <Grid.Column width={3}>
            <Header size="medium">
              Total executions by Electrocution:
              {
                this.props.totalExecutions
                  .totalNumberofExecutionsByElectrocution
              }
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Total executions by Firing Squad:{" "}
              {this.props.totalExecutions.totalNumberofExecutionsByFiringSquad}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Total executions by Hanging:{" "}
              {this.props.totalExecutions.totalNumberofExecutionsByHanging}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header size="medium">
              Most executions in a single year:{" "}
              {
                this.props.mostExecutions
                  .mostExecutionsOnSingleYearBySingleState.occurences
              }{" "}
              (
              {
                this.props.mostExecutions
                  .mostExecutionsOnSingleYearBySingleState.year
              }
              )
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Largest gap between executions in time:{" "}
              {this.props.mostExecutions.largestGapBetweenExecutions.from_date}{" "}
              - {this.props.mostExecutions.largestGapBetweenExecutions.to_date}{" "}
              (
              {this.props.mostExecutions.largestGapBetweenExecutions.difference}{" "}
              days)
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header size="medium">
              Most executions on a single day:{" "}
              {
                this.props.mostExecutions.mostExecutionsByAllStateBySingleDay
                  .total
              }{" "}
              (
              {
                this.props.mostExecutions.mostExecutionsByAllStateBySingleDay
                  .date
              }
              )
            </Header>
          </Grid.Column>

          <Grid.Column width={3}>
            <Header size="medium">
              Most executions in single month:{" "}
              {
                this.props.mostExecutions.mostExecutionsByAllStateBySingleMonth
                  .total
              }{" "}
              (
              {
                this.props.mostExecutions.mostExecutionsByAllStateBySingleMonth
                  .month
              }
              ,{" "}
              {
                this.props.mostExecutions.mostExecutionsByAllStateBySingleMonth
                  .year
              }
              )
            </Header>
          </Grid.Column>

          <Grid.Column width={3}>
            <Header size="medium">
              Most executions in a single month:{" "}
              {
                this.props.mostExecutions
                  .mostExecutionsOnSingleMonthBySingleState.occurences
              }{" "}
              (
              {
                this.props.mostExecutions
                  .mostExecutionsOnSingleMonthBySingleState.year
              }
              ,{" "}
              {
                this.props.mostExecutions
                  .mostExecutionsOnSingleMonthBySingleState.month
              }
              )
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">
              {this.props.mostExecutions.peopleWithHighestNumberOfVictims
                .length > 1
                ? "Offender"
                : "Offenders"}{" "}
              executed with the highest number of victims:{" "}
              {this.props.mostExecutions.peopleWithHighestNumberOfVictims
                .length <= 3
                ? this.props.mostExecutions.peopleWithHighestNumberOfVictims.map(
                    (offender, index) => {
                      return (
                        <React.Fragment key={index}>
                          {`${index ? ". " : ""} ${offender.first_name} ${
                            offender.last_name
                          }, ${moment(offender.execution_date).format(
                            "DD/MM/YYYY"
                          )}, Total Victim Count: ${
                            offender.number_of_victims
                          }`}
                        </React.Fragment>
                      );
                    }
                  )
                : `Too many offenders to show (${this.props.mostExecutions.peopleWithHighestNumberOfVictims.length} offenders). Total Number of Victims: ${this.props.mostExecutions.peopleWithHighestNumberOfVictims[0].number_of_victims}.`}
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Executions over time by method</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <LineChart
              data={this.props.executionsByMethodLineChartData}
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
            <Header size="medium">Executions over time</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <LineChart
              data={this.props.executionsOverTimeLineChartData}
              tooltipHtml={tooltipLine}
              tooltipContained
              width={1000}
              height={800}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={6}>
            <Header size="medium">Execution methods breakdown</Header>
          </Grid.Column>
          <Grid.Column width={10}>
            <List horizontal>
              <List.Item>
                <Image
                  avatar
                  src="/images/execution-icons/lethal-injection.svg"
                />
                <List.Content>
                  <List.Header>Lethal Injection</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image
                  avatar
                  src="/images/execution-icons/electric-chair.svg"
                />
                <List.Content>
                  <List.Header>Electrocution</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src="/images/execution-icons/gas-mask.svg" />
                <List.Content>
                  <List.Header>Gas</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src="/images/execution-icons/firing-squad.svg" />
                <List.Content>
                  <List.Header>Firing Squad</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src="/images/execution-icons/hanging.svg" />
                <List.Content>
                  <List.Header>Hanging</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <BarChart
              data={this.props.executionMethodsBreakdownBarChartData}
              tooltipHtml={tooltipBar}
              tooltipContained
              width={1000}
              height={400}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5}>
            <Header size="medium">Counties breakdown</Header>
          </Grid.Column>

          <Grid.Column width={4}>
            <Header size="medium">
              Number of counties: {this.props.countiesSummary.numberOfCounties}
            </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header size="medium">
              Max county: {this.props.countiesSummary.maxCounty} (
              {this.props.countiesSummary.stateName})
            </Header>
          </Grid.Column>

          <Grid.Column width={3}>
            <Button
              id="countiesModal"
              onClick={e => {
                this.setState(this.handleShow(e));
              }}
              primary
            >
              Show Counties
            </Button>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <svg id="countiesBarChart" width="1050" height="500"></svg>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4}>
            <Header size="medium">Execution weekday breakdown</Header>
          </Grid.Column>
          <Grid.Column width={12}>
            <List horizontal>
              <List.Item>
                <Icon size="big" name="calendar alternate outline" />

                <List.Content>
                  <List.Header>Monday</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon size="big" name="calendar alternate outline" />

                <List.Content>
                  <List.Header>Tuesday</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon size="big" name="calendar alternate outline" />
                <List.Content>
                  <List.Header>Wednesday</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon size="big" name="calendar alternate outline" />

                <List.Content>
                  <List.Header>Thursday</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon size="big" name="calendar alternate outline" />
                <List.Content>
                  <List.Header>Friday</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon size="big" name="calendar alternate outline" />
                <List.Content>
                  <List.Header>Saturday</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon size="big" name="calendar alternate outline" />
                <List.Content>
                  <List.Header>Sunday</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.weekdaysBreakdownPieChartData}
              tooltipOffset={{ top: 175, left: 200 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={600}
              height={400}
              margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
              sort={null}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Execution month breakdown</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.monthsBreakdownPieChartData}
              tooltipOffset={{ top: 175, left: 200 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={600}
              height={400}
              margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
              sort={null}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Age breakdown</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.ageBreakdownPieChartData}
              tooltipOffset={{ top: 175, left: 200 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={600}
              height={400}
              margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
              //sort={sort}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Gender breakdown</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Header size="medium">
              First Female Executed:{" "}
              {this.props.mostExecutions.female.firstFemaleExecuted != undefined
                ? this.renderFirstFemaleExecuted()
                : "N/A"}
            </Header>
          </Grid.Column>

          <Grid.Column width={8}>
            <Header size="medium">
              First Male Executed:{" "}
              {this.props.mostExecutions.male.firstMaleExecuted != undefined
                ? this.renderFirstMaleExecuted()
                : "N/A"}
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Header size="medium">
              Most Recent Female Executed:{" "}
              {this.props.mostExecutions.female.latestFemaleExecuted !=
              undefined
                ? this.renderLatestFemaleExecuted()
                : "N/A"}
            </Header>
          </Grid.Column>

          <Grid.Column width={8}>
            <Header size="medium">
              Most Recent Male Executed:{" "}
              {this.props.mostExecutions.male.latestMaleExecuted != undefined
                ? this.renderLatestMaleExecuted()
                : "N/A"}
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.genderBreakdownPieChartData}
              tooltipOffset={{ top: 175, left: 200 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={600}
              height={400}
              margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
              //sort={sort}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Racial breakdown</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <LineChart
              data={this.props.racialLineChartData}
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
            <PieChart
              data={this.props.racialBreakdownPieChartData}
              tooltipOffset={{ top: 175, left: 200 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={600}
              height={400}
              margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
              //sort={sort}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Foreign National breakdown</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.foreignNationalBreakdownPieChartData}
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
            <Header size="medium">Execution Volunteer breakdown</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <LineChart
              data={this.props.volunteerLineChartData}
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
            <PieChart
              data={this.props.volunteerBreakdownPieChartData}
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
            <Header size="medium">Victims breakdown</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <PieChart
              data={this.props.victimBreakdownPieChartData}
              tooltipOffset={{ top: 175, left: 200 }}
              tooltipHtml={tooltipPie}
              tooltipMode={"fixed"}
              width={1000}
              height={400}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            />
          </Grid.Column>
        </Grid.Row>

        {this.renderExecutionsModal()}

        {this.renderCountiesModal()}
      </React.Fragment>
    );
  };

  renderFirstFemaleExecuted = () => {
    return (
      <React.Fragment>
        {this.props.mostExecutions.female.firstFemaleExecuted.first_name}{" "}
        {this.props.mostExecutions.female.firstFemaleExecuted.middle_name}{" "}
        {this.props.mostExecutions.female.firstFemaleExecuted.last_name} (
        {this.props.mostExecutions.female.firstFemaleExecuted.state},{" "}
        {moment(
          this.props.mostExecutions.female.firstFemaleExecuted.execution_date
        ).format("DD/MM/YYYY")}
        ){" "}
      </React.Fragment>
    );
  };

  renderFirstMaleExecuted = () => {
    return (
      <React.Fragment>
        {this.props.mostExecutions.male.firstMaleExecuted.first_name}{" "}
        {this.props.mostExecutions.male.firstMaleExecuted.middle_name}{" "}
        {this.props.mostExecutions.male.firstMaleExecuted.last_name} (
        {this.props.mostExecutions.male.firstMaleExecuted.state},{" "}
        {moment(
          this.props.mostExecutions.male.firstMaleExecuted.execution_date
        ).format("DD/MM/YYYY")}
        ){" "}
      </React.Fragment>
    );
  };

  renderLatestFemaleExecuted = () => {
    return (
      <React.Fragment>
        {this.props.mostExecutions.female.latestFemaleExecuted.first_name}{" "}
        {this.props.mostExecutions.female.latestFemaleExecuted.middle_name}{" "}
        {this.props.mostExecutions.female.latestFemaleExecuted.last_name} (
        {this.props.mostExecutions.female.latestFemaleExecuted.state},{" "}
        {moment(
          this.props.mostExecutions.female.latestFemaleExecuted.execution_date
        ).format("DD/MM/YYYY")}
        )
      </React.Fragment>
    );
  };

  renderLatestMaleExecuted = () => {
    return (
      <React.Fragment>
        {this.props.mostExecutions.male.latestMaleExecuted.first_name}{" "}
        {this.props.mostExecutions.male.latestMaleExecuted.middle_name}{" "}
        {this.props.mostExecutions.male.latestMaleExecuted.last_name} (
        {this.props.mostExecutions.male.latestMaleExecuted.state},{" "}
        {moment(
          this.props.mostExecutions.male.latestMaleExecuted.execution_date
        ).format("DD/MM/YYYY")}
        )
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
            modalToShow="executions"
            currentPane="Executions"
            loading={this.state.loading}
            currentPaneArray={this.props.executions}
            stateName={this.props.stateName}
            stateCode={this.props.stateCode}
          />

          {this.props.executions.length > 0 ? (
            this.renderMainExecutionsContent()
          ) : (
            <Header size="small">No executions recorded for this state</Header>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default ExecutionsByState;
