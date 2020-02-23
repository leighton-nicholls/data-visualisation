import "../../../../src/styles/css/bar-charts.css";
import * as d3 from "d3v5";

export function generateDeathRowConvictsByStateBarChartData(inmates) {
  // groups by the state name and then finds the latest date for each given state
  const deathRowConvictTotalsByState = Object.entries(
    inmates.reduce((c, { state, date }) => {
      (c[state] = c[state] || []).push(date);
      return c;
    }, {})
  ).map(([state, date]) => ({
    state,
    date: new Date(Math.max(...date))
  }));

  deathRowConvictTotalsByState.forEach(obj => {
    inmates.forEach(inmate => {
      if (
        obj.state === inmate.state &&
        obj.date.getTime() === inmate.date.getTime()
      ) {
        obj.inmatesTotal = inmate.total;
      }
    });
  });

  const filteredDeathRowConvictTotalsByState = deathRowConvictTotalsByState.filter(
    obj => {
      return obj.inmatesTotal > 0;
    }
  );

  appendDeathRowConvictsByStateToBarChart(filteredDeathRowConvictTotalsByState);
}

const appendDeathRowConvictsByStateToBarChart = deathRowConvictTotalsByState => {
  // base code from https://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998
  //https://brendansudol.com/writing/responsive-d3
  d3.select("#deathRowConvictsByStateBarChartData").html("");
  var svg = d3.select("#deathRowConvictsByStateBarChartData"),
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

  deathRowConvictTotalsByState.sort(function(a, b) {
    return a.inmatesTotal - b.inmatesTotal;
  });

  x.domain([
    0,
    d3.max(deathRowConvictTotalsByState, function(d) {
      return d.inmatesTotal;
    })
  ]);
  y.domain(
    deathRowConvictTotalsByState.map(function(d) {
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
    .data(deathRowConvictTotalsByState)
    .enter()
    .append("rect")
    .attr("class", "horizontalBarChartDefault")
    .attr("x", 0)
    .attr("height", y.bandwidth())
    .attr("y", function(d) {
      return y(d.state);
    })
    .attr("width", function(d) {
      return x(d.inmatesTotal);
    })
    .on("mousemove", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(`${d.state} <br> ${d.inmatesTotal}`);
    })
    .on("mouseout", function(d) {
      tooltip.style("display", "none");
    });
  // });
};
