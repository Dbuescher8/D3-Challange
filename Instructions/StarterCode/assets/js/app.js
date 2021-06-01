function makeResponsive() {

  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

var svgWidth = 1100;
var svgHeight = 550;

var chartMargin = {
  top: 40,
  right: 40,
  bottom: 80,
  left:100
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  d3.csv("../assets/data/data.csv").then(function(stateData) {

    console.log(stateData);
    
  stateData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare =+data.healthcare;
  });
  var xLinearScale = d3.scaleLinear()
  .domain([d3.min(stateData, d => d.poverty)-1, d3.max(stateData, d => d.poverty)+1])
  .range([0,chartWidth]);

  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(stateData, d => d.healthcare)-2, d3.max(stateData, d => d.healthcare)+2])
  .range([chartHeight,0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  var circlesGroup= chartGroup.selectAll("circle").data(stateData).enter();
  circlesGroup.append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r","10")
  .attr("fill","lightblue")
  .attr("opacity",".75")
  .attr("stroke","black");

  