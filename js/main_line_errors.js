alert("hi!!");
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    rad = 5;

var ticks = [0.5,1.5,2.5,3.5];
var tickLabels= ["FR1","FR2","FR3","FR4"]
var data1 = randomPoints1(4);
var data2 = randomPoints2(4);
var data3 = randomPoints3(4);

console.log(data1);

var xScale = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(data3, function(d) {
        return d.x;
    })]).nice();

// Account for error bars extending beyond y limits
let yMax =  2;
let yMin = -2;

var yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([yMin, yMax]).nice();

var xAxis = d3.axisBottom(xScale).tickValues(ticks).tickFormat(function(d,i){ return tickLabels[i] });
    yAxis = d3.axisLeft(yScale).ticks(12 * height / width);

var line = d3.line()
    .x(function(d) {
        return xScale(d.x);
    })
    .y(function(d) {
        return yScale(d.y);
    });


var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("visibility", "hidden");

var svg = d3.select("#plot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Tittle of the graph
svg.append("text")
    .attr("x", width / 2 )
    .attr("y", 0)
    .style("text-anchor", "middle")
    .text("Negr1");

// Text label for the Y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Z-Score (Relative MS-intentsity (log2))");

// Add background for plot
svg.call(d3_bg);

// Add Axis labels
svg.call(d3_axes);

// Add Middle Line

svg.call(d3_ver_line);

// Add plot elements
svg.call(d3_line1,"#1E90FF");
svg.call(d3_line2,"#9400D3");
svg.call(d3_line3,"#FFFF00");

svg.append("g")
    .attr("id", "points")
    .selectAll('g')
    .data(data1).enter()
    .append('g')
    .attr('class', function(d,i) {
        return 'point-' + i
    })
    .call(d3_error, rad)
    .call(d3_circle, rad, "#1E90FF")
    .on("mouseover", function(d){ ttEnter(d); })
    .on("mouseout", function(d){ ttExit(d); });

svg.append("g")
    .attr("id", "points")
    .selectAll('g')
    .data(data2).enter()
    .append('g')
    .attr('class', function(d,i) {
        return 'point-' + i
    })
    .call(d3_error, rad)
    .call(d3_circle, rad, "#9400D3")
    .on("mouseover", function(d){ ttEnter(d); })
    .on("mouseout", function(d){ ttExit(d); });

svg.append("g")
    .attr("id", "points")
    .selectAll('g')
    .data(data3).enter()
    .append('g')
    .attr('class', function(d,i) {
        return 'point-' + i
    })
    .call(d3_error, rad)
    .call(d3_circle, rad, "#FFFF00")
    .on("mouseover", function(d){ ttEnter(d); })
    .on("mouseout", function(d){ ttExit(d); });