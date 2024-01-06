import { posix_db } from "./posix_db";
import { flip_object, toMinutes, int_to_color } from "./helpers";

window.settings_state;

function wifiPageFiller(view) {
  document.getElementById("ssid").value = settings_state.ssid;
  document.getElementById("password").value = settings_state.password;
  document.getElementById("ip").value = settings_state.ip_address;
  document.getElementById("gateway").value = settings_state.gateway;
  document.getElementById("login").value = settings_state.sta_login;
  document.getElementById("sta-password").value = settings_state.sta_password;
}

function themePageFiller(view) {
  document.getElementById("theme-switch").checked =
    settings_state.dark_theme_enabled;
  document.getElementById("light-theme-background").value = int_to_color(
    settings_state.light_background_color
  );
  document.getElementById("light-theme-second").value = int_to_color(
    settings_state.light_second_color
  );
  document.getElementById("dark-theme-background").value = int_to_color(
    settings_state.dark_background_color
  );
  document.getElementById("dark-theme-second").value = int_to_color(
    settings_state.dark_second_color
  );
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
}

function timePageFiller(view) {
  const flipped_posix_db = flip_object(posix_db);
  document.getElementById("timezone-offset").value =
    flipped_posix_db[settings_state.timezone_posix];

  document.getElementById("digital-clock").checked =
    settings_state.digital_main_screen;
}

function weatherPageFiller(view) {
  document.getElementById("weather-enabled").checked =
    settings_state.weather_enabled;
  document.getElementById("api-key").value = settings_state.api_key;
  document.getElementById("city").value = settings_state.city;
  document.getElementById("language").value = settings_state.language;
  let period = toMinutes(parseInt(settings_state.request_period));
  document.getElementById("period").value = period.toString();
}

function homePageFiller(view) {
  document.getElementById("home-ip").innerText = settings_state.ip_address;
  document.getElementById("weather-city").innerText = settings_state.city;
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
