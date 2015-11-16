var franchises = {
"back_to_the_future": [
	{"year": "1985", 
	"title": "Back to the Future", 		 
	"imdb": 85, 
	"tomato_critic": 96, 
	"tomato_audience": 94}, 
{	"year": "1990",
	"title": "Back to the Future Part III", 
	"imdb": 74, 
	"tomato_critic": 73, 
	"tomato_audience": 78},
{	"year": "1989", 
	"title": "Back to the Future Part II",  
	"imdb": 78, 
	"tomato_critic": 64,
	"tomato_audience": 85}
], 
"terminator": [
{	"year": "1984",	
	"title": "The Terminator",
	"imdb": 81, 
	"tomato_critic": 100,	
	"tomato_audience": 88}, 
{	"year": "1991",		
	"title": "Terminator 2: Judgment Day",			
	"imdb":	85, 
	"tomato_critic": 93,	
	"tomato_audience": 94}, 
{	"year": "2003",	
	"title": "Terminator 3 - Rise of the Machines",	
	"imdb": 64, 
	"tomato_critic": 70,	
	"tomato_audience": 47}, 
{	"year": "2009",		
	"title": "Terminator Salvation",				
	"imdb": 67,	
	"tomato_critic": 33,	
	"tomato_audience": 54}, 
{	"year": "2015",		
	"title": "Terminator Genisys",					
	"imdb": 67,	
	"tomato_critic": 25,	
	"tomato_audience": 59}
]};


// set margins for chart area
var margin = {top: 20, right: 100, bottom: 20, left: 60},
	width = 600 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

// create style for x axis in year format
var yearFormat = d3.time.format("%Y");

// set up x and y scaling
var x = d3.scale.linear()
	.domain([d3.min(franchise_name, function (d) {
		return d.release_date - 1}), d3.max(franchise_name, function (d) {
			return d.release_date }) ])
	.range([0, width ]);

var y = d3.scale.linear()
	.domain([0, 100 ])
	.range([ height, 0 ]);

// draw the x axis
var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

// draw the y axis
var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

// find the div#chart. this is where the all material for the scatterplot will got
var chart = d3.select('#chart')
	.append('svg:svg')
	.attr('class', 'chart')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom);

// define area where the actual scatterplot will be
var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')

// define the area where information about the franchise will go
var franchise_info = main.append("g")
	.attr("width", width)
	.attr("height", margin.bottom)
	.attr("transform", "translate(0, 400)")
	.attr("class", "franchise_info");

// create "g" element for all movie dots in a franchise
var movie_dots = main.append("g")
	.attr("class", "movie_dots");

// create the "g" element for all movie titles
var movie_titles = main.append("g")
	.attr("class", "movie_titles");

// append a "g" element for the x axis
main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

// append a "g" element for the y axis
main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'axis')
	.call(yAxis);

// 
d3.select("#franchise_selector")
	.selectAll("option")
	.data(franchises, function (d) { console.log(d)})
	.enter()
	.append("option")
	.text( function (d) {
		console.log(d)
	})

d3.select("#franchise_selector")
	.on("change", function(event){
		Object.keys(event.target.options)
	    .filter(function(key){
	    	return event.target.options[key].selected
	    });
		.map(function(key){
			return event.target.options[key].value
		});
	});






