import weather from "../../src/templates/weather.html";
import brightness from "../../src/templates/brightness.html";
import wifi from "../../src/templates/wifi.html";
import time from "../../src/templates/time.html";
import theme from "../../src/templates/theme.html";
import debug from "../../src/templates/debug.html";
import home from "../../src/templates/home.html";
import ota from "../../src/templates/ota_update.html";
import rgb from "../../src/templates/rgb.html";
import alarm_clock from "../../src/templates/alarm_clock.html";

const urlRoutes = {
  404: {
    template: "/templates/404.html",
    title: "404",
    form_id: null,
    name: "",
  },
  "/": {
    template: home,
    title: "Home",
    form_id: null,
    name: "home",
  },
  "/weather": {
    template: weather,
    title: "Weather Settings",
    form_id: "weather-form",
    name: "weather",
  },
  "/brightness": {
    template: brightness,
    title: "Brightness",
    form_id: "brightness-form",
    name: "brightness"
  },
  "/wifi": {
    template: wifi,
    title: "WiFi Manager",
    form_id: "wifi-form",
    name: "wifi",
  },
  "/theme": {
    template: theme,
    title: "Theme",
    form_id: "theme-form",
    name: "theme",
  },
  "/time": {
    template: time,
    title: "Time",
    form_id: "time-form",
    name: "time",
  },
  "/alarm_clock": {
    template: alarm_clock,
    title: "Alarm Clock",
    form_id: null,
    name: "alarm_clock",
  },
  "/rgb": {
    template: rgb,
    title: "RGB",
    form_id: null,
    name: "rgb",
  },
  "/ota": {
    template: ota,
    title: "OTA Update",
    form_id: null,
    name: "ota",
  },
  "/debug": {
    template: debug,
    title: "Debug",
    form_id: null,
    name: "debug",
  },
};

function router() {
  let view = urlRoutes[location.pathname];
  if (view) {
    document.title = view.title;
    const html = view.template;
    app.innerHTML = html;
    return view;
  } else {
    history.replaceState("", "", "/");
    router();
  }
  return null;
}

export { router, urlRoutes };
