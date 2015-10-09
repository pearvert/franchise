var data =
	[{ "movieTitle": "The Terminator",
	"releaseDate": "1984",
	"tomatoScore": "100" },
	{ "movieTitle": "Terminator 2-Judgement day",
	"releaseDate": "1991",
	"tomatoScore": "92"	},
	{ "movieTitle": "Terminator 3-Rise of the Machines",
	"releaseDate": "2003",
	"tomatoScore": "70"	},
	{ "movieTitle": "Terminator Salvation",
	"releaseDate": "2009",
	"tomatoScore": "33"	},
	{ "movieTitle": "Terminator GenSys",
	"releaseDate": "2015",
	"tomatoScore": "0"	}
	];

var bttf = 
	[{ "movieTitle": "Back To The Future",
	"releaseDate": "1985",
	"tomatoScore": "96"	},
	{ "movieTitle": "Back To The Future, Part II",
	"releaseDate": "1989",
	"tomatoScore": "64"	},
	{ "movieTitle": "Back To The Future, Part III",
	"releaseDate": "1990",
	"tomatoScore": "73"	}
	];

// set margins for chart area
var margin = {top: 20, right: 100, bottom: 20, left: 60},
	width = 600 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

// create style for x axis in year format
var yearFormat = d3.time.format("%Y");

// set up x and y scaling
var x = d3.scale.linear()
	.domain([d3.min(data, function (d) {
		return d.releaseDate - 1}), d3.max(data, function (d) {
			return d.releaseDate }) ])
	.range([ 0, width ]);

var y = d3.scale.linear()
	.domain([0, 100 ])
	.range([ height, 0 ]);

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

// draw the x axis
var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

// append a "g" element for the x axis
main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

// draw the y axis
var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

// append a "g" element for the y axis
main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'axis')
	.call(yAxis);

// define the area where information about the franchise will go
var franchiseInfo = main.append("g")
	.attr("width", width)
	.attr("height", margin.bottom)
	.attr("transform", "translate(0, 400)")
	.attr("class", "franchiseInfo");

// create "g" element for all movie dots in a franchise
var movie_dots = main.append("g")
	.attr("class", "movie_dots");

// create the individual dots for each movie
movie_dots.selectAll("movie_dot")
	.data(data)
	.enter().append("svg:circle")
	.attr("class", "movie_dot")
	.attr("cx", function(d) {return x(d.releaseDate); } )
	.attr("cy", function(d) {return y(d.tomatoScore); } )
	.attr("r",  function (d) {
		if (d.tomatoScore > 2) { 
			return Math.sqrt(d.tomatoScore) + 1
			} else {
				return 3
		}}) 
	.style("fill", function (d) {
		if(d.tomatoScore < 10) { return "purple"} 
			else 
		{if(d.tomatoScore > 69) { return "green" } 
			else { return "red"}
		}
	});

// create the "g" element for all movie titles
var movie_titles = main.append("g")
	.attr("class", "movie_titles");

// create the individual title text for each movie
movie_titles.selectAll(".movie_title")
	.data(data)
	.enter().append("text")
	.attr("class", "movie_title")
	.attr("x", function (d) {return x(d.releaseDate); })
	.attr("y", function (d) {return y(d.tomatoScore); })
	.attr("text-anchor", function (d) {
		if(x(d.releaseDate) < (width / 2)) {return "left"}
			else {return "end"}
	})
	.attr("dy", function (d) {
		return -Math.sqrt(d.tomatoScore)
	})
	.text(function (d) {return d.movieTitle; });





