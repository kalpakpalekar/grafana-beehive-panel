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
                        { value: "square", text: "Square" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFrQmtDLHVDQUFnQjtnQkF5SGhELDZCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBVSxTQUFTO29CQUF2RSxZQUNFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0F5QnpCO29CQTFCNkQsZUFBUyxHQUFULFNBQVMsQ0FBQTtvQkF2SHZFLG9CQUFjLEdBQUc7d0JBQ2YsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7d0JBQ2xDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7cUJBQy9DLENBQUM7b0JBQ0Ysa0JBQVksR0FBRzt3QkFDYixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTt3QkFDbEMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtxQkFDL0MsQ0FBQztvQkFDRixxQkFBZSxHQUFHO3dCQUNoQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTt3QkFDeEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7d0JBQzdCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO3dCQUM5QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtxQkFDN0IsQ0FBQztvQkFDRixZQUFNLEdBQUc7d0JBQ1AsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFO3dCQUU3RCxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTt3QkFHbkMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7cUJBSXBDLENBQUM7b0JBQ0YsZUFBUyxHQUFHO3dCQUNWLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTt3QkFDeEMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7d0JBQzFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO3dCQUMxQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtxQkFBQyxDQUFDO29CQUNsQyxpQkFBVyxHQUFHLGFBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDbkMscUJBQWUsR0FBRzt3QkFDaEIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7d0JBQ2pDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO3dCQUNqQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTt3QkFDckMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7d0JBQ2pDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO3dCQUNyQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTt3QkFDakMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7d0JBQ3BDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO3dCQUM3QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTt3QkFDN0IsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7d0JBQy9CLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7d0JBQ2xELEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO3dCQUN6QyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtxQkFDbEMsQ0FBQztvQkFDRixvQkFBYyxHQUFHO3dCQUNmLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO3dCQUNuQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtxQkFDdEMsQ0FBQztvQkFDRixnQkFBVSxHQUFHO3dCQUNYLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO3dCQUMvQixFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7d0JBQ3BELEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO3FCQUNsQyxDQUFDO29CQXFCRixtQkFBYSxHQUFHO3dCQUNkLGVBQWUsRUFBRSxFQUFFO3dCQUNuQixjQUFjLEVBQUUsS0FBSyxFQUFrQjt3QkFDdkMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLDBCQUEwQixFQUFFLFNBQVMsQ0FBQzt3QkFDMUQsUUFBUSxFQUFFOzRCQUNSLGNBQWMsRUFBRSxJQUFJOzRCQUNwQixPQUFPLEVBQUUsRUFBRTs0QkFDWCxjQUFjLEVBQUUsSUFBSTs0QkFDcEIsWUFBWSxFQUFFLEdBQUc7NEJBQ2pCLG1CQUFtQixFQUFFLEVBQUU7NEJBQ3ZCLDJCQUEyQixFQUFFLEtBQUs7NEJBQ2xDLGFBQWEsRUFBRSxJQUFJOzRCQUNuQixRQUFRLEVBQUUsRUFBRTs0QkFDWixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsZ0JBQWdCLEVBQUUsT0FBTzs0QkFDekIsY0FBYyxFQUFFLENBQUM7NEJBQ2pCLGlCQUFpQixFQUFFLEtBQUs7NEJBQ3hCLGtCQUFrQixFQUFFLEtBQUs7NEJBQ3pCLCtCQUErQixFQUFFLElBQUk7NEJBQ3JDLGVBQWUsRUFBRSxJQUFJOzRCQUNyQixzQkFBc0IsRUFBRSxLQUFLOzRCQUM3QixrQkFBa0IsRUFBRSxNQUFNOzRCQUMxQixVQUFVLEVBQUUsQ0FBQzs0QkFDYixpQkFBaUIsRUFBRSxDQUFDOzRCQUNwQixrQkFBa0IsRUFBRSxPQUFPOzRCQUMzQixzQkFBc0IsRUFBRSxTQUFTOzRCQUNqQyxNQUFNLEVBQUUsRUFBRTs0QkFDVixjQUFjLEVBQUUsSUFBSTs0QkFDcEIsSUFBSSxFQUFFLEVBQUU7NEJBQ1IsV0FBVyxFQUFFLElBQUk7NEJBQ2pCLEtBQUssRUFBRSxxQkFBcUI7NEJBQzVCLGtCQUFrQixFQUFFLEtBQUs7NEJBQ3pCLGdDQUFnQyxFQUFFLElBQUk7NEJBQ3RDLGVBQWUsRUFBRSxFQUFFOzRCQUNuQixlQUFlLEVBQUUsUUFBUTs0QkFDekIsMkJBQTJCLEVBQUUsTUFBTTs0QkFDbkMsdUJBQXVCLEVBQUUsZ0JBQWdCOzRCQUN6Qyw2QkFBNkIsRUFBRSxNQUFNOzRCQUNyQyx5QkFBeUIsRUFBRSxPQUFPOzRCQUNsQyx1QkFBdUIsRUFBRSxJQUFJO3lCQUM5QjtxQkFDRixDQUFDO29CQU1BLGdCQUFDLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUUvQyxLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDekMsS0FBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDbEQsS0FBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7b0JBQzVCLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztvQkFDM0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7b0JBQy9CLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7b0JBQy9DLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixLQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDZixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDakIsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO29CQUN6QixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksaURBQXNCLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDM0csS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksc0NBQWlCLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDM0csS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDakUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDOztnQkFDdkUsQ0FBQztnQkFHRCw0Q0FBYyxHQUFkO29CQUVFLElBQUksYUFBYSxHQUFHLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztvQkFFOUQsSUFBSSxXQUFXLEdBQUcsYUFBYSxHQUFHLDhCQUE4QixDQUFDO29CQUNqRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzdDLElBQUksYUFBYSxHQUFHLGFBQWEsR0FBRyxnQ0FBZ0MsQ0FBQztvQkFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLGNBQWMsR0FBRyxhQUFhLEdBQUcsaUNBQWlDLENBQUM7b0JBQ3ZFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFJckQsQ0FBQztnQkFNRCwwQ0FBWSxHQUFaLFVBQWEsU0FBUztvQkFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO2dCQUNoQyxDQUFDO2dCQUlELG1EQUFxQixHQUFyQjtvQkFDRSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7b0JBQ2xCLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxXQUFXLEVBQUU7d0JBRTdDLElBQUksZUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDM0YsSUFBSSxhQUFhLEdBQUcsZUFBYSxHQUFHLEVBQUUsQ0FBQzt3QkFDdkMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDO3dCQUM3RCxPQUFPLFNBQVMsQ0FBQztxQkFDbEI7b0JBRUQsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTt3QkFFMUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7NEJBRTFCLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDL0U7NkJBQU07NEJBRUwsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQzt5QkFDMUQ7cUJBQ0Y7eUJBQU07d0JBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUUzRixJQUFJLGFBQWEsR0FBRyxhQUFhLEdBQUcsRUFBRSxDQUFDO3dCQUV2QyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQztxQkFDekQ7b0JBQ0QsT0FBTyxTQUFTLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsNENBQWMsR0FBZDtvQkFFRSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDdkMsSUFBSSxDQUFDLE9BQU8sY0FBYyxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLEVBQUUsQ0FBQyxFQUFFO3dCQUV0RSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFFckMsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTs0QkFFMUMsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO2dDQUMzQixnQkFBZ0IsR0FBRyxFQUFFLENBQUM7NkJBQ3ZCOzRCQUNELGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO3lCQUNsRTt3QkFDRCxJQUFJLE9BQU8sY0FBYyxLQUFLLFdBQVcsRUFBRTs0QkFFekMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDOzRCQUNqQyxJQUFJLE9BQU8sY0FBYyxLQUFLLFdBQVcsRUFBRTtnQ0FFekMsY0FBYyxHQUFHLEtBQUssQ0FBQzs2QkFDeEI7eUJBQ0Y7cUJBQ0Y7b0JBRUQsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUVsRCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNoRCxPQUFPLFlBQVksQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxzQ0FBUSxHQUFSO29CQUNFLElBQUksZ0JBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRTt3QkFDaEMsZ0JBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNoQztvQkFDRCxJQUFJLGdCQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFO3dCQUMzQyxnQkFBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUMzQztvQkFDRCxJQUFJLGdCQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFO3dCQUM3QyxnQkFBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUM3QztnQkFDSCxDQUFDO2dCQUVELHNDQUFRLEdBQVI7b0JBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTt3QkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztxQkFDaEQ7b0JBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3pDLElBQUksTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUN0RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUM1QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUU5QixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFFZixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxFQUFFO3dCQUN6RSxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztxQkFDaEI7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBR2xCLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsS0FBSyxXQUFXLEVBQUU7d0JBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztxQkFDM0M7b0JBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixLQUFLLFdBQVcsRUFBRTt3QkFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDO3FCQUNsRDtvQkFFRCxJQUFJLEdBQUcsR0FBRzt3QkFDUixLQUFLLEVBQUUsS0FBSzt3QkFDWixNQUFNLEVBQUUsTUFBTTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTt3QkFDbEMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWM7d0JBQ2xELGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlO3dCQUNwRCxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBZTt3QkFDcEQsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZO3dCQUN2QixZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWTt3QkFDOUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCO3dCQUN4RCxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTzt3QkFDcEMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWM7d0JBQ2xELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJO3dCQUM5QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVzt3QkFDNUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO3dCQUNuQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYzt3QkFDbEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQzt3QkFDckQsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtxQkFDOUIsQ0FBQztvQkFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQztnQkFFRCw0Q0FBYyxHQUFkLFVBQWUsR0FBRztvQkFDaEIsSUFBSSxLQUFLLEdBQUcsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCx5Q0FBVyxHQUFYO29CQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztnQkFFRCw0Q0FBYyxHQUFkLFVBQWUsUUFBUTtvQkFDckIsSUFBSSxLQUFLLEdBQUcsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCx5Q0FBVyxHQUFYO29CQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDNUQsQ0FBQztnQkFFRCxrQ0FBSSxHQUFKLFVBQUssS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSTtvQkFDM0IsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixPQUFPO3FCQUNSO29CQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1YsT0FBTztxQkFDUjtvQkFDRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQ3JELFlBQVksQ0FBQyxNQUFNLENBQUMsaURBQWlELEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsQ0FBQztvQkFDM0csSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFFekMsU0FBUyxNQUFNO3dCQUViLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNsQixDQUFDO29CQUNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTt3QkFFdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO3dCQUNwQyxNQUFNLEVBQUUsQ0FBQzt3QkFDVCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCx1Q0FBUyxHQUFULFVBQVUsUUFBUTtvQkFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7b0JBRXhCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTt3QkFDdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7NEJBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzt5QkFDaEM7NkJBQU07NEJBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7Z0NBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQzs2QkFDL0I7aUNBQU07Z0NBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO29DQUN2RSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztpQ0FDN0M7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7b0JBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUM3QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBQ3ZELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2pDLElBQUksU0FBUyxHQUFHLDJCQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7NEJBQ25HLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUNuQztxQkFDRjtvQkFFRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUU5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBRXRFLElBQUksQ0FBQyxZQUFZLEdBQUcsZ0JBQUMsQ0FBQyxPQUFPLENBQzNCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFDeEMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7b0JBR2hELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFckQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFOUUsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUM3RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBRXRELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQzs0QkFDOUYsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO3lCQUMvRjtxQkFDRjtvQkFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5RixDQUFDO2dCQUVELG1EQUFxQixHQUFyQixVQUFzQixJQUFTO29CQUM3QixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDaEQsSUFBSSxVQUFVLEdBQUcsYUFBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJLFVBQVUsRUFBRTs0QkFDZCxJQUFJLE1BQU0sR0FBRywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUN4RixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUNuRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFHLGFBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQy9FO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUM7cUJBQ2hFO2dCQUNILENBQUM7Z0JBR0QsdURBQXlCLEdBQXpCLFVBQTBCLElBQVM7b0JBQ2pDLElBQUksZUFBZSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7b0JBQzFDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7b0JBQ2xELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEtBQUssS0FBSyxFQUFFO3dCQUNuRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRW5CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQ0FDcEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUM3Qjs0QkFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFO2dDQUUzQixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUN6Qjt5QkFDRjt3QkFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDckMsSUFBSSxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0NBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzZCQUNuQjt5QkFDRjt3QkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUNyQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0NBRS9CLElBQUksR0FBRyxnQkFBZ0IsQ0FBQzs2QkFDekI7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCx5Q0FBVyxHQUFYLFVBQVksR0FBRztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQixDQUFDO2dCQUVELDRDQUFjLEdBQWQsVUFBZSxRQUFRO29CQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxJQUFJLEdBQUc7d0JBQ1QsS0FBSyxFQUFFLENBQUM7d0JBQ1IsY0FBYyxFQUFFLENBQUM7d0JBQ2pCLFlBQVksRUFBRSxDQUFDO3FCQUNoQixDQUFDO29CQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsMkNBQWEsR0FBYixVQUFjLFVBQVU7b0JBQ3RCLElBQUksTUFBTSxHQUFHLElBQUksc0JBQVUsQ0FBQzt3QkFDMUIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxVQUFVO3dCQUNqQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU07cUJBQ3pCLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDakUsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsOENBQWdCLEdBQWhCO29CQUNFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO29CQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBS0Qsb0RBQXNCLEdBQXRCO29CQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztvQkFDL0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNwQixJQUFJLEtBQUssRUFBRTt3QkFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs0QkFDL0IsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDckMsSUFBSSxVQUFVLElBQUksR0FBRyxFQUFFO2dDQUNyQixRQUFRLEdBQUcsVUFBVSxDQUFDOzZCQUN2Qjt5QkFDRjtxQkFDRjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO29CQUM5QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsaURBQW1CLEdBQW5CO29CQUNFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztvQkFDMUMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixJQUFJLE9BQU8sRUFBRTt3QkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs0QkFDakMsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDekMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO2dDQUNwQixVQUFVLEdBQUcsWUFBWSxDQUFDOzZCQUMzQjt5QkFDRjtxQkFDRjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO29CQUN6QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsOENBQWdCLEdBQWhCO29CQUNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDcEMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLElBQUksRUFBRTt3QkFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs0QkFDOUIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDbkMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO2dDQUNqQixPQUFPLEdBQUcsU0FBUyxDQUFDOzZCQUNyQjt5QkFDRjtxQkFDRjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO29CQUNuQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsaURBQW1CLEdBQW5CO29CQUNFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztvQkFDeEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNuQixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7d0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFOzRCQUNoQyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUN2QyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUU7Z0NBQ25CLFNBQVMsR0FBRyxXQUFXLENBQUM7NkJBQ3pCO3lCQUNGO3FCQUNGO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCxxREFBdUIsR0FBdkI7b0JBQ0UsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7b0JBQ3ZELElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO3dCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs0QkFDcEMsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDL0MsSUFBSSxlQUFlLElBQUksQ0FBQyxFQUFFO2dDQUN4QixhQUFhLEdBQUcsZUFBZSxDQUFDOzZCQUNqQzt5QkFDRjtxQkFDRjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUM7b0JBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCxzREFBd0IsR0FBeEI7b0JBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUMxRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsMERBQTRCLEdBQTVCO29CQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHNCQUFzQixHQUFHLGdCQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDbEcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELG9EQUFzQixHQUF0QixVQUF1QixLQUFhO29CQUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztvQkFFbEQsR0FBRyxHQUFHLGlEQUF1QixDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNsRixHQUFHLEdBQUcsaURBQXVCLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFeEUsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QyxPQUFPLEdBQUcsQ0FBQztnQkFDYixDQUFDO2dCQUVELGlEQUFtQixHQUFuQixVQUFvQixPQUFPO29CQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN2RCxDQUFDO2dCQS9qQk0sK0JBQVcsR0FBRyx3QkFBd0IsQ0FBQztnQkFna0JoRCwwQkFBQzthQUFBLEFBamtCRCxDQUFrQyxzQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cbmltcG9ydCB7IE1ldHJpY3NQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcbmltcG9ydCBUaW1lU2VyaWVzIGZyb20gXCJhcHAvY29yZS90aW1lX3NlcmllczJcIjtcblxuaW1wb3J0IFwiLi9jc3MvcG9seXN0YXQuY3NzIVwiO1xuaW1wb3J0IHsgRDNXcmFwcGVyIH0gZnJvbSBcIi4vZDN3cmFwcGVyXCI7XG5pbXBvcnQgeyBUcmFuc2Zvcm1lcnMgfSBmcm9tIFwiLi90cmFuc2Zvcm1lcnNcIjtcbmltcG9ydCB7IFBvbHlzdGF0TW9kZWwgfSBmcm9tIFwiLi9wb2x5c3RhdG1vZGVsXCI7XG5pbXBvcnQgeyBNZXRyaWNPdmVycmlkZXNNYW5hZ2VyLCBNZXRyaWNPdmVycmlkZSB9IGZyb20gXCIuL21ldHJpY19vdmVycmlkZXNfbWFuYWdlclwiO1xuaW1wb3J0IHsgQ29tcG9zaXRlc01hbmFnZXIgfSBmcm9tIFwiLi9jb21wb3NpdGVzX21hbmFnZXJcIjtcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tIFwiLi90b29sdGlwXCI7XG5pbXBvcnQgeyBHZXREZWNpbWFsc0ZvclZhbHVlLCBSR0JUb0hleCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBDbGlja1Rocm91Z2hUcmFuc2Zvcm1lciB9IGZyb20gXCIuL2NsaWNrVGhyb3VnaFRyYW5zZm9ybWVyXCI7XG5cblxuY2xhc3MgRDNQb2x5c3RhdFBhbmVsQ3RybCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwge1xuICBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL3RlbXBsYXRlLmh0bWxcIjtcbiAgYW5pbWF0aW9uTW9kZXMgPSBbXG4gICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogXCJTaG93IEFsbFwiIH0sXG4gICAgeyB2YWx1ZTogXCJ0cmlnZ2VyZWRcIiwgdGV4dDogXCJTaG93IFRyaWdnZXJlZFwiIH1cbiAgXTtcbiAgZGlzcGxheU1vZGVzID0gW1xuICAgIHsgdmFsdWU6IFwiYWxsXCIsIHRleHQ6IFwiU2hvdyBBbGxcIiB9LFxuICAgIHsgdmFsdWU6IFwidHJpZ2dlcmVkXCIsIHRleHQ6IFwiU2hvdyBUcmlnZ2VyZWRcIiB9XG4gIF07XG4gIHRocmVzaG9sZFN0YXRlcyA9IFtcbiAgICB7IHZhbHVlOiAwLCB0ZXh0OiBcIm9rXCIgfSxcbiAgICB7IHZhbHVlOiAxLCB0ZXh0OiBcIndhcm5pbmdcIiB9LFxuICAgIHsgdmFsdWU6IDIsIHRleHQ6IFwiY3JpdGljYWxcIiB9LFxuICAgIHsgdmFsdWU6IDMsIHRleHQ6IFwiY3VzdG9tXCIgfVxuICBdO1xuICBzaGFwZXMgPSBbXG4gICAgeyB2YWx1ZTogXCJoZXhhZ29uX3BvaW50ZWRfdG9wXCIsIHRleHQ6IFwiSGV4YWdvbiBQb2ludGVkIFRvcFwiIH0sXG4gICAgLy8geyB2YWx1ZTogXCJoZXhhZ29uX2ZsYXRfdG9wXCIsIHRleHQ6IFwiSGV4YWdvbiBGbGF0IFRvcFwiIH0sXG4gICAgeyB2YWx1ZTogXCJjaXJjbGVcIiwgdGV4dDogXCJDaXJjbGVcIiB9LFxuICAgIC8vIHsgdmFsdWU6IFwiY3Jvc3NcIiwgdGV4dDogXCJDcm9zc1wiIH0sXG4gICAgLy8geyB2YWx1ZTogXCJkaWFtb25kXCIsIHRleHQ6IFwiRGlhbW9uZFwiIH0sXG4gICAgeyB2YWx1ZTogXCJzcXVhcmVcIiwgdGV4dDogXCJTcXVhcmVcIiB9LFxuICAgIC8vIHsgdmFsdWU6IFwic3RhclwiLCB0ZXh0OiBcIlN0YXJcIiB9LFxuICAgIC8vIHsgdmFsdWU6IFwidHJpYW5nbGVcIiwgdGV4dDogXCJUcmlhbmdsZVwiIH0sXG4gICAgLy8geyB2YWx1ZTogXCJ3eWVcIiwgdGV4dDogXCJXeWVcIiB9XG4gIF07XG4gIGZvbnRTaXplcyA9IFtcbiAgICA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LFxuICAgIDE2LCAxNywgMTgsIDE5LCAyMCwgMjIsIDI0LCAyNiwgMjgsIDMwLCAzMixcbiAgICAzNCwgMzYsIDM4LCA0MCwgNDIsIDQ0LCA0NiwgNDgsIDUwLCA1MiwgNTQsXG4gICAgNTYsIDU4LCA2MCwgNjIsIDY0LCA2NiwgNjgsIDcwXTtcbiAgdW5pdEZvcm1hdHMgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcbiAgb3BlcmF0b3JPcHRpb25zID0gW1xuICAgIHsgdmFsdWU6IFwiYXZnXCIsIHRleHQ6IFwiQXZlcmFnZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJjb3VudFwiLCB0ZXh0OiBcIkNvdW50XCIgfSxcbiAgICB7IHZhbHVlOiBcImN1cnJlbnRcIiwgdGV4dDogXCJDdXJyZW50XCIgfSxcbiAgICB7IHZhbHVlOiBcImRlbHRhXCIsIHRleHQ6IFwiRGVsdGFcIiB9LFxuICAgIHsgdmFsdWU6IFwiZGlmZlwiLCB0ZXh0OiBcIkRpZmZlcmVuY2VcIiB9LFxuICAgIHsgdmFsdWU6IFwiZmlyc3RcIiwgdGV4dDogXCJGaXJzdFwiIH0sXG4gICAgeyB2YWx1ZTogXCJsb2dtaW5cIiwgdGV4dDogXCJMb2cgTWluXCIgfSxcbiAgICB7IHZhbHVlOiBcIm1heFwiLCB0ZXh0OiBcIk1heFwiIH0sXG4gICAgeyB2YWx1ZTogXCJtaW5cIiwgdGV4dDogXCJNaW5cIiB9LFxuICAgIHsgdmFsdWU6IFwibmFtZVwiLCB0ZXh0OiBcIk5hbWVcIiB9LFxuICAgIHsgdmFsdWU6IFwibGFzdF90aW1lXCIsIHRleHQ6IFwiVGltZSBvZiBMYXN0IFBvaW50XCIgfSxcbiAgICB7IHZhbHVlOiBcInRpbWVfc3RlcFwiLCB0ZXh0OiBcIlRpbWUgU3RlcFwiIH0sXG4gICAgeyB2YWx1ZTogXCJ0b3RhbFwiLCB0ZXh0OiBcIlRvdGFsXCIgfVxuICBdO1xuICBzb3J0RGlyZWN0aW9ucyA9IFtcbiAgICB7IHZhbHVlOiBcImFzY1wiLCB0ZXh0OiBcIkFzY2VuZGluZ1wiIH0sXG4gICAgeyB2YWx1ZTogXCJkZXNjXCIsIHRleHQ6IFwiRGVzY2VuZGluZ1wiIH1cbiAgXTtcbiAgc29ydEZpZWxkcyA9IFtcbiAgICB7IHZhbHVlOiBcIm5hbWVcIiwgdGV4dDogXCJOYW1lXCIgfSxcbiAgICB7IHZhbHVlOiBcInRocmVzaG9sZExldmVsXCIsIHRleHQ6IFwiVGhyZXNob2xkIExldmVsXCIgfSxcbiAgICB7IHZhbHVlOiBcInZhbHVlXCIsIHRleHQ6IFwiVmFsdWVcIiB9XG4gIF07XG5cbiAgZGF0YVJhdzogYW55O1xuICBwb2x5c3RhdERhdGE6IFBvbHlzdGF0TW9kZWxbXTtcbiAgc2NvcGVyZWY6IGFueTtcbiAgYWxlcnRTcnZSZWY6IGFueTtcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gIHBhbmVsQ29udGFpbmVyOiBhbnk7XG4gIGQzT2JqZWN0OiBEM1dyYXBwZXI7XG4gIGRhdGE6IGFueTtcbiAgc2VyaWVzOiBhbnlbXTtcbiAgdGVtcGxhdGVTcnY6IGFueTtcbiAgb3ZlcnJpZGVzQ3RybDogTWV0cmljT3ZlcnJpZGVzTWFuYWdlcjtcbiAgY29tcG9zaXRlc01hbmFnZXI6IENvbXBvc2l0ZXNNYW5hZ2VyO1xuICB0b29sdGlwQ29udGVudDogc3RyaW5nW107XG4gIGQzRGl2SWQ6IHN0cmluZztcbiAgY29udGFpbmVyRGl2SWQ6IHN0cmluZztcbiAgc3ZnQ29udGFpbmVyOiBhbnk7XG4gIHBhbmVsV2lkdGg6IGFueTtcbiAgcGFuZWxIZWlnaHQ6IGFueTtcblxuICBwYW5lbERlZmF1bHRzID0ge1xuICAgIHNhdmVkQ29tcG9zaXRlczogW10sXG4gICAgc2F2ZWRPdmVycmlkZXM6IEFycmF5PE1ldHJpY092ZXJyaWRlPigpLFxuICAgIGNvbG9yczogW1wiIzI5OWM0NlwiLCBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiLCBcIiNkNDRhM2FcIl0sXG4gICAgcG9seXN0YXQ6IHtcbiAgICAgIGFuaW1hdGlvblNwZWVkOiAyNTAwLFxuICAgICAgY29sdW1uczogXCJcIixcbiAgICAgIGNvbHVtbkF1dG9TaXplOiB0cnVlLFxuICAgICAgZGlzcGxheUxpbWl0OiAxMDAsXG4gICAgICBkZWZhdWx0Q2xpY2tUaHJvdWdoOiBcIlwiLFxuICAgICAgZGVmYXVsdENsaWNrVGhyb3VnaFNhbml0aXplOiBmYWxzZSxcbiAgICAgIGZvbnRBdXRvU2NhbGU6IHRydWUsXG4gICAgICBmb250U2l6ZTogMTIsXG4gICAgICBmb250VHlwZTogXCJSb2JvdG9cIixcbiAgICAgIGdsb2JhbFVuaXRGb3JtYXQ6IFwic2hvcnRcIixcbiAgICAgIGdsb2JhbERlY2ltYWxzOiAyLFxuICAgICAgZ2xvYmFsRGlzcGxheU1vZGU6IFwiYWxsXCIsXG4gICAgICBnbG9iYWxPcGVyYXRvck5hbWU6IFwiYXZnXCIsXG4gICAgICBnbG9iYWxEaXNwbGF5VGV4dFRyaWdnZXJlZEVtcHR5OiBcIk9LXCIsXG4gICAgICBncmFkaWVudEVuYWJsZWQ6IHRydWUsXG4gICAgICBoZXhhZ29uU29ydEJ5RGlyZWN0aW9uOiBcImFzY1wiLFxuICAgICAgaGV4YWdvblNvcnRCeUZpZWxkOiBcIm5hbWVcIixcbiAgICAgIG1heE1ldHJpY3M6IDAsXG4gICAgICBwb2x5Z29uQm9yZGVyU2l6ZTogMixcbiAgICAgIHBvbHlnb25Cb3JkZXJDb2xvcjogXCJibGFja1wiLFxuICAgICAgcG9seWdvbkdsb2JhbEZpbGxDb2xvcjogXCIjMGE1MGExXCIsXG4gICAgICByYWRpdXM6IFwiXCIsXG4gICAgICByYWRpdXNBdXRvU2l6ZTogdHJ1ZSxcbiAgICAgIHJvd3M6IFwiXCIsXG4gICAgICByb3dBdXRvU2l6ZTogdHJ1ZSxcbiAgICAgIHNoYXBlOiBcImhleGFnb25fcG9pbnRlZF90b3BcIixcbiAgICAgIHRvb2x0aXBEaXNwbGF5TW9kZTogXCJhbGxcIixcbiAgICAgIHRvb2x0aXBEaXNwbGF5VGV4dFRyaWdnZXJlZEVtcHR5OiBcIk9LXCIsXG4gICAgICB0b29sdGlwRm9udFNpemU6IDEyLFxuICAgICAgdG9vbHRpcEZvbnRUeXBlOiBcIlJvYm90b1wiLFxuICAgICAgdG9vbHRpcFByaW1hcnlTb3J0RGlyZWN0aW9uOiBcImRlc2NcIixcbiAgICAgIHRvb2x0aXBQcmltYXJ5U29ydEZpZWxkOiBcInRocmVzaG9sZExldmVsXCIsXG4gICAgICB0b29sdGlwU2Vjb25kYXJ5U29ydERpcmVjdGlvbjogXCJkZXNjXCIsXG4gICAgICB0b29sdGlwU2Vjb25kYXJ5U29ydEZpZWxkOiBcInZhbHVlXCIsXG4gICAgICB0b29sdGlwVGltZXN0YW1wRW5hYmxlZDogdHJ1ZSxcbiAgICB9LFxuICB9O1xuXG5cbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IsIHRlbXBsYXRlU3J2LCBhbGVydFNydiwgcHJpdmF0ZSAkc2FuaXRpemUpIHtcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XG4gICAgLy8gbWVyZ2UgZXhpc3Rpbmcgc2V0dGluZ3Mgd2l0aCBvdXIgZGVmYXVsdHNcbiAgICBfLmRlZmF1bHRzRGVlcCh0aGlzLnBhbmVsLCB0aGlzLnBhbmVsRGVmYXVsdHMpO1xuXG4gICAgdGhpcy5kM0RpdklkID0gXCJkM19zdmdfXCIgKyB0aGlzLnBhbmVsLmlkO1xuICAgIHRoaXMuY29udGFpbmVyRGl2SWQgPSBcImNvbnRhaW5lcl9cIiArIHRoaXMuZDNEaXZJZDtcbiAgICB0aGlzLmFsZXJ0U3J2UmVmID0gYWxlcnRTcnY7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIHRoaXMucGFuZWxDb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMudGVtcGxhdGVTcnYgPSB0ZW1wbGF0ZVNydjtcbiAgICB0aGlzLnN2Z0NvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5wYW5lbFdpZHRoID0gbnVsbDtcbiAgICB0aGlzLnBhbmVsSGVpZ2h0ID0gbnVsbDtcbiAgICB0aGlzLnBvbHlzdGF0RGF0YSA9IG5ldyBBcnJheTxQb2x5c3RhdE1vZGVsPigpO1xuICAgIHRoaXMuZDNPYmplY3QgPSBudWxsO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMuc2VyaWVzID0gW107XG4gICAgdGhpcy5wb2x5c3RhdERhdGEgPSBbXTtcbiAgICB0aGlzLnRvb2x0aXBDb250ZW50ID0gW107XG4gICAgdGhpcy5vdmVycmlkZXNDdHJsID0gbmV3IE1ldHJpY092ZXJyaWRlc01hbmFnZXIoJHNjb3BlLCB0ZW1wbGF0ZVNydiwgJHNhbml0aXplLCB0aGlzLnBhbmVsLnNhdmVkT3ZlcnJpZGVzKTtcbiAgICB0aGlzLmNvbXBvc2l0ZXNNYW5hZ2VyID0gbmV3IENvbXBvc2l0ZXNNYW5hZ2VyKCRzY29wZSwgdGVtcGxhdGVTcnYsICRzYW5pdGl6ZSwgdGhpcy5wYW5lbC5zYXZlZENvbXBvc2l0ZXMpO1xuICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtcmVjZWl2ZWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtZXJyb3JcIiwgdGhpcy5vbkRhdGFFcnJvci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtc25hcHNob3QtbG9hZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xuICB9XG5cblxuICBvbkluaXRFZGl0TW9kZSgpIHtcbiAgICAvLyBkZXRlcm1pbmUgdGhlIHBhdGggdG8gdGhpcyBwbHVnaW4gYmFzZSBvbiB0aGUgbmFtZSBmb3VuZCBpbiBwYW5lbC50eXBlXG4gICAgdmFyIHRoaXNQYW5lbFBhdGggPSBcInB1YmxpYy9wbHVnaW5zL1wiICsgdGhpcy5wYW5lbC50eXBlICsgXCIvXCI7XG4gICAgLy8gYWRkIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHRoZSBwYXJ0aWFsXG4gICAgdmFyIG9wdGlvbnNQYXRoID0gdGhpc1BhbmVsUGF0aCArIFwicGFydGlhbHMvZWRpdG9yLm9wdGlvbnMuaHRtbFwiO1xuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiT3B0aW9uc1wiLCBvcHRpb25zUGF0aCwgMik7XG4gICAgdmFyIG92ZXJyaWRlc1BhdGggPSB0aGlzUGFuZWxQYXRoICsgXCJwYXJ0aWFscy9lZGl0b3Iub3ZlcnJpZGVzLmh0bWxcIjtcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIk92ZXJyaWRlc1wiLCBvdmVycmlkZXNQYXRoLCAzKTtcbiAgICB2YXIgY29tcG9zaXRlc1BhdGggPSB0aGlzUGFuZWxQYXRoICsgXCJwYXJ0aWFscy9lZGl0b3IuY29tcG9zaXRlcy5odG1sXCI7XG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJDb21wb3NpdGVzXCIsIGNvbXBvc2l0ZXNQYXRoLCA0KTtcbiAgICAvLyBkaXNhYmxlZCBmb3Igbm93XG4gICAgLy92YXIgbWFwcGluZ3NQYXRoID0gdGhpc1BhbmVsUGF0aCArIFwicGFydGlhbHMvZWRpdG9yLm1hcHBpbmdzLmh0bWxcIjtcbiAgICAvL3RoaXMuYWRkRWRpdG9yVGFiKFwiVmFsdWUgTWFwcGluZ3NcIiwgbWFwcGluZ3NQYXRoLCA1KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBbc2V0Q29udGFpbmVyIGRlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0ge1t0eXBlXX0gY29udGFpbmVyIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHNldENvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLnBhbmVsQ29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gY29udGFpbmVyO1xuICB9XG5cbiAgLy8gZGV0ZXJtaW5lIHRoZSB3aWR0aCBvZiBhIHBhbmVsIGJ5IHRoZSBzcGFuIGFuZCB2aWV3cG9ydFxuICAvLyB0aGUgbGluayBlbGVtZW50IG9iamVjdCBjYW4gYmUgdXNlZCB0byBnZXQgdGhlIHdpZHRoIG1vcmUgcmVsaWFibHlcbiAgZ2V0UGFuZWxXaWR0aEZhaWxzYWZlKCkge1xuICAgIHZhciB0cnVlV2lkdGggPSAwO1xuICAgIGlmICh0eXBlb2YgdGhpcy5wYW5lbC5ncmlkUG9zICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAvLyAyNCBzbG90cyBpcyBmdWxsc2NyZWVuLCBnZXQgdGhlIHZpZXdwb3J0IGFuZCBkaXZpZGUgdG8gYXBwcm94aW1hdGUgdGhlIHdpZHRoXG4gICAgICBsZXQgdmlld1BvcnRXaWR0aCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgICBsZXQgcGl4ZWxzUGVyU2xvdCA9IHZpZXdQb3J0V2lkdGggLyAyNDtcbiAgICAgIHRydWVXaWR0aCA9IE1hdGgucm91bmQodGhpcy5wYW5lbC5ncmlkUG9zLncgKiBwaXhlbHNQZXJTbG90KTtcbiAgICAgIHJldHVybiB0cnVlV2lkdGg7XG4gICAgfVxuICAgIC8vIGdyYWZhbmE1IC0gdXNlIHRoaXMucGFuZWwuZ3JpZFBvcy53LCB0aGlzLnBhbmVsLmdyaWRQb3MuaFxuICAgIGlmICh0eXBlb2YgdGhpcy5wYW5lbC5zcGFuID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAvLyBjaGVjayBpZiBpbnNpZGUgZWRpdCBtb2RlXG4gICAgICBpZiAodGhpcy5lZGl0TW9kZUluaXRpYXRlZCkge1xuICAgICAgICAvLyB3aWR0aCBpcyBjbGllbnRXaWR0aCBvZiBkb2N1bWVudFxuICAgICAgICB0cnVlV2lkdGggPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGdldCB0aGUgd2lkdGggYmFzZWQgb24gdGhlIHNjYWxlZCBjb250YWluZXIgKHY1IG5lZWRzIHRoaXMpXG4gICAgICAgIHRydWVXaWR0aCA9IHRoaXMucGFuZWxDb250YWluZXIub2Zmc2V0UGFyZW50LmNsaWVudFdpZHRoO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB2NCBhbmQgcHJldmlvdXMgdXNlZCBmaXhlZCBzcGFuc1xuICAgICAgdmFyIHZpZXdQb3J0V2lkdGggPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICAgICAgLy8gZ2V0IHRoZSBwaXhlbHMgb2YgYSBzcGFuXG4gICAgICB2YXIgcGl4ZWxzUGVyU3BhbiA9IHZpZXdQb3J0V2lkdGggLyAxMjtcbiAgICAgIC8vIG11bHRpcGx5IG51bSBzcGFucyBieSBwaXhlbHNQZXJTcGFuXG4gICAgICB0cnVlV2lkdGggPSBNYXRoLnJvdW5kKHRoaXMucGFuZWwuc3BhbiAqIHBpeGVsc1BlclNwYW4pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVdpZHRoO1xuICB9XG5cbiAgZ2V0UGFuZWxIZWlnaHQoKSB7XG4gICAgLy8gcGFuZWwgY2FuIGhhdmUgYSBmaXhlZCBoZWlnaHQgc2V0IHZpYSBcIkdlbmVyYWxcIiB0YWIgaW4gcGFuZWwgZWRpdG9yXG4gICAgdmFyIHRtcFBhbmVsSGVpZ2h0ID0gdGhpcy5wYW5lbC5oZWlnaHQ7XG4gICAgaWYgKCh0eXBlb2YgdG1wUGFuZWxIZWlnaHQgPT09IFwidW5kZWZpbmVkXCIpIHx8ICh0bXBQYW5lbEhlaWdodCA9PT0gXCJcIikpIHtcbiAgICAgIC8vIGdyYWZhbmEgYWxzbyBzdXBwbGllcyB0aGUgaGVpZ2h0LCB0cnkgdG8gdXNlIHRoYXQgaWYgdGhlIHBhbmVsIGRvZXMgbm90IGhhdmUgYSBoZWlnaHRcbiAgICAgIHRtcFBhbmVsSGVpZ2h0ID0gU3RyaW5nKHRoaXMuaGVpZ2h0KTtcbiAgICAgIC8vIHY0IGFuZCBlYXJsaWVyIGRlZmluZSB0aGlzIGhlaWdodCwgZGV0ZWN0IHNwYW4gZm9yIHByZS12NVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhbmVsLnNwYW4gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gaGVhZGVyLCBhZGp1c3QgaGVpZ2h0IHRvIHVzZSBhbGwgc3BhY2UgYXZhaWxhYmxlXG4gICAgICAgIHZhciBwYW5lbFRpdGxlT2Zmc2V0ID0gMjA7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsLnRpdGxlICE9PSBcIlwiKSB7XG4gICAgICAgICAgcGFuZWxUaXRsZU9mZnNldCA9IDQyO1xuICAgICAgICB9XG4gICAgICAgIHRtcFBhbmVsSGVpZ2h0ID0gU3RyaW5nKHRoaXMuY29udGFpbmVySGVpZ2h0IC0gcGFuZWxUaXRsZU9mZnNldCk7IC8vIG9mZnNldCBmb3IgaGVhZGVyXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRtcFBhbmVsSGVpZ2h0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIC8vIGhlaWdodCBzdGlsbCBjYW5ub3QgYmUgZGV0ZXJtaW5lZCwgZ2V0IGl0IGZyb20gdGhlIHJvdyBpbnN0ZWFkXG4gICAgICAgIHRtcFBhbmVsSGVpZ2h0ID0gdGhpcy5yb3cuaGVpZ2h0O1xuICAgICAgICBpZiAodHlwZW9mIHRtcFBhbmVsSGVpZ2h0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgLy8gbGFzdCByZXNvcnQgLSBkZWZhdWx0IHRvIDI1MHB4ICh0aGlzIHNob3VsZCBuZXZlciBoYXBwZW4pXG4gICAgICAgICAgdG1wUGFuZWxIZWlnaHQgPSBcIjI1MFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJlcGxhY2UgcHhcbiAgICB0bXBQYW5lbEhlaWdodCA9IHRtcFBhbmVsSGVpZ2h0LnJlcGxhY2UoXCJweFwiLCBcIlwiKTtcbiAgICAvLyBjb252ZXJ0IHRvIG51bWVyaWMgdmFsdWVcbiAgICB2YXIgYWN0dWFsSGVpZ2h0ID0gcGFyc2VJbnQodG1wUGFuZWxIZWlnaHQsIDEwKTtcbiAgICByZXR1cm4gYWN0dWFsSGVpZ2h0O1xuICB9XG5cbiAgY2xlYXJTVkcoKSB7XG4gICAgaWYgKCQoXCIjXCIgKyB0aGlzLmQzRGl2SWQpLmxlbmd0aCkge1xuICAgICAgJChcIiNcIiArIHRoaXMuZDNEaXZJZCkucmVtb3ZlKCk7XG4gICAgfVxuICAgIGlmICgkKFwiI1wiICsgdGhpcy5kM0RpdklkICsgXCItcGFuZWxcIikubGVuZ3RoKSB7XG4gICAgICAkKFwiI1wiICsgdGhpcy5kM0RpdklkICsgXCItcGFuZWxcIikucmVtb3ZlKCk7XG4gICAgfVxuICAgIGlmICgkKFwiI1wiICsgdGhpcy5kM0RpdklkICsgXCItdG9vbHRpcFwiKS5sZW5ndGgpIHtcbiAgICAgICQoXCIjXCIgKyB0aGlzLmQzRGl2SWQgKyBcIi10b29sdGlwXCIpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckQzKCkge1xuICAgIHRoaXMuc2V0VmFsdWVzKHRoaXMuZGF0YSk7XG4gICAgdGhpcy5jbGVhclNWRygpO1xuICAgIGlmICh0aGlzLnBhbmVsV2lkdGggPT09IDApIHtcbiAgICAgIHRoaXMucGFuZWxXaWR0aCA9IHRoaXMuZ2V0UGFuZWxXaWR0aEZhaWxzYWZlKCk7XG4gICAgfVxuICAgIHRoaXMucGFuZWxIZWlnaHQgPSB0aGlzLmdldFBhbmVsSGVpZ2h0KCk7XG4gICAgdmFyIG1hcmdpbiA9IHsgdG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwIH07XG4gICAgdmFyIHdpZHRoID0gdGhpcy5wYW5lbFdpZHRoO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLnBhbmVsSGVpZ2h0O1xuXG4gICAgbWFyZ2luLnRvcCA9IDA7XG4gICAgLy8gcHJlLXY1LCB3aXRoIHRpdGxlLCBzZXQgdG9wIG1hcmdpbiB0byBhdCBsZWFzdCA3cHhcbiAgICBpZiAoKHR5cGVvZiB0aGlzLnBhbmVsLnNwYW4gIT09IFwidW5kZWZpbmVkXCIpICYmICh0aGlzLnBhbmVsLnRpdGxlICE9PSBcIlwiKSkge1xuICAgICAgbWFyZ2luLnRvcCA9IDc7XG4gICAgfVxuICAgIG1hcmdpbi5ib3R0b20gPSAwO1xuXG4gICAgLy8gbmV3IGF0dHJpYnV0ZXMgbWF5IG5vdCBiZSBkZWZpbmVkIGluIG9sZGVyIHBhbmVsIGRlZmluaXRpb25zXG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhbmVsLnBvbHlzdGF0LnBvbHlnb25Cb3JkZXJTaXplID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnBhbmVsLnBvbHlzdGF0LnBvbHlnb25Cb3JkZXJTaXplID0gMjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhbmVsLnBvbHlzdGF0LnBvbHlnb25Cb3JkZXJDb2xvciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5wYW5lbC5wb2x5c3RhdC5wb2x5Z29uQm9yZGVyQ29sb3IgPSBcImJsYWNrXCI7XG4gICAgfVxuXG4gICAgdmFyIG9wdCA9IHtcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgcmFkaXVzOiB0aGlzLnBhbmVsLnBvbHlzdGF0LnJhZGl1cyxcbiAgICAgIHJhZGl1c0F1dG9TaXplOiB0aGlzLnBhbmVsLnBvbHlzdGF0LnJhZGl1c0F1dG9TaXplLFxuICAgICAgdG9vbHRpcEZvbnRTaXplOiB0aGlzLnBhbmVsLnBvbHlzdGF0LnRvb2x0aXBGb250U2l6ZSxcbiAgICAgIHRvb2x0aXBGb250VHlwZTogdGhpcy5wYW5lbC5wb2x5c3RhdC50b29sdGlwRm9udFR5cGUsXG4gICAgICBkYXRhOiB0aGlzLnBvbHlzdGF0RGF0YSxcbiAgICAgIGRpc3BsYXlMaW1pdDogdGhpcy5wYW5lbC5wb2x5c3RhdC5kaXNwbGF5TGltaXQsXG4gICAgICBnbG9iYWxEaXNwbGF5TW9kZTogdGhpcy5wYW5lbC5wb2x5c3RhdC5nbG9iYWxEaXNwbGF5TW9kZSxcbiAgICAgIGNvbHVtbnM6IHRoaXMucGFuZWwucG9seXN0YXQuY29sdW1ucyxcbiAgICAgIGNvbHVtbkF1dG9TaXplOiB0aGlzLnBhbmVsLnBvbHlzdGF0LmNvbHVtbkF1dG9TaXplLFxuICAgICAgcm93czogdGhpcy5wYW5lbC5wb2x5c3RhdC5yb3dzLFxuICAgICAgcm93QXV0b1NpemU6IHRoaXMucGFuZWwucG9seXN0YXQucm93QXV0b1NpemUsXG4gICAgICB0b29sdGlwQ29udGVudDogdGhpcy50b29sdGlwQ29udGVudCxcbiAgICAgIGFuaW1hdGlvblNwZWVkOiB0aGlzLnBhbmVsLnBvbHlzdGF0LmFuaW1hdGlvblNwZWVkLFxuICAgICAgZGVmYXVsdENsaWNrVGhyb3VnaDogdGhpcy5nZXREZWZhdWx0Q2xpY2tUaHJvdWdoKE5hTiksXG4gICAgICBwb2x5c3RhdDogdGhpcy5wYW5lbC5wb2x5c3RhdCxcbiAgICB9O1xuICAgIHRoaXMuZDNPYmplY3QgPSBuZXcgRDNXcmFwcGVyKHRoaXMudGVtcGxhdGVTcnYsIHRoaXMuc3ZnQ29udGFpbmVyLCB0aGlzLmQzRGl2SWQsIG9wdCk7XG4gICAgdGhpcy5kM09iamVjdC5kcmF3KCk7XG4gIH1cblxuICByZW1vdmVWYWx1ZU1hcChtYXApIHtcbiAgICB2YXIgaW5kZXggPSBfLmluZGV4T2YodGhpcy5wYW5lbC52YWx1ZU1hcHMsIG1hcCk7XG4gICAgdGhpcy5wYW5lbC52YWx1ZU1hcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYWRkVmFsdWVNYXAoKSB7XG4gICAgdGhpcy5wYW5lbC52YWx1ZU1hcHMucHVzaCh7IHZhbHVlOiBcIlwiLCBvcDogXCI9XCIsIHRleHQ6IFwiXCIgfSk7XG4gIH1cblxuICByZW1vdmVSYW5nZU1hcChyYW5nZU1hcCkge1xuICAgIHZhciBpbmRleCA9IF8uaW5kZXhPZih0aGlzLnBhbmVsLnJhbmdlTWFwcywgcmFuZ2VNYXApO1xuICAgIHRoaXMucGFuZWwucmFuZ2VNYXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGFkZFJhbmdlTWFwKCkge1xuICAgIHRoaXMucGFuZWwucmFuZ2VNYXBzLnB1c2goeyBmcm9tOiBcIlwiLCB0bzogXCJcIiwgdGV4dDogXCJcIiB9KTtcbiAgfVxuXG4gIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgaWYgKCFzY29wZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWF0dHJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwYW5lbEJ5Q2xhc3MgPSBlbGVtLmZpbmQoXCIuZ3JhZmFuYS1kMy1wb2x5c3RhdFwiKTtcbiAgICBwYW5lbEJ5Q2xhc3MuYXBwZW5kKFwiPGRpdiBzdHlsZT1cXFwid2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcXFwiIGlkPVxcXCJcIiArIGN0cmwuY29udGFpbmVyRGl2SWQgKyBcIlxcXCI+PC9kaXY+XCIpO1xuICAgIHZhciBjb250YWluZXIgPSBwYW5lbEJ5Q2xhc3NbMF0uY2hpbGROb2Rlc1swXTtcbiAgICBjdHJsLnNldENvbnRhaW5lcihjb250YWluZXIpO1xuXG4gICAgZWxlbSA9IGVsZW0uZmluZChcIi5ncmFmYW5hLWQzLXBvbHlzdGF0XCIpO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgLy8gdHJ5IHRvIGdldCB0aGUgd2lkdGhcbiAgICAgIGN0cmwucGFuZWxXaWR0aCA9IGVsZW0ud2lkdGgoKSArIDIwO1xuICAgICAgY3RybC5yZW5kZXJEMygpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50cy5vbihcInJlbmRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyB0cnkgdG8gZ2V0IHRoZSB3aWR0aFxuICAgICAgY3RybC5wYW5lbFdpZHRoID0gZWxlbS53aWR0aCgpICsgMjA7XG4gICAgICByZW5kZXIoKTtcbiAgICAgIGN0cmwucmVuZGVyaW5nQ29tcGxldGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZXMoZGF0YUxpc3QpIHtcbiAgICB0aGlzLmRhdGFSYXcgPSBkYXRhTGlzdDtcbiAgICAvLyBhdXRvbWF0aWNhbGx5IGNvcnJlY3QgdHJhbnNmb3JtIG1vZGUgYmFzZWQgb24gZGF0YVxuICAgIGlmICh0aGlzLmRhdGFSYXcgJiYgdGhpcy5kYXRhUmF3Lmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuZGF0YVJhd1swXS50eXBlID09PSBcInRhYmxlXCIpIHtcbiAgICAgICAgdGhpcy5wYW5lbC50cmFuc2Zvcm0gPSBcInRhYmxlXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5kYXRhUmF3WzBdLnR5cGUgPT09IFwiZG9jc1wiKSB7XG4gICAgICAgICAgdGhpcy5wYW5lbC50cmFuc2Zvcm0gPSBcImpzb25cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5wYW5lbC50cmFuc2Zvcm0gPT09IFwidGFibGVcIiB8fCB0aGlzLnBhbmVsLnRyYW5zZm9ybSA9PT0gXCJqc29uXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwudHJhbnNmb3JtID0gXCJ0aW1lc2VyaWVzX3RvX3Jvd3NcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWdub3JlIHRoZSBhYm92ZSBhbmQgdXNlIGEgdGltZXNlcmllc1xuICAgIHRoaXMucG9seXN0YXREYXRhLmxlbmd0aCA9IDA7XG4gICAgaWYgKHRoaXMuc2VyaWVzICYmIHRoaXMuc2VyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnNlcmllcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgbGV0IGFTZXJpZXMgPSB0aGlzLnNlcmllc1tpbmRleF07XG4gICAgICAgIGxldCBjb252ZXJ0ZWQgPSBUcmFuc2Zvcm1lcnMuVGltZVNlcmllc1RvUG9seXN0YXQodGhpcy5wYW5lbC5wb2x5c3RhdC5nbG9iYWxPcGVyYXRvck5hbWUsIGFTZXJpZXMpO1xuICAgICAgICB0aGlzLnBvbHlzdGF0RGF0YS5wdXNoKGNvbnZlcnRlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGFwcGx5IGdsb2JhbCB1bml0IGZvcm1hdHRpbmcgYW5kIGRlY2ltYWxzXG4gICAgdGhpcy5hcHBseUdsb2JhbEZvcm1hdHRpbmcodGhpcy5wb2x5c3RhdERhdGEpO1xuICAgIC8vIGZpbHRlciBvdXQgYnkgZ2xvYmFsRGlzcGxheU1vZGVcbiAgICB0aGlzLnBvbHlzdGF0RGF0YSA9IHRoaXMuZmlsdGVyQnlHbG9iYWxEaXNwbGF5TW9kZSh0aGlzLnBvbHlzdGF0RGF0YSk7XG4gICAgLy8gbm93IHNvcnRcbiAgICB0aGlzLnBvbHlzdGF0RGF0YSA9IF8ub3JkZXJCeShcbiAgICAgIHRoaXMucG9seXN0YXREYXRhLFxuICAgICAgW3RoaXMucGFuZWwucG9seXN0YXQuaGV4YWdvblNvcnRCeUZpZWxkXSxcbiAgICAgIFt0aGlzLnBhbmVsLnBvbHlzdGF0LmhleGFnb25Tb3J0QnlEaXJlY3Rpb25dKTtcbiAgICAvLyB0aGlzIG5lZWRzIHRvIGJlIHBlcmZvcm1lZCBhZnRlciBzb3J0aW5nIHJ1bGVzIGFyZSBhcHBsaWVkXG4gICAgLy8gYXBwbHkgb3ZlcnJpZGVzXG4gICAgdGhpcy5vdmVycmlkZXNDdHJsLmFwcGx5T3ZlcnJpZGVzKHRoaXMucG9seXN0YXREYXRhKTtcbiAgICAvLyBhcHBseSBjb21wb3NpdGVzLCB0aGlzIHdpbGwgZmlsdGVyIGFzIG5lZWRlZCBhbmQgc2V0IGNsaWNrdGhyb3VnaFxuICAgIHRoaXMucG9seXN0YXREYXRhID0gdGhpcy5jb21wb3NpdGVzTWFuYWdlci5hcHBseUNvbXBvc2l0ZXModGhpcy5wb2x5c3RhdERhdGEpO1xuICAgIC8vIGFwcGx5IGdsb2JhbCBjbGlja3Rocm91Z2ggdG8gYWxsIGl0ZW1zIG5vdCBzZXRcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5wb2x5c3RhdERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAodGhpcy5wb2x5c3RhdERhdGFbaW5kZXhdLmNsaWNrVGhyb3VnaC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gYWRkIHRoZSBzZXJpZXMgYWxpYXMgYXMgYSB2YXIgdG8gdGhlIGNsaWNrdGhyb3VnaHVybFxuICAgICAgICB0aGlzLnBvbHlzdGF0RGF0YVtpbmRleF0uY2xpY2tUaHJvdWdoID0gdGhpcy5nZXREZWZhdWx0Q2xpY2tUaHJvdWdoKGluZGV4KTtcbiAgICAgICAgdGhpcy5wb2x5c3RhdERhdGFbaW5kZXhdLnNhbml0aXplVVJMRW5hYmxlZCA9IHRoaXMucGFuZWwucG9seXN0YXQuZGVmYXVsdENsaWNrVGhyb3VnaFNhbml0aXplO1xuICAgICAgICB0aGlzLnBvbHlzdGF0RGF0YVtpbmRleF0uc2FuaXRpemVkVVJMID0gdGhpcy4kc2FuaXRpemUodGhpcy5wb2x5c3RhdERhdGFbaW5kZXhdLmNsaWNrVGhyb3VnaCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGdlbmVyYXRlIHRvb2x0aXBzXG4gICAgdGhpcy50b29sdGlwQ29udGVudCA9IFRvb2x0aXAuZ2VuZXJhdGUodGhpcy4kc2NvcGUsIHRoaXMucG9seXN0YXREYXRhLCB0aGlzLnBhbmVsLnBvbHlzdGF0KTtcbiAgfVxuXG4gIGFwcGx5R2xvYmFsRm9ybWF0dGluZyhkYXRhOiBhbnkpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBmb3JtYXRGdW5jID0ga2JuLnZhbHVlRm9ybWF0c1t0aGlzLnBhbmVsLnBvbHlzdGF0Lmdsb2JhbFVuaXRGb3JtYXRdO1xuICAgICAgaWYgKGZvcm1hdEZ1bmMpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IEdldERlY2ltYWxzRm9yVmFsdWUoZGF0YVtpbmRleF0udmFsdWUsIHRoaXMucGFuZWwucG9seXN0YXQuZ2xvYmFsRGVjaW1hbHMpO1xuICAgICAgICBkYXRhW2luZGV4XS52YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoZGF0YVtpbmRleF0udmFsdWUsIHJlc3VsdC5kZWNpbWFscywgcmVzdWx0LnNjYWxlZERlY2ltYWxzKTtcbiAgICAgICAgZGF0YVtpbmRleF0udmFsdWVSb3VuZGVkID0ga2JuLnJvdW5kVmFsdWUoZGF0YVtpbmRleF0udmFsdWUsIHJlc3VsdC5kZWNpbWFscyk7XG4gICAgICB9XG4gICAgICAvLyBkZWZhdWx0IHRoZSBjb2xvciB0byB0aGUgZ2xvYmFsIHNldHRpbmdcbiAgICAgIGRhdGFbaW5kZXhdLmNvbG9yID0gdGhpcy5wYW5lbC5wb2x5c3RhdC5wb2x5Z29uR2xvYmFsRmlsbENvbG9yO1xuICAgIH1cbiAgfVxuXG5cbiAgZmlsdGVyQnlHbG9iYWxEaXNwbGF5TW9kZShkYXRhOiBhbnkpIHtcbiAgICBsZXQgZmlsdGVyZWRNZXRyaWNzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICBsZXQgY29tcG9zaXRlTWV0cmljcyA9IG5ldyBBcnJheTxQb2x5c3RhdE1vZGVsPigpO1xuICAgIGlmICh0aGlzLnBhbmVsLnBvbHlzdGF0Lmdsb2JhbERpc3BsYXlNb2RlICE9PSBcImFsbFwiKSB7XG4gICAgICBsZXQgZGF0YUxlbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhTGVuOyBpKyspIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBkYXRhW2ldO1xuICAgICAgICAvLyBrZWVwIGlmIGNvbXBvc2l0ZVxuICAgICAgICBpZiAoaXRlbS5pc0NvbXBvc2l0ZSkge1xuICAgICAgICAgIGNvbXBvc2l0ZU1ldHJpY3MucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS50aHJlc2hvbGRMZXZlbCA8IDEpIHtcbiAgICAgICAgICAvLyBwdXNoIHRoZSBpbmRleCBudW1iZXJcbiAgICAgICAgICBmaWx0ZXJlZE1ldHJpY3MucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIGZpbHRlcmVkIG1ldHJpY3MsIHVzZSBzcGxpY2UgaW4gcmV2ZXJzZSBvcmRlclxuICAgICAgZm9yIChsZXQgaSA9IGRhdGEubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoXy5pbmNsdWRlcyhmaWx0ZXJlZE1ldHJpY3MsIGkpKSB7XG4gICAgICAgICAgZGF0YS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoY29tcG9zaXRlTWV0cmljcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gc2V0IGRhdGEgdG8gYmUgYWxsIG9mIHRoZSBjb21wb3NpdGVzXG4gICAgICAgICAgZGF0YSA9IGNvbXBvc2l0ZU1ldHJpY3M7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBvbkRhdGFFcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIHRoaXMub25EYXRhUmVjZWl2ZWQoW10pO1xuICB9XG5cbiAgb25EYXRhUmVjZWl2ZWQoZGF0YUxpc3QpIHtcbiAgICB0aGlzLnNlcmllcyA9IGRhdGFMaXN0Lm1hcCh0aGlzLnNlcmllc0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICB2YWx1ZTogMCxcbiAgICAgIHZhbHVlRm9ybWF0dGVkOiAwLFxuICAgICAgdmFsdWVSb3VuZGVkOiAwXG4gICAgfTtcbiAgICB0aGlzLnNldFZhbHVlcyhkYXRhKTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBzZXJpZXNIYW5kbGVyKHNlcmllc0RhdGEpIHtcbiAgICB2YXIgc2VyaWVzID0gbmV3IFRpbWVTZXJpZXMoe1xuICAgICAgZGF0YXBvaW50czogc2VyaWVzRGF0YS5kYXRhcG9pbnRzLFxuICAgICAgYWxpYXM6IHNlcmllc0RhdGEudGFyZ2V0LFxuICAgIH0pO1xuICAgIHNlcmllcy5mbG90cGFpcnMgPSBzZXJpZXMuZ2V0RmxvdFBhaXJzKHRoaXMucGFuZWwubnVsbFBvaW50TW9kZSk7XG4gICAgcmV0dXJuIHNlcmllcztcbiAgfVxuXG4gIGludmVydENvbG9yT3JkZXIoKSB7XG4gICAgdmFyIHRtcCA9IHRoaXMucGFuZWwuY29sb3JzWzBdO1xuICAgIHRoaXMucGFuZWwuY29sb3JzWzBdID0gdGhpcy5wYW5lbC5jb2xvcnNbMl07XG4gICAgdGhpcy5wYW5lbC5jb2xvcnNbMl0gPSB0bXA7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVlZCBtdXN0IG5vdCBiZSBsZXNzIHRoYW4gNTAwbXNcbiAgICovXG4gIHZhbGlkYXRlQW5pbWF0aW9uU3BlZWQoKSB7XG4gICAgbGV0IHNwZWVkID0gdGhpcy5wYW5lbC5wb2x5c3RhdC5hbmltYXRpb25TcGVlZDtcbiAgICBsZXQgbmV3U3BlZWQgPSA1MDAwO1xuICAgIGlmIChzcGVlZCkge1xuICAgICAgaWYgKCFpc05hTihwYXJzZUludChzcGVlZCwgMTApKSkge1xuICAgICAgICBsZXQgY2hlY2tTcGVlZCA9IHBhcnNlSW50KHNwZWVkLCAxMCk7XG4gICAgICAgIGlmIChjaGVja1NwZWVkID49IDUwMCkge1xuICAgICAgICAgIG5ld1NwZWVkID0gY2hlY2tTcGVlZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBhbmVsLnBvbHlzdGF0LmFuaW1hdGlvblNwZWVkID0gbmV3U3BlZWQ7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHZhbGlkYXRlQ29sdW1uVmFsdWUoKSB7XG4gICAgbGV0IGNvbHVtbnMgPSB0aGlzLnBhbmVsLnBvbHlzdGF0LmNvbHVtbnM7XG4gICAgbGV0IG5ld0NvbHVtbnMgPSAxO1xuICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KGNvbHVtbnMsIDEwKSkpIHtcbiAgICAgICAgbGV0IGNoZWNrQ29sdW1ucyA9IHBhcnNlSW50KGNvbHVtbnMsIDEwKTtcbiAgICAgICAgaWYgKGNoZWNrQ29sdW1ucyA+IDApIHtcbiAgICAgICAgICBuZXdDb2x1bW5zID0gY2hlY2tDb2x1bW5zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGFuZWwucG9seXN0YXQuY29sdW1ucyA9IG5ld0NvbHVtbnM7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHZhbGlkYXRlUm93VmFsdWUoKSB7XG4gICAgbGV0IHJvd3MgPSB0aGlzLnBhbmVsLnBvbHlzdGF0LnJvd3M7XG4gICAgbGV0IG5ld1Jvd3MgPSAxO1xuICAgIGlmIChyb3dzKSB7XG4gICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHJvd3MsIDEwKSkpIHtcbiAgICAgICAgbGV0IGNoZWNrUm93cyA9IHBhcnNlSW50KHJvd3MsIDEwKTtcbiAgICAgICAgaWYgKGNoZWNrUm93cyA+IDApIHtcbiAgICAgICAgICBuZXdSb3dzID0gY2hlY2tSb3dzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGFuZWwucG9seXN0YXQucm93cyA9IG5ld1Jvd3M7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHZhbGlkYXRlUmFkaXVzVmFsdWUoKSB7XG4gICAgbGV0IHJhZGl1cyA9IHRoaXMucGFuZWwucG9seXN0YXQucmFkaXVzO1xuICAgIGxldCBuZXdSYWRpdXMgPSAyNTtcbiAgICBpZiAocmFkaXVzICE9PSBudWxsKSB7XG4gICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHJhZGl1cywgMTApKSkge1xuICAgICAgICBsZXQgY2hlY2tSYWRpdXMgPSBwYXJzZUludChyYWRpdXMsIDEwKTtcbiAgICAgICAgaWYgKGNoZWNrUmFkaXVzID4gMCkge1xuICAgICAgICAgIG5ld1JhZGl1cyA9IGNoZWNrUmFkaXVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGFuZWwucG9seXN0YXQucmFkaXVzID0gbmV3UmFkaXVzO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICB2YWxpZGF0ZUJvcmRlclNpemVWYWx1ZSgpIHtcbiAgICBsZXQgYm9yZGVyU2l6ZSA9IHRoaXMucGFuZWwucG9seXN0YXQucG9seWdvbkJvcmRlclNpemU7XG4gICAgbGV0IG5ld0JvcmRlclNpemUgPSAyO1xuICAgIGlmIChib3JkZXJTaXplICE9PSBudWxsKSB7XG4gICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KGJvcmRlclNpemUsIDEwKSkpIHtcbiAgICAgICAgbGV0IGNoZWNrQm9yZGVyU2l6ZSA9IHBhcnNlSW50KGJvcmRlclNpemUsIDEwKTtcbiAgICAgICAgaWYgKGNoZWNrQm9yZGVyU2l6ZSA+PSAwKSB7XG4gICAgICAgICAgbmV3Qm9yZGVyU2l6ZSA9IGNoZWNrQm9yZGVyU2l6ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBhbmVsLnBvbHlzdGF0LnBvbHlnb25Cb3JkZXJTaXplID0gbmV3Qm9yZGVyU2l6ZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgdXBkYXRlUG9seWdvbkJvcmRlckNvbG9yKCkge1xuICAgIHRoaXMucGFuZWwucG9seXN0YXQucG9seWdvbkJvcmRlckNvbG9yID0gUkdCVG9IZXgodGhpcy5wYW5lbC5wb2x5c3RhdC5wb2x5Z29uQm9yZGVyQ29sb3IpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICB1cGRhdGVQb2x5Z29uR2xvYmFsRmlsbENvbG9yKCkge1xuICAgIHRoaXMucGFuZWwucG9seXN0YXQucG9seWdvbkdsb2JhbEZpbGxDb2xvciA9IFJHQlRvSGV4KHRoaXMucGFuZWwucG9seXN0YXQucG9seWdvbkdsb2JhbEZpbGxDb2xvcik7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldERlZmF1bHRDbGlja1Rocm91Z2goaW5kZXg6IG51bWJlcikge1xuICAgIGxldCB1cmwgPSB0aGlzLnBhbmVsLnBvbHlzdGF0LmRlZmF1bHRDbGlja1Rocm91Z2g7XG4gICAgLy8gYXBwbHkgYm90aCB0eXBlcyBvZiB0cmFuc2Zvcm1zLCBvbmUgdGFyZ2V0ZWQgYXQgdGhlIGRhdGEgaXRlbSBpbmRleCwgYW5kIHNlY29uZGx5IHRoZSBudGggdmFyaWFudFxuICAgIHVybCA9IENsaWNrVGhyb3VnaFRyYW5zZm9ybWVyLnRyYW5mb3JtU2luZ2xlTWV0cmljKGluZGV4LCB1cmwsIHRoaXMucG9seXN0YXREYXRhKTtcbiAgICB1cmwgPSBDbGlja1Rocm91Z2hUcmFuc2Zvcm1lci50cmFuZm9ybU50aE1ldHJpYyh1cmwsIHRoaXMucG9seXN0YXREYXRhKTtcbiAgICAvLyBwcm9jZXNzIHRlbXBsYXRlIHZhcmlhYmxlcyBpbnNpZGUgY2xpY2t0aHJvdWdoXG4gICAgdXJsID0gdGhpcy50ZW1wbGF0ZVNydi5yZXBsYWNlV2l0aFRleHQodXJsKTtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgc2V0R2xvYmFsVW5pdEZvcm1hdChzdWJJdGVtKSB7XG4gICAgdGhpcy5wYW5lbC5wb2x5c3RhdC5nbG9iYWxVbml0Rm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcbiAgfVxufVxuXG5cbmV4cG9ydCB7XG4gIEQzUG9seXN0YXRQYW5lbEN0cmwsXG4gIEQzUG9seXN0YXRQYW5lbEN0cmwgYXMgTWV0cmljc1BhbmVsQ3RybFxufTtcbiJdfQ==