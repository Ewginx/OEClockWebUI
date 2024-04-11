import { posix_db } from "./posix_db";
import { flip_object, toMinutes, int_to_color } from "./helpers";

window.settings_state;

function debugPageFiller(view) {
  document.getElementById(
    "fs-total-space"
  ).innerText = `${settings_state.fs_space} KB`;
}
function soundPageFiller(view) {
  document.getElementById("sound-enabled").checked = settings_state.sound_on;
  document.getElementById("plug-enabled").checked = settings_state.plug_sound_on;
  document.getElementById("ee-enabled").checked = settings_state.ee_sound_on;
  document.getElementById("player-usb-enabled").checked = settings_state.enable_player_usb;
  document.getElementById("volume-slider").value = settings_state.volume_level;
  document.getElementById("volume-value").innerText = settings_state.volume_level;
  document.getElementById("alarm-track").value = settings_state.alarm_track;
  document.getElementById("ee-track").value = settings_state.ee_track;
  document.getElementById("plug-track").value = settings_state.plug_track;
}
function rgbPageFiller(view) {
  document.getElementById("rgb-enabled").checked = settings_state.rgb_enabled;
  document.getElementById("rgb-night").checked = settings_state.rgb_night;
  document.getElementById("rgb-mode").value = settings_state.rgb_mode;
  document.getElementById("first-rgb-color").value = int_to_color(
    settings_state.first_rgb_color
  );
  document.getElementById("second-rgb-color").value = int_to_color(
    settings_state.second_rgb_color
  );
  document.getElementById("third-rgb-color").value = int_to_color(
    settings_state.third_rgb_color
  );
  document.getElementById("rgb-delay").value = settings_state.rgb_delay;
  document.getElementById("rgb-brightness").value =
    settings_state.rgb_brightness;
}
function alarmClockPageFiller(view) {
  document.getElementById("time-weekdays").value = settings_state.weekdays_time;
  document.getElementById("alarm-weekdays").checked =
    settings_state.weekdays_enabled;
  document.getElementById("time-weekends").value = settings_state.weekends_time;
  document.getElementById("alarm-weekends").checked =
    settings_state.weekends_enabled;
  document.getElementById("time-oneOff").value = settings_state.one_off_time;
  document.getElementById("alarm-oneOff").checked =
    settings_state.one_off_enabled;
}

function wifiPageFiller(view) {
  document.getElementById("ssid").value = settings_state.ssid;
  document.getElementById("password").value = settings_state.password;
  document.getElementById("ip").value = settings_state.ip_address;
  document.getElementById("gateway").value = settings_state.gateway;
  document.getElementById("login").value = settings_state.ap_login;
  document.getElementById("ap-password").value = settings_state.ap_password;
}

function themePageFiller(view) {
  document.getElementById("theme-switch").checked =
    settings_state.dark_theme_enabled;
  document.getElementById("light-theme-primary").value = int_to_color(
    settings_state.light_primary_color
  );
  document.getElementById("light-theme-second").value = int_to_color(
    settings_state.light_second_color
  );
  document.getElementById("light-theme-screen").value = int_to_color(
    settings_state.light_screen_color
  );
  document.getElementById("light-theme-card").value = int_to_color(
    settings_state.light_card_color
  );
  document.getElementById("light-theme-text").value = int_to_color(
    settings_state.light_text_color
  );
  document.getElementById("light-theme-grey").value = int_to_color(
    settings_state.light_grey_color
  );

  document.getElementById("dark-theme-primary").value = int_to_color(
    settings_state.dark_primary_color
  );
  document.getElementById("dark-theme-second").value = int_to_color(
    settings_state.dark_second_color
  );
  document.getElementById("dark-theme-screen").value = int_to_color(
    settings_state.dark_screen_color
  );
  document.getElementById("dark-theme-card").value = int_to_color(
    settings_state.dark_card_color
  );
  document.getElementById("dark-theme-text").value = int_to_color(
    settings_state.dark_text_color
  );
  document.getElementById("dark-theme-grey").value = int_to_color(
    settings_state.dark_grey_color
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
  } else if (view.name === "alarm_clock") {
    alarmClockPageFiller(view);
  } else if (view.name === "rgb") {
    rgbPageFiller(view);
  } else if (view.name === "sound") {
    soundPageFiller(view);
  } else if (view.name === "debug") {
    debugPageFiller(view);
  }
}

export { pageFillerDispatcher };
