$(document).ready(function(){
	var margin = {top: 100, botton: 30, left: 60, rigth: 20},
		width = 920 - margin.left - margin.rigth,
		height = 600 - margin.top - margin.botton;

	var svg = d3.select('.heatMap')
				.append('svg')
				.attr('width', width + margin.left + margin.rigth)
				.attr('height', height + margin.top + margin.botton)
				.append('g');

	// Title
	svg.append('text')
	   .attr('id', 'title')
	   .attr('x', width/2)
	   .attr('y', margin.top / 2)
	   .text('Monthly Global Land-Surface Temperature');
});