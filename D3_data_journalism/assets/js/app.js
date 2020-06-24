var margin = {top: 10, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
  .domain([8, 24])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// text label for the x axis
svg.append("text")
    .attr("transform",
          "translate(" + (width/2) + " ," +
                         (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .attr("font-weight", 700)
    .text("In Poverty (%)");

// Add Y axis
var y = d3.scaleLinear()
  .domain([4, 28])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// text label for the y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .attr("font-weight", 700)
    .text("Lacks Health Care (%)");

d3.csv("assets/data/data.csv").then(data => {

  // Add dots
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (data) { return x(data.poverty); } )
      .attr("cy", function (data) { return y(data.healthcare); } )
      .attr("r", 15)
      .attr("fill", "#74c4bf")

  // Add state labels
  svg.selectAll("div")
    .data(data)
    .enter()
    .append("text")
      .attr("x", function (data) { return x(data.poverty)-12; } )
      .attr("y", function (data) { return y(data.healthcare)+3; } )
      .attr("fill", "white")
      .attr("font-weight", 700)
      .text(data => data.abbr)

  })
