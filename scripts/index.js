$(document).ready(function () {
	var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
	var padding = { top: 100, botton: 30, left: 60, rigth: 20 },
		width = 920 - padding.left - padding.rigth,
		height = 600 - padding.top - padding.botton;

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
		.attr('width', width + padding.left + padding.rigth)
		.attr('height', height + padding.top + padding.botton)
		.append('g');

	var colors = d3.scaleLinear()
		.range(['white', '#69b37d'])
		.domain([0, 3]);

	d3.json(url).then(function (data) {
		console.log(data.monthlyVariance);
		// yAxis
		var yScale = d3.scaleBand()
			.rangeRound([0, height])
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
			.attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');

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
			.attr('transform', 'translate(' + padding.left + ',' + (height + padding.top) + ')');

		svg.append('g')
			.classed('map', true)
			.attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
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
			.attr('height', yScale.bandwidth())
			.attr('fill', (element, i) => colors(data.baseTemperature + element.variance))
	});
});