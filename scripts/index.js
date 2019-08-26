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
		.range(['white', '#69b37d'])
		.domain([0, 3]);

	d3.json(url).then(function (data) {
		console.log(data);
		// yAxis
		var yScale = d3.scaleBand()
			.rangeRound([height, 0])
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
			.rangeRound([0, width])
			.domain(data.monthlyVariance.map(val => val.year));

		var xAxis = d3.axisBottom(xScale)
			.tickValues(xScale.domain().filter(year => year % 10 === 0));

		svg.append('g')
			.attr('class', 'x-axis')
			.attr('id', 'x-axis')
			.call(xAxis)
			.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')');

		svg.append('g')
			.classed('map', true)
			.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
			.selectAll('rect')
			.data(data.monthlyVariance)
			.enter().append('rect')
			.attr('class', 'cell')
			.attr('data-month', element => element.month)
			.attr('data-year', element => element.year)
			.attr('data-temp', element => data.baseTemperature + element.variance)
			.attr('x', (element, i) => xScale(element.year))
			.attr('y', (element, i) => yScale(element.month))
			.attr('width', xScale.bandwidth())
			.attr('height', yScale.bandwidth)
			.style('fill', (element, i)=> colors(data.baseTemperature + element.variance))
			// .attr({
			// 	x: (element, i) => xScale(element.year),
			// 	y: (element, i) => yScale(element.month),
			// 	width: (element, i) => xScale.range(element.year),
			// 	height: (element, i) => yScale.range(element.month)
			// });
	});
});