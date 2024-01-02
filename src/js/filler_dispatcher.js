import { posix_db } from "./posix_db";

window.settings_state;

const flip = (data) =>
  Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

function wifiPageFiller(view) {
  document.getElementById("ssid").value = settings_state.ssid;
  document.getElementById("password").value = settings_state.password;
  document.getElementById("ip").value = settings_state.ip_address;
  document.getElementById("gateway").value = settings_state.gateway;
  document.getElementById("login").value = settings_state.sta_login;
  document.getElementById("sta-password").value = settings_state.sta_password;
  console.log(`Fill wifi view`);
}

function themePageFiller(view) {
  document.getElementById("theme-switch").checked =
    settings_state.dark_theme_enabled;
  document.getElementById("light-theme-background").value =
    settings_state.light_background_color;
  document.getElementById("light-theme-second").value =
    settings_state.light_second_color;
  document.getElementById("dark-theme-background").value =
    settings_state.dark_background_color;
  document.getElementById("dark-theme-second").value =
    settings_state.dark_second_color;
  console.log(`Fill theme view`);
}

function brightnessPageFiller(view) {
  document.getElementById("auto-brightness").checked =
    settings_state.auto_brightness;
  document.getElementById("change-theme").checked =
    settings_state.auto_theme_change;
  document.getElementById("auto-brightness-threshold").value =
    settings_state.threshold;
  document.getElementById("brightness-slider").value =
    settings_state.brightness_level;
  console.log(`Fill brightness view`);
}

function timePageFiller(view) {
  const flipped_posix_db = flip(posix_db);
  document.getElementById("timezone-offset").value =
    flipped_posix_db[settings_state.timezone_posix];

  document.getElementById("digital-clock").checked =
    settings_state.digital_main_screen;
  console.log(`Fill time view`);
}

function weatherPageFiller(view) {
  document.getElementById("weather-enabled").checked =
    settings_state.weather_enabled;
  document.getElementById("api-key").value = settings_state.api_key;
  document.getElementById("city").value = settings_state.city;
  document.getElementById("language").value = settings_state.language;
  let period = parseInt(settings_state.request_period) / 60000;
  document.getElementById("period").value = period.toString();
  console.log(`Fill weather view`);
}

function homePageFiller(view) {
  document.getElementById("home-ip").innerText = settings_state.ip_address;
  document.getElementById("weather-city").innerText = settings_state.city;
  console.log(`Fill home view`);
}

function pageFillerDispatcher(view) {
  if (view.name === "home") {
    homePageFiller(view);
  } else if (view.name === "time") {
    timePageFiller(view);
  } else if (view.name === "weather") {
    weatherPageFiller(view);
  } else if (view.name === "brightness") {
    brightnessPageFiller(view);
  } else if (view.name === "theme") {
    themePageFiller(view);
  } else if (view.name === "wifi") {
    wifiPageFiller(view);
  }
}

export { pageFillerDispatcher };
