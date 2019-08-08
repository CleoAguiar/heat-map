$(document).ready(function(){
	var margin = {top: 100, botton: 30, left: 60, rigth: 20},
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

});