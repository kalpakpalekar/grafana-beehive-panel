System.register(["app/plugins/sdk", "lodash", "jquery", "app/core/utils/kbn", "app/core/time_series2", "./css/polystat.css!", "./d3wrapper", "./transformers", "./metric_overrides_manager", "./composites_manager", "./tooltip", "./utils", "./clickThroughTransformer"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var sdk_1, lodash_1, jquery_1, kbn_1, time_series2_1, d3wrapper_1, transformers_1, metric_overrides_manager_1, composites_manager_1, tooltip_1, utils_1, clickThroughTransformer_1, D3PolystatPanelCtrl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (_1) {
            },
            function (d3wrapper_1_1) {
                d3wrapper_1 = d3wrapper_1_1;
            },
            function (transformers_1_1) {
                transformers_1 = transformers_1_1;
            },
            function (metric_overrides_manager_1_1) {
                metric_overrides_manager_1 = metric_overrides_manager_1_1;
            },
            function (composites_manager_1_1) {
                composites_manager_1 = composites_manager_1_1;
            },
            function (tooltip_1_1) {
                tooltip_1 = tooltip_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (clickThroughTransformer_1_1) {
                clickThroughTransformer_1 = clickThroughTransformer_1_1;
            }
        ],
        execute: function () {
            D3PolystatPanelCtrl = (function (_super) {
                __extends(D3PolystatPanelCtrl, _super);
                function D3PolystatPanelCtrl($scope, $injector, templateSrv, alertSrv, $sanitize) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.$sanitize = $sanitize;
                    _this.animationModes = [
                        { value: "all", text: "Show All" },
                        { value: "triggered", text: "Show Triggered" }
                    ];
                    _this.displayModes = [
                        { value: "all", text: "Show All" },
                        { value: "triggered", text: "Show Triggered" }
                    ];
                    _this.thresholdStates = [
                        { value: 0, text: "ok" },
                        { value: 1, text: "warning" },
                        { value: 2, text: "critical" },
                        { value: 3, text: "custom" }
                    ];
                    _this.shapes = [
                        { value: "hexagon_pointed_top", text: "Hexagon Pointed Top" },
                        { value: "circle", text: "Circle" },
                        { value: "cross", text: "Cross" },
                        { value: "diamond", text: "Diamond" },
                        { value: "square", text: "Square" },
                        { value: "star", text: "Star" },
                        { value: "triangle", text: "Triangle" },
                        { value: "wye", text: "Wye" }
                    ];
                    _this.fontSizes = [
                        4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32,
                        34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54,
                        56, 58, 60, 62, 64, 66, 68, 70
                    ];
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.operatorOptions = [
                        { value: "avg", text: "Average" },
                        { value: "count", text: "Count" },
                        { value: "current", text: "Current" },
                        { value: "delta", text: "Delta" },
                        { value: "diff", text: "Difference" },
                        { value: "first", text: "First" },
                        { value: "logmin", text: "Log Min" },
                        { value: "max", text: "Max" },
                        { value: "min", text: "Min" },
                        { value: "name", text: "Name" },
                        { value: "last_time", text: "Time of Last Point" },
                        { value: "time_step", text: "Time Step" },
                        { value: "total", text: "Total" }
                    ];
                    _this.sortDirections = [
                        { value: "asc", text: "Ascending" },
                        { value: "desc", text: "Descending" }
                    ];
                    _this.sortFields = [
                        { value: "name", text: "Name" },
                        { value: "thresholdLevel", text: "Threshold Level" },
                        { value: "value", text: "Value" }
                    ];
                    _this.panelDefaults = {
                        savedComposites: [],
                        savedOverrides: Array(),
                        colors: ["#299c46", "rgba(237, 129, 40, 0.89)", "#d44a3a"],
                        polystat: {
                            animationSpeed: 2500,
                            columns: "",
                            columnAutoSize: true,
                            displayLimit: 100,
                            defaultClickThrough: "",
                            defaultClickThroughSanitize: false,
                            fontAutoScale: true,
                            fontSize: 12,
                            fontType: "Roboto",
                            globalUnitFormat: "short",
                            globalDecimals: 2,
                            globalDisplayMode: "all",
                            globalOperatorName: "avg",
                            globalDisplayTextTriggeredEmpty: "OK",
                            gradientEnabled: true,
                            hexagonSortByDirection: "asc",
                            hexagonSortByField: "name",
                            maxMetrics: 0,
                            polygonBorderSize: 2,
                            polygonBorderColor: "black",
                            polygonGlobalFillColor: "#0a50a1",
                            radius: "",
                            radiusAutoSize: true,
                            rows: "",
                            rowAutoSize: true,
                            shape: "hexagon_pointed_top",
                            tooltipDisplayMode: "all",
                            tooltipDisplayTextTriggeredEmpty: "OK",
                            tooltipFontSize: 12,
                            tooltipFontType: "Roboto",
                            tooltipPrimarySortDirection: "desc",
                            tooltipPrimarySortField: "thresholdLevel",
                            tooltipSecondarySortDirection: "desc",
                            tooltipSecondarySortField: "value",
                            tooltipTimestampEnabled: true,
                        },
                    };
                    lodash_1.default.defaultsDeep(_this.panel, _this.panelDefaults);
                    _this.d3DivId = "d3_svg_" + _this.panel.id;
                    _this.containerDivId = "container_" + _this.d3DivId;
                    _this.alertSrvRef = alertSrv;
                    _this.initialized = false;
                    _this.panelContainer = null;
                    _this.templateSrv = templateSrv;
                    _this.svgContainer = null;
                    _this.panelWidth = null;
                    _this.panelHeight = null;
                    _this.polystatData = new Array();
                    _this.d3Object = null;
                    _this.data = [];
                    _this.series = [];
                    _this.polystatData = [];
                    _this.tooltipContent = [];
                    _this.overridesCtrl = new metric_overrides_manager_1.MetricOverridesManager($scope, templateSrv, $sanitize, _this.panel.savedOverrides);
                    _this.compositesManager = new composites_manager_1.CompositesManager($scope, templateSrv, $sanitize, _this.panel.savedComposites);
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("data-error", _this.onDataError.bind(_this));
                    _this.events.on("data-snapshot-load", _this.onDataReceived.bind(_this));
                    return _this;
                }
                D3PolystatPanelCtrl.prototype.onInitEditMode = function () {
                    var thisPanelPath = "public/plugins/" + this.panel.type + "/";
                    var optionsPath = thisPanelPath + "partials/editor.options.html";
                    this.addEditorTab("Options", optionsPath, 2);
                    var overridesPath = thisPanelPath + "partials/editor.overrides.html";
                    this.addEditorTab("Overrides", overridesPath, 3);
                    var compositesPath = thisPanelPath + "partials/editor.composites.html";
                    this.addEditorTab("Composites", compositesPath, 4);
                };
                D3PolystatPanelCtrl.prototype.setContainer = function (container) {
                    this.panelContainer = container;
                    this.svgContainer = container;
                };
                D3PolystatPanelCtrl.prototype.getPanelWidthFailsafe = function () {
                    var trueWidth = 0;
                    if (typeof this.panel.gridPos !== "undefined") {
                        var viewPortWidth_1 = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        var pixelsPerSlot = viewPortWidth_1 / 24;
                        trueWidth = Math.round(this.panel.gridPos.w * pixelsPerSlot);
                        return trueWidth;
                    }
                    if (typeof this.panel.span === "undefined") {
                        if (this.editModeInitiated) {
                            trueWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
                        }
                        else {
                            trueWidth = this.panelContainer.offsetParent.clientWidth;
                        }
                    }
                    else {
                        var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        var pixelsPerSpan = viewPortWidth / 12;
                        trueWidth = Math.round(this.panel.span * pixelsPerSpan);
                    }
                    return trueWidth;
                };
                D3PolystatPanelCtrl.prototype.getPanelHeight = function () {
                    var tmpPanelHeight = this.panel.height;
                    if ((typeof tmpPanelHeight === "undefined") || (tmpPanelHeight === "")) {
                        tmpPanelHeight = String(this.height);
                        if (typeof this.panel.span !== "undefined") {
                            var panelTitleOffset = 20;
                            if (this.panel.title !== "") {
                                panelTitleOffset = 42;
                            }
                            tmpPanelHeight = String(this.containerHeight - panelTitleOffset);
                        }
                        if (typeof tmpPanelHeight === "undefined") {
                            tmpPanelHeight = this.row.height;
                            if (typeof tmpPanelHeight === "undefined") {
                                tmpPanelHeight = "250";
                            }
                        }
                    }
                    tmpPanelHeight = tmpPanelHeight.replace("px", "");
                    var actualHeight = parseInt(tmpPanelHeight, 10);
                    return actualHeight;
                };
                D3PolystatPanelCtrl.prototype.clearSVG = function () {
                    if (jquery_1.default("#" + this.d3DivId).length) {
                        jquery_1.default("#" + this.d3DivId).remove();
                    }
                    if (jquery_1.default("#" + this.d3DivId + "-panel").length) {
                        jquery_1.default("#" + this.d3DivId + "-panel").remove();
                    }
                    if (jquery_1.default("#" + this.d3DivId + "-tooltip").length) {
                        jquery_1.default("#" + this.d3DivId + "-tooltip").remove();
                    }
                };
                D3PolystatPanelCtrl.prototype.renderD3 = function () {
                    this.setValues(this.data);
                    this.clearSVG();
                    if (this.panelWidth === 0) {
                        this.panelWidth = this.getPanelWidthFailsafe();
                    }
                    this.panelHeight = this.getPanelHeight();
                    var margin = { top: 0, right: 0, bottom: 0, left: 0 };
                    var width = this.panelWidth;
                    var height = this.panelHeight;
                    margin.top = 0;
                    if ((typeof this.panel.span !== "undefined") && (this.panel.title !== "")) {
                        margin.top = 7;
                    }
                    margin.bottom = 0;
                    if (typeof this.panel.polystat.polygonBorderSize === "undefined") {
                        this.panel.polystat.polygonBorderSize = 2;
                    }
                    if (typeof this.panel.polystat.polygonBorderColor === "undefined") {
                        this.panel.polystat.polygonBorderColor = "black";
                    }
                    var opt = {
                        width: width,
                        height: height,
                        radius: this.panel.polystat.radius,
                        radiusAutoSize: this.panel.polystat.radiusAutoSize,
                        tooltipFontSize: this.panel.polystat.tooltipFontSize,
                        tooltipFontType: this.panel.polystat.tooltipFontType,
                        data: this.polystatData,
                        displayLimit: this.panel.polystat.displayLimit,
                        globalDisplayMode: this.panel.polystat.globalDisplayMode,
                        columns: this.panel.polystat.columns,
                        columnAutoSize: this.panel.polystat.columnAutoSize,
                        rows: this.panel.polystat.rows,
                        rowAutoSize: this.panel.polystat.rowAutoSize,
                        tooltipContent: this.tooltipContent,
                        animationSpeed: this.panel.polystat.animationSpeed,
                        defaultClickThrough: this.getDefaultClickThrough(NaN),
                        polystat: this.panel.polystat,
                    };
                    this.d3Object = new d3wrapper_1.D3Wrapper(this.templateSrv, this.svgContainer, this.d3DivId, opt);
                    this.d3Object.draw();
                };
                D3PolystatPanelCtrl.prototype.removeValueMap = function (map) {
                    var index = lodash_1.default.indexOf(this.panel.valueMaps, map);
                    this.panel.valueMaps.splice(index, 1);
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.addValueMap = function () {
                    this.panel.valueMaps.push({ value: "", op: "=", text: "" });
                };
                D3PolystatPanelCtrl.prototype.removeRangeMap = function (rangeMap) {
                    var index = lodash_1.default.indexOf(this.panel.rangeMaps, rangeMap);
                    this.panel.rangeMaps.splice(index, 1);
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.addRangeMap = function () {
                    this.panel.rangeMaps.push({ from: "", to: "", text: "" });
                };
                D3PolystatPanelCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    if (!scope) {
                        return;
                    }
                    if (!attrs) {
                        return;
                    }
                    var panelByClass = elem.find(".grafana-d3-polystat");
                    panelByClass.append("<div style=\"width: 100%; height: 100%;\" id=\"" + ctrl.containerDivId + "\"></div>");
                    var container = panelByClass[0].childNodes[0];
                    ctrl.setContainer(container);
                    elem = elem.find(".grafana-d3-polystat");
                    function render() {
                        ctrl.panelWidth = elem.width() + 20;
                        ctrl.renderD3();
                    }
                    this.events.on("render", function () {
                        ctrl.panelWidth = elem.width() + 20;
                        render();
                        ctrl.renderingCompleted();
                    });
                };
                D3PolystatPanelCtrl.prototype.setValues = function (dataList) {
                    this.dataRaw = dataList;
                    if (this.dataRaw && this.dataRaw.length) {
                        if (this.dataRaw[0].type === "table") {
                            this.panel.transform = "table";
                        }
                        else {
                            if (this.dataRaw[0].type === "docs") {
                                this.panel.transform = "json";
                            }
                            else {
                                if (this.panel.transform === "table" || this.panel.transform === "json") {
                                    this.panel.transform = "timeseries_to_rows";
                                }
                            }
                        }
                    }
                    this.polystatData.length = 0;
                    if (this.series && this.series.length > 0) {
                        for (var index = 0; index < this.series.length; index++) {
                            var aSeries = this.series[index];
                            var converted = transformers_1.Transformers.TimeSeriesToPolystat(this.panel.polystat.globalOperatorName, aSeries);
                            this.polystatData.push(converted);
                        }
                    }
                    this.applyGlobalFormatting(this.polystatData);
                    this.polystatData = this.filterByGlobalDisplayMode(this.polystatData);
                    this.polystatData = lodash_1.default.orderBy(this.polystatData, [this.panel.polystat.hexagonSortByField], [this.panel.polystat.hexagonSortByDirection]);
                    this.overridesCtrl.applyOverrides(this.polystatData);
                    this.polystatData = this.compositesManager.applyComposites(this.polystatData);
                    for (var index = 0; index < this.polystatData.length; index++) {
                        if (this.polystatData[index].clickThrough.length === 0) {
                            this.polystatData[index].clickThrough = this.getDefaultClickThrough(index);
                            this.polystatData[index].sanitizeURLEnabled = this.panel.polystat.defaultClickThroughSanitize;
                            this.polystatData[index].sanitizedURL = this.$sanitize(this.polystatData[index].clickThrough);
                        }
                    }
                    this.tooltipContent = tooltip_1.Tooltip.generate(this.$scope, this.polystatData, this.panel.polystat);
                };
                D3PolystatPanelCtrl.prototype.applyGlobalFormatting = function (data) {
                    for (var index = 0; index < data.length; index++) {
                        var formatFunc = kbn_1.default.valueFormats[this.panel.polystat.globalUnitFormat];
                        if (formatFunc) {
                            var result = utils_1.GetDecimalsForValue(data[index].value, this.panel.polystat.globalDecimals);
                            data[index].valueFormatted = formatFunc(data[index].value, result.decimals, result.scaledDecimals);
                            data[index].valueRounded = kbn_1.default.roundValue(data[index].value, result.decimals);
                        }
                        data[index].color = this.panel.polystat.polygonGlobalFillColor;
                    }
                };
                D3PolystatPanelCtrl.prototype.filterByGlobalDisplayMode = function (data) {
                    var filteredMetrics = new Array();
                    var compositeMetrics = new Array();
                    if (this.panel.polystat.globalDisplayMode !== "all") {
                        var dataLen = data.length;
                        for (var i = 0; i < dataLen; i++) {
                            var item = data[i];
                            if (item.isComposite) {
                                compositeMetrics.push(item);
                            }
                            if (item.thresholdLevel < 1) {
                                filteredMetrics.push(i);
                            }
                        }
                        for (var i = data.length; i >= 0; i--) {
                            if (lodash_1.default.includes(filteredMetrics, i)) {
                                data.splice(i, 1);
                            }
                        }
                        if (data.length === 0) {
                            if (compositeMetrics.length > 0) {
                                data = compositeMetrics;
                            }
                        }
                    }
                    return data;
                };
                D3PolystatPanelCtrl.prototype.onDataError = function (err) {
                    console.log(err);
                    this.onDataReceived([]);
                };
                D3PolystatPanelCtrl.prototype.onDataReceived = function (dataList) {
                    this.series = dataList.map(this.seriesHandler.bind(this));
                    var data = {
                        value: 0,
                        valueFormatted: 0,
                        valueRounded: 0
                    };
                    this.setValues(data);
                    this.data = data;
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.seriesHandler = function (seriesData) {
                    var series = new time_series2_1.default({
                        datapoints: seriesData.datapoints,
                        alias: seriesData.target,
                    });
                    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
                    return series;
                };
                D3PolystatPanelCtrl.prototype.invertColorOrder = function () {
                    var tmp = this.panel.colors[0];
                    this.panel.colors[0] = this.panel.colors[2];
                    this.panel.colors[2] = tmp;
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.validateAnimationSpeed = function () {
                    var speed = this.panel.polystat.animationSpeed;
                    var newSpeed = 5000;
                    if (speed) {
                        if (!isNaN(parseInt(speed, 10))) {
                            var checkSpeed = parseInt(speed, 10);
                            if (checkSpeed >= 500) {
                                newSpeed = checkSpeed;
                            }
                        }
                    }
                    this.panel.polystat.animationSpeed = newSpeed;
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.validateColumnValue = function () {
                    var columns = this.panel.polystat.columns;
                    var newColumns = 1;
                    if (columns) {
                        if (!isNaN(parseInt(columns, 10))) {
                            var checkColumns = parseInt(columns, 10);
                            if (checkColumns > 0) {
                                newColumns = checkColumns;
                            }
                        }
                    }
                    this.panel.polystat.columns = newColumns;
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.validateRowValue = function () {
                    var rows = this.panel.polystat.rows;
                    var newRows = 1;
                    if (rows) {
                        if (!isNaN(parseInt(rows, 10))) {
                            var checkRows = parseInt(rows, 10);
                            if (checkRows > 0) {
                                newRows = checkRows;
                            }
                        }
                    }
                    this.panel.polystat.rows = newRows;
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.validateRadiusValue = function () {
                    var radius = this.panel.polystat.radius;
                    var newRadius = 25;
                    if (radius !== null) {
                        if (!isNaN(parseInt(radius, 10))) {
                            var checkRadius = parseInt(radius, 10);
                            if (checkRadius > 0) {
                                newRadius = checkRadius;
                            }
                        }
                    }
                    this.panel.polystat.radius = newRadius;
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.validateBorderSizeValue = function () {
                    var borderSize = this.panel.polystat.polygonBorderSize;
                    var newBorderSize = 2;
                    if (borderSize !== null) {
                        if (!isNaN(parseInt(borderSize, 10))) {
                            var checkBorderSize = parseInt(borderSize, 10);
                            if (checkBorderSize >= 0) {
                                newBorderSize = checkBorderSize;
                            }
                        }
                    }
                    this.panel.polystat.polygonBorderSize = newBorderSize;
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.updatePolygonBorderColor = function () {
                    this.panel.polystat.polygonBorderColor = utils_1.RGBToHex(this.panel.polystat.polygonBorderColor);
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.updatePolygonGlobalFillColor = function () {
                    this.panel.polystat.polygonGlobalFillColor = utils_1.RGBToHex(this.panel.polystat.polygonGlobalFillColor);
                    this.render();
                };
                D3PolystatPanelCtrl.prototype.getDefaultClickThrough = function (index) {
                    var url = this.panel.polystat.defaultClickThrough;
                    url = clickThroughTransformer_1.ClickThroughTransformer.tranformSingleMetric(index, url, this.polystatData);
                    url = clickThroughTransformer_1.ClickThroughTransformer.tranformNthMetric(url, this.polystatData);
                    url = this.templateSrv.replaceWithText(url);
                    return url;
                };
                D3PolystatPanelCtrl.prototype.setGlobalUnitFormat = function (subItem) {
                    this.panel.polystat.globalUnitFormat = subItem.value;
                };
                D3PolystatPanelCtrl.templateUrl = "partials/template.html";
                return D3PolystatPanelCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("D3PolystatPanelCtrl", D3PolystatPanelCtrl);
            exports_1("MetricsPanelCtrl", D3PolystatPanelCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFrQmtDLHVDQUFnQjtnQkF5SGhELDZCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBVSxTQUFTO29CQUF2RSxZQUNFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0F5QnpCO29CQTFCNkQsZUFBUyxHQUFULFNBQVMsQ0FBQTtvQkF2SHZFLG9CQUFjLEdBQUc7d0JBQ2YsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7d0JBQ2xDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7cUJBQy9DLENBQUM7b0JBQ0Ysa0JBQVksR0FBRzt3QkFDYixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTt3QkFDbEMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtxQkFDL0MsQ0FBQztvQkFDRixxQkFBZSxHQUFHO3dCQUNoQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTt3QkFDeEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7d0JBQzdCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO3dCQUM5QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtxQkFDN0IsQ0FBQztvQkFDRixZQUFNLEdBQUc7d0JBQ1AsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFO3dCQUU3RCxFQUFFLEtBQUss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QixDQUFDO2dCQWdrQmhELDBCQUFDO2FBQUEsQUFqa0JELENBQWtDLHNCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxuaW1wb3J0IHsgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBrYm4gZnJvbSBcImFwcC9jb3JlL3V0aWxzL2tiblwiO1xuaW1wb3J0IFRpbWVTZXJpZXMgZnJvbSBcImFwcC9jb3JlL3RpbWVfc2VyaWVzMlwiO1xuXG5pbXBvcnQgXCIuL2Nzcy9wb2x5c3RhdC5jc3MhXCI7XG5pbXBvcnQgeyBEM1dyYXBwZXIgfSBmcm9tIFwiLi9kM3dyYXBwZXJcIjtcbmltcG9ydCB7IFRyYW5zZm9ybWVycyB9IGZyb20gXCIuL3RyYW5zZm9ybWVyc1wiO1xuaW1wb3J0IHsgUG9seXN0YXRNb2RlbCB9IGZyb20gXCIuL3BvbHlzdGF0bW9kZWxcIjtcbmltcG9ydCB7IE1ldHJpY092ZXJyaWRlc01hbmFnZXIsIE1ldHJpY092ZXJyaWRlIH0gZnJvbSBcIi4vbWV0cmljX292ZXJyaWRlc19tYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb21wb3NpdGVzTWFuYWdlciB9IGZyb20gXCIuL2NvbXBvc2l0ZXNfbWFuYWdlclwiO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gXCIuL3Rvb2x0aXBcIjtcbmltcG9ydCB7IEdldERlY2ltYWxzRm9yVmFsdWUsIFJHQlRvSGV4IH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IENsaWNrVGhyb3VnaFRyYW5zZm9ybWVyIH0gZnJvbSBcIi4vY2xpY2tUaHJvdWdoVHJhbnNmb3JtZXJcIjtcblxuXG5jbGFzcyBEM1BvbHlzdGF0UGFuZWxDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XG4gIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwicGFydGlhbHMvdGVtcGxhdGUuaHRtbFwiO1xuICBhbmltYXRpb25Nb2RlcyA9IFtcbiAgICB7IHZhbHVlOiBcImFsbFwiLCB0ZXh0OiBcIlNob3cgQWxsXCIgfSxcbiAgICB7IHZhbHVlOiBcInRyaWdnZXJlZFwiLCB0ZXh0OiBcIlNob3cgVHJpZ2dlcmVkXCIgfVxuICBdO1xuICBkaXNwbGF5TW9kZXMgPSBbXG4gICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogXCJTaG93IEFsbFwiIH0sXG4gICAgeyB2YWx1ZTogXCJ0cmlnZ2VyZWRcIiwgdGV4dDogXCJTaG93IFRyaWdnZXJlZFwiIH1cbiAgXTtcbiAgdGhyZXNob2xkU3RhdGVzID0gW1xuICAgIHsgdmFsdWU6IDAsIHRleHQ6IFwib2tcIiB9LFxuICAgIHsgdmFsdWU6IDEsIHRleHQ6IFwid2FybmluZ1wiIH0sXG4gICAgeyB2YWx1ZTogMiwgdGV4dDogXCJjcml0aWNhbFwiIH0sXG4gICAgeyB2YWx1ZTogMywgdGV4dDogXCJjdXN0b21cIiB9XG4gIF07XG4gIHNoYXBlcyA9IFtcbiAgICB7IHZhbHVlOiBcImhleGFnb25fcG9pbnRlZF90b3BcIiwgdGV4dDogXCJIZXhhZ29uIFBvaW50ZWQgVG9wXCIgfSxcbiAgICAvLyB7IHZhbHVlOiBcImhleGFnb25fZmxhdF90b3BcIiwgdGV4dDogXCJIZXhhZ29uIEZsYXQgVG9wXCIgfSxcbiAgICB7IHZhbHVlOiBcImNpcmNsZVwiLCB0ZXh0OiBcIkNpcmNsZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJjcm9zc1wiLCB0ZXh0OiBcIkNyb3NzXCIgfSxcbiAgICB7IHZhbHVlOiBcImRpYW1vbmRcIiwgdGV4dDogXCJEaWFtb25kXCIgfSxcbiAgICB7IHZhbHVlOiBcInNxdWFyZVwiLCB0ZXh0OiBcIlNxdWFyZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJzdGFyXCIsIHRleHQ6IFwiU3RhclwiIH0sXG4gICAgeyB2YWx1ZTogXCJ0cmlhbmdsZVwiLCB0ZXh0OiBcIlRyaWFuZ2xlXCIgfSxcbiAgICB7IHZhbHVlOiBcInd5ZVwiLCB0ZXh0OiBcIld5ZVwiIH1cbiAgXTtcbiAgZm9udFNpemVzID0gW1xuICAgIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsXG4gICAgMTYsIDE3LCAxOCwgMTksIDIwLCAyMiwgMjQsIDI2LCAyOCwgMzAsIDMyLFxuICAgIDM0LCAzNiwgMzgsIDQwLCA0MiwgNDQsIDQ2LCA0OCwgNTAsIDUyLCA1NCxcbiAgICA1NiwgNTgsIDYwLCA2MiwgNjQsIDY2LCA2OCwgNzBdO1xuICB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xuICBvcGVyYXRvck9wdGlvbnMgPSBbXG4gICAgeyB2YWx1ZTogXCJhdmdcIiwgdGV4dDogXCJBdmVyYWdlXCIgfSxcbiAgICB7IHZhbHVlOiBcImNvdW50XCIsIHRleHQ6IFwiQ291bnRcIiB9LFxuICAgIHsgdmFsdWU6IFwiY3VycmVudFwiLCB0ZXh0OiBcIkN1cnJlbnRcIiB9LFxuICAgIHsgdmFsdWU6IFwiZGVsdGFcIiwgdGV4dDogXCJEZWx0YVwiIH0sXG4gICAgeyB2YWx1ZTogXCJkaWZmXCIsIHRleHQ6IFwiRGlmZmVyZW5jZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJmaXJzdFwiLCB0ZXh0OiBcIkZpcnN0XCIgfSxcbiAgICB7IHZhbHVlOiBcImxvZ21pblwiLCB0ZXh0OiBcIkxvZyBNaW5cIiB9LFxuICAgIHsgdmFsdWU6IFwibWF4XCIsIHRleHQ6IFwiTWF4XCIgfSxcbiAgICB7IHZhbHVlOiBcIm1pblwiLCB0ZXh0OiBcIk1pblwiIH0sXG4gICAgeyB2YWx1ZTogXCJuYW1lXCIsIHRleHQ6IFwiTmFtZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJsYXN0X3RpbWVcIiwgdGV4dDogXCJUaW1lIG9mIExhc3QgUG9pbnRcIiB9LFxuICAgIHsgdmFsdWU6IFwidGltZV9zdGVwXCIsIHRleHQ6IFwiVGltZSBTdGVwXCIgfSxcbiAgICB7IHZhbHVlOiBcInRvdGFsXCIsIHRleHQ6IFwiVG90YWxcIiB9XG4gIF07XG4gIHNvcnREaXJlY3Rpb25zID0gW1xuICAgIHsgdmFsdWU6IFwiYXNjXCIsIHRleHQ6IFwiQXNjZW5kaW5nXCIgfSxcbiAgICB7IHZhbHVlOiBcImRlc2NcIiwgdGV4dDogXCJEZXNjZW5kaW5nXCIgfVxuICBdO1xuICBzb3J0RmllbGRzID0gW1xuICAgIHsgdmFsdWU6IFwibmFtZVwiLCB0ZXh0OiBcIk5hbWVcIiB9LFxuICAgIHsgdmFsdWU6IFwidGhyZXNob2xkTGV2ZWxcIiwgdGV4dDogXCJUaHJlc2hvbGQgTGV2ZWxcIiB9LFxuICAgIHsgdmFsdWU6IFwidmFsdWVcIiwgdGV4dDogXCJWYWx1ZVwiIH1cbiAgXTtcblxuICBkYXRhUmF3OiBhbnk7XG4gIHBvbHlzdGF0RGF0YTogUG9seXN0YXRNb2RlbFtdO1xuICBzY29wZXJlZjogYW55O1xuICBhbGVydFNydlJlZjogYW55O1xuICBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgcGFuZWxDb250YWluZXI6IGFueTtcbiAgZDNPYmplY3Q6IEQzV3JhcHBlcjtcbiAgZGF0YTogYW55O1xuICBzZXJpZXM6IGFueVtdO1xuICB0ZW1wbGF0ZVNydjogYW55O1xuICBvdmVycmlkZXNDdHJsOiBNZXRyaWNPdmVycmlkZXNNYW5hZ2VyO1xuICBjb21wb3NpdGVzTWFuYWdlcjogQ29tcG9zaXRlc01hbmFnZXI7XG4gIHRvb2x0aXBDb250ZW50OiBzdHJpbmdbXTtcbiAgZDNEaXZJZDogc3RyaW5nO1xuICBjb250YWluZXJEaXZJZDogc3RyaW5nO1xuICBzdmdDb250YWluZXI6IGFueTtcbiAgcGFuZWxXaWR0aDogYW55O1xuICBwYW5lbEhlaWdodDogYW55O1xuXG4gIHBhbmVsRGVmYXVsdHMgPSB7XG4gICAgc2F2ZWRDb21wb3NpdGVzOiBbXSxcbiAgICBzYXZlZE92ZXJyaWRlczogQXJyYXk8TWV0cmljT3ZlcnJpZGU+KCksXG4gICAgY29sb3JzOiBbXCIjMjk5YzQ2XCIsIFwicmdiYSgyMzcsIDEyOSwgNDAsIDAuODkpXCIsIFwiI2Q0NGEzYVwiXSxcbiAgICBwb2x5c3RhdDoge1xuICAgICAgYW5pbWF0aW9uU3BlZWQ6IDI1MDAsXG4gICAgICBjb2x1bW5zOiBcIlwiLFxuICAgICAgY29sdW1uQXV0b1NpemU6IHRydWUsXG4gICAgICBkaXNwbGF5TGltaXQ6IDEwMCxcbiAgICAgIGRlZmF1bHRDbGlja1Rocm91Z2g6IFwiXCIsXG4gICAgICBkZWZhdWx0Q2xpY2tUaHJvdWdoU2FuaXRpemU6IGZhbHNlLFxuICAgICAgZm9udEF1dG9TY2FsZTogdHJ1ZSxcbiAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgIGZvbnRUeXBlOiBcIlJvYm90b1wiLFxuICAgICAgZ2xvYmFsVW5pdEZvcm1hdDogXCJzaG9ydFwiLFxuICAgICAgZ2xvYmFsRGVjaW1hbHM6IDIsXG4gICAgICBnbG9iYWxEaXNwbGF5TW9kZTogXCJhbGxcIixcbiAgICAgIGdsb2JhbE9wZXJhdG9yTmFtZTogXCJhdmdcIixcbiAgICAgIGdsb2JhbERpc3BsYXlUZXh0VHJpZ2dlcmVkRW1wdHk6IFwiT0tcIixcbiAgICAgIGdyYWRpZW50RW5hYmxlZDogdHJ1ZSxcbiAgICAgIGhleGFnb25Tb3J0QnlEaXJlY3Rpb246IFwiYXNjXCIsXG4gICAgICBoZXhhZ29uU29ydEJ5RmllbGQ6IFwibmFtZVwiLFxuICAgICAgbWF4TWV0cmljczogMCxcbiAgICAgIHBvbHlnb25Cb3JkZXJTaXplOiAyLFxuICAgICAgcG9seWdvbkJvcmRlckNvbG9yOiBcImJsYWNrXCIsXG4gICAgICBwb2x5Z29uR2xvYmFsRmlsbENvbG9yOiBcIiMwYTUwYTFcIixcbiAgICAgIHJhZGl1czogXCJcIixcbiAgICAgIHJhZGl1c0F1dG9TaXplOiB0cnVlLFxuICAgICAgcm93czogXCJcIixcbiAgICAgIHJvd0F1dG9TaXplOiB0cnVlLFxuICAgICAgc2hhcGU6IFwiaGV4YWdvbl9wb2ludGVkX3RvcFwiLFxuICAgICAgdG9vbHRpcERpc3BsYXlNb2RlOiBcImFsbFwiLFxuICAgICAgdG9vbHRpcERpc3BsYXlUZXh0VHJpZ2dlcmVkRW1wdHk6IFwiT0tcIixcbiAgICAgIHRvb2x0aXBGb250U2l6ZTogMTIsXG4gICAgICB0b29sdGlwRm9udFR5cGU6IFwiUm9ib3RvXCIsXG4gICAgICB0b29sdGlwUHJpbWFyeVNvcnREaXJlY3Rpb246IFwiZGVzY1wiLFxuICAgICAgdG9vbHRpcFByaW1hcnlTb3J0RmllbGQ6IFwidGhyZXNob2xkTGV2ZWxcIixcbiAgICAgIHRvb2x0aXBTZWNvbmRhcnlTb3J0RGlyZWN0aW9uOiBcImRlc2NcIixcbiAgICAgIHRvb2x0aXBTZWNvbmRhcnlTb3J0RmllbGQ6IFwidmFsdWVcIixcbiAgICAgIHRvb2x0aXBUaW1lc3RhbXBFbmFibGVkOiB0cnVlLFxuICAgIH0sXG4gIH07XG5cblxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3RvciwgdGVtcGxhdGVTcnYsIGFsZXJ0U3J2LCBwcml2YXRlICRzYW5pdGl6ZSkge1xuICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcbiAgICAvLyBtZXJnZSBleGlzdGluZyBzZXR0aW5ncyB3aXRoIG91ciBkZWZhdWx0c1xuICAgIF8uZGVmYXVsdHNEZWVwKHRoaXMucGFuZWwsIHRoaXMucGFuZWxEZWZhdWx0cyk7XG5cbiAgICB0aGlzLmQzRGl2SWQgPSBcImQzX3N2Z19cIiArIHRoaXMucGFuZWwuaWQ7XG4gICAgdGhpcy5jb250YWluZXJEaXZJZCA9IFwiY29udGFpbmVyX1wiICsgdGhpcy5kM0RpdklkO1xuICAgIHRoaXMuYWxlcnRTcnZSZWYgPSBhbGVydFNydjtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5wYW5lbENvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50ZW1wbGF0ZVNydiA9IHRlbXBsYXRlU3J2O1xuICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnBhbmVsV2lkdGggPSBudWxsO1xuICAgIHRoaXMucGFuZWxIZWlnaHQgPSBudWxsO1xuICAgIHRoaXMucG9seXN0YXREYXRhID0gbmV3IEFycmF5PFBvbHlzdGF0TW9kZWw+KCk7XG4gICAgdGhpcy5kM09iamVjdCA9IG51bGw7XG4gICAgdGhpcy5kYXRhID0gW107XG4gICAgdGhpcy5zZXJpZXMgPSBbXTtcbiAgICB0aGlzLnBvbHlzdGF0RGF0YSA9IFtdO1xuICAgIHRoaXMudG9vbHRpcENvbnRlbnQgPSBbXTtcbiAgICB0aGlzLm92ZXJyaWRlc0N0cmwgPSBuZXcgTWV0cmljT3ZlcnJpZGVzTWFuYWdlcigkc2NvcGUsIHRlbXBsYXRlU3J2LCAkc2FuaXRpemUsIHRoaXMucGFuZWwuc2F2ZWRPdmVycmlkZXMpO1xuICAgIHRoaXMuY29tcG9zaXRlc01hbmFnZXIgPSBuZXcgQ29tcG9zaXRlc01hbmFnZXIoJHNjb3BlLCB0ZW1wbGF0ZVNydiwgJHNhbml0aXplLCB0aGlzLnBhbmVsLnNhdmVkQ29tcG9zaXRlcyk7XG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1lcnJvclwiLCB0aGlzLm9uRGF0YUVycm9yLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1zbmFwc2hvdC1sb2FkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuXG4gIG9uSW5pdEVkaXRNb2RlKCkge1xuICAgIC8vIGRldGVybWluZSB0aGUgcGF0aCB0byB0aGlzIHBsdWdpbiBiYXNlIG9uIHRoZSBuYW1lIGZvdW5kIGluIHBhbmVsLnR5cGVcbiAgICB2YXIgdGhpc1BhbmVsUGF0aCA9IFwicHVibGljL3BsdWdpbnMvXCIgKyB0aGlzLnBhbmVsLnR5cGUgKyBcIi9cIjtcbiAgICAvLyBhZGQgdGhlIHJlbGF0aXZlIHBhdGggdG8gdGhlIHBhcnRpYWxcbiAgICB2YXIgb3B0aW9uc1BhdGggPSB0aGlzUGFuZWxQYXRoICsgXCJwYXJ0aWFscy9lZGl0b3Iub3B0aW9ucy5odG1sXCI7XG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJPcHRpb25zXCIsIG9wdGlvbnNQYXRoLCAyKTtcbiAgICB2YXIgb3ZlcnJpZGVzUGF0aCA9IHRoaXNQYW5lbFBhdGggKyBcInBhcnRpYWxzL2VkaXRvci5vdmVycmlkZXMuaHRtbFwiO1xuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiT3ZlcnJpZGVzXCIsIG92ZXJyaWRlc1BhdGgsIDMpO1xuICAgIHZhciBjb21wb3NpdGVzUGF0aCA9IHRoaXNQYW5lbFBhdGggKyBcInBhcnRpYWxzL2VkaXRvci5jb21wb3NpdGVzLmh0bWxcIjtcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIkNvbXBvc2l0ZXNcIiwgY29tcG9zaXRlc1BhdGgsIDQpO1xuICAgIC8vIGRpc2FibGVkIGZvciBub3dcbiAgICAvL3ZhciBtYXBwaW5nc1BhdGggPSB0aGlzUGFuZWxQYXRoICsgXCJwYXJ0aWFscy9lZGl0b3IubWFwcGluZ3MuaHRtbFwiO1xuICAgIC8vdGhpcy5hZGRFZGl0b3JUYWIoXCJWYWx1ZSBNYXBwaW5nc1wiLCBtYXBwaW5nc1BhdGgsIDUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFtzZXRDb250YWluZXIgZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSB7W3R5cGVdfSBjb250YWluZXIgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMucGFuZWxDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5zdmdDb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgdGhlIHdpZHRoIG9mIGEgcGFuZWwgYnkgdGhlIHNwYW4gYW5kIHZpZXdwb3J0XG4gIC8vIHRoZSBsaW5rIGVsZW1lbnQgb2JqZWN0IGNhbiBiZSB1c2VkIHRvIGdldCB0aGUgd2lkdGggbW9yZSByZWxpYWJseVxuICBnZXRQYW5lbFdpZHRoRmFpbHNhZmUoKSB7XG4gICAgdmFyIHRydWVXaWR0aCA9IDA7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhbmVsLmdyaWRQb3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIC8vIDI0IHNsb3RzIGlzIGZ1bGxzY3JlZW4sIGdldCB0aGUgdmlld3BvcnQgYW5kIGRpdmlkZSB0byBhcHByb3hpbWF0ZSB0aGUgd2lkdGhcbiAgICAgIGxldCB2aWV3UG9ydFdpZHRoID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICAgIGxldCBwaXhlbHNQZXJTbG90ID0gdmlld1BvcnRXaWR0aCAvIDI0O1xuICAgICAgdHJ1ZVdpZHRoID0gTWF0aC5yb3VuZCh0aGlzLnBhbmVsLmdyaWRQb3MudyAqIHBpeGVsc1BlclNsb3QpO1xuICAgICAgcmV0dXJuIHRydWVXaWR0aDtcbiAgICB9XG4gICAgLy8gZ3JhZmFuYTUgLSB1c2UgdGhpcy5wYW5lbC5ncmlkUG9zLncsIHRoaXMucGFuZWwuZ3JpZFBvcy5oXG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhbmVsLnNwYW4gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIC8vIGNoZWNrIGlmIGluc2lkZSBlZGl0IG1vZGVcbiAgICAgIGlmICh0aGlzLmVkaXRNb2RlSW5pdGlhdGVkKSB7XG4gICAgICAgIC8vIHdpZHRoIGlzIGNsaWVudFdpZHRoIG9mIGRvY3VtZW50XG4gICAgICAgIHRydWVXaWR0aCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZ2V0IHRoZSB3aWR0aCBiYXNlZCBvbiB0aGUgc2NhbGVkIGNvbnRhaW5lciAodjUgbmVlZHMgdGhpcylcbiAgICAgICAgdHJ1ZVdpZHRoID0gdGhpcy5wYW5lbENvbnRhaW5lci5vZmZzZXRQYXJlbnQuY2xpZW50V2lkdGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHY0IGFuZCBwcmV2aW91cyB1c2VkIGZpeGVkIHNwYW5zXG4gICAgICB2YXIgdmlld1BvcnRXaWR0aCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgICAvLyBnZXQgdGhlIHBpeGVscyBvZiBhIHNwYW5cbiAgICAgIHZhciBwaXhlbHNQZXJTcGFuID0gdmlld1BvcnRXaWR0aCAvIDEyO1xuICAgICAgLy8gbXVsdGlwbHkgbnVtIHNwYW5zIGJ5IHBpeGVsc1BlclNwYW5cbiAgICAgIHRydWVXaWR0aCA9IE1hdGgucm91bmQodGhpcy5wYW5lbC5zcGFuICogcGl4ZWxzUGVyU3Bhbik7XG4gICAgfVxuICAgIHJldHVybiB0cnVlV2lkdGg7XG4gIH1cblxuICBnZXRQYW5lbEhlaWdodCgpIHtcbiAgICAvLyBwYW5lbCBjYW4gaGF2ZSBhIGZpeGVkIGhlaWdodCBzZXQgdmlhIFwiR2VuZXJhbFwiIHRhYiBpbiBwYW5lbCBlZGl0b3JcbiAgICB2YXIgdG1wUGFuZWxIZWlnaHQgPSB0aGlzLnBhbmVsLmhlaWdodDtcbiAgICBpZiAoKHR5cGVvZiB0bXBQYW5lbEhlaWdodCA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHRtcFBhbmVsSGVpZ2h0ID09PSBcIlwiKSkge1xuICAgICAgLy8gZ3JhZmFuYSBhbHNvIHN1cHBsaWVzIHRoZSBoZWlnaHQsIHRyeSB0byB1c2UgdGhhdCBpZiB0aGUgcGFuZWwgZG9lcyBub3QgaGF2ZSBhIGhlaWdodFxuICAgICAgdG1wUGFuZWxIZWlnaHQgPSBTdHJpbmcodGhpcy5oZWlnaHQpO1xuICAgICAgLy8gdjQgYW5kIGVhcmxpZXIgZGVmaW5lIHRoaXMgaGVpZ2h0LCBkZXRlY3Qgc3BhbiBmb3IgcHJlLXY1XG4gICAgICBpZiAodHlwZW9mIHRoaXMucGFuZWwuc3BhbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBoZWFkZXIsIGFkanVzdCBoZWlnaHQgdG8gdXNlIGFsbCBzcGFjZSBhdmFpbGFibGVcbiAgICAgICAgdmFyIHBhbmVsVGl0bGVPZmZzZXQgPSAyMDtcbiAgICAgICAgaWYgKHRoaXMucGFuZWwudGl0bGUgIT09IFwiXCIpIHtcbiAgICAgICAgICBwYW5lbFRpdGxlT2Zmc2V0ID0gNDI7XG4gICAgICAgIH1cbiAgICAgICAgdG1wUGFuZWxIZWlnaHQgPSBTdHJpbmcodGhpcy5jb250YWluZXJIZWlnaHQgLSBwYW5lbFRpdGxlT2Zmc2V0KTsgLy8gb2Zmc2V0IGZvciBoZWFkZXJcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdG1wUGFuZWxIZWlnaHQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgLy8gaGVpZ2h0IHN0aWxsIGNhbm5vdCBiZSBkZXRlcm1pbmVkLCBnZXQgaXQgZnJvbSB0aGUgcm93IGluc3RlYWRcbiAgICAgICAgdG1wUGFuZWxIZWlnaHQgPSB0aGlzLnJvdy5oZWlnaHQ7XG4gICAgICAgIGlmICh0eXBlb2YgdG1wUGFuZWxIZWlnaHQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAvLyBsYXN0IHJlc29ydCAtIGRlZmF1bHQgdG8gMjUwcHggKHRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbilcbiAgICAgICAgICB0bXBQYW5lbEhlaWdodCA9IFwiMjUwXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVwbGFjZSBweFxuICAgIHRtcFBhbmVsSGVpZ2h0ID0gdG1wUGFuZWxIZWlnaHQucmVwbGFjZShcInB4XCIsIFwiXCIpO1xuICAgIC8vIGNvbnZlcnQgdG8gbnVtZXJpYyB2YWx1ZVxuICAgIHZhciBhY3R1YWxIZWlnaHQgPSBwYXJzZUludCh0bXBQYW5lbEhlaWdodCwgMTApO1xuICAgIHJldHVybiBhY3R1YWxIZWlnaHQ7XG4gIH1cblxuICBjbGVhclNWRygpIHtcbiAgICBpZiAoJChcIiNcIiArIHRoaXMuZDNEaXZJZCkubGVuZ3RoKSB7XG4gICAgICAkKFwiI1wiICsgdGhpcy5kM0RpdklkKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgaWYgKCQoXCIjXCIgKyB0aGlzLmQzRGl2SWQgKyBcIi1wYW5lbFwiKS5sZW5ndGgpIHtcbiAgICAgICQoXCIjXCIgKyB0aGlzLmQzRGl2SWQgKyBcIi1wYW5lbFwiKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgaWYgKCQoXCIjXCIgKyB0aGlzLmQzRGl2SWQgKyBcIi10b29sdGlwXCIpLmxlbmd0aCkge1xuICAgICAgJChcIiNcIiArIHRoaXMuZDNEaXZJZCArIFwiLXRvb2x0aXBcIikucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyRDMoKSB7XG4gICAgdGhpcy5zZXRWYWx1ZXModGhpcy5kYXRhKTtcbiAgICB0aGlzLmNsZWFyU1ZHKCk7XG4gICAgaWYgKHRoaXMucGFuZWxXaWR0aCA9PT0gMCkge1xuICAgICAgdGhpcy5wYW5lbFdpZHRoID0gdGhpcy5nZXRQYW5lbFdpZHRoRmFpbHNhZmUoKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbEhlaWdodCA9IHRoaXMuZ2V0UGFuZWxIZWlnaHQoKTtcbiAgICB2YXIgbWFyZ2luID0geyB0b3A6IDAsIHJpZ2h0OiAwLCBib3R0b206IDAsIGxlZnQ6IDAgfTtcbiAgICB2YXIgd2lkdGggPSB0aGlzLnBhbmVsV2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IHRoaXMucGFuZWxIZWlnaHQ7XG5cbiAgICBtYXJnaW4udG9wID0gMDtcbiAgICAvLyBwcmUtdjUsIHdpdGggdGl0bGUsIHNldCB0b3AgbWFyZ2luIHRvIGF0IGxlYXN0IDdweFxuICAgIGlmICgodHlwZW9mIHRoaXMucGFuZWwuc3BhbiAhPT0gXCJ1bmRlZmluZWRcIikgJiYgKHRoaXMucGFuZWwudGl0bGUgIT09IFwiXCIpKSB7XG4gICAgICBtYXJnaW4udG9wID0gNztcbiAgICB9XG4gICAgbWFyZ2luLmJvdHRvbSA9IDA7XG5cbiAgICAvLyBuZXcgYXR0cmlidXRlcyBtYXkgbm90IGJlIGRlZmluZWQgaW4gb2xkZXIgcGFuZWwgZGVmaW5pdGlvbnNcbiAgICBpZiAodHlwZW9mIHRoaXMucGFuZWwucG9seXN0YXQucG9seWdvbkJvcmRlclNpemUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMucGFuZWwucG9seXN0YXQucG9seWdvbkJvcmRlclNpemUgPSAyO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMucGFuZWwucG9seXN0YXQucG9seWdvbkJvcmRlckNvbG9yID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnBhbmVsLnBvbHlzdGF0LnBvbHlnb25Cb3JkZXJDb2xvciA9IFwiYmxhY2tcIjtcbiAgICB9XG5cbiAgICB2YXIgb3B0ID0ge1xuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICByYWRpdXM6IHRoaXMucGFuZWwucG9seXN0YXQucmFkaXVzLFxuICAgICAgcmFkaXVzQXV0b1NpemU6IHRoaXMucGFuZWwucG9seXN0YXQucmFkaXVzQXV0b1NpemUsXG4gICAgICB0b29sdGlwRm9udFNpemU6IHRoaXMucGFuZWwucG9seXN0YXQudG9vbHRpcEZvbnRTaXplLFxuICAgICAgdG9vbHRpcEZvbnRUeXBlOiB0aGlzLnBhbmVsLnBvbHlzdGF0LnRvb2x0aXBGb250VHlwZSxcbiAgICAgIGRhdGE6IHRoaXMucG9seXN0YXREYXRhLFxuICAgICAgZGlzcGxheUxpbWl0OiB0aGlzLnBhbmVsLnBvbHlzdGF0LmRpc3BsYXlMaW1pdCxcbiAgICAgIGdsb2JhbERpc3BsYXlNb2RlOiB0aGlzLnBhbmVsLnBvbHlzdGF0Lmdsb2JhbERpc3BsYXlNb2RlLFxuICAgICAgY29sdW1uczogdGhpcy5wYW5lbC5wb2x5c3RhdC5jb2x1bW5zLFxuICAgICAgY29sdW1uQXV0b1NpemU6IHRoaXMucGFuZWwucG9seXN0YXQuY29sdW1uQXV0b1NpemUsXG4gICAgICByb3dzOiB0aGlzLnBhbmVsLnBvbHlzdGF0LnJvd3MsXG4gICAgICByb3dBdXRvU2l6ZTogdGhpcy5wYW5lbC5wb2x5c3RhdC5yb3dBdXRvU2l6ZSxcbiAgICAgIHRvb2x0aXBDb250ZW50OiB0aGlzLnRvb2x0aXBDb250ZW50LFxuICAgICAgYW5pbWF0aW9uU3BlZWQ6IHRoaXMucGFuZWwucG9seXN0YXQuYW5pbWF0aW9uU3BlZWQsXG4gICAgICBkZWZhdWx0Q2xpY2tUaHJvdWdoOiB0aGlzLmdldERlZmF1bHRDbGlja1Rocm91Z2goTmFOKSxcbiAgICAgIHBvbHlzdGF0OiB0aGlzLnBhbmVsLnBvbHlzdGF0LFxuICAgIH07XG4gICAgdGhpcy5kM09iamVjdCA9IG5ldyBEM1dyYXBwZXIodGhpcy50ZW1wbGF0ZVNydiwgdGhpcy5zdmdDb250YWluZXIsIHRoaXMuZDNEaXZJZCwgb3B0KTtcbiAgICB0aGlzLmQzT2JqZWN0LmRyYXcoKTtcbiAgfVxuXG4gIHJlbW92ZVZhbHVlTWFwKG1hcCkge1xuICAgIHZhciBpbmRleCA9IF8uaW5kZXhPZih0aGlzLnBhbmVsLnZhbHVlTWFwcywgbWFwKTtcbiAgICB0aGlzLnBhbmVsLnZhbHVlTWFwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBhZGRWYWx1ZU1hcCgpIHtcbiAgICB0aGlzLnBhbmVsLnZhbHVlTWFwcy5wdXNoKHsgdmFsdWU6IFwiXCIsIG9wOiBcIj1cIiwgdGV4dDogXCJcIiB9KTtcbiAgfVxuXG4gIHJlbW92ZVJhbmdlTWFwKHJhbmdlTWFwKSB7XG4gICAgdmFyIGluZGV4ID0gXy5pbmRleE9mKHRoaXMucGFuZWwucmFuZ2VNYXBzLCByYW5nZU1hcCk7XG4gICAgdGhpcy5wYW5lbC5yYW5nZU1hcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYWRkUmFuZ2VNYXAoKSB7XG4gICAgdGhpcy5wYW5lbC5yYW5nZU1hcHMucHVzaCh7IGZyb206IFwiXCIsIHRvOiBcIlwiLCB0ZXh0OiBcIlwiIH0pO1xuICB9XG5cbiAgbGluayhzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICBpZiAoIXNjb3BlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghYXR0cnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHBhbmVsQnlDbGFzcyA9IGVsZW0uZmluZChcIi5ncmFmYW5hLWQzLXBvbHlzdGF0XCIpO1xuICAgIHBhbmVsQnlDbGFzcy5hcHBlbmQoXCI8ZGl2IHN0eWxlPVxcXCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1xcXCIgaWQ9XFxcIlwiICsgY3RybC5jb250YWluZXJEaXZJZCArIFwiXFxcIj48L2Rpdj5cIik7XG4gICAgdmFyIGNvbnRhaW5lciA9IHBhbmVsQnlDbGFzc1swXS5jaGlsZE5vZGVzWzBdO1xuICAgIGN0cmwuc2V0Q29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgICBlbGVtID0gZWxlbS5maW5kKFwiLmdyYWZhbmEtZDMtcG9seXN0YXRcIik7XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAvLyB0cnkgdG8gZ2V0IHRoZSB3aWR0aFxuICAgICAgY3RybC5wYW5lbFdpZHRoID0gZWxlbS53aWR0aCgpICsgMjA7XG4gICAgICBjdHJsLnJlbmRlckQzKCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRzLm9uKFwicmVuZGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHRyeSB0byBnZXQgdGhlIHdpZHRoXG4gICAgICBjdHJsLnBhbmVsV2lkdGggPSBlbGVtLndpZHRoKCkgKyAyMDtcbiAgICAgIHJlbmRlcigpO1xuICAgICAgY3RybC5yZW5kZXJpbmdDb21wbGV0ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlcyhkYXRhTGlzdCkge1xuICAgIHRoaXMuZGF0YVJhdyA9IGRhdGFMaXN0O1xuICAgIC8vIGF1dG9tYXRpY2FsbHkgY29ycmVjdCB0cmFuc2Zvcm0gbW9kZSBiYXNlZCBvbiBkYXRhXG4gICAgaWYgKHRoaXMuZGF0YVJhdyAmJiB0aGlzLmRhdGFSYXcubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5kYXRhUmF3WzBdLnR5cGUgPT09IFwidGFibGVcIikge1xuICAgICAgICB0aGlzLnBhbmVsLnRyYW5zZm9ybSA9IFwidGFibGVcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFSYXdbMF0udHlwZSA9PT0gXCJkb2NzXCIpIHtcbiAgICAgICAgICB0aGlzLnBhbmVsLnRyYW5zZm9ybSA9IFwianNvblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnBhbmVsLnRyYW5zZm9ybSA9PT0gXCJ0YWJsZVwiIHx8IHRoaXMucGFuZWwudHJhbnNmb3JtID09PSBcImpzb25cIikge1xuICAgICAgICAgICAgdGhpcy5wYW5lbC50cmFuc2Zvcm0gPSBcInRpbWVzZXJpZXNfdG9fcm93c1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZ25vcmUgdGhlIGFib3ZlIGFuZCB1c2UgYSB0aW1lc2VyaWVzXG4gICAgdGhpcy5wb2x5c3RhdERhdGEubGVuZ3RoID0gMDtcbiAgICBpZiAodGhpcy5zZXJpZXMgJiYgdGhpcy5zZXJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBsZXQgYVNlcmllcyA9IHRoaXMuc2VyaWVzW2luZGV4XTtcbiAgICAgICAgbGV0IGNvbnZlcnRlZCA9IFRyYW5zZm9ybWVycy5UaW1lU2VyaWVzVG9Qb2x5c3RhdCh0aGlzLnBhbmVsLnBvbHlzdGF0Lmdsb2JhbE9wZXJhdG9yTmFtZSwgYVNlcmllcyk7XG4gICAgICAgIHRoaXMucG9seXN0YXREYXRhLnB1c2goY29udmVydGVkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYXBwbHkgZ2xvYmFsIHVuaXQgZm9ybWF0dGluZyBhbmQgZGVjaW1hbHNcbiAgICB0aGlzLmFwcGx5R2xvYmFsRm9ybWF0dGluZyh0aGlzLnBvbHlzdGF0RGF0YSk7XG4gICAgLy8gZmlsdGVyIG91dCBieSBnbG9iYWxEaXNwbGF5TW9kZVxuICAgIHRoaXMucG9seXN0YXREYXRhID0gdGhpcy5maWx0ZXJCeUdsb2JhbERpc3BsYXlNb2RlKHRoaXMucG9seXN0YXREYXRhKTtcbiAgICAvLyBub3cgc29ydFxuICAgIHRoaXMucG9seXN0YXREYXRhID0gXy5vcmRlckJ5KFxuICAgICAgdGhpcy5wb2x5c3RhdERhdGEsXG4gICAgICBbdGhpcy5wYW5lbC5wb2x5c3RhdC5oZXhhZ29uU29ydEJ5RmllbGRdLFxuICAgICAgW3RoaXMucGFuZWwucG9seXN0YXQuaGV4YWdvblNvcnRCeURpcmVjdGlvbl0pO1xuICAgIC8vIHRoaXMgbmVlZHMgdG8gYmUgcGVyZm9ybWVkIGFmdGVyIHNvcnRpbmcgcnVsZXMgYXJlIGFwcGxpZWRcbiAgICAvLyBhcHBseSBvdmVycmlkZXNcbiAgICB0aGlzLm92ZXJyaWRlc0N0cmwuYXBwbHlPdmVycmlkZXModGhpcy5wb2x5c3RhdERhdGEpO1xuICAgIC8vIGFwcGx5IGNvbXBvc2l0ZXMsIHRoaXMgd2lsbCBmaWx0ZXIgYXMgbmVlZGVkIGFuZCBzZXQgY2xpY2t0aHJvdWdoXG4gICAgdGhpcy5wb2x5c3RhdERhdGEgPSB0aGlzLmNvbXBvc2l0ZXNNYW5hZ2VyLmFwcGx5Q29tcG9zaXRlcyh0aGlzLnBvbHlzdGF0RGF0YSk7XG4gICAgLy8gYXBwbHkgZ2xvYmFsIGNsaWNrdGhyb3VnaCB0byBhbGwgaXRlbXMgbm90IHNldFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnBvbHlzdGF0RGF0YS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmICh0aGlzLnBvbHlzdGF0RGF0YVtpbmRleF0uY2xpY2tUaHJvdWdoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBhZGQgdGhlIHNlcmllcyBhbGlhcyBhcyBhIHZhciB0byB0aGUgY2xpY2t0aHJvdWdodXJsXG4gICAgICAgIHRoaXMucG9seXN0YXREYXRhW2luZGV4XS5jbGlja1Rocm91Z2ggPSB0aGlzLmdldERlZmF1bHRDbGlja1Rocm91Z2goaW5kZXgpO1xuICAgICAgICB0aGlzLnBvbHlzdGF0RGF0YVtpbmRleF0uc2FuaXRpemVVUkxFbmFibGVkID0gdGhpcy5wYW5lbC5wb2x5c3RhdC5kZWZhdWx0Q2xpY2tUaHJvdWdoU2FuaXRpemU7XG4gICAgICAgIHRoaXMucG9seXN0YXREYXRhW2luZGV4XS5zYW5pdGl6ZWRVUkwgPSB0aGlzLiRzYW5pdGl6ZSh0aGlzLnBvbHlzdGF0RGF0YVtpbmRleF0uY2xpY2tUaHJvdWdoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZ2VuZXJhdGUgdG9vbHRpcHNcbiAgICB0aGlzLnRvb2x0aXBDb250ZW50ID0gVG9vbHRpcC5nZW5lcmF0ZSh0aGlzLiRzY29wZSwgdGhpcy5wb2x5c3RhdERhdGEsIHRoaXMucGFuZWwucG9seXN0YXQpO1xuICB9XG5cbiAgYXBwbHlHbG9iYWxGb3JtYXR0aW5nKGRhdGE6IGFueSkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwucG9seXN0YXQuZ2xvYmFsVW5pdEZvcm1hdF07XG4gICAgICBpZiAoZm9ybWF0RnVuYykge1xuICAgICAgICBsZXQgcmVzdWx0ID0gR2V0RGVjaW1hbHNGb3JWYWx1ZShkYXRhW2luZGV4XS52YWx1ZSwgdGhpcy5wYW5lbC5wb2x5c3RhdC5nbG9iYWxEZWNpbWFscyk7XG4gICAgICAgIGRhdGFbaW5kZXhdLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhkYXRhW2luZGV4XS52YWx1ZSwgcmVzdWx0LmRlY2ltYWxzLCByZXN1bHQuc2NhbGVkRGVjaW1hbHMpO1xuICAgICAgICBkYXRhW2luZGV4XS52YWx1ZVJvdW5kZWQgPSBrYm4ucm91bmRWYWx1ZShkYXRhW2luZGV4XS52YWx1ZSwgcmVzdWx0LmRlY2ltYWxzKTtcbiAgICAgIH1cbiAgICAgIC8vIGRlZmF1bHQgdGhlIGNvbG9yIHRvIHRoZSBnbG9iYWwgc2V0dGluZ1xuICAgICAgZGF0YVtpbmRleF0uY29sb3IgPSB0aGlzLnBhbmVsLnBvbHlzdGF0LnBvbHlnb25HbG9iYWxGaWxsQ29sb3I7XG4gICAgfVxuICB9XG5cblxuICBmaWx0ZXJCeUdsb2JhbERpc3BsYXlNb2RlKGRhdGE6IGFueSkge1xuICAgIGxldCBmaWx0ZXJlZE1ldHJpY3MgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgIGxldCBjb21wb3NpdGVNZXRyaWNzID0gbmV3IEFycmF5PFBvbHlzdGF0TW9kZWw+KCk7XG4gICAgaWYgKHRoaXMucGFuZWwucG9seXN0YXQuZ2xvYmFsRGlzcGxheU1vZGUgIT09IFwiYWxsXCIpIHtcbiAgICAgIGxldCBkYXRhTGVuID0gZGF0YS5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFMZW47IGkrKykge1xuICAgICAgICBsZXQgaXRlbSA9IGRhdGFbaV07XG4gICAgICAgIC8vIGtlZXAgaWYgY29tcG9zaXRlXG4gICAgICAgIGlmIChpdGVtLmlzQ29tcG9zaXRlKSB7XG4gICAgICAgICAgY29tcG9zaXRlTWV0cmljcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnRocmVzaG9sZExldmVsIDwgMSkge1xuICAgICAgICAgIC8vIHB1c2ggdGhlIGluZGV4IG51bWJlclxuICAgICAgICAgIGZpbHRlcmVkTWV0cmljcy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgZmlsdGVyZWQgbWV0cmljcywgdXNlIHNwbGljZSBpbiByZXZlcnNlIG9yZGVyXG4gICAgICBmb3IgKGxldCBpID0gZGF0YS5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChfLmluY2x1ZGVzKGZpbHRlcmVkTWV0cmljcywgaSkpIHtcbiAgICAgICAgICBkYXRhLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChjb21wb3NpdGVNZXRyaWNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBzZXQgZGF0YSB0byBiZSBhbGwgb2YgdGhlIGNvbXBvc2l0ZXNcbiAgICAgICAgICBkYXRhID0gY29tcG9zaXRlTWV0cmljcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIG9uRGF0YUVycm9yKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgdGhpcy5vbkRhdGFSZWNlaXZlZChbXSk7XG4gIH1cblxuICBvbkRhdGFSZWNlaXZlZChkYXRhTGlzdCkge1xuICAgIHRoaXMuc2VyaWVzID0gZGF0YUxpc3QubWFwKHRoaXMuc2VyaWVzSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIHZhbHVlOiAwLFxuICAgICAgdmFsdWVGb3JtYXR0ZWQ6IDAsXG4gICAgICB2YWx1ZVJvdW5kZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMuc2V0VmFsdWVzKGRhdGEpO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNlcmllc0hhbmRsZXIoc2VyaWVzRGF0YSkge1xuICAgIHZhciBzZXJpZXMgPSBuZXcgVGltZVNlcmllcyh7XG4gICAgICBkYXRhcG9pbnRzOiBzZXJpZXNEYXRhLmRhdGFwb2ludHMsXG4gICAgICBhbGlhczogc2VyaWVzRGF0YS50YXJnZXQsXG4gICAgfSk7XG4gICAgc2VyaWVzLmZsb3RwYWlycyA9IHNlcmllcy5nZXRGbG90UGFpcnModGhpcy5wYW5lbC5udWxsUG9pbnRNb2RlKTtcbiAgICByZXR1cm4gc2VyaWVzO1xuICB9XG5cbiAgaW52ZXJ0Q29sb3JPcmRlcigpIHtcbiAgICB2YXIgdG1wID0gdGhpcy5wYW5lbC5jb2xvcnNbMF07XG4gICAgdGhpcy5wYW5lbC5jb2xvcnNbMF0gPSB0aGlzLnBhbmVsLmNvbG9yc1syXTtcbiAgICB0aGlzLnBhbmVsLmNvbG9yc1syXSA9IHRtcDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWVkIG11c3Qgbm90IGJlIGxlc3MgdGhhbiA1MDBtc1xuICAgKi9cbiAgdmFsaWRhdGVBbmltYXRpb25TcGVlZCgpIHtcbiAgICBsZXQgc3BlZWQgPSB0aGlzLnBhbmVsLnBvbHlzdGF0LmFuaW1hdGlvblNwZWVkO1xuICAgIGxldCBuZXdTcGVlZCA9IDUwMDA7XG4gICAgaWYgKHNwZWVkKSB7XG4gICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHNwZWVkLCAxMCkpKSB7XG4gICAgICAgIGxldCBjaGVja1NwZWVkID0gcGFyc2VJbnQoc3BlZWQsIDEwKTtcbiAgICAgICAgaWYgKGNoZWNrU3BlZWQgPj0gNTAwKSB7XG4gICAgICAgICAgbmV3U3BlZWQgPSBjaGVja1NwZWVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGFuZWwucG9seXN0YXQuYW5pbWF0aW9uU3BlZWQgPSBuZXdTcGVlZDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgdmFsaWRhdGVDb2x1bW5WYWx1ZSgpIHtcbiAgICBsZXQgY29sdW1ucyA9IHRoaXMucGFuZWwucG9seXN0YXQuY29sdW1ucztcbiAgICBsZXQgbmV3Q29sdW1ucyA9IDE7XG4gICAgaWYgKGNvbHVtbnMpIHtcbiAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQoY29sdW1ucywgMTApKSkge1xuICAgICAgICBsZXQgY2hlY2tDb2x1bW5zID0gcGFyc2VJbnQoY29sdW1ucywgMTApO1xuICAgICAgICBpZiAoY2hlY2tDb2x1bW5zID4gMCkge1xuICAgICAgICAgIG5ld0NvbHVtbnMgPSBjaGVja0NvbHVtbnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wYW5lbC5wb2x5c3RhdC5jb2x1bW5zID0gbmV3Q29sdW1ucztcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgdmFsaWRhdGVSb3dWYWx1ZSgpIHtcbiAgICBsZXQgcm93cyA9IHRoaXMucGFuZWwucG9seXN0YXQucm93cztcbiAgICBsZXQgbmV3Um93cyA9IDE7XG4gICAgaWYgKHJvd3MpIHtcbiAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQocm93cywgMTApKSkge1xuICAgICAgICBsZXQgY2hlY2tSb3dzID0gcGFyc2VJbnQocm93cywgMTApO1xuICAgICAgICBpZiAoY2hlY2tSb3dzID4gMCkge1xuICAgICAgICAgIG5ld1Jvd3MgPSBjaGVja1Jvd3M7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wYW5lbC5wb2x5c3RhdC5yb3dzID0gbmV3Um93cztcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgdmFsaWRhdGVSYWRpdXNWYWx1ZSgpIHtcbiAgICBsZXQgcmFkaXVzID0gdGhpcy5wYW5lbC5wb2x5c3RhdC5yYWRpdXM7XG4gICAgbGV0IG5ld1JhZGl1cyA9IDI1O1xuICAgIGlmIChyYWRpdXMgIT09IG51bGwpIHtcbiAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQocmFkaXVzLCAxMCkpKSB7XG4gICAgICAgIGxldCBjaGVja1JhZGl1cyA9IHBhcnNlSW50KHJhZGl1cywgMTApO1xuICAgICAgICBpZiAoY2hlY2tSYWRpdXMgPiAwKSB7XG4gICAgICAgICAgbmV3UmFkaXVzID0gY2hlY2tSYWRpdXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wYW5lbC5wb2x5c3RhdC5yYWRpdXMgPSBuZXdSYWRpdXM7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHZhbGlkYXRlQm9yZGVyU2l6ZVZhbHVlKCkge1xuICAgIGxldCBib3JkZXJTaXplID0gdGhpcy5wYW5lbC5wb2x5c3RhdC5wb2x5Z29uQm9yZGVyU2l6ZTtcbiAgICBsZXQgbmV3Qm9yZGVyU2l6ZSA9IDI7XG4gICAgaWYgKGJvcmRlclNpemUgIT09IG51bGwpIHtcbiAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQoYm9yZGVyU2l6ZSwgMTApKSkge1xuICAgICAgICBsZXQgY2hlY2tCb3JkZXJTaXplID0gcGFyc2VJbnQoYm9yZGVyU2l6ZSwgMTApO1xuICAgICAgICBpZiAoY2hlY2tCb3JkZXJTaXplID49IDApIHtcbiAgICAgICAgICBuZXdCb3JkZXJTaXplID0gY2hlY2tCb3JkZXJTaXplO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGFuZWwucG9seXN0YXQucG9seWdvbkJvcmRlclNpemUgPSBuZXdCb3JkZXJTaXplO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICB1cGRhdGVQb2x5Z29uQm9yZGVyQ29sb3IoKSB7XG4gICAgdGhpcy5wYW5lbC5wb2x5c3RhdC5wb2x5Z29uQm9yZGVyQ29sb3IgPSBSR0JUb0hleCh0aGlzLnBhbmVsLnBvbHlzdGF0LnBvbHlnb25Cb3JkZXJDb2xvcik7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHVwZGF0ZVBvbHlnb25HbG9iYWxGaWxsQ29sb3IoKSB7XG4gICAgdGhpcy5wYW5lbC5wb2x5c3RhdC5wb2x5Z29uR2xvYmFsRmlsbENvbG9yID0gUkdCVG9IZXgodGhpcy5wYW5lbC5wb2x5c3RhdC5wb2x5Z29uR2xvYmFsRmlsbENvbG9yKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdENsaWNrVGhyb3VnaChpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IHVybCA9IHRoaXMucGFuZWwucG9seXN0YXQuZGVmYXVsdENsaWNrVGhyb3VnaDtcbiAgICAvLyBhcHBseSBib3RoIHR5cGVzIG9mIHRyYW5zZm9ybXMsIG9uZSB0YXJnZXRlZCBhdCB0aGUgZGF0YSBpdGVtIGluZGV4LCBhbmQgc2Vjb25kbHkgdGhlIG50aCB2YXJpYW50XG4gICAgdXJsID0gQ2xpY2tUaHJvdWdoVHJhbnNmb3JtZXIudHJhbmZvcm1TaW5nbGVNZXRyaWMoaW5kZXgsIHVybCwgdGhpcy5wb2x5c3RhdERhdGEpO1xuICAgIHVybCA9IENsaWNrVGhyb3VnaFRyYW5zZm9ybWVyLnRyYW5mb3JtTnRoTWV0cmljKHVybCwgdGhpcy5wb2x5c3RhdERhdGEpO1xuICAgIC8vIHByb2Nlc3MgdGVtcGxhdGUgdmFyaWFibGVzIGluc2lkZSBjbGlja3Rocm91Z2hcbiAgICB1cmwgPSB0aGlzLnRlbXBsYXRlU3J2LnJlcGxhY2VXaXRoVGV4dCh1cmwpO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBzZXRHbG9iYWxVbml0Rm9ybWF0KHN1Ykl0ZW0pIHtcbiAgICB0aGlzLnBhbmVsLnBvbHlzdGF0Lmdsb2JhbFVuaXRGb3JtYXQgPSBzdWJJdGVtLnZhbHVlO1xuICB9XG59XG5cblxuZXhwb3J0IHtcbiAgRDNQb2x5c3RhdFBhbmVsQ3RybCxcbiAgRDNQb2x5c3RhdFBhbmVsQ3RybCBhcyBNZXRyaWNzUGFuZWxDdHJsXG59O1xuIl19