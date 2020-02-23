createColourScheme = mapSelection => {
  const colorScheme = (function(mapSelection) {
    switch (mapSelection) {
      case "executions":
      case "runningExecutions":
      case "sentences":
      case "runningSentences":
      case "deathRow":
      case "innocence":
      case "runningInnocence":
        const scheme = d3.schemeReds[4]; // generates a series of red-ish colours
        !scheme.includes("#eee") && scheme.unshift("#eee"); // appends a distinct red color to the scheme to act as a baseline
        return scheme;

      case "runningDeathRow":
        const deathRowScheme = d3.schemeReds[6]; // generates a series of red-ish colours
        !deathRowScheme.includes("#eee") && deathRowScheme.unshift("#eee"); // appends a distinct red color to the scheme to act as a baseline
        return deathRowScheme;
      case "legalStatus":
        return ["#E71717", "#4c7091", "#800080"];
    }
  })(mapSelection);

  return colorScheme;
};

createColourScale = (mapSelection, colorScheme) => {
  // returns a color scale that has a certain range depending on what the map selection is
  colorScale = (function(mapSelection) {
    switch (mapSelection) {
      case "executions":
        return d3
          .scaleThreshold()
          .domain([1, 6, 11, 25])
          .range(colorScheme);
      case "runningExecutions":
        return d3
          .scaleThreshold()
          .domain([1, 6, 26, 100])
          .range(colorScheme);
      case "sentences":
        return d3
          .scaleThreshold()
          .domain([1, 6, 11, 25])
          .range(colorScheme);
      case "runningSentences":
        return d3
          .scaleThreshold()
          .domain([1, 61, 151, 500])
          .range(colorScheme);
      case "legalStatus":
        return d3
          .scaleThreshold()
          .domain([1, 2, 3])
          .range(colorScheme);
      case "deathRow":
        return d3
          .scaleThreshold()
          .domain([1, 61, 151, 500])
          .range(colorScheme);
      case "runningDeathRow":
        return d3
          .scaleThreshold()
          .domain([1, 100, 1000, 5000, 20000, 40000])
          .range(colorScheme);
      case "innocence":
        return d3
          .scaleThreshold()
          .domain([1, 3, 6, , 9])
          .range(colorScheme);
      case "runningInnocence":
        return d3
          .scaleThreshold()
          .domain([1, 6, 11, 21])
          .range(colorScheme);
    }
  })(mapSelection);

  return colorScale;
};

createColourLabels = mapSelection => {
  const labels = (function(mapSelection) {
    switch (mapSelection) {
      case "executions":
        return ["0", "1-5", "6-10", "11-24", "25+"];
      case "runningExecutions":
        return ["0", "1-5", "6-25", "26-99", "100+"];
      case "sentences":
        return ["0", "1-5", "6-10", "11-25", "26+"];
      case "runningSentences":
        return ["0", "1-60", "61-150", "151-499", "500+"];
      case "legalStatus":
        return ["Retentionist", "Abolished", "Moratorium"];
      case "deathRow":
        return ["0", "31-100", "101-300", "301-499", "500+"];
      case "runningDeathRow":
        return [
          "0",
          "31-99",
          "100-999",
          "1000-4999",
          "5000-19999",
          "20000-39999",
          "40000+"
        ];
      case "innocence":
        return ["0", "1-2", "3-5", "5-8", "9+"];
      case "runningInnocence":
        return ["0", "1-5", "6-10", "10-20", "20+"];
    }
  })(mapSelection);

  return labels;
};

createColourText = mapSelection => {
  const text = (function(mapSelection) {
    switch (mapSelection) {
      case "executions":
        return "Execution rates";
      case "runningExecutions":
        return "Running executions";
      case "sentences":
        return "Sentencing rates";
      case "runningSentences":
        return "Running sentences";
      case "legalStatus":
        return "Legal status";
      case "deathRow":
        return "Death row";
      case "runningDeathRow":
        return "Running death row";
      case "innocence":
        return "Innocence";
      case "runningInnocence":
        return "Running innocence";
    }
  })(mapSelection);

  return text;
};

createColours = () => {
  const mapSelection = $("#mapSelection").val();
  const colorScheme = createColourScheme(mapSelection);
  colorScale = createColourScale(mapSelection, colorScheme);
  const labels = createColourLabels(mapSelection);
  const text = createColourText(mapSelection);

  createColourLegend(text, labels, colorScale);
};

createColourLegend = (text, labels, colorScale) => {
  // appends the colour legend to the map
  var g = map
    .append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,40)");
  g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -20)
    .text(text);
  var legend = d3
    .legendColor()
    .labels(d => {
      return labels[d.i];
    })
    .shapePadding(10)
    .scale(colorScale);
  map.select(".legendThreshold").call(legend);
};
