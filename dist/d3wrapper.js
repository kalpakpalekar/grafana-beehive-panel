System.register(["./external/d3.min.js", "./external/d3-hexbin.js", "./utils", "lodash", "./color"], function (exports_1, context_1) {
    "use strict";
    var d3, d3hexbin, utils_1, lodash_1, color_1, D3Wrapper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (d3_1) {
                d3 = d3_1;
            },
            function (d3hexbin_1) {
                d3hexbin = d3hexbin_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (color_1_1) {
                color_1 = color_1_1;
            }
        ],
        execute: function () {
            D3Wrapper = (function () {
                function D3Wrapper(templateSrv, svgContainer, d3DivId, opt) {
                    this.maxFont = 240;
                    this.templateSrv = templateSrv;
                    this.svgContainer = svgContainer;
                    this.d3DivId = d3DivId;
                    this.data = opt.data;
                    this.opt = opt;
                    this.purelight = new color_1.Color(255, 255, 255);
                    this.margin = {
                        top: 30 + 26,
                        right: 0,
                        bottom: 20,
                        left: 50
                    };
                    this.opt.height -= 10;
                    this.opt.width -= 20;
                    this.data = this.opt.data;
                    this.numColumns = 5;
                    this.numRows = 5;
                    this.maxColumnsUsed = 0;
                    this.maxRowsUsed = 0;
                    if (opt.rowAutoSize && opt.columnAutoSize) {
                    }
                    else {
                        this.numColumns = opt.columns || 6;
                        this.numRows = opt.rows || 6;
                    }
                    if ((!opt.radiusAutoSize) && (opt.radius)) {
                        this.hexRadius = opt.radius;
                        this.autoHexRadius = opt.radius;
                    }
                    else {
                        this.hexRadius = this.getAutoHexRadius();
                        this.autoHexRadius = this.getAutoHexRadius();
                    }
                    this.calculateSVGSize();
                    this.calculatedPoints = this.generatePoints();
                }
                D3Wrapper.prototype.update = function (data) {
                    if (data) {
                        this.data = data;
                    }
                };
                D3Wrapper.prototype.draw = function () {
                    var _this = this;
                    if (this.opt.rowAutoSize && this.opt.columnAutoSize) {
                        var squared = Math.sqrt(this.data.length);
                        if (this.opt.width > this.opt.height) {
                            var ratio = this.opt.width / this.opt.height * .66;
                            this.numColumns = Math.ceil(squared * ratio);
                            if (this.numColumns < 1) {
                                this.numColumns = 1;
                            }
                            if ((this.numColumns % 2) && (this.numColumns > 2)) {
                                this.numColumns -= 1;
                            }
                            this.numRows = Math.floor(this.data.length / this.numColumns * ratio);
                            if (this.numRows < 1) {
                                this.numRows = 1;
                            }
                            this.numColumns = Math.ceil(this.data.length / this.numRows * ratio);
                        }
                        else {
                            var ratio = this.opt.height / this.opt.width * .66;
                            this.numRows = Math.ceil(squared * ratio);
                            if (this.numRows < 1) {
                                this.numRows = 1;
                            }
                            if ((this.numRows % 2) && (this.numRows > 2)) {
                                this.numRows -= 1;
                            }
                            this.numColumns = Math.floor(this.data.length / this.numRows * ratio);
                            if (this.numColumns < 1) {
                                this.numColumns = 1;
                            }
                        }
                        if (this.data.length === 1) {
                            this.numColumns = 1;
                            this.numRows = 1;
                        }
                        if (this.data.length === this.numColumns) {
                            this.numRows = 1;
                        }
                    }
                    if (this.opt.radiusAutoSize) {
                        this.hexRadius = this.getAutoHexRadius();
                        this.autoHexRadius = this.getAutoHexRadius();
                    }
                    this.calculateSVGSize();
                    this.calculatedPoints = this.generatePoints();
                    var width = this.opt.width;
                    var height = this.opt.height;
                    var ahexbin = d3hexbin
                        .hexbin()
                        .radius(this.autoHexRadius)
                        .extent([[0, 0], [width, height]]);
                    var thirdPi = Math.PI / 3;
                    var diameterX = this.autoHexRadius * 2 * Math.sin(thirdPi);
                    var diameterY = this.autoHexRadius * 1.5;
                    var radiusX = diameterX / 2;
                    var renderWidth = this.maxColumnsUsed * diameterX;
                    var renderHeight = (this.maxRowsUsed * diameterY) + (diameterY * .33);
                    var xoffset = (width - renderWidth + radiusX) / 2;
                    if (this.numRows === 1) {
                        renderHeight = diameterY + (diameterY * .33);
                        xoffset = ((width - renderWidth) / 2) + radiusX;
                    }
                    var yoffset = ((height - renderHeight) / 2) + (diameterY * .66) + 20;
                    var tooltip = d3
                        .select("body")
                        .append("div")
                        .attr("id", this.d3DivId + "-tooltip")
                        .attr("class", "polystat-panel-tooltip")
                        .style("opacity", 0);
                    var svg = d3.select(this.svgContainer)
                        .attr("width", width + "px")
                        .attr("height", height + "px")
                        .append("svg")
                        .attr("width", width + "px")
                        .attr("height", height + "px")
                        .style("border", "0px solid white")
                        .attr("id", this.d3DivId)
                        .append("g")
                        .attr("transform", "translate(" + xoffset + "," + yoffset + ")");
                    var data = this.data;
                    var defs = svg.append("defs");
                    var colorGradients = color_1.Color.createGradients(data);
                    for (var i = 0; i < colorGradients.length; i++) {
                        var aGradient = defs.append("linearGradient")
                            .attr("id", this.d3DivId + "linear-gradient-state-data-" + i);
                        aGradient
                            .attr("x1", "30%")
                            .attr("y1", "30%")
                            .attr("x2", "70%")
                            .attr("y2", "70%");
                        aGradient
                            .append("stop")
                            .attr("offset", "0%")
                            .attr("stop-color", colorGradients[i].start);
                        aGradient
                            .append("stop")
                            .attr("offset", "100%")
                            .attr("stop-color", colorGradients[i].end);
                    }
                    var okColorStart = new color_1.Color(82, 194, 52);
                    var okColorEnd = okColorStart.Mul(this.purelight, 0.7);
                    var okGradient = defs.append("linearGradient")
                        .attr("id", this.d3DivId + "linear-gradient-state-ok");
                    okGradient
                        .attr("x1", "30%")
                        .attr("y1", "30%")
                        .attr("x2", "70%")
                        .attr("y2", "70%");
                    okGradient
                        .append("stop")
                        .attr("offset", "0%")
                        .attr("stop-color", okColorStart.asHex());
                    okGradient
                        .append("stop")
                        .attr("offset", "100%")
                        .attr("stop-color", okColorEnd.asHex());
                    var warningColorStart = new color_1.Color(255, 200, 55);
                    var warningColorEnd = warningColorStart.Mul(this.purelight, 0.7);
                    var warningGradient = defs.append("linearGradient")
                        .attr("id", this.d3DivId + "linear-gradient-state-warning");
                    warningGradient.attr("x1", "30%")
                        .attr("y1", "30%")
                        .attr("x2", "70%")
                        .attr("y2", "70%");
                    warningGradient.append("stop")
                        .attr("offset", "0%")
                        .attr("stop-color", warningColorStart.asHex());
                    warningGradient.append("stop")
                        .attr("offset", "100%")
                        .attr("stop-color", warningColorEnd.asHex());
                    var criticalColorStart = new color_1.Color(229, 45, 39);
                    var criticalColorEnd = criticalColorStart.Mul(this.purelight, 0.7);
                    var criticalGradient = defs.append("linearGradient")
                        .attr("id", this.d3DivId + "linear-gradient-state-critical");
                    criticalGradient
                        .attr("x1", "30%")
                        .attr("y1", "30%")
                        .attr("x2", "70%")
                        .attr("y2", "70%");
                    criticalGradient
                        .append("stop")
                        .attr("offset", "0%")
                        .attr("stop-color", criticalColorStart.asHex());
                    criticalGradient
                        .append("stop")
                        .attr("offset", "100%")
                        .attr("stop-color", criticalColorEnd.asHex());
                    var unknownGradient = defs.append("linearGradient")
                        .attr("id", this.d3DivId + "linear-gradient-state-unknown");
                    unknownGradient
                        .attr("x1", "30%")
                        .attr("y1", "30%")
                        .attr("x2", "70%")
                        .attr("y2", "70%");
                    unknownGradient
                        .append("stop")
                        .attr("offset", "0%")
                        .attr("stop-color", "#73808A");
                    unknownGradient
                        .append("stop")
                        .attr("offset", "100%")
                        .attr("stop-color", "#757F9A");
                    var customShape = null;
                    var shapeWidth = diameterX;
                    var shapeHeight = diameterY;
                    var innerArea = diameterX * diameterY;
                    if (diameterX < diameterY) {
                        innerArea = diameterX * diameterX;
                    }
                    if (diameterY < diameterX) {
                        innerArea = diameterY * diameterY;
                    }
                    var symbol = d3.symbol().size(innerArea);
                    switch (this.opt.polystat.shape) {
                        case "hexagon_pointed_top":
                            customShape = ahexbin.hexagon(this.autoHexRadius);
                            shapeWidth = this.autoHexRadius * 2;
                            break;
                        case "hexagon_flat_top":
                            customShape = ahexbin.hexagon(this.autoHexRadius);
                            shapeWidth = this.autoHexRadius * 2;
                            break;
                        case "circle":
                            customShape = symbol.type(d3.symbolCircle);
                            break;
                        case "cross":
                            customShape = symbol.type(d3.symbolCross);
                            break;
                        case "diamond":
                            customShape = symbol.type(d3.symbolDiamond);
                            break;
                        case "square":
                            customShape = symbol.type(d3.symbolSquare);
                            break;
                        case "star":
                            customShape = symbol.type(d3.symbolStar);
                            break;
                        case "triangle":
                            customShape = symbol.type(d3.symbolTriangle);
                            break;
                        case "wye":
                            customShape = symbol.type(d3.symbolWye);
                            break;
                        default:
                            customShape = ahexbin.hexagon(this.autoHexRadius);
                            break;
                    }
                    var activeLabelFontSize = this.opt.polystat.fontSize;
                    var activeValueFontSize = this.opt.polystat.fontSize;
                    var longestDisplayedValueContent = "";
                    if (this.opt.polystat.fontAutoScale) {
                        var maxLabel = "";
                        for (var i = 0; i < this.data.length; i++) {
                            if (this.data[i].name.length > maxLabel.length) {
                                maxLabel = this.data[i].name;
                            }
                        }
                        var estimateLabelFontSize = utils_1.getTextSizeForWidthAndHeight(maxLabel, "?px sans-serif", shapeWidth, shapeHeight / 3, 10, this.maxFont);
                        activeLabelFontSize = estimateLabelFontSize;
                        var maxValue = "";
                        for (var i = 0; i < this.data.length; i++) {
                            if (this.data[i].valueFormatted.length > maxValue.length) {
                                maxValue = this.data[i].valueFormatted;
                            }
                        }
                        var estimateValueFontSize = utils_1.getTextSizeForWidthAndHeight(maxValue, "?px sans-serif", shapeWidth, shapeHeight / 3, 10, this.maxFont);
                        activeValueFontSize = estimateValueFontSize;
                        longestDisplayedValueContent = maxValue;
                    }
                    svg.selectAll(".hexagon")
                        .data(ahexbin(this.calculatedPoints))
                        .enter().append("path")
                        .attr("class", "hexagon")
                        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
                        .attr("d", customShape)
                        .attr("stroke", this.opt.polystat.polygonBorderColor)
                        .attr("stroke-width", this.opt.polystat.polygonBorderSize + "px")
                        .style("fill", function (_, i) {
                        if (_this.opt.polystat.gradientEnabled) {
                            return "url(" + location.href + "#" + _this.d3DivId + "linear-gradient-state-data-" + i + ")";
                        }
                        else {
                            return data[i].color;
                        }
                    })
                        .on("click", function (_, i) {
                        if (data[i].sanitizeURLEnabled === true) {
                            console.log("click detected sanitized enabled" + data[i].sanitizedURL);
                            if (data[i].sanitizedURL.length > 0) {
                                window.location.replace(data[i].sanitizedURL);
                            }
                        }
                        else {
                            console.log("click detected sanitized disabled" + data[i].clickThrough);
                            if (data[i].clickThrough.length > 0) {
                                window.location.replace(data[i].clickThrough);
                            }
                        }
                    })
                        .on("mousemove", function () {
                        var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        var mouse = d3.mouse(d3.select("body").node());
                        var xpos = mouse[0] - 50;
                        if (xpos < 0) {
                            xpos = 0;
                        }
                        if ((xpos + 200) > viewPortWidth) {
                            xpos = viewPortWidth - 200;
                        }
                        var ypos = mouse[1] + 5;
                        tooltip
                            .style("left", xpos + "px")
                            .style("top", ypos + "px");
                    })
                        .on("mouseover", function (d, i) {
                        tooltip.transition().duration(200).style("opacity", 0.9);
                        tooltip.html(_this.opt.tooltipContent[i])
                            .style("font-size", _this.opt.tooltipFontSize)
                            .style("font-family", _this.opt.tooltipFontType)
                            .style("left", (d.x - 5) + "px")
                            .style("top", (d.y - 5) + "px");
                    })
                        .on("mouseout", function () {
                        tooltip
                            .transition()
                            .duration(500)
                            .style("opacity", 0);
                    });
                    var textspot = svg.selectAll("text.toplabel")
                        .data(ahexbin(this.calculatedPoints));
                    var dynamicLabelFontSize = activeLabelFontSize;
                    var dynamicValueFontSize = activeValueFontSize;
                    textspot
                        .enter()
                        .append("text")
                        .attr("class", "toplabel")
                        .attr("x", function (d) { return d.x; })
                        .attr("y", function (d) { return d.y; })
                        .attr("text-anchor", "middle")
                        .attr("font-family", this.opt.polystat.fontType)
                        .attr("font-size", dynamicLabelFontSize + "px")
                        .attr("fill", "black")
                        .text(function (_, i) {
                        var item = data[i];
                        if (!("showName" in item)) {
                            return item.name;
                        }
                        if (item.showName) {
                            return item.name;
                        }
                        else {
                            return "";
                        }
                    });
                    var frames = 0;
                    textspot.enter()
                        .append("text")
                        .attr("class", function (_, i) {
                        return "valueLabel" + i;
                    })
                        .attr("x", function (d) {
                        return d.x;
                    })
                        .attr("y", function (d) {
                        return d.y + (activeLabelFontSize / 2) + 20;
                    })
                        .attr("text-anchor", "middle")
                        .attr("font-family", this.opt.polystat.fontType)
                        .attr("fill", "black")
                        .attr("font-size", dynamicLabelFontSize + "px")
                        .text(function (_, i) {
                        var counter = 0;
                        var dataLen = _this.data.length;
                        var submetricCount = _this.data[i].members.length;
                        if (submetricCount > 0) {
                            while (counter < submetricCount) {
                                var checkContent = _this.formatValueContent(i, counter, _this);
                                if (checkContent) {
                                    if (checkContent.length > longestDisplayedValueContent.length) {
                                        longestDisplayedValueContent = checkContent;
                                    }
                                }
                                counter++;
                            }
                        }
                        var content = null;
                        counter = 0;
                        while ((content === null) && (counter < dataLen)) {
                            content = _this.formatValueContent(i, (frames + counter), _this);
                            counter++;
                        }
                        dynamicValueFontSize = utils_1.getTextSizeForWidthAndHeight(longestDisplayedValueContent, "?px sans-serif", shapeWidth, shapeHeight / 3, 6, _this.maxFont);
                        if (dynamicValueFontSize > dynamicLabelFontSize) {
                            dynamicValueFontSize = dynamicLabelFontSize;
                        }
                        var valueTextLocation = svg.select("text.valueLabel" + i);
                        valueTextLocation.attr("font-size", dynamicValueFontSize + "px");
                        d3.interval(function () {
                            var valueTextLocation = svg.select("text.valueLabel" + i);
                            var compositeIndex = i;
                            valueTextLocation.text(function () {
                                valueTextLocation.attr("font-size", dynamicValueFontSize + "px");
                                var content = null;
                                var counter = 0;
                                var dataLen = _this.data.length * 2;
                                while ((content === null) && (counter < dataLen)) {
                                    content = _this.formatValueContent(compositeIndex, (frames + counter), _this);
                                    counter++;
                                }
                                if (content === null) {
                                    return "";
                                }
                                if (content === "") {
                                    content = "";
                                }
                                return content;
                            });
                            frames++;
                        }, _this.opt.animationSpeed);
                        return content;
                    });
                };
                D3Wrapper.prototype.formatValueContent = function (i, frames, thisRef) {
                    var data = thisRef.data[i];
                    if (typeof (data) !== "undefined") {
                        if (data.hasOwnProperty("showValue")) {
                            if (!data.showValue) {
                                return "";
                            }
                        }
                        if (!data.hasOwnProperty("valueFormatted")) {
                            return "";
                        }
                    }
                    else {
                        return "";
                    }
                    switch (data.animateMode) {
                        case "all":
                            break;
                        case "triggered":
                            if (data.thresholdLevel < 1) {
                                return "";
                            }
                    }
                    var content = data.valueFormatted;
                    if (!content) {
                        return null;
                    }
                    if ((data.prefix) && (data.prefix.length > 0)) {
                        content = data.prefix + " " + content;
                    }
                    if ((data.suffix) && (data.suffix.length > 0)) {
                        content = content + " " + data.suffix;
                    }
                    var len = data.members.length;
                    if (len > 0) {
                        var triggeredIndex = -1;
                        if (data.animateMode === "all") {
                            triggeredIndex = frames % len;
                        }
                        else {
                            if (typeof (data.triggerCache) === "undefined") {
                                data.triggerCache = this.buildTriggerCache(data);
                            }
                            var z = frames % data.triggerCache.length;
                            triggeredIndex = data.triggerCache[z].index;
                        }
                        var aMember = data.members[triggeredIndex];
                        content = aMember.name + ": " + aMember.valueFormatted;
                        if ((aMember.prefix) && (aMember.prefix.length > 0)) {
                            content = aMember.prefix + " " + content;
                        }
                        if ((aMember.suffix) && (aMember.suffix.length > 0)) {
                            content = content + " " + aMember.suffix;
                        }
                    }
                    if ((content) && (content.length > 0)) {
                        try {
                            var replacedContent = thisRef.templateSrv.replaceWithText(content);
                            content = replacedContent;
                        }
                        catch (err) {
                            console.log("ERROR: template server threw error: " + err);
                        }
                    }
                    return content;
                };
                D3Wrapper.prototype.buildTriggerCache = function (item) {
                    var triggerCache = [];
                    for (var i = 0; i < item.members.length; i++) {
                        var aMember = item.members[i];
                        if (aMember.thresholdLevel > 0) {
                            var cachedMemberState = { index: i, name: aMember.name, value: aMember.value, thresholdLevel: aMember.thresholdLevel };
                            triggerCache.push(cachedMemberState);
                        }
                    }
                    triggerCache = lodash_1.default.orderBy(triggerCache, ["thresholdLevel", "value", "name"], ["desc", "desc", "asc"]);
                    return triggerCache;
                };
                D3Wrapper.prototype.getAutoHexRadius = function () {
                    var hexRadius = d3.min([
                        this.opt.width / ((this.numColumns + 0.5) * Math.sqrt(3)),
                        this.opt.height / ((this.numRows + 1 / 3) * 1.5)
                    ]);
                    return hexRadius;
                };
                D3Wrapper.prototype.calculateSVGSize = function () {
                    this.autoHeight = (this.numRows + 1 / 3) * 3 / 2 * this.hexRadius;
                    this.autoHeight -= this.margin.top - this.margin.bottom;
                    this.autoWidth = (this.numColumns + 1 / 2) * Math.sqrt(3) * this.hexRadius;
                    this.autoWidth -= this.margin.left - this.margin.right;
                };
                D3Wrapper.prototype.generatePoints = function () {
                    var points = [];
                    if (typeof (this.data) === "undefined") {
                        return points;
                    }
                    var maxRowsUsed = 0;
                    var columnsUsed = 0;
                    var maxColumnsUsed = 0;
                    if (this.numRows === Infinity) {
                        return points;
                    }
                    if (this.numColumns === NaN) {
                        return points;
                    }
                    for (var i = 0; i < this.numRows; i++) {
                        if ((points.length < this.opt.displayLimit) && (points.length < this.data.length)) {
                            maxRowsUsed += 1;
                            columnsUsed = 0;
                            for (var j = 0; j < this.numColumns; j++) {
                                if ((points.length < this.opt.displayLimit) && (points.length < this.data.length)) {
                                    columnsUsed += 1;
                                    if (columnsUsed > maxColumnsUsed) {
                                        maxColumnsUsed = columnsUsed;
                                    }
                                    points.push([this.hexRadius * j * 1.75, this.hexRadius * i * 1.5]);
                                }
                            }
                        }
                    }
                    this.maxRowsUsed = maxRowsUsed;
                    this.maxColumnsUsed = maxColumnsUsed;
                    return points;
                };
                return D3Wrapper;
            }());
            exports_1("D3Wrapper", D3Wrapper);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDN3cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Qzd3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVFBO2dCQXdCRSxtQkFBWSxXQUFnQixFQUFFLFlBQWlCLEVBQUUsT0FBWSxFQUFFLEdBQVE7b0JBSHZFLFlBQU8sR0FBRyxHQUFHLENBQUM7b0JBSVosSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7b0JBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO29CQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztvQkFFZixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksYUFBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBRTFDLElBQUksQ0FBQyxNQUFNLEdBQUc7d0JBQ1osR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFO3dCQUNaLEtBQUssRUFBRSxDQUFDO3dCQUNSLE1BQU0sRUFBRSxFQUFFO3dCQUNWLElBQUksRUFBRSxFQUFFO3FCQUNULENBQUM7b0JBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxXQUFXLEdB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LEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0NBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0NBQ2pGLFdBQVcsSUFBSSxDQUFDLENBQUM7b0NBRWpCLElBQUksV0FBVyxHQUFHLGNBQWMsRUFBRTt3Q0FDaEMsY0FBYyxHQUFHLFdBQVcsQ0FBQztxQ0FDOUI7b0NBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lDQUNwRTs2QkFDRjt5QkFDRjtxQkFDRjtvQkFHRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7b0JBQ3JDLE9BQU8sTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVILGdCQUFDO1lBQUQsQ0FBQyxBQXR0QkQsSUFzdEJDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvQHR5cGVzL2QzLWhleGJpbi9pbmRleC5kLnRzXCIgLz5cbi8vLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL0B0eXBlcy9kMy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2V4dGVybmFsL2QzLm1pbi5qc1wiO1xuaW1wb3J0ICogYXMgZDNoZXhiaW4gZnJvbSBcIi4vZXh0ZXJuYWwvZDMtaGV4YmluLmpzXCI7XG5pbXBvcnQgeyBnZXRUZXh0U2l6ZUZvcldpZHRoQW5kSGVpZ2h0IH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcblxuZXhwb3J0IGNsYXNzIEQzV3JhcHBlciB7XG4gIHN2Z0NvbnRhaW5lcjogYW55O1xuICBkM0RpdklkOiBhbnk7XG4gIG1heENvbHVtbnNVc2VkOiBudW1iZXI7XG4gIG1heFJvd3NVc2VkOiBudW1iZXI7XG4gIG9wdDogYW55O1xuICBkYXRhOiBhbnk7XG4gIHRlbXBsYXRlU3J2OiBhbnk7XG4gIGNhbGN1bGF0ZWRQb2ludHM6IGFueTtcbiAgaGV4UmFkaXVzOiBudW1iZXI7XG4gIGF1dG9IZXhSYWRpdXM6IG51bWJlcjtcbiAgYXV0b1dpZHRoOiBudW1iZXI7XG4gIGF1dG9IZWlnaHQ6IG51bWJlcjtcbiAgbnVtQ29sdW1uczogbnVtYmVyO1xuICBudW1Sb3dzOiBudW1iZXI7XG4gIG1hcmdpbjoge1xuICAgIHRvcDogbnVtYmVyLFxuICAgIHJpZ2h0OiBudW1iZXIsXG4gICAgYm90dG9tOiBudW1iZXIsXG4gICAgbGVmdDogbnVtYmVyLFxuICB9O1xuICBtYXhGb250ID0gMjQwO1xuICBwdXJlbGlnaHQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZVNydjogYW55LCBzdmdDb250YWluZXI6IGFueSwgZDNEaXZJZDogYW55LCBvcHQ6IGFueSkge1xuICAgIHRoaXMudGVtcGxhdGVTcnYgPSB0ZW1wbGF0ZVNydjtcbiAgICB0aGlzLnN2Z0NvbnRhaW5lciA9IHN2Z0NvbnRhaW5lcjtcbiAgICB0aGlzLmQzRGl2SWQgPSBkM0RpdklkO1xuICAgIHRoaXMuZGF0YSA9IG9wdC5kYXRhO1xuICAgIHRoaXMub3B0ID0gb3B0O1xuXG4gICAgdGhpcy5wdXJlbGlnaHQgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSk7XG4gICAgLy8gdGl0bGUgaXMgMjZweFxuICAgIHRoaXMubWFyZ2luID0ge1xuICAgICAgdG9wOiAzMCArIDI2LFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICBib3R0b206IDIwLFxuICAgICAgbGVmdDogNTBcbiAgICB9O1xuICAgIC8vIHRha2UgMTAgb2ZmIHRoZSBoZWlnaHRcbiAgICB0aGlzLm9wdC5oZWlnaHQgLT0gMTA7XG4gICAgdGhpcy5vcHQud2lkdGggLT0gMjA7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5vcHQuZGF0YTtcbiAgICB0aGlzLm51bUNvbHVtbnMgPSA1O1xuICAgIHRoaXMubnVtUm93cyA9IDU7XG4gICAgdGhpcy5tYXhDb2x1bW5zVXNlZCA9IDA7XG4gICAgdGhpcy5tYXhSb3dzVXNlZCA9IDA7XG4gICAgaWYgKG9wdC5yb3dBdXRvU2l6ZSAmJiBvcHQuY29sdW1uQXV0b1NpemUpIHtcbiAgICAgIC8vIHNxcnQgb2YgIyBkYXRhIGl0ZW1zXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubnVtQ29sdW1ucyA9IG9wdC5jb2x1bW5zIHx8IDY7XG4gICAgICB0aGlzLm51bVJvd3MgPSBvcHQucm93cyB8fCA2O1xuICAgIH1cbiAgICBpZiAoKCFvcHQucmFkaXVzQXV0b1NpemUpICYmIChvcHQucmFkaXVzKSkge1xuICAgICAgdGhpcy5oZXhSYWRpdXMgPSBvcHQucmFkaXVzO1xuICAgICAgdGhpcy5hdXRvSGV4UmFkaXVzID0gb3B0LnJhZGl1cztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZXhSYWRpdXMgPSB0aGlzLmdldEF1dG9IZXhSYWRpdXMoKTsgLy8gfHwgNTA7XG4gICAgICB0aGlzLmF1dG9IZXhSYWRpdXMgPSB0aGlzLmdldEF1dG9IZXhSYWRpdXMoKTsgLy98fCA1MDtcbiAgICB9XG4gICAgdGhpcy5jYWxjdWxhdGVTVkdTaXplKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVkUG9pbnRzID0gdGhpcy5nZW5lcmF0ZVBvaW50cygpO1xuICB9XG5cbiAgdXBkYXRlKGRhdGE6IGFueSkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgaWYgKHRoaXMub3B0LnJvd0F1dG9TaXplICYmIHRoaXMub3B0LmNvbHVtbkF1dG9TaXplKSB7XG4gICAgICAvLyBzcXJ0IG9mICMgZGF0YSBpdGVtc1xuICAgICAgbGV0IHNxdWFyZWQgPSBNYXRoLnNxcnQodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAvLyBmYXZvciBjb2x1bW5zIHdoZW4gd2lkdGggaXMgZ3JlYXRlciB0aGFuIGhlaWdodFxuICAgICAgLy8gZmF2b3Igcm93cyB3aGVuIHdpZHRoIGlzIGxlc3MgdGhhbiBoZWlnaHRcbiAgICAgIGlmICh0aGlzLm9wdC53aWR0aCA+IHRoaXMub3B0LmhlaWdodCkge1xuICAgICAgICAvLyByYXRpbyBvZiB3aWR0aCB0byBoZWlnaHRcbiAgICAgICAgbGV0IHJhdGlvID0gdGhpcy5vcHQud2lkdGggLyB0aGlzLm9wdC5oZWlnaHQgKiAuNjY7XG4gICAgICAgIHRoaXMubnVtQ29sdW1ucyA9IE1hdGguY2VpbChzcXVhcmVkICogcmF0aW8pO1xuICAgICAgICAvLyBhbHdheXMgYXQgbGVhc3QgMSBjb2x1bW5cbiAgICAgICAgaWYgKHRoaXMubnVtQ29sdW1ucyA8IDEpIHtcbiAgICAgICAgICB0aGlzLm51bUNvbHVtbnMgPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIHByZWZlciBldmVucyBhbmQgc21hbGxlclxuICAgICAgICBpZiAoKHRoaXMubnVtQ29sdW1ucyAlIDIpICYmICh0aGlzLm51bUNvbHVtbnMgPiAyKSkge1xuICAgICAgICAgIHRoaXMubnVtQ29sdW1ucyAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtUm93cyA9IE1hdGguZmxvb3IodGhpcy5kYXRhLmxlbmd0aCAvIHRoaXMubnVtQ29sdW1ucyAqIHJhdGlvKTtcbiAgICAgICAgaWYgKHRoaXMubnVtUm93cyA8IDEpIHtcbiAgICAgICAgICB0aGlzLm51bVJvd3MgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtQ29sdW1ucyA9IE1hdGguY2VpbCh0aGlzLmRhdGEubGVuZ3RoIC8gdGhpcy5udW1Sb3dzICogcmF0aW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJhdGlvID0gdGhpcy5vcHQuaGVpZ2h0IC8gdGhpcy5vcHQud2lkdGggKiAuNjY7XG4gICAgICAgIHRoaXMubnVtUm93cyA9IE1hdGguY2VpbChzcXVhcmVkICogcmF0aW8pO1xuICAgICAgICBpZiAodGhpcy5udW1Sb3dzIDwgMSkge1xuICAgICAgICAgIHRoaXMubnVtUm93cyA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJlZmVyIGV2ZW5zIGFuZCBzbWFsbGVyXG4gICAgICAgIGlmICgodGhpcy5udW1Sb3dzICUgMikgJiYgKHRoaXMubnVtUm93cyA+IDIpKSB7XG4gICAgICAgICAgdGhpcy5udW1Sb3dzIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW1Db2x1bW5zID0gTWF0aC5mbG9vcih0aGlzLmRhdGEubGVuZ3RoIC8gdGhpcy5udW1Sb3dzICogcmF0aW8pO1xuICAgICAgICBpZiAodGhpcy5udW1Db2x1bW5zIDwgMSkge1xuICAgICAgICAgIHRoaXMubnVtQ29sdW1ucyA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMubnVtQ29sdW1ucyA9IDE7XG4gICAgICAgIHRoaXMubnVtUm93cyA9IDE7XG4gICAgICB9XG4gICAgICAvLyBwcmVmZXIgbW9yZSBjb2x1bW5zXG4gICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA9PT0gdGhpcy5udW1Db2x1bW5zKSB7XG4gICAgICAgIHRoaXMubnVtUm93cyA9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coXCJDYWxjdWxhdGVkIGNvbHVtbnMgPSBcIiArIHRoaXMubnVtQ29sdW1ucyk7XG4gICAgLy9jb25zb2xlLmxvZyhcIkNhbGN1bGF0ZWQgcm93cyA9IFwiICsgdGhpcy5udW1Sb3dzKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiTnVtYmVyIG9mIGRhdGEgaXRlbXMgdG8gcmVuZGVyID0gXCIgKyB0aGlzLmRhdGEubGVuZ3RoKTtcblxuICAgIGlmICh0aGlzLm9wdC5yYWRpdXNBdXRvU2l6ZSkge1xuICAgICAgdGhpcy5oZXhSYWRpdXMgPSB0aGlzLmdldEF1dG9IZXhSYWRpdXMoKTtcbiAgICAgIHRoaXMuYXV0b0hleFJhZGl1cyA9IHRoaXMuZ2V0QXV0b0hleFJhZGl1cygpO1xuICAgICAgLy9jb25zb2xlLmxvZyhcImF1dG9IZXhSYWRpdXM6XCIgKyB0aGlzLmF1dG9IZXhSYWRpdXMpO1xuICAgIH1cbiAgICB0aGlzLmNhbGN1bGF0ZVNWR1NpemUoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZWRQb2ludHMgPSB0aGlzLmdlbmVyYXRlUG9pbnRzKCk7XG5cbiAgICB2YXIgd2lkdGggPSB0aGlzLm9wdC53aWR0aDtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5vcHQuaGVpZ2h0O1xuICAgIC8vY29uc29sZS5sb2coXCJEZXRlY3RlZCBXaWR0aDogXCIgKyB3aWR0aCArIFwiIEhlaWdodDogXCIgKyBoZWlnaHQpO1xuICAgIC8vY29uc29sZS5sb2coXCJhdXRvcmFkOlwiICsgdGhpcy5hdXRvSGV4UmFkaXVzKTtcbiAgICB2YXIgYWhleGJpbiA9IGQzaGV4YmluXG4gICAgICAuaGV4YmluKClcbiAgICAgIC5yYWRpdXModGhpcy5hdXRvSGV4UmFkaXVzKVxuICAgICAgLmV4dGVudChbWzAsIDBdLCBbd2lkdGgsIGhlaWdodF1dKTtcblxuICAgIC8vIGQzIGNhbGN1bGF0ZXMgdGhlIHJhZGl1cyBmb3IgeCBhbmQgeSBzZXBhcmF0ZWx5IGJhc2VkIG9uIHRoZSB2YWx1ZSBwYXNzZWQgaW5cbiAgICB2YXIgdGhpcmRQaSA9IE1hdGguUEkgLyAzO1xuICAgIGxldCBkaWFtZXRlclggPSB0aGlzLmF1dG9IZXhSYWRpdXMgKiAyICogTWF0aC5zaW4odGhpcmRQaSk7XG4gICAgbGV0IGRpYW1ldGVyWSA9IHRoaXMuYXV0b0hleFJhZGl1cyAqIDEuNTtcbiAgICBsZXQgcmFkaXVzWCA9IGRpYW1ldGVyWCAvIDI7XG4gICAgbGV0IHJlbmRlcldpZHRoID0gdGhpcy5tYXhDb2x1bW5zVXNlZCAqIGRpYW1ldGVyWDtcbiAgICAvLyByZW5kZXJIZWlnaHQgaXMgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgI3Jvd3MgdXNlZCwgYW5kXG4gICAgLy8gdGhlIFwic3BhY2VcIiB0YWtlbiBieSB0aGUgaGV4YWdvbnMgaW50ZXJsZWF2ZWRcbiAgICAvLyBzcGFjZSB0YWtlbiBpcyAyLzMgb2YgZGlhbWV0ZXJZICogIyByb3dzXG4gICAgbGV0IHJlbmRlckhlaWdodCA9ICh0aGlzLm1heFJvd3NVc2VkICogZGlhbWV0ZXJZKSArIChkaWFtZXRlclkgKiAuMzMpO1xuICAgIC8vIGRpZmZlcmVuY2Ugb2Ygd2lkdGggYW5kIHJlbmRlcndpZHRoIGlzIG91ciBwbGF5IHJvb20sIHNwbGl0IHRoYXQgaW4gaGFsZlxuICAgIC8vIG9mZnNldCBpcyBmcm9tIGNlbnRlciBvZiBoZXhhZ29uLCBub3QgZnJvbSB0aGUgZWRnZVxuICAgIGxldCB4b2Zmc2V0ID0gKHdpZHRoIC0gcmVuZGVyV2lkdGggKyByYWRpdXNYKSAvIDI7XG4gICAgLy8gaWYgdGhlcmUgaXMganVzdCBvbmUgY29sdW1uIGFuZCBvbmUgcm93LCBjZW50ZXIgaXRcbiAgICBpZiAodGhpcy5udW1Sb3dzID09PSAxKSB7XG4gICAgICByZW5kZXJIZWlnaHQgPSBkaWFtZXRlclkgKyAoZGlhbWV0ZXJZICogLjMzKTtcbiAgICAgIHhvZmZzZXQgPSAoKHdpZHRoIC0gcmVuZGVyV2lkdGgpIC8gMikgKyByYWRpdXNYO1xuICAgIH1cbiAgICAvLyB5IGRpYW1ldGVyIG9mIGhleGFnb24gaXMgbGFyZ2VyIHRoYW4geCBkaWFtZXRlclxuICAgIGxldCB5b2Zmc2V0ID0gKChoZWlnaHQgLSByZW5kZXJIZWlnaHQpIC8gMikgKyAoZGlhbWV0ZXJZICogLjY2KSArIDIwO1xuXG4gICAgLy8gRGVmaW5lIHRoZSBkaXYgZm9yIHRoZSB0b29sdGlwXG4gICAgLy8gYWRkIGl0IHRvIHRoZSBib2R5IGFuZCBub3QgdGhlIGNvbnRhaW5lciBzbyBpdCBjYW4gZmxvYXQgb3V0c2lkZSBvZiB0aGUgcGFuZWxcbiAgICB2YXIgdG9vbHRpcCA9IGQzXG4gICAgICAuc2VsZWN0KFwiYm9keVwiKVxuICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgLmF0dHIoXCJpZFwiLCB0aGlzLmQzRGl2SWQgKyBcIi10b29sdGlwXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwicG9seXN0YXQtcGFuZWwtdG9vbHRpcFwiKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICB2YXIgc3ZnOiBhbnkgPSBkMy5zZWxlY3QodGhpcy5zdmdDb250YWluZXIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgXCJweFwiKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgXCJweFwiKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIFwicHhcIilcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIFwicHhcIilcbiAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjBweCBzb2xpZCB3aGl0ZVwiKVxuICAgICAgLmF0dHIoXCJpZFwiLCB0aGlzLmQzRGl2SWQpXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB4b2Zmc2V0ICsgXCIsXCIgKyB5b2Zmc2V0ICsgXCIpXCIpO1xuXG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgdmFyIGRlZnMgPSBzdmcuYXBwZW5kKFwiZGVmc1wiKTtcblxuICAgIGxldCBjb2xvckdyYWRpZW50cyA9IENvbG9yLmNyZWF0ZUdyYWRpZW50cyhkYXRhKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9yR3JhZGllbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiTmFtZSA9IFwiICsgdGhpcy5kM0RpdklkICsgXCJsaW5lYXItZ3JhZGllbnQtc3RhdGUtZGF0YS1cIiArIGkpO1xuICAgICAgbGV0IGFHcmFkaWVudCA9IGRlZnMuYXBwZW5kKFwibGluZWFyR3JhZGllbnRcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCB0aGlzLmQzRGl2SWQgKyBcImxpbmVhci1ncmFkaWVudC1zdGF0ZS1kYXRhLVwiICsgaSk7XG4gICAgICBhR3JhZGllbnRcbiAgICAgICAgLmF0dHIoXCJ4MVwiLCBcIjMwJVwiKVxuICAgICAgICAuYXR0cihcInkxXCIsIFwiMzAlXCIpXG4gICAgICAgIC5hdHRyKFwieDJcIiwgXCI3MCVcIilcbiAgICAgICAgLmF0dHIoXCJ5MlwiLCBcIjcwJVwiKTtcbiAgICAgIGFHcmFkaWVudFxuICAgICAgICAuYXBwZW5kKFwic3RvcFwiKVxuICAgICAgICAuYXR0cihcIm9mZnNldFwiLCBcIjAlXCIpXG4gICAgICAgIC5hdHRyKFwic3RvcC1jb2xvclwiLCBjb2xvckdyYWRpZW50c1tpXS5zdGFydCk7XG4gICAgICBhR3JhZGllbnRcbiAgICAgICAgLmFwcGVuZChcInN0b3BcIilcbiAgICAgICAgLmF0dHIoXCJvZmZzZXRcIiwgXCIxMDAlXCIpXG4gICAgICAgIC5hdHRyKFwic3RvcC1jb2xvclwiLCBjb2xvckdyYWRpZW50c1tpXS5lbmQpO1xuICAgIH1cbiAgICBsZXQgb2tDb2xvclN0YXJ0ID0gbmV3IENvbG9yKDgyLCAxOTQsIDUyKTsgLy8gIzUyYzIzNFxuICAgIGxldCBva0NvbG9yRW5kID0gb2tDb2xvclN0YXJ0Lk11bCh0aGlzLnB1cmVsaWdodCwgMC43KTtcbiAgICBsZXQgb2tHcmFkaWVudCA9IGRlZnMuYXBwZW5kKFwibGluZWFyR3JhZGllbnRcIilcbiAgICAgIC5hdHRyKFwiaWRcIiwgdGhpcy5kM0RpdklkICsgXCJsaW5lYXItZ3JhZGllbnQtc3RhdGUtb2tcIik7XG4gICAgb2tHcmFkaWVudFxuICAgICAgLmF0dHIoXCJ4MVwiLCBcIjMwJVwiKVxuICAgICAgLmF0dHIoXCJ5MVwiLCBcIjMwJVwiKVxuICAgICAgLmF0dHIoXCJ4MlwiLCBcIjcwJVwiKVxuICAgICAgLmF0dHIoXCJ5MlwiLCBcIjcwJVwiKTtcbiAgICBva0dyYWRpZW50XG4gICAgICAuYXBwZW5kKFwic3RvcFwiKVxuICAgICAgLmF0dHIoXCJvZmZzZXRcIiwgXCIwJVwiKVxuICAgICAgLmF0dHIoXCJzdG9wLWNvbG9yXCIsIG9rQ29sb3JTdGFydC5hc0hleCgpKTtcbiAgICBva0dyYWRpZW50XG4gICAgICAuYXBwZW5kKFwic3RvcFwiKVxuICAgICAgLmF0dHIoXCJvZmZzZXRcIiwgXCIxMDAlXCIpXG4gICAgICAuYXR0cihcInN0b3AtY29sb3JcIiwgb2tDb2xvckVuZC5hc0hleCgpKTtcblxuICAgIC8vIGh0dHBzOi8vdWlncmFkaWVudHMuY29tLyNKdWljeU9yYW5nZVxuICAgIGxldCB3YXJuaW5nQ29sb3JTdGFydCA9IG5ldyBDb2xvcigyNTUsIDIwMCwgNTUpOyAvLyAjRkZDODM3XG4gICAgbGV0IHdhcm5pbmdDb2xvckVuZCA9IHdhcm5pbmdDb2xvclN0YXJ0Lk11bCh0aGlzLnB1cmVsaWdodCwgMC43KTtcbiAgICBsZXQgd2FybmluZ0dyYWRpZW50ID0gZGVmcy5hcHBlbmQoXCJsaW5lYXJHcmFkaWVudFwiKVxuICAgICAgLmF0dHIoXCJpZFwiLCB0aGlzLmQzRGl2SWQgKyBcImxpbmVhci1ncmFkaWVudC1zdGF0ZS13YXJuaW5nXCIpO1xuICAgIHdhcm5pbmdHcmFkaWVudC5hdHRyKFwieDFcIiwgXCIzMCVcIilcbiAgICAgIC5hdHRyKFwieTFcIiwgXCIzMCVcIilcbiAgICAgIC5hdHRyKFwieDJcIiwgXCI3MCVcIilcbiAgICAgIC5hdHRyKFwieTJcIiwgXCI3MCVcIik7XG4gICAgd2FybmluZ0dyYWRpZW50LmFwcGVuZChcInN0b3BcIilcbiAgICAgIC5hdHRyKFwib2Zmc2V0XCIsIFwiMCVcIilcbiAgICAgIC5hdHRyKFwic3RvcC1jb2xvclwiLCB3YXJuaW5nQ29sb3JTdGFydC5hc0hleCgpKTsgLy8gbGlnaHQgb3JhbmdlXG4gICAgd2FybmluZ0dyYWRpZW50LmFwcGVuZChcInN0b3BcIilcbiAgICAgIC5hdHRyKFwib2Zmc2V0XCIsIFwiMTAwJVwiKVxuICAgICAgLmF0dHIoXCJzdG9wLWNvbG9yXCIsIHdhcm5pbmdDb2xvckVuZC5hc0hleCgpKTsgLy8gZGFyayBvcmFuZ2VcblxuICAgIC8vIGh0dHBzOi8vdWlncmFkaWVudHMuY29tLyNZb3VUdWJlXG4gICAgbGV0IGNyaXRpY2FsQ29sb3JTdGFydCA9IG5ldyBDb2xvcigyMjksIDQ1LCAzOSk7IC8vIGU1MmQyN1xuICAgIGxldCBjcml0aWNhbENvbG9yRW5kID0gY3JpdGljYWxDb2xvclN0YXJ0Lk11bCh0aGlzLnB1cmVsaWdodCwgMC43KTtcbiAgICBsZXQgY3JpdGljYWxHcmFkaWVudCA9IGRlZnMuYXBwZW5kKFwibGluZWFyR3JhZGllbnRcIilcbiAgICAgIC5hdHRyKFwiaWRcIiwgdGhpcy5kM0RpdklkICsgXCJsaW5lYXItZ3JhZGllbnQtc3RhdGUtY3JpdGljYWxcIik7XG4gICAgY3JpdGljYWxHcmFkaWVudFxuICAgICAgLmF0dHIoXCJ4MVwiLCBcIjMwJVwiKVxuICAgICAgLmF0dHIoXCJ5MVwiLCBcIjMwJVwiKVxuICAgICAgLmF0dHIoXCJ4MlwiLCBcIjcwJVwiKVxuICAgICAgLmF0dHIoXCJ5MlwiLCBcIjcwJVwiKTtcbiAgICBjcml0aWNhbEdyYWRpZW50XG4gICAgICAuYXBwZW5kKFwic3RvcFwiKVxuICAgICAgLmF0dHIoXCJvZmZzZXRcIiwgXCIwJVwiKVxuICAgICAgLmF0dHIoXCJzdG9wLWNvbG9yXCIsIGNyaXRpY2FsQ29sb3JTdGFydC5hc0hleCgpKTsgLy8gbGlnaHQgcmVkXG4gICAgY3JpdGljYWxHcmFkaWVudFxuICAgICAgLmFwcGVuZChcInN0b3BcIilcbiAgICAgIC5hdHRyKFwib2Zmc2V0XCIsIFwiMTAwJVwiKVxuICAgICAgLmF0dHIoXCJzdG9wLWNvbG9yXCIsIGNyaXRpY2FsQ29sb3JFbmQuYXNIZXgoKSk7IC8vIGRhcmsgcmVkXG5cbiAgICAvLyBodHRwczovL3VpZ3JhZGllbnRzLmNvbS8jQXNoXG4gICAgbGV0IHVua25vd25HcmFkaWVudCA9IGRlZnMuYXBwZW5kKFwibGluZWFyR3JhZGllbnRcIilcbiAgICAgIC5hdHRyKFwiaWRcIiwgdGhpcy5kM0RpdklkICsgXCJsaW5lYXItZ3JhZGllbnQtc3RhdGUtdW5rbm93blwiKTtcbiAgICB1bmtub3duR3JhZGllbnRcbiAgICAgIC5hdHRyKFwieDFcIiwgXCIzMCVcIilcbiAgICAgIC5hdHRyKFwieTFcIiwgXCIzMCVcIilcbiAgICAgIC5hdHRyKFwieDJcIiwgXCI3MCVcIilcbiAgICAgIC5hdHRyKFwieTJcIiwgXCI3MCVcIik7XG4gICAgdW5rbm93bkdyYWRpZW50XG4gICAgICAuYXBwZW5kKFwic3RvcFwiKVxuICAgICAgLmF0dHIoXCJvZmZzZXRcIiwgXCIwJVwiKVxuICAgICAgLmF0dHIoXCJzdG9wLWNvbG9yXCIsIFwiIzczODA4QVwiKTsgLy8gbGlnaHQgZ3JleVxuICAgIHVua25vd25HcmFkaWVudFxuICAgICAgLmFwcGVuZChcInN0b3BcIilcbiAgICAgIC5hdHRyKFwib2Zmc2V0XCIsIFwiMTAwJVwiKVxuICAgICAgLmF0dHIoXCJzdG9wLWNvbG9yXCIsIFwiIzc1N0Y5QVwiKTsgLy8gZGFyayBncmV5XG5cbiAgICBsZXQgY3VzdG9tU2hhcGUgPSBudWxsO1xuICAgIC8vIHRoaXMgaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIGZvbnRzaXplXG4gICAgbGV0IHNoYXBlV2lkdGggPSBkaWFtZXRlclg7XG4gICAgbGV0IHNoYXBlSGVpZ2h0ID0gZGlhbWV0ZXJZO1xuICAgIC8vIHN5bWJvbHMgdXNlIHRoZSBhcmVhIGZvciB0aGVpciBzaXplXG4gICAgbGV0IGlubmVyQXJlYSA9IGRpYW1ldGVyWCAqIGRpYW1ldGVyWTtcbiAgICAvLyB1c2UgdGhlIHNtYWxsZXIgb2YgZGlhbWV0ZXJYIG9yIFlcbiAgICBpZiAoZGlhbWV0ZXJYIDwgZGlhbWV0ZXJZKSB7XG4gICAgICBpbm5lckFyZWEgPSBkaWFtZXRlclggKiBkaWFtZXRlclg7XG4gICAgfVxuICAgIGlmIChkaWFtZXRlclkgPCBkaWFtZXRlclgpIHtcbiAgICAgIGlubmVyQXJlYSA9IGRpYW1ldGVyWSAqIGRpYW1ldGVyWTtcbiAgICB9XG4gICAgbGV0IHN5bWJvbCA9IGQzLnN5bWJvbCgpLnNpemUoaW5uZXJBcmVhKTtcbiAgICBzd2l0Y2ggKHRoaXMub3B0LnBvbHlzdGF0LnNoYXBlKSB7XG4gICAgICBjYXNlIFwiaGV4YWdvbl9wb2ludGVkX3RvcFwiOlxuICAgICAgICBjdXN0b21TaGFwZSA9IGFoZXhiaW4uaGV4YWdvbih0aGlzLmF1dG9IZXhSYWRpdXMpO1xuICAgICAgICBzaGFwZVdpZHRoID0gdGhpcy5hdXRvSGV4UmFkaXVzICogMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiaGV4YWdvbl9mbGF0X3RvcFwiOlxuICAgICAgICAvLyBUT0RPOiB1c2UgcG9pbnRlZCBmb3Igbm93XG4gICAgICAgIGN1c3RvbVNoYXBlID0gYWhleGJpbi5oZXhhZ29uKHRoaXMuYXV0b0hleFJhZGl1cyk7XG4gICAgICAgIHNoYXBlV2lkdGggPSB0aGlzLmF1dG9IZXhSYWRpdXMgKiAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJjaXJjbGVcIjpcbiAgICAgICAgY3VzdG9tU2hhcGUgPSBzeW1ib2wudHlwZShkMy5zeW1ib2xDaXJjbGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJjcm9zc1wiOlxuICAgICAgICBjdXN0b21TaGFwZSA9IHN5bWJvbC50eXBlKGQzLnN5bWJvbENyb3NzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGlhbW9uZFwiOlxuICAgICAgICBjdXN0b21TaGFwZSA9IHN5bWJvbC50eXBlKGQzLnN5bWJvbERpYW1vbmQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzcXVhcmVcIjpcbiAgICAgICAgY3VzdG9tU2hhcGUgPSBzeW1ib2wudHlwZShkMy5zeW1ib2xTcXVhcmUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzdGFyXCI6XG4gICAgICAgIGN1c3RvbVNoYXBlID0gc3ltYm9sLnR5cGUoZDMuc3ltYm9sU3Rhcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInRyaWFuZ2xlXCI6XG4gICAgICAgIGN1c3RvbVNoYXBlID0gc3ltYm9sLnR5cGUoZDMuc3ltYm9sVHJpYW5nbGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ3eWVcIjpcbiAgICAgICAgY3VzdG9tU2hhcGUgPSBzeW1ib2wudHlwZShkMy5zeW1ib2xXeWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGN1c3RvbVNoYXBlID0gYWhleGJpbi5oZXhhZ29uKHRoaXMuYXV0b0hleFJhZGl1cyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZm9udHNpemUgYmFzZWQgb24gdGhlIHNoYXBlIGFuZCB0aGUgdGV4dFxuICAgIGxldCBhY3RpdmVMYWJlbEZvbnRTaXplID0gdGhpcy5vcHQucG9seXN0YXQuZm9udFNpemU7XG4gICAgLy8gZm9udCBzaXplcyBhcmUgaW5kZXBlbmRlbnQgZm9yIGxhYmVsIGFuZCB2YWx1ZXNcbiAgICBsZXQgYWN0aXZlVmFsdWVGb250U2l6ZSA9IHRoaXMub3B0LnBvbHlzdGF0LmZvbnRTaXplO1xuICAgIGxldCBsb25nZXN0RGlzcGxheWVkVmFsdWVDb250ZW50ID0gXCJcIjtcblxuICAgIGlmICh0aGlzLm9wdC5wb2x5c3RhdC5mb250QXV0b1NjYWxlKSB7XG4gICAgICAvLyBmaW5kIHRoZSBtb3N0IHRleHQgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBvdmVyIGFsbCBpdGVtc1xuICAgICAgbGV0IG1heExhYmVsID0gXCJcIjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbaV0ubmFtZS5sZW5ndGggPiBtYXhMYWJlbC5sZW5ndGgpIHtcbiAgICAgICAgICBtYXhMYWJlbCA9IHRoaXMuZGF0YVtpXS5uYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBlc3RpbWF0ZSBob3cgYmlnIG9mIGEgZm9udCBjYW4gYmUgdXNlZFxuICAgICAgLy8gVHdvIGxpbmVzIG9mIHRleHQgbXVzdCBmaXQgd2l0aCB2ZXJ0aWNhbCBzcGFjaW5nIGluY2x1ZGVkXG4gICAgICAvLyBpZiBpdCBpcyB0b28gc21hbGwsIGhpZGUgZXZlcnl0aGluZ1xuICAgICAgbGV0IGVzdGltYXRlTGFiZWxGb250U2l6ZSA9IGdldFRleHRTaXplRm9yV2lkdGhBbmRIZWlnaHQoXG4gICAgICAgIG1heExhYmVsLFxuICAgICAgICBcIj9weCBzYW5zLXNlcmlmXCIsIC8vIHVzZSBzYW5zLXNlcmlmIGZvciBzaXppbmdcbiAgICAgICAgc2hhcGVXaWR0aCxcbiAgICAgICAgc2hhcGVIZWlnaHQgLyAzLCAvLyB0b3AgYW5kIGJvdHRvbSBvZiBoZXhhZ29uIG5vdCB1c2VkLCBhbmQgdHdvIGxpbmVzIG9mIHRleHRcbiAgICAgICAgMTAsXG4gICAgICAgIHRoaXMubWF4Rm9udCk7XG5cbiAgICAgIC8vY29uc29sZS5sb2coXCJDYWxjOiBFc3RpbWF0ZWQgTGFiZWwgRm9udCBTaXplOiBcIiArIGVzdGltYXRlTGFiZWxGb250U2l6ZSk7XG4gICAgICBhY3RpdmVMYWJlbEZvbnRTaXplID0gZXN0aW1hdGVMYWJlbEZvbnRTaXplO1xuICAgICAgLy8gc2FtZSBmb3IgdGhlIHZhbHVlXG4gICAgICBsZXQgbWF4VmFsdWUgPSBcIlwiO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNoZWNraW5nIGxlbjogXCIgKyB0aGlzLmRhdGFbaV0udmFsdWVGb3JtYXR0ZWQgKyBcIiB2czogXCIgKyBtYXhWYWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbaV0udmFsdWVGb3JtYXR0ZWQubGVuZ3RoID4gbWF4VmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgbWF4VmFsdWUgPSB0aGlzLmRhdGFbaV0udmFsdWVGb3JtYXR0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vY29uc29sZS5sb2coXCJNYXggVmFsdWU6IFwiICsgbWF4VmFsdWUpO1xuICAgICAgbGV0IGVzdGltYXRlVmFsdWVGb250U2l6ZSA9IGdldFRleHRTaXplRm9yV2lkdGhBbmRIZWlnaHQoXG4gICAgICAgIG1heFZhbHVlLFxuICAgICAgICBcIj9weCBzYW5zLXNlcmlmXCIsIC8vIHVzZSBzYW5zLXNlcmlmIGZvciBzaXppbmdcbiAgICAgICAgc2hhcGVXaWR0aCxcbiAgICAgICAgc2hhcGVIZWlnaHQgLyAzLCAvLyB0b3AgYW5kIGJvdHRvbSBvZiBoZXhhZ29uIG5vdCB1c2VkLCBhbmQgdHdvIGxpbmVzIG9mIHRleHRcbiAgICAgICAgMTAsXG4gICAgICAgIHRoaXMubWF4Rm9udCk7XG4gICAgICBhY3RpdmVWYWx1ZUZvbnRTaXplID0gZXN0aW1hdGVWYWx1ZUZvbnRTaXplO1xuICAgICAgbG9uZ2VzdERpc3BsYXllZFZhbHVlQ29udGVudCA9IG1heFZhbHVlO1xuICAgIH1cblxuICAgIC8vIGZsYXQgdG9wIGlzIHJvdGF0ZWQgOTAgZGVncmVlcywgYnV0IHRoZSBjb29yZGluYXRlIHN5c3RlbS9sYXlvdXQgbmVlZHMgdG8gYmUgYWRqdXN0ZWRcbiAgICAvLy5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBcInRyYW5zbGF0ZShcIiArIGQueSArIFwiLFwiICsgZC54ICsgXCIpcm90YXRlKDkwKVwiOyB9KVxuICAgIC8vIHNlZSBodHRwOi8vYmwub2Nrcy5vcmcvamFzb25kYXZpZXMvZjU5MjJlZDRkMGFjMWFjMjE2MWZcblxuICAgIC8vLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgZC54ICsgXCIsXCIgKyBkLnkgKyBcIilcIjsgfSlcblxuXG4gICAgc3ZnLnNlbGVjdEFsbChcIi5oZXhhZ29uXCIpXG4gICAgICAuZGF0YShhaGV4YmluKHRoaXMuY2FsY3VsYXRlZFBvaW50cykpXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiaGV4YWdvblwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgZC54ICsgXCIsXCIgKyBkLnkgKyBcIilcIjsgfSlcbiAgICAgIC5hdHRyKFwiZFwiLCBjdXN0b21TaGFwZSlcbiAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIHRoaXMub3B0LnBvbHlzdGF0LnBvbHlnb25Cb3JkZXJDb2xvcilcbiAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIHRoaXMub3B0LnBvbHlzdGF0LnBvbHlnb25Cb3JkZXJTaXplICsgXCJweFwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCAoXywgaSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5vcHQucG9seXN0YXQuZ3JhZGllbnRFbmFibGVkKSB7XG4gICAgICAgICAgLy8gc2FmYXJpIG5lZWRzIHRoZSBsb2NhdGlvbi5ocmVmXG4gICAgICAgICAgcmV0dXJuIFwidXJsKFwiICsgbG9jYXRpb24uaHJlZiArIFwiI1wiICsgdGhpcy5kM0RpdklkICsgXCJsaW5lYXItZ3JhZGllbnQtc3RhdGUtZGF0YS1cIiArIGkgKyBcIilcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZGF0YVtpXS5jb2xvcjtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vbihcImNsaWNrXCIsIChfLCBpKSA9PiB7XG4gICAgICAgIGlmIChkYXRhW2ldLnNhbml0aXplVVJMRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2sgZGV0ZWN0ZWQgc2FuaXRpemVkIGVuYWJsZWRcIiArIGRhdGFbaV0uc2FuaXRpemVkVVJMKTtcbiAgICAgICAgICBpZiAoZGF0YVtpXS5zYW5pdGl6ZWRVUkwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YVtpXS5zYW5pdGl6ZWRVUkwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrIGRldGVjdGVkIHNhbml0aXplZCBkaXNhYmxlZFwiICsgZGF0YVtpXS5jbGlja1Rocm91Z2gpO1xuICAgICAgICAgIGlmIChkYXRhW2ldLmNsaWNrVGhyb3VnaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhW2ldLmNsaWNrVGhyb3VnaCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm9uKFwibW91c2Vtb3ZlXCIsICgpID0+IHtcbiAgICAgICAgLy8gdXNlIHRoZSB2aWV3cG9ydHdpZHRoIHRvIHByZXZlbnQgdGhlIHRvb2x0aXAgZnJvbSBnb2luZyB0b28gZmFyIHJpZ2h0XG4gICAgICAgIGxldCB2aWV3UG9ydFdpZHRoID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICAgICAgLy8gdXNlIHRoZSBtb3VzZSBwb3NpdGlvbiBmb3IgdGhlIGVudGlyZSBwYWdlXG4gICAgICAgIHZhciBtb3VzZSA9IGQzLm1vdXNlKGQzLnNlbGVjdChcImJvZHlcIikubm9kZSgpKTtcbiAgICAgICAgdmFyIHhwb3MgPSBtb3VzZVswXSAtIDUwO1xuICAgICAgICAvLyBkb24ndCBhbGxvdyBvZmZzY3JlZW4gdG9vbHRpcFxuICAgICAgICBpZiAoeHBvcyA8IDApIHtcbiAgICAgICAgICB4cG9zID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBwcmV2ZW50IHRvb2x0aXAgZnJvbSByZW5kZXJpbmcgb3V0c2lkZSBvZiB2aWV3cG9ydFxuICAgICAgICBpZiAoKHhwb3MgKyAyMDApID4gdmlld1BvcnRXaWR0aCkge1xuICAgICAgICAgIHhwb3MgPSB2aWV3UG9ydFdpZHRoIC0gMjAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciB5cG9zID0gbW91c2VbMV0gKyA1O1xuICAgICAgICB0b29sdGlwXG4gICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCB4cG9zICsgXCJweFwiKVxuICAgICAgICAgIC5zdHlsZShcInRvcFwiLCB5cG9zICsgXCJweFwiKTtcbiAgICAgIH0pXG4gICAgICAub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHtcbiAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKCkuZHVyYXRpb24oMjAwKS5zdHlsZShcIm9wYWNpdHlcIiwgMC45KTtcbiAgICAgICAgdG9vbHRpcC5odG1sKHRoaXMub3B0LnRvb2x0aXBDb250ZW50W2ldKVxuICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCB0aGlzLm9wdC50b29sdGlwRm9udFNpemUpXG4gICAgICAgICAgLnN0eWxlKFwiZm9udC1mYW1pbHlcIiwgdGhpcy5vcHQudG9vbHRpcEZvbnRUeXBlKVxuICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQueCAtIDUpICsgXCJweFwiKVxuICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZC55IC0gNSkgKyBcInB4XCIpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgdG9vbHRpcFxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICB9KTtcbiAgICAvLyBub3cgbGFiZWxzXG4gICAgdmFyIHRleHRzcG90ID0gc3ZnLnNlbGVjdEFsbChcInRleHQudG9wbGFiZWxcIilcbiAgICAgIC5kYXRhKGFoZXhiaW4odGhpcy5jYWxjdWxhdGVkUG9pbnRzKSk7XG5cbiAgICBsZXQgZHluYW1pY0xhYmVsRm9udFNpemUgPSBhY3RpdmVMYWJlbEZvbnRTaXplO1xuICAgIGxldCBkeW5hbWljVmFsdWVGb250U2l6ZSA9IGFjdGl2ZVZhbHVlRm9udFNpemU7XG4gICAgLy9jb25zb2xlLmxvZyhcIkR5bmFtaWNMYWJlbEZvbnRTaXplOiBcIiArIGR5bmFtaWNMYWJlbEZvbnRTaXplKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiRHluYW1pY1ZhbHVlRm9udFNpemU6IFwiICsgZHluYW1pY1ZhbHVlRm9udFNpemUpO1xuICAgIHRleHRzcG90XG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ0b3BsYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLng7IH0pXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueTsgfSlcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC5hdHRyKFwiZm9udC1mYW1pbHlcIiwgdGhpcy5vcHQucG9seXN0YXQuZm9udFR5cGUpXG4gICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBkeW5hbWljTGFiZWxGb250U2l6ZSArIFwicHhcIilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBcImJsYWNrXCIpXG4gICAgICAudGV4dChmdW5jdGlvbiAoXywgaSkge1xuICAgICAgICBsZXQgaXRlbSA9IGRhdGFbaV07XG4gICAgICAgIC8vIGNoZWNrIGlmIHByb3BlcnR5IGV4aXN0XG4gICAgICAgIGlmICghKFwic2hvd05hbWVcIiBpbiBpdGVtKSkge1xuICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0uc2hvd05hbWUpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHZhciBmcmFtZXMgPSAwO1xuXG5cbiAgICB0ZXh0c3BvdC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBmdW5jdGlvbiAoXywgaSkge1xuICAgICAgICByZXR1cm4gXCJ2YWx1ZUxhYmVsXCIgKyBpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC54O1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC55ICsgKGFjdGl2ZUxhYmVsRm9udFNpemUgLyAyKSArIDIwOyAvLyBvZmZzZXQgYnkgZm9udHNpemUgYW5kIDEwcHggdmVydGljYWwgcGFkZGluZ1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC5hdHRyKFwiZm9udC1mYW1pbHlcIiwgdGhpcy5vcHQucG9seXN0YXQuZm9udFR5cGUpXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJibGFja1wiKVxuICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgZHluYW1pY0xhYmVsRm9udFNpemUgKyBcInB4XCIpXG4gICAgICAudGV4dCgoXywgaSkgPT4ge1xuICAgICAgICAvLyBhbmltYXRpb24vZGlzcGxheW1vZGUgY2FuIG1vZGlmeSB3aGF0IGlzIGJlaW5nIGRpc3BsYXllZFxuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIGxldCBkYXRhTGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgLy8gc2VhcmNoIGZvciBhIHZhbHVlIGJ1dCBub3QgbW9yZSB0aGFuIG51bWJlciBvZiBkYXRhIGl0ZW1zXG4gICAgICAgIC8vIG5lZWQgdG8gZmluZCB0aGUgbG9uZ2VzdCBjb250ZW50IHN0cmluZyBnZW5lcmF0ZWQgdG8gZGV0ZXJtaW5lIHRoZVxuICAgICAgICAvLyBkeW5hbWljIGZvbnQgc2l6ZVxuICAgICAgICAvLyB0aGlzIGFsd2F5cyBzdGFydHMgZnJvbSBmcmFtZSAwLCBsb29rIHRocm91Z2ggZXZlcnkgbWV0cmljIGluY2x1ZGluZyBjb21wb3NpdGUgbWVtYmVycyBmb3IgdGhlIGxvbmdlc3QgdGV4dCBwb3NzaWJsZVxuICAgICAgICAvLyBnZXQgdGhlIHRvdGFsIGNvdW50IG9mIG1ldHJpY3MgKHdpdGggY29tcG9zaXRlIG1lbWJlcnMpLCBhbmQgbG9vcCB0aHJvdWdoXG4gICAgICAgIGxldCBzdWJtZXRyaWNDb3VudCA9IHRoaXMuZGF0YVtpXS5tZW1iZXJzLmxlbmd0aDtcbiAgICAgICAgLy9sZXQgbG9uZ2VzdERpc3BsYXllZFZhbHVlQ29udGVudCA9IFwiXCI7XG4gICAgICAgIGlmIChzdWJtZXRyaWNDb3VudCA+IDApIHtcbiAgICAgICAgICB3aGlsZSAoY291bnRlciA8IHN1Ym1ldHJpY0NvdW50KSB7XG4gICAgICAgICAgICBsZXQgY2hlY2tDb250ZW50ID0gdGhpcy5mb3JtYXRWYWx1ZUNvbnRlbnQoaSwgY291bnRlciwgdGhpcyk7XG4gICAgICAgICAgICBpZiAoY2hlY2tDb250ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChjaGVja0NvbnRlbnQubGVuZ3RoID4gbG9uZ2VzdERpc3BsYXllZFZhbHVlQ29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsb25nZXN0RGlzcGxheWVkVmFsdWVDb250ZW50ID0gY2hlY2tDb250ZW50O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgfVxuICAgICAgICB9Ly8gZWxzZSB7XG4gICAgICAgIC8vIG5vbi1jb21wb3NpdGVzIHVzZSB0aGUgZm9ybWF0dGVkIHNpemUgb2YgdGhlIG1ldHJpYyB2YWx1ZVxuICAgICAgICAvLyAgbG9uZ2VzdERpc3BsYXllZFZhbHVlQ29udGVudCA9IHRoaXMuZm9ybWF0VmFsdWVDb250ZW50KGksIGNvdW50ZXIsIHRoaXMpO1xuICAgICAgICAvL31cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImFuaW1hdGVkOiBsb25nZXN0RGlzcGxheWVkVmFsdWVDb250ZW50OiBcIiArIGxvbmdlc3REaXNwbGF5ZWRWYWx1ZUNvbnRlbnQpO1xuICAgICAgICBsZXQgY29udGVudCA9IG51bGw7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICB3aGlsZSAoKGNvbnRlbnQgPT09IG51bGwpICYmIChjb3VudGVyIDwgZGF0YUxlbikpIHtcbiAgICAgICAgICBjb250ZW50ID0gdGhpcy5mb3JtYXRWYWx1ZUNvbnRlbnQoaSwgKGZyYW1lcyArIGNvdW50ZXIpLCB0aGlzKTtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgICAgZHluYW1pY1ZhbHVlRm9udFNpemUgPSBnZXRUZXh0U2l6ZUZvcldpZHRoQW5kSGVpZ2h0KFxuICAgICAgICAgIGxvbmdlc3REaXNwbGF5ZWRWYWx1ZUNvbnRlbnQsXG4gICAgICAgICAgXCI/cHggc2Fucy1zZXJpZlwiLCAgLy8gdXNlIHNhbnMtc2VyaWYgZm9yIHNpemluZ1xuICAgICAgICAgIHNoYXBlV2lkdGgsICAgLy8gcGFkXG4gICAgICAgICAgc2hhcGVIZWlnaHQgLyAzLFxuICAgICAgICAgIDYsXG4gICAgICAgICAgdGhpcy5tYXhGb250KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNhbGM6IER5bmFtaWMgVmFsdWUgRm9udCBTaXplOiBcIiArIGR5bmFtaWNWYWx1ZUZvbnRTaXplKTtcblxuICAgICAgICAvLyB2YWx1ZSBzaG91bGQgbmV2ZXIgYmUgbGFyZ2VyIHRoYW4gdGhlIGxhYmVsXG4gICAgICAgIGlmIChkeW5hbWljVmFsdWVGb250U2l6ZSA+IGR5bmFtaWNMYWJlbEZvbnRTaXplKSB7XG4gICAgICAgICAgZHluYW1pY1ZhbHVlRm9udFNpemUgPSBkeW5hbWljTGFiZWxGb250U2l6ZTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiYW5pbWF0ZWQ6IGR5bmFtaWNMYWJlbEZvbnRTaXplOiBcIiArIGR5bmFtaWNMYWJlbEZvbnRTaXplKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImFuaW1hdGVkOiBkeW5hbWljVmFsdWVGb250U2l6ZTogXCIgKyBkeW5hbWljVmFsdWVGb250U2l6ZSk7XG4gICAgICAgIHZhciB2YWx1ZVRleHRMb2NhdGlvbiA9IHN2Zy5zZWxlY3QoXCJ0ZXh0LnZhbHVlTGFiZWxcIiArIGkpO1xuICAgICAgICAvLyB1c2UgdGhlIGR5bmFtaWMgc2l6ZSBmb3IgdGhlIHZhbHVlXG4gICAgICAgIHZhbHVlVGV4dExvY2F0aW9uLmF0dHIoXCJmb250LXNpemVcIiwgZHluYW1pY1ZhbHVlRm9udFNpemUgKyBcInB4XCIpO1xuICAgICAgICBkMy5pbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgdmFyIHZhbHVlVGV4dExvY2F0aW9uID0gc3ZnLnNlbGVjdChcInRleHQudmFsdWVMYWJlbFwiICsgaSk7XG4gICAgICAgICAgdmFyIGNvbXBvc2l0ZUluZGV4ID0gaTtcbiAgICAgICAgICB2YWx1ZVRleHRMb2NhdGlvbi50ZXh0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIGFuaW1hdGlvbi9kaXNwbGF5bW9kZSBjYW4gbW9kaWZ5IHdoYXQgaXMgYmVpbmcgZGlzcGxheWVkXG4gICAgICAgICAgICB2YWx1ZVRleHRMb2NhdGlvbi5hdHRyKFwiZm9udC1zaXplXCIsIGR5bmFtaWNWYWx1ZUZvbnRTaXplICsgXCJweFwiKTtcblxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgbGV0IGRhdGFMZW4gPSB0aGlzLmRhdGEubGVuZ3RoICogMjtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2YWx1ZSBjeWNsaW5nIHRocm91Z2ggdHdpY2UgdG8gYWxsb3cgcm9sbG92ZXJcbiAgICAgICAgICAgIHdoaWxlICgoY29udGVudCA9PT0gbnVsbCkgJiYgKGNvdW50ZXIgPCBkYXRhTGVuKSkge1xuICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5mb3JtYXRWYWx1ZUNvbnRlbnQoY29tcG9zaXRlSW5kZXgsIChmcmFtZXMgKyBjb3VudGVyKSwgdGhpcyk7XG4gICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb250ZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbnRlbnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETzogYWRkIGN1c3RvbSBjb250ZW50IGZvciBjb21wb3NpdGUgb2sgc3RhdGVcbiAgICAgICAgICAgICAgY29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgIC8vIHNldCB0aGUgZm9udCBzaXplIHRvIGJlIHRoZSBzYW1lIGFzIHRoZSBsYWJlbCBhYm92ZVxuICAgICAgICAgICAgICAvL3ZhbHVlVGV4dExvY2F0aW9uLmF0dHIoXCJmb250LXNpemVcIiwgZHluYW1pY1ZhbHVlRm9udFNpemUgKyBcInB4XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZnJhbWVzKys7XG4gICAgICAgIH0sIHRoaXMub3B0LmFuaW1hdGlvblNwZWVkKTtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZvcm1hdFZhbHVlQ29udGVudChpLCBmcmFtZXMsIHRoaXNSZWYpOiBzdHJpbmcge1xuICAgIGxldCBkYXRhID0gdGhpc1JlZi5kYXRhW2ldO1xuICAgIC8vIG9wdGlvbnMgY2FuIHNwZWNpZnkgdG8gbm90IHNob3cgdGhlIHZhbHVlXG4gICAgaWYgKHR5cGVvZiAoZGF0YSkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwic2hvd1ZhbHVlXCIpKSB7XG4gICAgICAgIGlmICghZGF0YS5zaG93VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFkYXRhLmhhc093blByb3BlcnR5KFwidmFsdWVGb3JtYXR0ZWRcIikpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIGRhdGEsIHJldHVybiBub3RoaW5nXG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgc3dpdGNoIChkYXRhLmFuaW1hdGVNb2RlKSB7XG4gICAgICBjYXNlIFwiYWxsXCI6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInRyaWdnZXJlZFwiOlxuICAgICAgICAvLyByZXR1cm4gbm90aGluZyBpZiBtb2RlIGlzIHRyaWdnZXJlZCBhbmQgdGhlIHN0YXRlIGlzIDBcbiAgICAgICAgaWYgKGRhdGEudGhyZXNob2xkTGV2ZWwgPCAxKSB7XG4gICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGNvbnRlbnQgPSBkYXRhLnZhbHVlRm9ybWF0dGVkO1xuICAgIC8vIGlmIHRoZXJlJ3Mgbm8gdmFsdWVGb3JtYXR0ZWQsIHRoZXJlJ3Mgbm90aGluZyB0byBkaXNwbGF5XG4gICAgaWYgKCFjb250ZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKChkYXRhLnByZWZpeCkgJiYgKGRhdGEucHJlZml4Lmxlbmd0aCA+IDApKSB7XG4gICAgICBjb250ZW50ID0gZGF0YS5wcmVmaXggKyBcIiBcIiArIGNvbnRlbnQ7XG4gICAgfVxuICAgIGlmICgoZGF0YS5zdWZmaXgpICYmIChkYXRhLnN1ZmZpeC5sZW5ndGggPiAwKSkge1xuICAgICAgY29udGVudCA9IGNvbnRlbnQgKyBcIiBcIiArIGRhdGEuc3VmZml4O1xuICAgIH1cbiAgICAvLyBhIGNvbXBvc2l0ZSB3aWxsIGNvbnRhaW4gdGhlIFwid29yc3RcIiBjYXNlIGFzIHRoZSB2YWx1ZUZvcm1hdHRlZCxcbiAgICAvLyBhbmQgd2lsbCBoYXZlIGFsbCBvZiB0aGUgbWVtYmVycyBvZiB0aGUgY29tcG9zaXRlIGluY2x1ZGVkLlxuICAgIC8vIGFzIGZyYW1lcyBpbmNyZW1lbnQgZmluZCBhIHRyaWdnZXJlZCBtZW1iZXIgc3RhcnRpbmcgZnJvbSB0aGUgZnJhbWUgbW9kIGxlblxuICAgIGxldCBsZW4gPSBkYXRhLm1lbWJlcnMubGVuZ3RoO1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICBsZXQgdHJpZ2dlcmVkSW5kZXggPSAtMTtcbiAgICAgIGlmIChkYXRhLmFuaW1hdGVNb2RlID09PSBcImFsbFwiKSB7XG4gICAgICAgIHRyaWdnZXJlZEluZGV4ID0gZnJhbWVzICUgbGVuO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwidHJpZ2dlcmVkSW5kZXggZnJvbSBhbGwgbW9kZTogXCIgKyB0cmlnZ2VyZWRJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIChkYXRhLnRyaWdnZXJDYWNoZSkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBkYXRhLnRyaWdnZXJDYWNoZSA9IHRoaXMuYnVpbGRUcmlnZ2VyQ2FjaGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHogPSBmcmFtZXMgJSBkYXRhLnRyaWdnZXJDYWNoZS5sZW5ndGg7XG4gICAgICAgIHRyaWdnZXJlZEluZGV4ID0gZGF0YS50cmlnZ2VyQ2FjaGVbel0uaW5kZXg7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0cmlnZ2VyZWRJbmRleCBmcm9tIGNhY2hlIGlzOiBcIiArIHRyaWdnZXJlZEluZGV4KTtcbiAgICAgIH1cbiAgICAgIGxldCBhTWVtYmVyID0gZGF0YS5tZW1iZXJzW3RyaWdnZXJlZEluZGV4XTtcblxuICAgICAgY29udGVudCA9IGFNZW1iZXIubmFtZSArIFwiOiBcIiArIGFNZW1iZXIudmFsdWVGb3JtYXR0ZWQ7XG4gICAgICBpZiAoKGFNZW1iZXIucHJlZml4KSAmJiAoYU1lbWJlci5wcmVmaXgubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgY29udGVudCA9IGFNZW1iZXIucHJlZml4ICsgXCIgXCIgKyBjb250ZW50O1xuICAgICAgfVxuICAgICAgaWYgKChhTWVtYmVyLnN1ZmZpeCkgJiYgKGFNZW1iZXIuc3VmZml4Lmxlbmd0aCA+IDApKSB7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50ICsgXCIgXCIgKyBhTWVtYmVyLnN1ZmZpeDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYWxsb3cgdGVtcGxhdGluZ1xuICAgIC8vXG4gICAgaWYgKChjb250ZW50KSAmJiAoY29udGVudC5sZW5ndGggPiAwKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IHJlcGxhY2VkQ29udGVudCA9IHRoaXNSZWYudGVtcGxhdGVTcnYucmVwbGFjZVdpdGhUZXh0KGNvbnRlbnQpO1xuICAgICAgICBjb250ZW50ID0gcmVwbGFjZWRDb250ZW50O1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IHRlbXBsYXRlIHNlcnZlciB0aHJldyBlcnJvcjogXCIgKyBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGJ1aWxkVHJpZ2dlckNhY2hlKGl0ZW0pIHtcbiAgICAvL2NvbnNvbGUubG9nKFwiQnVpbGRpbmcgdHJpZ2dlciBjYWNoZSBmb3IgaXRlbVwiKTtcbiAgICBsZXQgdHJpZ2dlckNhY2hlID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLm1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBhTWVtYmVyID0gaXRlbS5tZW1iZXJzW2ldO1xuICAgICAgaWYgKGFNZW1iZXIudGhyZXNob2xkTGV2ZWwgPiAwKSB7XG4gICAgICAgIC8vIGFkZCB0byBsaXN0XG4gICAgICAgIGxldCBjYWNoZWRNZW1iZXJTdGF0ZSA9IHsgaW5kZXg6IGksIG5hbWU6IGFNZW1iZXIubmFtZSwgdmFsdWU6IGFNZW1iZXIudmFsdWUsIHRocmVzaG9sZExldmVsOiBhTWVtYmVyLnRocmVzaG9sZExldmVsIH07XG4gICAgICAgIHRyaWdnZXJDYWNoZS5wdXNoKGNhY2hlZE1lbWJlclN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gc29ydCBpdFxuICAgIHRyaWdnZXJDYWNoZSA9IF8ub3JkZXJCeSh0cmlnZ2VyQ2FjaGUsIFtcInRocmVzaG9sZExldmVsXCIsIFwidmFsdWVcIiwgXCJuYW1lXCJdLCBbXCJkZXNjXCIsIFwiZGVzY1wiLCBcImFzY1wiXSk7XG4gICAgcmV0dXJuIHRyaWdnZXJDYWNoZTtcbiAgfVxuXG4gIGdldEF1dG9IZXhSYWRpdXMoKTogbnVtYmVyIHtcbiAgICAvL1RoZSBtYXhpbXVtIHJhZGl1cyB0aGUgaGV4YWdvbnMgY2FuIGhhdmUgdG8gc3RpbGwgZml0IHRoZSBzY3JlZW5cbiAgICB2YXIgaGV4UmFkaXVzID0gZDMubWluKFxuICAgICAgW1xuICAgICAgICB0aGlzLm9wdC53aWR0aCAvICgodGhpcy5udW1Db2x1bW5zICsgMC41KSAqIE1hdGguc3FydCgzKSksXG4gICAgICAgIHRoaXMub3B0LmhlaWdodCAvICgodGhpcy5udW1Sb3dzICsgMSAvIDMpICogMS41KVxuICAgICAgXVxuICAgICk7XG4gICAgcmV0dXJuIGhleFJhZGl1cztcbiAgfVxuXG4gIGNhbGN1bGF0ZVNWR1NpemUoKSB7XG4gICAgLy8gVGhlIGhlaWdodCBvZiB0aGUgdG90YWwgZGlzcGxheSB3aWxsIGJlXG4gICAgLy8gdGhpcy5hdXRvSGVpZ2h0ID0gdGhpcy5udW1Sb3dzICogMyAvIDIgKiB0aGlzLmhleFJhZGl1cyArIDEgLyAyICogdGhpcy5oZXhSYWRpdXM7XG4gICAgLy8gd2hpY2ggaXMgdGhlIHNhbWUgYXNcbiAgICB0aGlzLmF1dG9IZWlnaHQgPSAodGhpcy5udW1Sb3dzICsgMSAvIDMpICogMyAvIDIgKiB0aGlzLmhleFJhZGl1cztcbiAgICB0aGlzLmF1dG9IZWlnaHQgLT0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgIC8vY29uc29sZS5sb2coXCJhdXRvaGVpZ2h0ID0gXCIgKyB0aGlzLmF1dG9IZWlnaHQpO1xuICAgIC8vIFRoZSB3aWR0aCBvZiB0aGUgdG90YWwgZGlzcGxheSB3aWxsIGJlXG4gICAgLy8gdGhpcy5hdXRvV2lkdGggPSB0aGlzLm51bUNvbHVtbnMgKiBNYXRoLnNxcnQoMykgKiB0aGlzLmhleFJhZGl1cyArIE1hdGguc3FydCgzKSAvIDIgKiB0aGlzLmhleFJhZGl1cztcbiAgICAvLyB3aGljaCBpcyB0aGUgc2FtZSBhc1xuICAgIHRoaXMuYXV0b1dpZHRoID0gKHRoaXMubnVtQ29sdW1ucyArIDEgLyAyKSAqIE1hdGguc3FydCgzKSAqIHRoaXMuaGV4UmFkaXVzO1xuICAgIHRoaXMuYXV0b1dpZHRoIC09IHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAvL2NvbnNvbGUubG9nKFwiYXV0b3dpZHRoID0gXCIgKyB0aGlzLmF1dG9XaWR0aCArIFwiIGF1dG9oZWlnaHQgPSBcIiArIHRoaXMuYXV0b0hlaWdodCk7XG4gIH1cblxuICAvLyBCdWlsZHMgdGhlIHBsYWNlaG9sZGVyIHBvbHlnb25zIG5lZWRlZCB0byByZXByZXNlbnQgZWFjaCBtZXRyaWNcbiAgZ2VuZXJhdGVQb2ludHMoKTogYW55IHtcbiAgICBsZXQgcG9pbnRzID0gW107XG4gICAgaWYgKHR5cGVvZiAodGhpcy5kYXRhKSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9XG4gICAgbGV0IG1heFJvd3NVc2VkID0gMDtcbiAgICBsZXQgY29sdW1uc1VzZWQgPSAwO1xuICAgIGxldCBtYXhDb2x1bW5zVXNlZCA9IDA7XG4gICAgLy8gd2hlbiBkdXBsaWNhdGluZyBwYW5lbHMsIHRoaXMgZ2V0cyBvZGRcbiAgICBpZiAodGhpcy5udW1Sb3dzID09PSBJbmZpbml0eSkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcIm51bVJvd3MgaW5maW5pdHkuLi5cIik7XG4gICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cbiAgICBpZiAodGhpcy5udW1Db2x1bW5zID09PSBOYU4pIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJudW1Db2x1bW5zIE5hTlwiKTtcbiAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspIHtcbiAgICAgIGlmICgocG9pbnRzLmxlbmd0aCA8IHRoaXMub3B0LmRpc3BsYXlMaW1pdCkgJiYgKHBvaW50cy5sZW5ndGggPCB0aGlzLmRhdGEubGVuZ3RoKSkge1xuICAgICAgICBtYXhSb3dzVXNlZCArPSAxO1xuICAgICAgICBjb2x1bW5zVXNlZCA9IDA7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5udW1Db2x1bW5zOyBqKyspIHtcbiAgICAgICAgICBpZiAoKHBvaW50cy5sZW5ndGggPCB0aGlzLm9wdC5kaXNwbGF5TGltaXQpICYmIChwb2ludHMubGVuZ3RoIDwgdGhpcy5kYXRhLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGNvbHVtbnNVc2VkICs9IDE7XG4gICAgICAgICAgICAvLyB0cmFjayB0aGUgbW9zdCBudW1iZXIgb2YgY29sdW1uc1xuICAgICAgICAgICAgaWYgKGNvbHVtbnNVc2VkID4gbWF4Q29sdW1uc1VzZWQpIHtcbiAgICAgICAgICAgICAgbWF4Q29sdW1uc1VzZWQgPSBjb2x1bW5zVXNlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvaW50cy5wdXNoKFt0aGlzLmhleFJhZGl1cyAqIGogKiAxLjc1LCB0aGlzLmhleFJhZGl1cyAqIGkgKiAxLjVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyhcIk1heCByb3dzIHVzZWQ6XCIgKyBtYXhSb3dzVXNlZCk7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFjdHVhbCBjb2x1bW5zIHVzZWQ6XCIgKyBtYXhDb2x1bW5zVXNlZCk7XG4gICAgdGhpcy5tYXhSb3dzVXNlZCA9IG1heFJvd3NVc2VkO1xuICAgIHRoaXMubWF4Q29sdW1uc1VzZWQgPSBtYXhDb2x1bW5zVXNlZDtcbiAgICByZXR1cm4gcG9pbnRzO1xuICB9XG5cbn1cbiJdfQ==