import { STATECODES, STATEOPTIONS } from "./constants.js";
import React from "react";
import "semantic-ui-css/semantic.min.css";

import {
  Container,
  Dropdown,
  Tab,
  Grid,
  Header,
  Button
} from "semantic-ui-react";
import {
  retrieveExecutionDocuments,
  retrieveInnocenceDocuments,
  retrieveCrimeDocuments,
  retrieveOpinionDocuments,
  retrieveSentencingDocuments,
  retrieveLegalDocuments,
  retrieveDeathRowDocuments
} from "./api.js";

import { generateTabPanes } from "./shared/panes/generatePanes";

// #### EXECUTION

// totals
import {
  generateCountyTotals,
  generateTotalExecutionsByMethod
} from "./shared/generation/execution/totals";

// line charts

import {
  generateExecutionsOverTimeLineChart,
  generateExecutionsByMethodLineChart,
  generateExecutionsOverTimeByStateLineChartData,
  generateRegionBreakdownLineChartData,
  generateVolunteerLineChartData,
  generateRacialLineChartData,
  generateNumberOfStatesWithExecutionsByYearLineChartData
} from "./shared/generation/execution/line-charts";

// bar charts

import {
  generateVictimBarChart,
  generateExecutionMethodsBarChart,
  generateAgeBreakdownBarChart
} from "./shared/generation/execution/bar-charts";

// pie charts

import {
  generateVolunteerPieChart,
  generateRacialPieChart,
  generateGenderPieChart,
  generateWeekdaysPieChart,
  generateMonthPieChart,
  generateAgeBreakdownPieChart,
  generateRegionBreakdownPieChartData,
  generateVolunteerBreakdownPieChartData
} from "./shared/generation/execution/pie-charts";

// miscellanious

import { generateFacts } from "./shared/generation/execution/facts";
import { generateMostExecutionsOverview } from "./shared/generation/execution/mostExecutions";

// #### CRIME

// totals

// line charts

import { generateCrimeLineChartData } from "./shared/generation/crime/line-charts";

// bar charts

// pie charts

// #### DEATH ROW

// totals

// line charts

import {
  generateConvictsDeathRowLineChart,
  generateConvictsByStateDeathRowLineChart,
  generateWhiteRaceDeathRowLineChart,
  generateBlackRaceDeathRowLineChart,
  generateAsianRaceDeathRowLineChart,
  generateNativeAmericanRaceDeathRowLineChart,
  generatelatinoARaceDeathRowLineChart,
  generateUnknownRaceDeathRowLineChart
} from "./shared/generation/death_row/line-charts";

// bar charts

// pie charts

import { generateRaceBreakdownDeathRowPieChartData } from "./shared/generation/death_row/pie-charts";

// #### INNOCENCE

// facts

import { generateInnocenceFacts } from "./shared/generation/innocence/facts";

// line charts

import {
  generateInnocenceConvictionsOverallLineChartData,
  generateInnocenceConvictionsByStateLineChartData,
  generateInnocenceExonerationsOverallLineChartData,
  generateInnocenceExonerationsByStateLineChartData,
  generateStatesHavingInnocentsByYearLineChartData
} from "./shared/generation/innocence/line-charts";
// bar charts

// pie charts

import {
  generateDNABreakdownPieChartData,
  generateRaceBreakdownInnocencePieChartData,
  generateExonerationBreakdownPieChartData
} from "./shared/generation/innocence/pie-charts";

// #### SENTENCING

// facts

import { generateSentencingFacts } from "./shared/generation/sentencing/facts";
// totals

// line charts

import {
  generateSentencingByStateLineChart,
  generateSentencingOverallLineChart,
  generateExecutionToSentencingComparisonLineChart,
  generateStatesCarryingOutSentencesByYearOverallLineChartData
} from "./shared/generation/sentencing/line-charts";

// bar charts

// pie charts

// #### OPINION

// totals

// line charts

import {
  generateMurderOpinionLineChart,
  generateMoralOpinionLineChart,
  generateFrequencyOpinionLineChart,
  generateEquitableOpinionLineChart,
  generateApproachesOpinionLineChart
} from "./shared/generation/opinion/line-charts";

// bar charts

// pie charts

import {
  generateYearsSelection,
  filterCrimesByState
} from "./shared/shared-functions";

