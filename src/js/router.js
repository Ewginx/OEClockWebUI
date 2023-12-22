import weather from "../../src/templates/weather.html";
import brightness from "../../src/templates/brightness.html";
import wifi from "../../src/templates/wifi.html";
import time from "../../src/templates/time.html";
import theme from "../../src/templates/theme.html";
import debug from "../../src/templates/debug.html";
import home from "../../src/templates/home.html";

const urlRoutes = {
  404: {
    template: "/templates/404.html",
    title: "404",
    form_id: null,
  },
  "/": {
    template: home,
    title: "Home",
    form_id: null,
  },
  "/weather": {
    template: weather,
    title: "Weather Settings",
    form_id: "weather-form",
  },
  "/brightness": {
    template: brightness,
    title: "Brightness",
    form_id: "brightness-form",
  },
  "/wifi": {
    template: wifi,
    title: "WiFi Manager",
    form_id: "wifi-form",
  },
  "/theme": {
    template: theme,
    title: "Theme",
    form_id: "theme-form",
  },
  "/time": {
    template: time,
    title: "Time",
    form_id: "time-form",
  },
  "/debug": {
    template: debug,
    title: "Debug",
    form_id: null,
  },
};

function router() {
  let view = urlRoutes[location.pathname];
  if (view) {
    document.title = view.title;
    // const html = await fetch(view.template).then((response) => response.text());
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
