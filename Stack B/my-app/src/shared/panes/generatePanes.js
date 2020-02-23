import React from "react";
import ExecutionsOverall from "./overall/execution";
import ExecutionsByState from "./state/execution";
import SentencesByState from "./state/sentencing";
import SentencesOverall from "./overall/sentencing";
import CrimeByState from "./state/crime";
import CrimeOverall from "./overall/crime";
import DeathRowOverall from "./overall/death_row";
import DeathRowByState from "./state/death_row";
import InnocenceOverall from "./overall/innocence";
import InnocenceByState from "./state/innocence";
import Opinion from "./opinion";

import { Tab } from "semantic-ui-react";

// This function (and whole file) is used to determine which tab pane to render,
// based on what view they are looking at (overall or by state) and which pane they clicked on
// It then renders the individual components and passes props down to them as well so the child component can then use them as needed
export function generateTabPanes() {
  const panes = [
    {
      menuItem: "Executions",
      render: () => {
        if (this.state.viewByState === true) {
          return (
            <Tab.Pane>
              <ExecutionsByState
                monthsBreakdownPieChartData={
                  this.state.monthsBreakdownPieChartData
                }
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                executions={this.state.executions}
                mostExecutions={this.state.mostExecutions}
                weekdayTotals={this.state.weekdayTotals}
                weekdaysBreakdownPieChartData={
                  this.state.weekdaysBreakdownPieChartData
                }
                genderTotals={this.state.genderTotals}
                genderBreakdownPieChartData={
                  this.state.genderBreakdownPieChartData
                }
                raceTotals={this.state.raceTotals}
                racialBreakdownPieChartData={
                  this.state.racialBreakdownPieChartData
                }
                regionBreakdownPieChartData={
                  this.state.regionBreakdownPieChartData
                }
                executionMethodsBreakdownBarChartData={
                  this.state.executionMethodsBreakdownBarChartData
                }
                foreignNationalBreakdownPieChartData={
                  this.state.foreignNationalBreakdownPieChartData
                }
                victimTotals={this.state.victimTotals}
                victimBreakdownPieChartData={
                  this.state.victimBreakdownPieChartData
                }
                executionsOverTimeLineChartData={
                  this.state.executionsOverTimeLineChartData
                }
                firstExecutionDate={this.state.firstExecutionDate}
                latestExecutionDate={this.state.latestExecutionDate}
                firstExecutionSummary={this.state.firstExecutionSummary}
                latestExecutionSummary={this.state.latestExecutionSummary}
                executionsByMethodLineChartData={
                  this.state.executionsByMethodLineChartData
                }
                ageBreakdownPieChartData={this.state.ageBreakdownPieChartData}
                totalExecutions={this.state.totalExecutions}
                countiesSummary={this.state.countiesSummary}
                regionBreakdownLineChartData={
                  this.state.regionBreakdownLineChartData
                }
                executionsOverTimeByStateLineChartData={
                  this.state.executionsOverTimeByStateLineChartData
                }
                volunteerLineChartData={this.state.volunteerLineChartData}
                victimLineChartData={this.state.victimLineChartData}
                volunteerBreakdownPieChartData={
                  this.state.volunteerBreakdownPieChartData
                }
                racialLineChartData={this.state.racialLineChartData}
                numberOfStatesWithExecutionsByYearLineChartData={
                  this.state.numberOfStatesWithExecutionsByYearLineChartData
                }
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
              />
              }
            </Tab.Pane>
          );
        } else {
          return (
            <Tab.Pane>
              <ExecutionsOverall
                monthsBreakdownPieChartData={
                  this.state.monthsBreakdownPieChartData
                }
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                executions={this.state.executions}
                mostExecutions={this.state.mostExecutions}
                countiesBreakdownPieChartData={
                  this.state.countiesBreakdownPieChartData
                }
                weekdaysBreakdownPieChartData={
                  this.state.weekdaysBreakdownPieChartData
                }
                genderBreakdownPieChartData={
                  this.state.genderBreakdownPieChartData
                }
                racialBreakdownPieChartData={
                  this.state.racialBreakdownPieChartData
                }
                regionBreakdownPieChartData={
                  this.state.regionBreakdownPieChartData
                }
                executionMethodsBreakdownBarChartData={
                  this.state.executionMethodsBreakdownBarChartData
                }
                foreignNationalBreakdownPieChartData={
                  this.state.foreignNationalBreakdownPieChartData
                }
                victimBreakdownPieChartData={
                  this.state.victimBreakdownPieChartData
                }
                executionsOverTimeLineChartData={
                  this.state.executionsOverTimeLineChartData
                }
                firstExecutionDate={this.state.firstExecutionDate}
                latestExecutionDate={this.state.latestExecutionDate}
                firstExecutionSummary={this.state.firstExecutionSummary}
                latestExecutionSummary={this.state.latestExecutionSummary}
                executionsByMethodLineChartData={
                  this.state.executionsByMethodLineChartData
                }
                ageBreakdownPieChartData={this.state.ageBreakdownPieChartData}
                totalExecutions={this.state.totalExecutions}
                countiesSummary={this.state.countiesSummary}
                regionBreakdownLineChartData={
                  this.state.regionBreakdownLineChartData
                }
                executionsOverTimeByStateLineChartData={
                  this.state.executionsOverTimeByStateLineChartData
                }
                volunteerLineChartData={this.state.volunteerLineChartData}
                victimLineChartData={this.state.victimLineChartData}
                volunteerBreakdownPieChartData={
                  this.state.volunteerBreakdownPieChartData
                }
                racialLineChartData={this.state.racialLineChartData}
                numberOfStatesWithExecutionsByYearLineChartData={
                  this.state.numberOfStatesWithExecutionsByYearLineChartData
                }
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
              />
            </Tab.Pane>
          );
        }
      }
    },
    {
      menuItem: "Sentencing rates",
      render: () => {
        if (this.state.viewByState === true) {
          return (
            <Tab.Pane>
              <SentencesByState
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                sentencingOverallLineChartData={
                  this.state.sentencingOverallLineChartData
                }
                sentencingByStateLineChartData={
                  this.state.sentencingByStateLineChartData
                }
                executionToSentencingComparisonLineChartData={
                  this.state.executionToSentencingComparisonLineChartData
                }
                sentences={this.state.sentences}
                executions={this.state.executions}
                sentencingFacts={this.state.sentencingFacts}
                statesCarryingOutSentencesByYearOverallLineChartData={
                  this.state
                    .statesCarryingOutSentencesByYearOverallLineChartData
                }
              />
            </Tab.Pane>
          );
        } else {
          return (
            <Tab.Pane>
              <SentencesOverall
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                sentencingOverallLineChartData={
                  this.state.sentencingOverallLineChartData
                }
                sentencingByStateLineChartData={
                  this.state.sentencingByStateLineChartData
                }
                executionToSentencingComparisonLineChartData={
                  this.state.executionToSentencingComparisonLineChartData
                }
                sentences={this.state.sentences}
                executions={this.state.executions}
                sentencingFacts={this.state.sentencingFacts}
                statesCarryingOutSentencesByYearOverallLineChartData={
                  this.state
                    .statesCarryingOutSentencesByYearOverallLineChartData
                }
              />
            </Tab.Pane>
          );
        }
      }
    },
    {
      menuItem: "Crime rates",
      render: () => {
        if (this.state.viewByState === true) {
          return (
            <Tab.Pane>
              <CrimeByState
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                crimeLineChartData={this.state.crimeLineChartData}
                crimes={this.state.crimes}
              />
            </Tab.Pane>
          );
        } else {
          return (
            <Tab.Pane>
              <CrimeOverall
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                crimeLineChartData={this.state.crimeLineChartData}
                crimes={this.state.crimes}
              />
            </Tab.Pane>
          );
        }
      }
    },
    {
      menuItem: "Death row",
      render: () => {
        if (this.state.viewByState === true) {
          return (
            <Tab.Pane>
              <DeathRowByState
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                convictsDeathRowLineChartData={
                  this.state.convictsDeathRowLineChartData
                }
                convictsByStateDeathRowLineChartData={
                  this.state.convictsByStateDeathRowLineChartData
                }
                raceBreakdownDeathRowPieChartData={
                  this.state.raceBreakdownDeathRowPieChartData
                }
                unknownRaceDeathRowLineChartData={
                  this.state.unknownRaceDeathRowLineChartData
                }
                latinoARaceDeathRowLineChartData={
                  this.state.latinoARaceDeathRowLineChartData
                }
                nativeAmericanRaceDeathRowLineChartData={
                  this.state.nativeAmericanRaceDeathRowLineChartData
                }
                asianRaceDeathRowLineChartData={
                  this.state.asianRaceDeathRowLineChartData
                }
                blackRaceDeathRowLineChartData={
                  this.state.blackRaceDeathRowLineChartData
                }
                whiteRaceDeathRowLineChartData={
                  this.state.whiteRaceDeathRowLineChartData
                }
                inmates={this.state.inmates}
              />
            </Tab.Pane>
          );
        } else {
          return (
            <Tab.Pane>
              <DeathRowOverall
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                convictsDeathRowLineChartData={
                  this.state.convictsDeathRowLineChartData
                }
                convictsByStateDeathRowLineChartData={
                  this.state.convictsByStateDeathRowLineChartData
                }
                raceBreakdownDeathRowPieChartData={
                  this.state.raceBreakdownDeathRowPieChartData
                }
                unknownRaceDeathRowLineChartData={
                  this.state.unknownRaceDeathRowLineChartData
                }
                latinoARaceDeathRowLineChartData={
                  this.state.latinoARaceDeathRowLineChartData
                }
                nativeAmericanRaceDeathRowLineChartData={
                  this.state.nativeAmericanRaceDeathRowLineChartData
                }
                asianRaceDeathRowLineChartData={
                  this.state.asianRaceDeathRowLineChartData
                }
                blackRaceDeathRowLineChartData={
                  this.state.blackRaceDeathRowLineChartData
                }
                whiteRaceDeathRowLineChartData={
                  this.state.whiteRaceDeathRowLineChartData
                }
                inmates={this.state.inmates}
              />
            </Tab.Pane>
          );
        }
      }
    },
    {
      menuItem: "Innocence",
      render: () => {
        if (this.state.viewByState === true) {
          return (
            <Tab.Pane>
              <InnocenceByState
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                dnaBreakdownPieChartData={this.state.dnaBreakdownPieChartData}
                raceBreakdownInnocencePieChartData={
                  this.state.raceBreakdownInnocencePieChartData
                }
                exonerationBreakdownPieChartData={
                  this.state.exonerationBreakdownPieChartData
                }
                innocents={this.state.innocents}
                innocenceConvictionsOverallLineChartData={
                  this.state.innocenceConvictionsOverallLineChartData
                }
                innocenceConvictionsByStateLineChartData={
                  this.state.innocenceConvictionsByStateLineChartData
                }
                innocenceExonerationsOverallLineChartData={
                  this.state.innocenceExonerationsOverallLineChartData
                }
                innocenceExonerationsByStateLineChartData={
                  this.state.innocenceExonerationsByStateLineChartData
                }
                statesHavingInnocentsByYearOverallLineChartData={
                  this.state.statesHavingInnocentsByYearOverallLineChartData
                }
                innocenceFacts={this.state.innocenceFacts}
              />
              />
            </Tab.Pane>
          );
        } else {
          return (
            <Tab.Pane>
              <InnocenceOverall
                stateName={this.state.stateName}
                stateCode={this.state.stateCode}
                dropdownYear={this.state.dropdownYear}
                yearsDropdown={this.state.yearsDropdown}
                dnaBreakdownPieChartData={this.state.dnaBreakdownPieChartData}
                raceBreakdownInnocencePieChartData={
                  this.state.raceBreakdownInnocencePieChartData
                }
                exonerationBreakdownPieChartData={
                  this.state.exonerationBreakdownPieChartData
                }
                innocents={this.state.innocents}
                innocenceConvictionsOverallLineChartData={
                  this.state.innocenceConvictionsOverallLineChartData
                }
                innocenceConvictionsByStateLineChartData={
                  this.state.innocenceConvictionsByStateLineChartData
                }
                innocenceExonerationsOverallLineChartData={
                  this.state.innocenceExonerationsOverallLineChartData
                }
                innocenceExonerationsByStateLineChartData={
                  this.state.innocenceExonerationsByStateLineChartData
                }
                statesHavingInnocentsByYearOverallLineChartData={
                  this.state.statesHavingInnocentsByYearOverallLineChartData
                }
                innocenceFacts={this.state.innocenceFacts}
              />
            </Tab.Pane>
          );
        }
      }
    },
    {
      menuItem: "Opinion",
      render: () => (
        <Tab.Pane>
          <Opinion
            murderOpinionLineChartData={this.state.murderOpinionLineChartData}
            moralOpinionLineChartData={this.state.moralOpinionLineChartData}
            frequencyOpinionLineChartData={
              this.state.frequencyOpinionLineChartData
            }
            equitableOpinionLineChartData={
              this.state.equitableOpinionLineChartData
            }
            approachesOpinionLineChartData={
              this.state.approachesOpinionLineChartData
            }
          />
        </Tab.Pane>
      )
    }
  ];

  return {
    panes: panes
  };
}
