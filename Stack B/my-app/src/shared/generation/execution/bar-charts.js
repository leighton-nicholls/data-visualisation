import { getTopObjectsByPropertyValue } from "../../shared-functions";
import "../../../../src/styles/css/bar-charts.css";
import * as d3 from "d3v5";

import {
  groupByMultiple,
  calculateDateDifference
} from "../../shared-functions";

import moment from "moment";
import { exec } from "child_process";

export function generateVictimBarChart(executions) {
  const victims = executions.map(execution => {
    return {
      number_of_white_male_victims: execution.number_of_white_male_victims,
      number_of_black_male_victims: execution.number_of_black_male_victims,
      number_of_latino_male_victims: execution.number_of_latino_male_victims,
      number_of_asian_male_victims: execution.number_of_asian_male_victims,
      number_of_native_american_male_victims:
        execution.number_of_native_american_male_victims,
      number_of_other_race_male_victims:
        execution.number_of_other_race_male_victims,
      number_of_white_female_victims: execution.number_of_white_female_victims,
      number_of_black_female_victims: execution.number_of_black_female_victims,
      number_of_latino_female_victims:
        execution.number_of_latino_female_victims,
      number_of_asian_female_victims: execution.number_of_asian_female_victims,
      number_of_native_american_female_victims:
        execution.number_of_native_american_female_victims,
      number_of_other_race_female_victims:
        execution.number_of_other_race_female_victims
    };
  });
  const values = victims.reduce(
    (a, c) => (Object.keys(c).forEach(k => (a[k] = (a[k] || 0) + c[k])), a),
    {}
  );

  const finalValues = Object.entries(values).map(([k, v]) => ({
    x: k,
    y: v
  }));

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  pieChartData.values = finalValues;

  return {
    victimBreakdownPieChartData: pieChartData
  };
}

export function generateExecutionMethodsBarChart(executions) {
  const execution_methods = executions.map(execution => {
    return execution.execution_method.toLowerCase();
  });

  const barChartData = {
    label: "somethingB",
    values: []
  };

  const executionMethodTotals = execution_methods.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const values = Object.entries(executionMethodTotals).map(([k, v]) => ({
    x: k,
    y: v
  }));

  barChartData.values = values;

  return {
    executionMethodsBreakdownBarChartData: barChartData
  };
}

export function generateAgeBreakdownBarChart(executions) {
  const execution_methods = executions.map(execution => {
    return execution.age_at_execution.toLowerCase();
  });

  const barChartData = {
    label: "somethingB",
    values: []
  };

  const executionMethodTotals = execution_methods.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const values = Object.entries(executionMethodTotals).map(([k, v]) => ({
    x: k,
    y: v
  }));

  barChartData.values = values;

  return {
    ageBreakdownBreakdownBarChartData: barChartData
  };
}

export function generateExecutionTotalsByStateBarChartData(executions) {
  const states = executions.map(execution => {
    return execution.state;
  });

  const totals = states.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const executionTotalsByState = Object.entries(totals).map(([k, v]) => ({
    state: k,
    value: v
  }));

  appendExecutionTotalsByStateBarChart(executionTotalsByState);
}

