# Grafana BeehiveStat Panel
[![CircleCI](https://circleci.com/gh/grafana/grafana-polystat-panel.svg?style=svg&circle-token=b78cf4ee3d98c447a7473f542a8dee69f9901f4d)](https://circleci.com/gh/grafana/grafana-polystat-panel)

This panel plugin provides a [D3-based](http://www.d3js.org) multistat panel for [Grafana](http://www.grafana.org) 3.x/4.x/5.x.

A hexagon is created for each metric received, with the ability to group metrics into a composite metric, and display the triggered state of the composite.

## Screenshots

This plugin supports autoscaling for best-fit sizing of each polygon to the panel size. When the complete text cannot be displayed, only tooltips are active.

### All visible
![Scaled3](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-scaled3.png)
### Scaled down
![Scaled1](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-scaled1.png)
### Scaled down with tooltip
![Scaled2](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-scaled2.png)

## Options

![State with Composites](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-options-all.png)

### Layout

![Layout](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-options-layout.png)

Specify the desired number of columns and rows, or select Autosize to allow the plugin to calculate a "best fit" for the size of the panel.

#### Columns
Max # of columns to create
#### Rows
Max # rows to create
NOTE: if both columns and rows are set, only rows*columns will be displayed, generally one or none should be set.

#### Display Limit
Set a limit on number of hexagons to be displayed, set to 0 for no limit.

### Sizing
![Sizing](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-options-sizing.png)

Set the size of the polygon to a fixed size, or select auto-size for "best fit".

### Sorting
![Sorting](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-options-sorting.png)

### Tooltips

![Tooltips](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-options-tooltips.png)

Set the font to be used for Tooltips

### Global

![Global](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-options-global.png)


#### Display
Show all
Show triggered

![Show all example](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-options-show-all-example.png)


### Actions

#### Click Through

Click through to use when none are defined for a hexagon.

#### Show Metric Name

Display the metric in the hexagon

#### Show Metric Value

Display the metric value


## Overrides

![Overrides without Thresholds](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-overrides-no-thresholds.png)

![Overrides with Thresholds](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-overrides-all.png)

![Overrides Rendered](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-overrides-gpu0-rendered.png)

## Composites

![Composites with Thresholds](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-composites-all.png)

![Composite Rendered with Tooltip](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-composites-with-tooltip.png)


### Animation

![Animation](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-options-animation.png)

#### Animate Composites

Animate hexagon to display metrics if there are composites

![Animation Example](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-composites-animated.png)


#### Speed

Speed of animation in milliseconds

## Time Range

### Screenshots

#### Tooltip

Hovering over a hexagon shows the metrics that comprise the displayed state.
For composites this will expand members of the composite.

![Tooltip](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-tooltip.png)

#### State with composites

This shows creation of composites, where you select which metrics comprise the composite.

![State with Composites](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-composite-example1.png)

This shows composites configured for GPU 0,1,2,3, and non-grouped metrics from GPU4-7.

![State with partial composites](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/screenshots/polystat-gpu-state-composites.png)

### Templating

#### Using Dashboard Template Variables

Template variables are available in the clickThroughUrl setting, specified by using ${varname}.
They can also be passed to another dashboard by appending var-VARNAME=value to the url
```
/dasboard/xyz?var-VARNAME=${VARNAME}
```

#### Using Polystat Variables
Each polygon represents either a single metric, or a composite metric

An example drilldown clickthrough url can be specified like this:
```
dashboard/db/drilldown?var-HOSTNAME=${__cell_name}
```

NOTE: Metrics are sorted using the global options "Sorting" settings. Global filters are also applied before dereferencing is performed.

##### Single Metric Variables
The name and value of a polygon can be referenced using the following syntax:

* Metric Name: `${__cell_name}`
* Metric Value: `${__cell}`
* Metric Raw Value: `${__cell:raw}` syntax.
   By default values are URI encoded. Use this syntax to *disable* encoding

##### Composite Metric Variables
The names and values of a composite polygon can be referenced using the following syntax:

* Composite Name: `${__composite_name}`
* Metric Name: `${__cell_name_n}`
* Metric Value: `${__cell_n}`
* Metric Raw Value: `${__cell_n:raw}` syntax.
   By default values are URI encoded. Use this syntax to *disable* encoding


## Building

This plugin relies on Grunt/NPM/Bower, typical build sequence:

```
npm install
bower install
grunt
```

For development, you can run:
```
grunt watch
```
The code will be parsed then copied into "dist" if "jslint" passes without errors.


### Docker Support

A docker-compose.yml file is include for easy development and testing, just run
```
docker-compose up
```

Then browse to http://localhost:3000


## External Dependencies

* Grafana 3.x/4.x/5.x

## Build Dependencies

* npm
* bower
* grunt

## Enable Grafana TestData

`Grafana TestData` is not enabled by default. To enable it, first navigate to the Plugins section, found in your Grafana main menu. Click the Apps tabs in the Plugins section and select the Grafana TestData App. (Or navigate to http://your_grafana_instance/plugins/testdata/edit to go directly there). Finally click the enable button to enable.


#### Acknowledgements

This panel is based on this D3 example:
* https://www.visualcinnamon.com/2013/07/self-organizing-maps-creating-hexagonal.html


#### Changelog



