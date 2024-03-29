///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import { D3PolystatPanelCtrl } from "./ctrl";
import { loadPluginCss } from "app/plugins/sdk";

loadPluginCss({
  dark: "plugins/grafana-beehive-panel/css/polystat.dark.css",
  light: "plugins/grafana-beehive-panel/css/polystat.light.css"
});

export {
  D3PolystatPanelCtrl as PanelCtrl
};
