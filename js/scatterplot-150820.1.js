var terminator =
	[{ "movie_title": "The Terminator",
	"release_date": "1984",
	"tomato_score": "100" },
	{ "movie_title": "Terminator 2-Judgement day",
	"release_date": "1991",
	"tomato_score": "92"	},
	{ "movie_title": "Terminator 3-Rise of the Machines",
	"release_date": "2003",
	"tomato_score": "70"	},
	{ "movie_title": "Terminator Salvation",
	"release_date": "2009",
	"tomato_score": "33"	},
	{ "movie_title": "Terminator GenSys",
	"release_date": "2015",
	"tomato_score": "0"	}
	];

var back_to_the_future = 
	[{ "movie_title": "Back To The Future",
	"release_date": "1985",
	"tomato_score": "96"	},
	{ "movie_title": "Back To The Future, Part II",
	"release_date": "1989",
	"tomato_score": "64"	},
	{ "movie_title": "Back To The Future, Part III",
	"release_date": "1990",
	"tomato_score": "73"	}
	];

// set margins for chart area
var margin = {top: 20, right: 100, bottom: 20, left: 60},
	width = 600 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom,
	franchise_name = "";

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

// find the div#chart. this is where the all material for the scatterplot will got
var chart = d3.select('#chart')
	.append('svg:svg')
	.attr('class', 'chart')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom);

// draw the x axis
var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

// draw the y axis
var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

// define area where the actual scatterplot will be
var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')

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

// define the area where information about the franchise will go
var franchise_info = main.append("g")
	.attr("width", width)
	.attr("height", margin.bottom)
	.attr("transform", "translate(0, 400)")
	.attr("class", "franchise_info");

// create "g" element for all movie dots in a franchise
var movie_dots = main.append("g")
	.attr("class", "movie_dots");

// create the individual dots for each movie
movie_dots.selectAll("movie_dot")
	.data(franchise_name)
	.enter().append("svg:circle")
	.attr("class", "movie_dot")
	.attr("cx", function(d) {return x(d.release_date); } )
	.attr("cy", function(d) {return y(d.tomato_score); } )
	.attr("r",  function (d) {
		if (d.tomato_score > 2) { 
			return Math.sqrt(d.tomato_score) + 1
			} else {
				return 3
		}}) 
	.style("fill", function (d) {
		if(d.tomato_score < 10) { return "purple"} 
			else 
		{if(d.tomato_score > 69) { return "green" } 
			else { return "red"}
		}
	});

// create the "g" element for all movie titles
var movie_titles = main.append("g")
	.attr("class", "movie_titles");

// create the individual title text for each movie
movie_titles.selectAll(".movie_title")
	.data(franchise_name)
	.enter().append("text")
	.attr("class", "movie_title")
	.attr("x", function (d) {return x(d.release_date); })
	.attr("y", function (d) {return y(d.tomato_score); })
	.attr("text-anchor", function (d) {
		if(x(d.release_date) < (width / 2)) {return "left"}
			else {return "end"}
	})
	.attr("dy", function (d) {
		return -Math.sqrt(d.tomato_score)
	})
	.text(function (d) {return d.movie_title; });

// get value from dropdown menu
d3.selectAll(".buttons")
	.on("click", function() {
		var new_franchise = d3.select(this).property("value");
		console.log(new_franchise)
    update_plot(window[new_franchise])
	});

function update_plot(new_franchise) {
	var next_franchise = chart.selectAll(".movie_dot")
    .data(new_franchise)
    console.log(new_franchise)

    // add some new movies
    next_franchise.enter().append("circle")
    	.attr("class", "movie_dot")
    	.attr("cx", function (d) { return x(d.release_date)})
    	.attr("cy", function (d) { return y(d.tomato_score)})
		.attr("r",  function (d) {
			if (d.tomato_score > 2) { 
				return Math.sqrt(d.tomato_score) + 1
				} else {
					return 3
			}}) 
		.style("fill", function (d) {
			if(d.tomato_score < 10) { return "purple"} 
				else 
			{if(d.tomato_score > 69) { return "green" } 
				else { return "red"}
			}
	});

	// update existing dots
	next_franchise
    	.attr("cx", function (d) { return x(d.release_date)})
    	.attr("cy", function (d) { return y(d.tomato_score)})
		.attr("r",  function (d) {
			if (d.tomato_score > 2) { 
				return Math.sqrt(d.tomato_score) + 1
				} else {
					return 3
			}}) 
		.style("fill", function (d) {
			if(d.tomato_score < 10) { return "purple"} 
				else 
			{if(d.tomato_score > 69) { return "green" } 
				else { return "red"}
			}
	});

	//remove old, unused dots
	next_franchise
		.exit().remove();
};







