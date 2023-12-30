import { posix_db } from "./posix_db";

async function timeFormHandler(event) {
  let data = {
    timezone: posix_db[document.getElementById("timezone-offset").value],
    digital_clock: document.getElementById("digital-clock").checked,
    analog_clock: document.getElementById("analog-clock").checked,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/setup_time", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  console.log(`Form values ${json_data}`);
}

async function brightnessFormHandler(event) {
  let data = {
    auto_brightness: document.getElementById("auto-brightness").checked,
    change_theme: document.getElementById("change-theme").checked,
    threshold: document.getElementById("auto-brightness-threshold").value,
    brightness: document.getElementById("brightness-slider").value,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/setup_brightness", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  console.log(`Form values ${json_data}`);
}

async function themeFormHandler(event) {
  let data = {
    theme: document.getElementById("weather-requests").checked,
    light_background: document.getElementById("light-theme-background").value,
    light_second: document.getElementById("light-theme-second").value,
    dark_background: document.getElementById("dark-theme-background").value,
    dark_second: document.getElementById("dark-theme-second").value,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/setup_theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  console.log(`Form values ${json_data}`);
}

async function weatherFormHandler(event) {
  let data = {
    weather_enabled: document.getElementById("weather-enabled").checked,
    api_key: document.getElementById("api-key").value,
    city: document.getElementById("city").value,
    language: document.getElementById("language").value,
    period: document.getElementById("period").value * 60000,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/setup_weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  console.log(`Form values ${json_data}`);
}

async function wifiFormHandler(event) {
  let data = {
    ssid: document.getElementById("ssid").value,
    password: document.getElementById("password").value,
    ip_address: document.getElementById("ip").value,
    gateway: document.getElementById("gateway").value,
    sta_login: document.getElementById("login").value,
    sta_password: document.getElementById("sta-password").value,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/setup_wifi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  console.log(`Form values ${json_data}`);
}

function formSubmitDispatcher(event) {
  event.preventDefault();
  if (event.currentTarget.id === "time-form") {
    timeFormHandler(event);
  } else if (event.currentTarget.id === "weather-form") {
    weatherFormHandler(event);
  } else if (event.currentTarget.id === "brightness-form") {
    brightnessFormHandler(event);
  } else if (event.currentTarget.id === "theme-form") {
    themeFormHandler(event);
  } else if (event.currentTarget.id === "wifi-form") {
    wifiFormHandler(event);
  }
}

export { formSubmitDispatcher };
