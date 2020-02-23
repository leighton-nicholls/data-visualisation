//import FIPS from '../constants/constants';

var colorScheme = [];
var colorScale = undefined;
var stateShapes = undefined;

var dataByFIPS = {};
var stateByFIPS = {};

//Creates tooltip and makes it invisiblae
var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//Sets dimensions
var margin = { top: 10, left: 10, bottom: 10, right: 10 },
  width = window.outerWidth,
  width = width - margin.left - margin.right,
  mapRatio = 0.5,
  height = width * mapRatio;

//Tells the map what projection to use
var projection = d3
  .geoAlbersUsa()
  .scale(width)
  .translate([width / 2, height / 2]);

//Tells the map how to draw the paths from the projection
var path = d3.geoPath().projection(projection);

//Appened svg to page
var map = d3
  .select(".g-chart")
  .append("svg")
  .style("height", height + "px")
  .style("width", width + "px");

//Load the files

d3.queue()
  .defer(d3.json, "/static/scripts/us.json")
  .defer(d3.csv, "/static/scripts/maptemplate.csv")
  .await(ready);

//Moves selection to front
d3.selection.prototype.moveToFront = function() {
  return this.each(function() {
    this.parentNode.appendChild(this);
  });
};

//Moves selection to back
d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
    var firstChild = this.parentNode.firstChild;
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};

// when map is ready
function ready(error, us, maptemplate) {
  if (error) throw error;

  const states = topojson.feature(us, us.objects.states).features;

  // Legend

  // generates starting inputs
  this.generateLevelSelections();
  this.generateMapSelections();
  this.createSelectEventListener();
  this.generateCheckbox();

  this.createColours();
  this.createSlider();

  //Pair data with state id
  maptemplate.forEach(function(d) {
    dataByFIPS[d.FIPS] = +d.num;
  });

  //Pair state name with state id
  maptemplate.forEach(function(d) {
    stateByFIPS[d.FIPS] = d.state;
  });

  //Appends chart headline
  d3.select(".g-hed").text("");

  //Appends chart intro text
  d3.select(".g-intro").text("");

  // colors in the map
  stateShapes = map
    .append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(states)
    .enter()
    .append("path")
    .attr("class", "state")
    .attr("d", path)
    //Color states
    .attr("fill", function(d) {
      return colorScale(dataByFIPS[d.id]);
    });

  const mapSelection = $("#mapSelection").val();
  const levelSelection = $("input[type=radio]:checked").val();

  //Hovers
  stateShapes.on("mouseover", function(d) {
    var sel = d3.select(this);
    sel.moveToFront();
    d3.select(this)
      .transition()
      .duration(300)
      .style("opacity", 0.8);
    div
      .transition()
      .duration(300)
      .style("opacity", 1);
    div
      .text(stateByFIPS[d.id] + ": " + dataByFIPS[d.id])
      .style("left", d3.event.pageX - 30 + "px")
      .style("top", d3.event.pageY - 30 + "px");
  });
  stateShapes.on("mouseout", function() {
    var sel = d3.select(this);
    sel.moveToBack();
    d3.select(this)
      .transition()
      .duration(300)
      .style("opacity", 1);
    div
      .transition()
      .duration(300)
      .style("opacity", 0);
  });

  //Appends chart source
  /*d3.select(".g-source-bold")
        .text("SOURCE: ")
        .attr("class", "g-source-bold");

    d3.select(".g-source-reg")
        .text("Chart source info goes here")
        .attr("class", "g-source-reg");*/

  //RESPONSIVENESS
  d3.select(window).on("resize", resize);

  function resize() {
    var w = d3.select(".g-chart").node().clientWidth;
    console.log("resized", w);

    // adjust things when the window size changes
    width = w - margin.left - margin.right;
    height = width * mapRatio;

    console.log(width);
    // update projection
    var newProjection = d3
      .geoAlbersUsa()
      .scale(width)
      .translate([width / 2, height / 2]);

    //Update path
    path = d3.geoPath().projection(newProjection);

    // resize the map container
    map.style("width", width + "px").style("height", height + "px");

    // resize the map
    map.selectAll("path").attr("d", path);
  }
}
