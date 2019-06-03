var margin = 10;
var maxNum = 1;
var n = 10;
var squareSize = 15;
var mode = null;
var modeSwitchBtnSpace = 50;
var modeBtnSize = 50;
var boardAnnotationSpace = 50;
var topAnnotationBoxH = maxNum * 0, topAnnotationBoxW = 0;
var leftAnnotationBoxH = topAnnotationBoxW, leftAnnotationBoxW = topAnnotationBoxH;

var width = n * squareSize + leftAnnotationBoxW  + margin + 50, height = 1000;
var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);
for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        var x = j * squareSize + leftAnnotationBoxW + boardAnnotationSpace + margin;
        var y = i * squareSize + topAnnotationBoxH + boardAnnotationSpace + margin;
        svg.append("rect").attr("x", x)
                            .attr("y", y)
                            .attr("width", squareSize)
                            .attr("height", squareSize)
                            .attr('fill', 'white')
                            .attr("stroke-width", 2)
                            .attr("stroke", "gray")
                            .attr("id", i+ "_"+j)
                            .attr("class", "cell");
    }
}
for (var i = 0; i < n; i++) {
    var x = i * squareSize + leftAnnotationBoxW + squareSize / 2 - topAnnotationBoxW / 2 + boardAnnotationSpace + margin;
    var y = 40 + margin;

    svg.append("text")         // append text
                        .style("fill", "black")   // fill the text with the colour black
                        .attr("x", x)           // set x position of left side of text
                        .attr("y", y)           // set y position of bottom of text
                        .attr("text-anchor", "middle") // set anchor y justification 
                        .style("font-size","10px")
                        .text(i)                            
                        // .attr("transform", "translate(120,200) rotate(90)");
}

for (var i = 0; i < n; i++) {
    var x = 40 + margin;
    var y = i * squareSize + topAnnotationBoxH + squareSize / 2 - leftAnnotationBoxH / 2 + boardAnnotationSpace + margin;
    svg.append("text")         // append text
                        .style("fill", "black")   // fill the text with the colour black
                        .attr("x", x)           // set x position of left side of text
                        .attr("y", y)           // set y position of bottom of text
                        .attr("text-anchor", "middle") // set anchor y justification 
                        .style("font-size","10px")
                        .text(i)    
}

var yesy = topAnnotationBoxH + 2 * boardAnnotationSpace + n * squareSize;
var yesx = leftAnnotationBoxW + boardAnnotationSpace + n * squareSize / 2 - modeBtnSize - modeSwitchBtnSpace / 2;

d3.selectAll("rect.cell").on('mouseover', function() {
    var cellX = d3.select(this).attr("x");
    var cellY = d3.select(this).attr("y");
    d3.selectAll("rect[class='cell']").style("stroke-width", function() { return  d3.select(this).attr("x") == cellX || d3.select(this).attr("y") == cellY ? "3px" : "1px"});
});

svg.append("rect").attr('fill', 'black')
                    .attr("stroke-width", 4)
                    .attr("class", "yes_btn")
                    .attr("stroke", "gray");

d3.selectAll(".yes_btn").on('click', function() {
    mode = "yes";
});
mode = "yes";

d3.select(".yes_btn").on("click")();

d3.selectAll("rect[class='cell']").on('click', function() {
    if (mode == "yes") {
        var cellId = d3.select(this).attr("id");
        var posn = cellId.split("_");
        var clickedRow = parseInt(posn[0]), clickedCol = parseInt(posn[1]);

        var fill = d3.select(this).attr('fill');
        if (fill == "black") {
            d3.select(this).attr('fill', 'white');
            soln[clickedRow][clickedCol] = 0;
        } else if (fill == "white") {
            d3.select(this).attr('fill', 'black');
            soln[clickedRow][clickedCol] = 1;
        }
    }
});