// This class essentially acts as the 'base container' for the application, including all of its state and base methods
// For example, when a user clicks 'Overall' or 'By State', the application will use the state below
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // general
      panes: [],
      stateName: "Federal",
      stateCode: "Federal",
      viewByState: false,
      activeTabPane: "Executions",
      // executions

      executions: [],

      mostExecutions: {},
      firstExecutionSummary: {},
      latestExecutionSummary: {},

      volunteerLineChartData: {
        label: "Volunteer",
        values: [{ x: 0, y: 0 }]
      },
      racialBreakdownPieChartData: {
        label: "Race",
        values: [{ x: "", y: 0 }]
      },
      genderBreakdownPieChartData: {
        label: "Gender",
        values: [{ x: "", y: 0 }]
      },
      foreignNationalBreakdownPieChartData: {
        label: "Foreign National",
        values: [{ x: "", y: 0 }]
      },
      executionMethodsBreakdownBarChartData: {
        label: "Execution Method",
        values: [{ x: "", y: 0 }]
      },
      executionsByMethodLineChartData: [
        /*   {
          label: "Lethal Injection",
          values: [{ x: 0, y: 0 }]
        },
        {
          label: "Electrocution",
          values: [{ x: 0, y: 0 }]
        },
        {
          label: "Gas",
          values: [{ x: 0, y: 0 }]
        },
        {
          label: "Firing Squad",
          values: [{ x: 0, y: 0 }]
        },
        {
          label: "Hanging",
          values: [{ x: 0, y: 0 }]
        } */
      ],
      statesHavingInnocentsByYearOverallLineChartData: {
        label: "Innocent",
        values: [{ x: "", y: 0 }]
      },
      victimBreakdownPieChartData: {
        label: "Victim",
        values: [{ x: "", y: 0 }]
      },
      victimLineChartData: [],
      weekdaysBreakdownPieChartData: {
        label: "Weekday",
        values: [{ x: "", y: 0 }]
      },
      monthsBreakdownPieChartData: {
        label: "Month",
        values: [{ x: "", y: 0 }]
      },
      ageBreakdownPieChartData: {
        label: "Age",
        values: [{ x: 0, y: 0 }]
      },
      regionBreakdownPieChartData: {
        label: "Region",
        values: [{ x: 0, y: 0 }]
      },
      volunteerBreakdownPieChartData: {
        label: "Volunteer",
        values: [{ x: 0, y: 0 }]
      },
      regionBreakdownLineChartData: [],
      executionsOverTimeLineChartData: {
        label: "Executions",
        values: [{ x: 0, y: 0 }]
      },
      countiesBreakdownPieChartData: {
        label: "Counties",
        values: [{ x: 0, y: 0 }]
      },

      dnaBreakdownPieChartData: {
        label: "DNA",
        values: [{ x: 0, y: 0 }]
      },

      numberOfStatesWithExecutionsByYearLineChartData: [],
      executionsOverTimeByStateLineChartData: [],

      // innocence
      innocents: [],
      innocenceFacts: {},

      stateBreakdownInnocencePieChartData: {
        label: "States",
        values: [{ x: 0, y: 0 }]
      },
      raceBreakdownInnocencePieChartData: {
        label: "Races",
        values: [{ x: 0, y: 0 }]
      },
      reasonsBreakdownPieChartData: {
        //////////
        label: "Reasons",
        values: [{ x: 0, y: 0 }]
      },
      exonerationBreakdownPieChartData: {
        label: "Exonerations",
        values: [{ x: 0, y: 0 }]
      },

      // death row

      inmates: [],

      // crime

      crimes: [],
      crimeLineChartData: [],

      // sentencing

      sentences: [],
      sentencingOverallLineChartData: {
        label: "Sentencing overall",
        values: [{ x: 0, y: 0 }]
      },

      sentencingByStateLineChartData: [
        {
          label: "Sentences",
          values: [{ x: 0, y: 0 }]
        }
      ],

      executionToSentencingComparisonLineChartData: [],

      sentencingFacts: {},

      // opinion

      murderOpinionLineChartData: [
        {
          label: "Opinion",
          values: [{ x: 0, y: 0 }]
        }
      ],
      moralOpinionLineChartData: [
        {
          label: "Opinion",
          values: [{ x: 0, y: 0 }]
        }
      ],
      frequencyOpinionLineChartData: [
        {
          label: "Opinion",
          values: [{ x: 0, y: 0 }]
        }
      ],
      equitableOpinionLineChartData: [
        {
          label: "Opinion",
          values: [{ x: 0, y: 0 }]
        }
      ],
      approachesOpinionLineChartData: [
        {
          label: "Opinion",
          values: [{ x: 0, y: 0 }]
        }
      ],

      innocenceConvictionsOverallLineChartData: {
        label: "Convictions",
        values: [{ x: 0, y: 0 }]
      },

      innocenceConvictionsByStateLineChartData: [
        {
          label: "Convictions",
          values: [{ x: 0, y: 0 }]
        }
      ],

      innocenceExonerationsOverallLineChartData: {
        label: "Exonerations",
        values: [{ x: 0, y: 0 }]
      },

      innocenceExonerationsByStateLineChartData: [
        {
          label: "Exonerations",
          values: [{ x: 0, y: 0 }]
        }
      ],

      // death row

      raceBreakdownDeathRowPieChartData: {
        label: "Race",
        values: [{ x: 0, y: 0 }]
      },

      racialLineChartData: [],

      convictsDeathRowLineChartData: {
        label: "Convicts",
        values: [{ x: 0, y: 0 }]
      },

      convictsByStateDeathRowLineChartData: [
        {
          label: "Convicts",
          values: [{ x: 0, y: 0 }]
        }
      ],

      unknownRaceDeathRowLineChartData: {
        label: "Unknown",
        values: [{ x: 0, y: 0 }]
      },

      latinoARaceDeathRowLineChartData: {
        label: "Latino/a",
        values: [{ x: 0, y: 0 }]
      },
      nativeAmericanRaceDeathRowLineChartData: {
        label: "Native American",
        values: [{ x: 0, y: 0 }]
      },
      asianRaceDeathRowLineChartData: {
        label: "Asian",
        values: [{ x: 0, y: 0 }]
      },
      blackRaceDeathRowLineChartData: {
        label: "Black",
        values: [{ x: 0, y: 0 }]
      },
      whiteRaceDeathRowLineChartData: {
        label: "White",
        values: [{ x: 0, y: 0 }]
      }
    };
  }

  // a somewhat unorthodox way of setting the state. See https://twitter.com/dan_abramov/status/824310320399319040 for details
  // All the functions below share his concept

  // shared functions
  generateYearsSelection = () => this.setState(generateYearsSelection);

  // generatePanes.js
  generateTabPanes = () => this.setState(generateTabPanes);

  // #### EXECUTION
  // totals
  generateCountyTotals = executions =>
    this.setState(generateCountyTotals(executions));

  generateTotalExecutionsByMethod = executions =>
    this.setState(generateTotalExecutionsByMethod(executions));

  generateRegionBreakdownPieChartData = executions =>
    this.setState(generateRegionBreakdownPieChartData(executions));

  // line charts
  generateExecutionsOverTimeLineChart = executions =>
    this.setState(generateExecutionsOverTimeLineChart(executions));

  generateExecutionsOverTimeByStateLineChartData = executions =>
    this.setState(generateExecutionsOverTimeByStateLineChartData(executions));
  generateExecutionsByMethodLineChart = executions =>
    this.setState(generateExecutionsByMethodLineChart(executions));

  generateVolunteerLineChartData = executions =>
    this.setState(generateVolunteerLineChartData(executions));

  generateRacialLineChartData = executions =>
    this.setState(generateRacialLineChartData(executions));

  generateNumberOfStatesWithExecutionsByYearLineChartData = executions =>
    this.setState(
      generateNumberOfStatesWithExecutionsByYearLineChartData(executions)
    );
  // bar charts
  generateVictimBarChart = executions =>
    this.setState(generateVictimBarChart(executions));
  generateExecutionMethodsBarChart = executions =>
    this.setState(generateExecutionMethodsBarChart(executions));

  generateAgeBreakdownBarChart = executions =>
    this.setState(generateAgeBreakdownBarChart(executions));

  generateRegionBreakdownLineChartData = executions =>
    this.setState(generateRegionBreakdownLineChartData(executions));

  // pie charts

  generateVolunteerPieChart = executions =>
    this.setState(generateVolunteerPieChart(executions));
  generateRacialPieChart = executions =>
    this.setState(generateRacialPieChart(executions));
  generateGenderPieChart = executions =>
    this.setState(generateGenderPieChart(executions));
  generateWeekdaysPieChart = executions =>
    this.setState(generateWeekdaysPieChart(executions));

  generateMonthPieChart = executions =>
    this.setState(generateMonthPieChart(executions));

  generateAgeBreakdownPieChart = executions =>
    this.setState(generateAgeBreakdownPieChart(executions));

  generateVolunteerBreakdownPieChartData = executions =>
    this.setState(generateVolunteerBreakdownPieChartData(executions));
  // Miscellanious

  generateFacts = executions => this.setState(generateFacts(executions));
  generateMostExecutionsOverview = executions =>
    this.setState(generateMostExecutionsOverview(executions));

  // #### CRIME

  // totals
  // line charts

  generateCrimeLineChartData = (executions, opinion, sentences, crime) =>
    this.setState(
      generateCrimeLineChartData(executions, opinion, sentences, crime)
    );

  // bar charts
  // pie charts

  // #### DEATH ROW

  // totals

  // line charts

  generateConvictsDeathRowLineChart = inmates =>
    this.setState(generateConvictsDeathRowLineChart(inmates));

  generateConvictsByStateDeathRowLineChart = inmates =>
    this.setState(generateConvictsByStateDeathRowLineChart(inmates));
  generateWhiteRaceDeathRowLineChart = inmates =>
    this.setState(generateWhiteRaceDeathRowLineChart(inmates));

  generateBlackRaceDeathRowLineChart = inmates =>
    this.setState(generateBlackRaceDeathRowLineChart(inmates));

  generateAsianRaceDeathRowLineChart = inmates =>
    this.setState(generateAsianRaceDeathRowLineChart(inmates));

  generateNativeAmericanRaceDeathRowLineChart = inmates =>
    this.setState(generateNativeAmericanRaceDeathRowLineChart(inmates));

  generatelatinoARaceDeathRowLineChart = inmates =>
    this.setState(generatelatinoARaceDeathRowLineChart(inmates));

  generateUnknownRaceDeathRowLineChart = inmates =>
    this.setState(generateUnknownRaceDeathRowLineChart(inmates));

  // bar charts

  // pie charts

  generateRaceBreakdownDeathRowPieChartData = inmates =>
    this.setState(generateRaceBreakdownDeathRowPieChartData(inmates));

  // #### INNOCENCE

  // facts

  generateInnocenceFacts = innocents =>
    this.setState(generateInnocenceFacts(innocents));

  // line charts

  generateInnocenceConvictionsOverallLineChartData = innocents =>
    this.setState(generateInnocenceConvictionsOverallLineChartData(innocents));
  generateInnocenceConvictionsByStateLineChartData = innocents =>
    this.setState(generateInnocenceConvictionsByStateLineChartData(innocents));

  generateInnocenceExonerationsOverallLineChartData = innocents =>
    this.setState(generateInnocenceExonerationsOverallLineChartData(innocents));

  generateInnocenceExonerationsByStateLineChartData = innocents =>
    this.setState(generateInnocenceExonerationsByStateLineChartData(innocents));

  generateStatesHavingInnocentsByYearLineChartData = innocents =>
    this.setState(generateStatesHavingInnocentsByYearLineChartData(innocents));
  // bar charts

  // pie charts
  generateDNABreakdownPieChartData = innocents =>
    this.setState(generateDNABreakdownPieChartData(innocents));
  generateRaceBreakdownInnocencePieChartData = innocents =>
    this.setState(generateRaceBreakdownInnocencePieChartData(innocents));
  generateExonerationBreakdownPieChartData = innocents =>
    this.setState(generateExonerationBreakdownPieChartData(innocents));

  // #### SENTENCING

  // facts

  generateSentencingFacts = (sentences, executions) =>
    this.setState(generateSentencingFacts(sentences, executions));
  // totals

  // line charts
  generateSentencingByStateLineChart = sentences =>
    this.setState(generateSentencingByStateLineChart(sentences));

  generateSentencingOverallLineChart = sentences =>
    this.setState(generateSentencingOverallLineChart(sentences));

  generateExecutionToSentencingComparisonLineChart = sentences =>
    this.setState(generateExecutionToSentencingComparisonLineChart(sentences));

  generateStatesCarryingOutSentencesByYearOverallLineChartData = sentences =>
    this.setState(
      generateStatesCarryingOutSentencesByYearOverallLineChartData(sentences)
    );
  // bar charts

  // pie charts

  // #### OPINION

  // totals

  // line charts

  generateMurderOpinionLineChart = opinions =>
    this.setState(generateMurderOpinionLineChart(opinions));
  generateMoralOpinionLineChart = opinions =>
    this.setState(generateMoralOpinionLineChart(opinions));
  generateFrequencyOpinionLineChart = opinions =>
    this.setState(generateFrequencyOpinionLineChart(opinions));
  generateEquitableOpinionLineChart = opinions =>
    this.setState(generateEquitableOpinionLineChart(opinions));
  generateApproachesOpinionLineChart = opinions =>
    this.setState(generateApproachesOpinionLineChart(opinions));

  // bar charts

  // pie charts

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const currentYear = new Date().getFullYear();

    retrieveExecutionDocuments();
    retrieveInnocenceDocuments();
    retrieveCrimeDocuments();
    retrieveOpinionDocuments();
    retrieveSentencingDocuments();
    retrieveLegalDocuments();
    retrieveDeathRowDocuments();
    this.generateYearsSelection(currentYear);
    this.generateTabPanes();
    this.renderRelevantContentOverall();
  };

  handleStateChange = (event, data) => {
    this.setState(
      {
        stateCode: data.value
      },
      () => {
        this.renderRelevantContentByState();
      }
    );
  };

  handleViewByOverallChange = (event, data) => {
    this.setState(
      {
        viewByState: false
      },
      () => {
        this.renderRelevantContentOverall();
      }
    );
  };

  handleViewByStateChange = (event, data) => {
    this.setState(
      {
        viewByState: true
      },
      () => {
        this.renderRelevantContentByState();
      }
    );
  };

  renderRelevantContentOverall = () => {
    const activeTabPane = this.state.activeTabPane;
    const executions = JSON.parse(localStorage.getItem("executions") || "[]");
    const sentences = JSON.parse(localStorage.getItem("sentences") || "[]");
    const crimes = JSON.parse(localStorage.getItem("crimes") || "[]");
    const opinions = JSON.parse(localStorage.getItem("opinions") || "[]");

    const innocents = JSON.parse(localStorage.getItem("innocence") || "[]");

    const death_row_inmates = JSON.parse(
      localStorage.getItem("death_row") || "[]"
    );

    // here I am converting all these to be JS Date objects, since currently their date fields are string values
    // I will need them to be proper dates for when I pass them in as arguments into their relevant functions
    const executionProperDates = executions.map(
      ({ execution_date, ...properties }) => ({
        ...properties,
        execution_date: new Date(execution_date)
      })
    );

    const currentDate = new Date();
    const filteredExecutions = executionProperDates.filter(execution => {
      return execution.execution_date <= currentDate;
    });

    const {
      murderOpinions,
      moralOpinions,
      frequencyOpinions,
      equitableOpinions,
      approachOpinions
    } = this.updateOpinionDates(opinions);

    switch (activeTabPane) {
      case "Executions":
        if (filteredExecutions.length > 0) {
          this.generateFacts(filteredExecutions);
          this.generateTotalExecutionsByMethod(filteredExecutions);
          this.generateExecutionsOverTimeByStateLineChartData(
            filteredExecutions
          );

          this.generateVolunteerLineChartData(filteredExecutions);
          this.generateRegionBreakdownPieChartData(filteredExecutions);
          this.generateRegionBreakdownLineChartData(filteredExecutions);
          this.generateCountyTotals(filteredExecutions);
          this.generateMostExecutionsOverview(filteredExecutions);
          this.generateVolunteerPieChart(filteredExecutions);
          this.generateRacialPieChart(filteredExecutions);
          this.generateGenderPieChart(filteredExecutions);
          this.generateExecutionsOverTimeLineChart(filteredExecutions);
          this.generateExecutionMethodsBarChart(filteredExecutions);
          this.generateVictimBarChart(filteredExecutions);
          this.generateVolunteerBreakdownPieChartData(filteredExecutions);
          this.generateWeekdaysPieChart(filteredExecutions);
          this.generateExecutionsByMethodLineChart(filteredExecutions);
          this.generateMonthPieChart(filteredExecutions);
          this.generateAgeBreakdownPieChart(filteredExecutions);
          this.generateRacialLineChartData(filteredExecutions);
          this.generateNumberOfStatesWithExecutionsByYearLineChartData(
            filteredExecutions
          );
        }

        this.setState({
          executions: filteredExecutions
        });
        break;
      case "Sentencing rates":
        if (sentences.length > 0 && filteredExecutions.length > 0) {
          this.generateSentencingFacts(sentences, filteredExecutions);

          this.generateSentencingOverallLineChart(sentences);
          this.generateSentencingByStateLineChart(sentences);
          this.generateExecutionToSentencingComparisonLineChart(sentences);
          this.generateStatesCarryingOutSentencesByYearOverallLineChartData(
            sentences
          );
        }
        this.setState({ sentences: sentences, executions: filteredExecutions });
        break;
      case "Crime rates":
        const crimesOverall = crimes.filter(crime => {
          return crime.state == "United States";
        });

        if (
          crimesOverall.length > 0 &&
          filteredExecutions.length > 0 &&
          murderOpinions.length > 0 &&
          sentences.length > 0
        ) {
          this.generateCrimeLineChartData(
            filteredExecutions,
            murderOpinions,
            sentences,
            crimesOverall
          );
        }

        this.setState({
          crimes: crimesOverall,
          executions: filteredExecutions
        });
        break;
      case "Death row":
        const filteredDeathRowInmates = death_row_inmates.map(
          ({ date, ...properties }) => ({
            ...properties,
            date: new Date(date)
          })
        );

        if (filteredDeathRowInmates.length > 0) {
          this.generateConvictsDeathRowLineChart(filteredDeathRowInmates);
          this.generateConvictsByStateDeathRowLineChart(
            filteredDeathRowInmates
          );
          this.generateRaceBreakdownDeathRowPieChartData(
            filteredDeathRowInmates
          );
          this.generateWhiteRaceDeathRowLineChart(filteredDeathRowInmates);
          this.generateBlackRaceDeathRowLineChart(filteredDeathRowInmates);
          this.generateAsianRaceDeathRowLineChart(filteredDeathRowInmates);
          this.generateNativeAmericanRaceDeathRowLineChart(
            filteredDeathRowInmates
          );
          this.generatelatinoARaceDeathRowLineChart(filteredDeathRowInmates);
          this.generateUnknownRaceDeathRowLineChart(filteredDeathRowInmates);
        }
        this.setState({ inmates: filteredDeathRowInmates });
        break;
      case "Innocence":
        if (innocents.length > 0) {
          this.generateInnocenceConvictionsOverallLineChartData(innocents);
          this.generateInnocenceConvictionsByStateLineChartData(innocents);
          this.generateInnocenceExonerationsOverallLineChartData(innocents);
          this.generateInnocenceExonerationsByStateLineChartData(innocents);

          this.generateDNABreakdownPieChartData(innocents);
          this.generateRaceBreakdownInnocencePieChartData(innocents);
          this.generateExonerationBreakdownPieChartData(innocents);

          this.generateStatesHavingInnocentsByYearLineChartData(innocents);
          this.generateInnocenceFacts(innocents);
        }
        this.setState({ innocents: innocents });
        break;
      case "Opinion":
        if (murderOpinions.length > 0) {
          this.generateMurderOpinionLineChart(murderOpinions);
          this.generateMoralOpinionLineChart(moralOpinions);
          this.generateFrequencyOpinionLineChart(frequencyOpinions);
          this.generateEquitableOpinionLineChart(equitableOpinions);
          this.generateApproachesOpinionLineChart(approachOpinions);
        }
        break;
    }

    this.setState({
      stateName: "United States"
    });
  };

  renderRelevantContentByState = () => {
    const activeTabPane = this.state.activeTabPane;
    const stateCode = this.state.stateCode;
    const executions = JSON.parse(localStorage.getItem("executions") || "[]");
    const sentences = JSON.parse(localStorage.getItem("sentences") || "[]");
    const crimes = JSON.parse(localStorage.getItem("crimes") || "[]");
    const opinions = JSON.parse(localStorage.getItem("opinions") || "[]");
    const innocents = JSON.parse(localStorage.getItem("innocence") || "[]");

    const death_row_inmates = JSON.parse(
      localStorage.getItem("death_row") || "[]"
    );
    const state = Object.keys(STATECODES).find(
      key => STATECODES[key] === stateCode
    );

    // here I am converting all these to be JS Date objects, since currently their date fields are string values
    // I will need them to be proper dates for when I pass them in as arguments into their relevant functions
    const executionProperDates = executions.map(
      ({ execution_date, ...properties }) => ({
        ...properties,
        execution_date: new Date(execution_date)
      })
    );

    const currentDate = new Date();
    const filteredExecutions = executionProperDates.filter(execution => {
      return (
        execution.execution_date < currentDate && execution.state === state
      );
    });

    const filteredSentences = sentences.filter(sentence => {
      return sentence.state === state;
    });

    const {
      murderOpinions,
      moralOpinions,
      frequencyOpinions,
      equitableOpinions,
      approachOpinions
    } = this.updateOpinionDates(opinions);

    switch (activeTabPane) {
      case "Executions":
        if (filteredExecutions.length > 0) {
          this.generateFacts(filteredExecutions);
          this.generateTotalExecutionsByMethod(filteredExecutions);
          this.generateExecutionsOverTimeByStateLineChartData(
            filteredExecutions
          );

          this.generateVolunteerLineChartData(filteredExecutions);
          this.generateCountyTotals(filteredExecutions);
          this.generateVolunteerPieChart(filteredExecutions);
          this.generateRacialPieChart(filteredExecutions);
          this.generateGenderPieChart(filteredExecutions);
          this.generateExecutionsOverTimeLineChart(filteredExecutions);
          this.generateExecutionMethodsBarChart(filteredExecutions);
          this.generateVictimBarChart(filteredExecutions);

          this.generateMostExecutionsOverview(filteredExecutions);
          this.generateVolunteerBreakdownPieChartData(filteredExecutions);
          this.generateWeekdaysPieChart(filteredExecutions);
          this.generateExecutionsByMethodLineChart(filteredExecutions);
          this.generateMonthPieChart(filteredExecutions);
          this.generateAgeBreakdownPieChart(filteredExecutions);
          this.generateRacialLineChartData(filteredExecutions);
        }
        this.setState({
          executions: filteredExecutions
        });
        break;
      case "Sentencing rates":
        if (filteredSentences.length > 0 && filteredExecutions.length > 0) {
          this.generateSentencingFacts(filteredSentences, filteredExecutions);

          this.generateSentencingOverallLineChart(filteredSentences);
          this.generateSentencingByStateLineChart(filteredSentences);
          this.generateExecutionToSentencingComparisonLineChart(
            filteredSentences
          );
          this.generateStatesCarryingOutSentencesByYearOverallLineChartData(
            filteredSentences
          );
        }
        this.setState({ sentences: filteredSentences });
        break;
      case "Crime rates":
        const filteredCrimes = filterCrimesByState(crimes, state);

        if (
          filteredCrimes.length > 0 &&
          filteredExecutions.length > 0 &&
          filteredSentences.length > 0 &&
          murderOpinions.length > 0
        ) {
          this.generateCrimeLineChartData(
            filteredExecutions,
            murderOpinions,
            filteredSentences,
            filteredCrimes
          );
        }
        this.setState({ crimes: filteredCrimes });
        break;
      case "Death row":
        const filteredDeathRowInmatesByDate = death_row_inmates.map(
          ({ date, ...properties }) => ({
            ...properties,
            date: new Date(date)
          })
        );

        const filteredDeathRowInmatesByState = filteredDeathRowInmatesByDate.filter(
          inmate => {
            return inmate.state === state;
          }
        );

        if (filteredDeathRowInmatesByState.length > 0) {
          this.generateConvictsDeathRowLineChart(
            filteredDeathRowInmatesByState
          );
          this.generateConvictsByStateDeathRowLineChart(
            filteredDeathRowInmatesByState
          );
          this.generateRaceBreakdownDeathRowPieChartData(
            filteredDeathRowInmatesByState
          );
          this.generateWhiteRaceDeathRowLineChart(
            filteredDeathRowInmatesByState
          );
          this.generateBlackRaceDeathRowLineChart(
            filteredDeathRowInmatesByState
          );
          this.generateAsianRaceDeathRowLineChart(
            filteredDeathRowInmatesByState
          );
          this.generateNativeAmericanRaceDeathRowLineChart(
            filteredDeathRowInmatesByState
          );
          this.generatelatinoARaceDeathRowLineChart(
            filteredDeathRowInmatesByState
          );
          this.generateUnknownRaceDeathRowLineChart(
            filteredDeathRowInmatesByState
          );
        }
        this.setState({ inmates: filteredDeathRowInmatesByState });
        break;
      case "Innocence":
        const filteredInnocents = innocents.filter(innocent => {
          return innocent.state === state;
        });
        if (filteredInnocents.length > 0) {
          this.generateInnocenceConvictionsOverallLineChartData(
            filteredInnocents
          );
          this.generateInnocenceConvictionsByStateLineChartData(
            filteredInnocents
          );
          this.generateInnocenceExonerationsOverallLineChartData(
            filteredInnocents
          );
          this.generateInnocenceExonerationsByStateLineChartData(
            filteredInnocents
          );

          this.generateDNABreakdownPieChartData(filteredInnocents);
          this.generateRaceBreakdownInnocencePieChartData(filteredInnocents);
          this.generateExonerationBreakdownPieChartData(filteredInnocents);

          this.generateStatesHavingInnocentsByYearLineChartData(
            filteredInnocents
          );
          this.generateInnocenceFacts(filteredInnocents);
        }
        this.setState({ innocents: filteredInnocents });
        break;
      case "Opinion":
        if (murderOpinions.length > 0) {
          this.generateMurderOpinionLineChart(murderOpinions);
          this.generateMoralOpinionLineChart(moralOpinions);
          this.generateFrequencyOpinionLineChart(frequencyOpinions);
          this.generateEquitableOpinionLineChart(equitableOpinions);
          this.generateApproachesOpinionLineChart(approachOpinions);
        }
        break;
    }

    this.setState({
      stateName: state
    });
  };

  updateOpinionDates = opinions => {
    const murderOpinions = opinions.map(opinion => {
      const murderOpinion = opinion.murder.map(
        ({ from_date, to_date, ...properties }) => ({
          ...properties,
          from_date: new Date(from_date),
          to_date: new Date(to_date)
        })
      );
      return murderOpinion;
    });

    const moralOpinions = opinions.map(opinion => {
      const moralOpinion = opinion.moral.map(
        ({ from_date, to_date, ...properties }) => ({
          ...properties,
          from_date: new Date(from_date),
          to_date: new Date(to_date)
        })
      );
      return moralOpinion;
    });

    const frequencyOpinions = opinions.map(opinion => {
      const frequencyOpinion = opinion.frequency.map(
        ({ from_date, to_date, ...properties }) => ({
          ...properties,
          from_date: new Date(from_date),
          to_date: new Date(to_date)
        })
      );
      return frequencyOpinion;
    });

    const equitableOpinions = opinions.map(opinion => {
      const equitableOpinion = opinion.equitable.map(
        ({ from_date, to_date, ...properties }) => ({
          ...properties,
          from_date: new Date(from_date),
          to_date: new Date(to_date)
        })
      );
      return equitableOpinion;
    });

    const approachOpinions = opinions.map(opinion => {
      const approachOpinion = opinion.approach.map(
        ({ from_date, to_date, ...properties }) => ({
          ...properties,
          from_date: new Date(from_date),
          to_date: new Date(to_date)
        })
      );
      return approachOpinion;
    });

    return {
      murderOpinions,
      moralOpinions,
      frequencyOpinions,
      equitableOpinions,
      approachOpinions
    };
  };

  handleTabChange = (event, data) => {
    const activeIndex = data.activeIndex;
    const paneName = data.panes[activeIndex].menuItem;

    this.setState({ activeTabPane: paneName }, () => {
      this.state.viewByState === true
        ? this.renderRelevantContentByState()
        : this.renderRelevantContentOverall();
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column width={13}>
                <Header size="huge">
                  Capital Punishment in the United States{" "}
                </Header>
              </Grid.Column>
              <Grid.Column width={3}>
                <Button.Group>
                  <Button onClick={this.handleViewByOverallChange}>
                    Overall
                  </Button>
                  <Button.Or />
                  <Button positive onClick={this.handleViewByStateChange}>
                    By state
                  </Button>
                </Button.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {this.state.viewByState === true && (
            <Dropdown
              placeholder="Select state"
              fluid
              search
              selection
              options={STATEOPTIONS}
              onChange={this.handleStateChange}
            />
          )}

          <Tab onTabChange={this.handleTabChange} panes={this.state.panes} />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
