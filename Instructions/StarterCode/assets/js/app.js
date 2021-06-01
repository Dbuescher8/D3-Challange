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