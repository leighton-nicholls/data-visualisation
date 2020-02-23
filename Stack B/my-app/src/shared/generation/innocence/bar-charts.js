//import "../../../../src/styles/css/bar-charts.css";
import * as d3 from "d3v5";

export function generateInnocenceExonerationsByStateBarChartData(innocents) {
  const states = innocents.map(innocent => {
    return innocent.state;
  });

  const totals = states.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const innocenceExonerationTotalsByState = Object.entries(totals).map(
    ([k, v]) => ({
      state: k,
      exonerations: v
    })
  );

  appendInnocenceExonerationsByStateToBarChart(
    innocenceExonerationTotalsByState
  );
}

const appendInnocenceExonerationsByStateToBarChart = innocenceExonerationTotalsByState => {
  // base code from https://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998
  //https://brendansudol.com/writing/responsive-d3

  d3.select("#innocenceExonerationsByStateBarChartData").html("");
  var svg = d3.select("#innocenceExonerationsByStateBarChartData"),
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

  innocenceExonerationTotalsByState.sort(function(a, b) {
    return a.exonerations - b.exonerations;
  });

  x.domain([
    0,
    d3.max(innocenceExonerationTotalsByState, function(d) {
      return d.exonerations;
    })
  ]);
  y.domain(
    innocenceExonerationTotalsByState.map(function(d) {
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
    .data(innocenceExonerationTotalsByState)
    .enter()
    .append("rect")
    .attr("class", "horizontalBarChartDefault")
    .attr("x", 0)
    .attr("height", y.bandwidth())
    .attr("y", function(d) {
      return y(d.state);
    })
    .attr("width", function(d) {
      return x(d.exonerations);
    })
    .on("mousemove", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(`${d.state} <br> ${d.exonerations}`);
    })
    .on("mouseout", function(d) {
      tooltip.style("display", "none");
    });
  // });
};

export function generateReasonBreakdownsByStateBarChartData(innocents) {
  const reasons = [];
  innocents.forEach(innocent => {
    innocent.reasons.forEach(reason => {
      reasons.push(reason);
    });
  });

  const totals = reasons.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const reasonTotals = Object.entries(totals).map(([k, v]) => ({
    reason: k,
    value: v
  }));

  appendReasonsBreakdownByStateToBarChart(reasonTotals);
}

const appendReasonsBreakdownByStateToBarChart = reasonBreakdownTotals => {
  // base code from https://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998
  //https://brendansudol.com/writing/responsive-d3

  d3.select("#reasonsBreakdownByStateBarChartData").html("");
  var svg = d3.select("#reasonsBreakdownByStateBarChartData"),
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

  reasonBreakdownTotals.sort(function(a, b) {
    return a.value - b.value;
  });

  x.domain([
    0,
    d3.max(reasonBreakdownTotals, function(d) {
      return d.value;
    })
  ]);
  y.domain(
    reasonBreakdownTotals.map(function(d) {
      return d.reason;
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
    .data(reasonBreakdownTotals)
    .enter()
    .append("rect")
    .attr("class", "horizontalBarChartDefault")
    .attr("x", 0)
    .attr("height", y.bandwidth())
    .attr("y", function(d) {
      return y(d.reason);
    })
    .attr("width", function(d) {
      return x(d.value);
    })
    .on("mousemove", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(`${d.reason} <br> ${d.value}`);
    })
    .on("mouseout", function(d) {
      tooltip.style("display", "none");
    });
  // });
};
