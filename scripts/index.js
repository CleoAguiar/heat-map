$(document).ready(function () {
	var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
	var margin = { top: 100, botton: 30, left: 60, rigth: 20 },
		width = 920 - margin.left - margin.rigth,
		height = 600 - margin.top - margin.botton;

	var section = d3.select('.container')
		.append('section');

	// Title
	var heading = section.append('heading');
	heading.append('h1')
		.attr('id', 'title')
		.text('Monthly Global Land-Surface Temperature');

	heading.append('h3')
		.attr('id', 'description')
		.html('Description');

	var svg = section.append('svg')
		.attr('width', width + margin.left + margin.rigth)
		.attr('height', height + margin.top + margin.botton)
		.append('g');

	var colors = d3.scaleLinear()
		.range(['white', '#69b37d']);

	d3.json(url).then(function (data) {
		console.log(data);
		// yAxis
		var yScale = d3.scaleBand()
			.range([height, 0])
			.domain([...Array(12).keys()]);

		var yAxis = d3.axisLeft(yScale)
			.tickValues(yScale.domain())
			.tickFormat(function (month) {
				var date = new Date(0);
				date.setUTCMonth(month);
				return d3.utcFormat('%B')(date);
			});

		svg.append('g')
			.attr('class', 'y-axis')
			.attr('id', 'y-axis')
			.call(yAxis)
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// xAxis
		var xScale = d3.scaleBand()
			.range([0, width])
			.domain(data.monthlyVariance.map(val => val.year));

		var xAxis = d3.axisBottom(xScale)
			.tickValues(xScale.domain().filter(year => year % 10 === 0));

		svg.append('g')
			.attr('class', 'x-axis')
			.attr('id', 'x-axis')
			.call(xAxis)
			.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')');
	});
});