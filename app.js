// write your code here!
document.addEventListener('DOMContentLoaded', () => {
    var width = 500;
    var height = 500;
    var padding = 50


    // setting the axes and scales
    yScale = d3.scaleLinear()
                .domain(d3.extent(regionData,  d => d.subscribersPer100))
                .range([height-padding, padding])

    yAxis = d3.axisLeft(yScale)
                .tickSize(-(width - 2*padding))
                .tickSizeOuter(0)        

    xScale = d3.scaleLinear()
                .domain(d3.extent(regionData, d => d.adultLiteracyRate))
                .range([padding, width-padding])

    xAxis = d3.axisBottom(xScale)
                .tickSize(-(height - 2*padding))
                .tickSizeOuter(0)

    radiusScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.medianAge))
                    .range([2, 30])

    colorScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.growthRate))
                    .range(['#290D19', '#d84174'])

    // plotting the graph
    d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .selectAll('circle')
            .data(regionData)
            .enter()
            .append('circle')
                .attr('stroke-width', '1px')
                .attr('stroke', '#fff')
                .attr('cx', d => xScale(d.adultLiteracyRate))
                .attr('cy', d => yScale(d.subscribersPer100))
                .attr('r', d => d.medianAge !== null ? radiusScale(d.medianAge) : 0)
                .attr('fill', d => colorScale(d.growthRate))

    // append axes
    d3.select('svg')
        .append('g')
            .attr('transform', 'translate(' + (padding) + ' ,0)')
            .call(yAxis)

    d3.select('svg')
        .append('g')
            .attr('transform', 'translate(0, ' + (height - (padding)) + ')')
            .call(xAxis)


    // X-axis label 
    d3.select('svg')
        .append('text')
            .classed('label', true)
            .text('Literacy Rate, Age 15 and up')
            .attr('text-anchor', 'middle')
            .attr('x', width/2)
            .attr('y', height-padding)
            .attr('dy', '1.7em')

    // Y-axis label
    d3.select('svg')
        .append('text')
            .classed('label', true)
            .text('Cellular Subcribers Per 100 People')
            .attr('y', height/2)
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90 0'  + ',' + height/2 + ')')
            .attr('dy', '1.2em')

    // heading
    d3.select('svg')
        .append('text')
            .classed('graph-heading', true)
            .text('Cellular Subscribtions vs Literacy Rate')
            .attr('text-anchor', 'middle')
            .attr('x', width/2)
            .attr('dy', padding/2)
})
