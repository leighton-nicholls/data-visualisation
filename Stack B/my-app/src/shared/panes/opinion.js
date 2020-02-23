import React from "react";
import { Grid, Icon } from "semantic-ui-react";

import { tooltipLine, tooltipBar, tooltipPie } from "../shared-functions";

var BarChart = require("react-d3-components").BarChart;
const LineChart = require("react-d3-components").LineChart;
var PieChart = require("react-d3-components").PieChart;

class Opinion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Icon name="question circle" size="large" />
              <span>
                Are you in favor of the death penalty for a person convicted of
                murder?
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <LineChart
                data={this.props.murderOpinionLineChartData}
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
              <Icon name="question circle" size="large" />
              <span>
                Next, I'm going to read you a list of issues. Regardless of
                whether or not you think it should be legal, for each one,
                please tell me whether you personally believe that in general it
                is morally acceptable or morally wrong. How about the death
                penalty?
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <LineChart
                data={this.props.moralOpinionLineChartData}
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
              <Icon name="question circle" size="large" />
              <span>
                In your opinion, is the death penalty imposed -- [ROTATED: too
                often, about the right amount or not often enough]?
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <LineChart
                data={this.props.frequencyOpinionLineChartData}
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
              <Icon name="question circle" size="large" />
              <span>
                Generally speaking, do you believe the death penalty is applied
                fairly or unfairly in this country today?
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <LineChart
                data={this.props.equitableOpinionLineChartData}
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
              <Icon name="question circle" size="large" />
              <span>
                If you could choose between the following two approaches, which
                do you think is the better penalty for murder -- [ROTATED: the
                death penalty (or) life imprisonment, with absolutely no
                possibility of parole]?
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <LineChart
                data={this.props.approachesOpinionLineChartData}
                tooltipHtml={tooltipLine}
                tooltipContained
                width={1000}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Opinion;
