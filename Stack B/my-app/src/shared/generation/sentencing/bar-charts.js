import "../../../../src/styles/css/bar-charts.css";
import * as d3 from "d3v5";

export function generateSentencingTotalsByStateBarChartData(
  sentences,
  executions
) {
  const sentencingTotalsByState = sentences.map(sentence => {
    let total = sentence.years.reduce((a, b) => +a + +b.sentence, 0);
    return { state: sentence.state, value: total };
  });

  const states = executions.map(execution => {
    return execution.state;
  });

  const executionsTotalsByStateObject = states.reduce((total, value) => {
    total[value] = (total[value] || 0) + 1;
    return total;
  }, {});

  const executionsTotalsByState = Object.keys(
    executionsTotalsByStateObject
  ).map(key => ({ state: key, value: executionsTotalsByStateObject[key] }));

  appendSentencingTotalsByStateBarChart(
    sentencingTotalsByState,
    executionsTotalsByState
  );
}

const appendSentencingTotalsByStateBarChart = (
  sentencesTotalsByState,
  executionsTotalsByState
) => {
  d3.select("#sentencingTotalsByStateBarChart").html("");
  var svg = d3.select("#sentencingTotalsByStateBarChart"),
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

  sentencesTotalsByState.sort(function(a, b) {
    return a.value - b.value;
  });

  executionsTotalsByState.sort(function(a, b) {
    return a.value - b.value;
  });

  x.domain([
    0,
    d3.max(sentencesTotalsByState, function(d) {
      return d.value;
    })
  ]);
  y.domain(
    sentencesTotalsByState.map(function(d) {
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

  // I append two labels here to show the comparison between sentencing and actual executions
  g.selectAll(".horizontalSentencingBarSentences")
    .data(sentencesTotalsByState)
    .enter()
    .append("rect")
    .attr("class", "horizontalSentencingBarSentences")
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
        .html(d.state + "<br>" + d.value + " sentences");
    })
    .on("mouseout", function(d) {
      tooltip.style("display", "none");
    });

  g.selectAll(".horizontalSentencingBarExecutions")
    .data(executionsTotalsByState)
    .enter()
    .append("rect")
    .attr("class", "horizontalSentencingBarExecutions")
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