const appendExecutionTotalsByStateBarChart = executionTotalsByState => {
  // base code from https://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998

  d3.select("#executionTotalsByStateBarChart").html("");
  var svg = d3.select("#executionTotalsByStateBarChart"),
    margin = { top: 20, right: 40, bottom: 30, left: 80 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip");

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleBand().range([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  executionTotalsByState.sort(function(a, b) {
    return a.value - b.value;
  });

  x.domain([
    0,
    d3.max(executionTotalsByState, function(d) {
      return d.value;
    })
  ]);
  y.domain(
    executionTotalsByState.map(function(d) {
      return d.state;
    })
  ).padding(0.1);

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat(function(d) {
          return parseInt(d);
        })
        .tickSizeInner([-height])
    );

  g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

  g.selectAll(".horizontalBarChartDefault")
    .data(executionTotalsByState)
    .enter()
    .append("rect")
    .attr("class", "horizontalBarChartDefault")
    .attr("x", 0)
    .attr("height", y.bandwidth())
    .attr("y", function(d) {
      return y(d.state);
    })
    .attr("width", function(d) {
      return x(d.value);
    })
    .on("mousemove", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(d.state + "<br>" + d.value + " executions");
    })
    .on("mouseout", function(d) {
      tooltip.style("display", "none");
    });
};

export function generateCountyTotalsBarChartData(executions) {
  const counties = executions.map(execution => {
    return execution.county;
  });

  const totals = counties.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const countyTotals = Object.entries(totals).map(([k, v]) => ({
    county: k,
    value: v
  }));

  // only returns the top 10 counties by value (otherwise there'd simply be too many to display on the bar chart)
  const worthyTotals = getTopObjectsByPropertyValue(countyTotals, 10);

  appendCountyTotalsToBarChart(worthyTotals);
}

const appendCountyTotalsToBarChart = countyTotals => {
  // base code from https://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998
  //https://brendansudol.com/writing/responsive-d3
  //d3.select("svg").call(responsivefy);

  d3.select("#countiesBarChart").html("");
  var svg = d3.select("#countiesBarChart"),
    margin = { top: 20, right: 60, bottom: 30, left: 80 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip");

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleBand().range([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  countyTotals.sort(function(a, b) {
    return a.value - b.value;
  });

  x.domain([
    0,
    d3.max(countyTotals, function(d) {
      return d.value;
    })
  ]);
  y.domain(
    countyTotals.map(function(d) {
      return d.county;
    })
  ).padding(0.1);

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat(function(d) {
          return parseInt(d);
        })
        .tickSizeInner([-height])
    );

  g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

  g.selectAll(".horizontalBarChartDefault")
    .data(countyTotals)
    .enter()
    .append("rect")
    .attr("class", "horizontalBarChartDefault")
    .attr("x", 0)
    .attr("height", y.bandwidth())
    .attr("y", function(d) {
      return y(d.county);
    })
    .attr("width", function(d) {
      return x(d.value);
    })
    .on("mousemove", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(d.county + "<br>" + d.value + " executions");
    })
    .on("mouseout", function(d) {
      tooltip.style("display", "none");
    });
  // });
};

export function generateLatestExecutionsByStateBarChartData(executions) {
  const executionDates = executions.map(execution => {
    return {
      date: execution.execution_date,
      state: execution.state
    };
  });

  const grouped = groupByMultiple(["state"], executionDates);

  const rawStates = [
    ...new Set(
      executions.map(execution => {
        return execution.state;
      })
    )
  ];

  const statesWithDate = rawStates.map(state => {
    return { state: state, latestExecutionDate: new Date() };
  });

  Object.keys(grouped).forEach((key, index) => {
    let values = Object.values(grouped[key]);
    const maxExecutionDate = new Date(
      Math.max.apply(
        null,
        values.map(value => {
          return new Date(value.date);
        })
      )
    );

    let objIndex = statesWithDate.findIndex(state => state.state === key);
    statesWithDate[objIndex].latestExecutionDate = maxExecutionDate;
    statesWithDate[objIndex].daysDifference = calculateDateDifference(
      new Date(),
      maxExecutionDate
    );
  });

  appendLatestExecutionsByStateToBarChart(statesWithDate);
}

const appendLatestExecutionsByStateToBarChart = statesWithDate => {
  // base code from https://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998
  //https://brendansudol.com/writing/responsive-d3

  d3.select("#latestExecutionsByStateBarChart").html("");
  var svg = d3.select("#latestExecutionsByStateBarChart"),
    margin = { top: 20, right: 60, bottom: 30, left: 80 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip");

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleBand().range([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  statesWithDate.sort(function(a, b) {
    return a.daysDifference - b.daysDifference;
  });

  x.domain([
    0,
    d3.max(statesWithDate, function(d) {
      return d.daysDifference;
    })
  ]);
  y.domain(
    statesWithDate.map(function(d) {
      return d.state;
    })
  ).padding(0.1);

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat(function(d) {
          return parseInt(d);
        })
        .tickSizeInner([-height])
    );

  g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

  g.selectAll(".horizontalBarChartDefault")
    .data(statesWithDate)
    .enter()
    .append("rect")
    .attr("class", "horizontalBarChartDefault")
    .attr("x", 0)
    .attr("height", y.bandwidth())
    .attr("y", function(d) {
      return y(d.state);
    })
    .attr("width", function(d) {
      return x(d.daysDifference);
    })
    .on("mousemove", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(
          `${d.state} <br> Latest Execution Date: ${moment(
            d.latestExecutionDate
          ).format("DD/MM/YYYY")}. Difference: ${d.daysDifference} days.`
        );
    })
    .on("mouseout", function(d) {
      tooltip.style("display", "none");
    });
  // });
};
