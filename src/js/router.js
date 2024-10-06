import home from "../../src/templates/home.html";
import wifi from "../../src/templates/wifi.html";
import weather from "../../src/templates/weather.html";
import brightness from "../../src/templates/brightness.html";
import time from "../../src/templates/time.html";
import theme from "../../src/templates/theme.html";
import debug from "../../src/templates/debug.html";
import ota from "../../src/templates/ota_update.html";
import rgb from "../../src/templates/rgb.html";
import alarm_clock from "../../src/templates/alarm_clock.html";
import sound from "../../src/templates/sound.html";

const urlRoutes = {
  "/": {
    template: home(),
    title: "Home",
    form_ids: [null],
    name: "home",
  },
  "/wifi": {
    template: wifi(),
    title: "WiFi Manager",
    form_ids: ["wifi-form"],
    name: "wifi",
  },
  "/weather": {
    template: weather(),
    title: "Weather Settings",
    form_ids: ["weather-form", "update-weather-images-form"],
    name: "weather",
  },
  "/brightness": {
    template: brightness(),
    title: "Brightness",
    form_ids: ["brightness-form"],
    name: "brightness",
  },
  "/theme": {
    template: theme(),
    title: "Theme",
    form_ids: ["theme-form", "upload-gif-form"],
    name: "theme",
  },
  "/time": {
    template: time(),
    title: "Time",
    form_ids: ["time-form", "upload-clock-images-form"],
    name: "time",
  },
  "/alarm_clock": {
    template: alarm_clock(),
    title: "Alarm Clock",
    form_ids: ["alarm-form"],
    name: "alarm_clock",
  },
  "/sound": {
    template: sound(),
    title: "Sound",
    form_ids: ["sound-form"],
    name: "sound",
  },
  "/rgb": {
    template: rgb(),
    title: "RGB",
    form_ids: ["rgb-form"],
    name: "rgb",
  },
  "/ota": {
    template: ota(),
    title: "OTA Update",
    form_ids: ["update-fw-form", "update-fs-form", "upload-frontend-form"],
    name: "ota",
  },
  "/debug": {
    template: debug(),
    title: "Debug",
    form_ids: null,
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
