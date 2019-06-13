System.register(["./ctrl", "app/plugins/sdk"], function (exports_1, context_1) {
    "use strict";
    var ctrl_1, sdk_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ctrl_1_1) {
                ctrl_1 = ctrl_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {
            exports_1("PanelCtrl", ctrl_1.D3PolystatPanelCtrl);
            sdk_1.loadPluginCss({
                dark: "plugins/grafana-beehive-panel/css/polystat.dark.css",
                light: "plugins/grafana-beehive-panel/css/polystat.light.css"
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzttQ0FFUywwQkFBbUI7WUFHNUIsbUJBQWEsQ0FBQztnQkFDWixJQUFJLEVBQUUscURBQXFEO2dCQUMzRCxLQUFLLEVBQUUsc0RBQXNEO2FBQzlELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XG5cbmltcG9ydCB7IEQzUG9seXN0YXRQYW5lbEN0cmwgfSBmcm9tIFwiLi9jdHJsXCI7XG5pbXBvcnQgeyBsb2FkUGx1Z2luQ3NzIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xuXG5sb2FkUGx1Z2luQ3NzKHtcbiAgZGFyazogXCJwbHVnaW5zL2dyYWZhbmEtYmVlaGl2ZS1wYW5lbC9jc3MvcG9seXN0YXQuZGFyay5jc3NcIixcbiAgbGlnaHQ6IFwicGx1Z2lucy9ncmFmYW5hLWJlZWhpdmUtcGFuZWwvY3NzL3BvbHlzdGF0LmxpZ2h0LmNzc1wiXG59KTtcblxuZXhwb3J0IHtcbiAgRDNQb2x5c3RhdFBhbmVsQ3RybCBhcyBQYW5lbEN0cmxcbn07XG4iXX0=