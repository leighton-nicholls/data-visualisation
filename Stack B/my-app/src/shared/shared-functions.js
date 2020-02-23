// This file contains functions that alot of different files across the application (mainly the generators) use
import moment from "moment";
import * as d3 from "d3v5";
import _ from "lodash";

export function generateYearsArray(maxYear, minYear) {
  const years = Array.from(
    { length: maxYear + 1 - minYear },
    (value, index) => minYear + index
  );

  return years;
}

export function generateYearsSelection(maxYear) {
  const years = Array.from(
    { length: maxYear - 1975 },
    (value, index) => 1976 + index
  );

  const yearsBuilder = years.map(year => ({
    key: year,
    value: year,
    text: year
  }));

  return {
    years: years,
    yearsDropdown: yearsBuilder
  };
}

export function getDayOfWeek(date) {
  var dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ][dayOfWeek];
}

export function tooltipLine(label, data) {
  return label + " x: " + data.x + " y: " + data.y;
}

export function tooltipBar(x, y0, y, total) {
  return x + " " + y.toString();
}

export function tooltipPie(x, y) {
  return x + ": " + y.toString();
}

export function retrieveFirstExecutionDate(executions) {
  const rawFirstExecutionDate = new Date(
    Math.min.apply(
      null,
      executions.map(e => {
        return new Date(e.execution_date);
      })
    )
  );

  const formattedFirstExecutionDate = moment(rawFirstExecutionDate).format(
    "DD/MM/YYYY"
  );

  return formattedFirstExecutionDate;
}

export function retrieveLatestExecutionDate(executions) {
  const rawLatestExecutionDate = new Date(
    Math.max.apply(
      null,
      executions.map(e => {
        return new Date(e.execution_date);
      })
    )
  );

  const formattedLatestExecutionDate = moment(rawLatestExecutionDate).format(
    "DD/MM/YYYY"
  );

  return formattedLatestExecutionDate;
}

export function findMostCommonYear(array) {
  const output = array.reduce(
    (a, b, i, arr) =>
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length
        ? a
        : b,
    null
  );

  return output;
}

export function sumMostCommonYear(array, target) {
  const output = array.reduce((n, x) => n + (x === target), 0);

  return output;
}

// calculates the average date between two dates, i.e. if the first date is the 10th of September 1995 and the last date is the 20th of September 1995
// the average date will be 15th of September 1995
export function calculateAverageDate(date1, date2) {
  var d1msecs = new Date(date1).getTime();
  var d2msecs = new Date(date2).getTime();
  var avgTime = (d1msecs + d2msecs) / 2;

  var result = new Date(avgTime);

  return result;
}

// calculates the difference between two dates in days
export function calculateDateDifference(date1, date2) {
  const difference = Math.abs(date2 - date1);
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

// can be used by saying
// 'const grouped = groupByMultiple(["property name", "property name" ...], array)'
// i.e.
// const grouped = groupByMultiple(["state", "execution_date"], executionsByYear);
export function groupByMultiple(groups, array) {
  var grouped = {};

  array.forEach(function(a) {
    groups
      .reduce(function(o, g, i) {
        // take existing object,
        o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}); // or generate new obj, or
        return o[a[g]]; // at last, then an array
      }, grouped)
      .push(a);
  });

  return grouped;
}

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// sorts an object by its property value and then returns the top ones (how many is according to the number you specify)
export function getTopObjectsByPropertyValue(array, number) {
  array.sort(function(a, b) {
    return b.value - a.value;
  });

  return array.slice(0, number);
}

// a rudimentary attempt to try and make the graphs responsive
export function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height")),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("perserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}

export function filterCrimesByState(crimes, state) {
  switch (state) {
    case "Federal":
    case "Military":
      return crimes.filter(crime => {
        return crime.state === "United States";
      });
    default:
      return crimes.filter(crime => {
        return crime.state === state;
      });
  }
}

// used for the table headers (where applicable) so their columns can be sorted
export function handleSort(clickedColumn, column, data, direction) {
  return function sort(state) {
    if (column !== clickedColumn) {
      return {
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      };
    }

    return {
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    };
  };
}
