async function timeFormUpdater(event) {
  let response = await fetch("/get_time", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let d_data = JSON.parse(response);
  let data = {
    timezone: posix_db[document.getElementById("timezone-offset").value],
    digital_clock: document.getElementById("digital-clock").checked,
    analog_clock: document.getElementById("analog-clock").checked,
  };
  console.log(`Form values ${d_data}`);
}

async function brightnessFormUpdater(event) {
  let response = await fetch("/get_brightness", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let d_data = JSON.parse(response);
  let data = {
    auto_brightness: document.getElementById("auto-brightness").checked,
    change_theme: document.getElementById("change-theme").checked,
    threshold: document.getElementById("auto-brightness-threshold").value,
    brightness: document.getElementById("brightness-slider").value,
  };
  console.log(`Form values ${d_data}`);
}

async function themeFormUpdater(event) {
  let response = await fetch("/get_theme", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let d_data = JSON.parse(response);
  let data = {
    theme: document.getElementById("weather-requests").checked,
    light_background: document.getElementById("light-theme-background").value,
    light_second: document.getElementById("light-theme-second").value,
    dark_background: document.getElementById("dark-theme-background").value,
    dark_second: document.getElementById("dark-theme-second").value,
  };
  console.log(`Form values ${d_data}`);
}

async function weatherFormUpdater(event) {
  let response = await fetch("/get_weather", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let d_data = JSON.parse(response);
  let data = {
    weather_enabled: document.getElementById("weather-enabled").checked,
    api_key: document.getElementById("api-key").value,
    city: document.getElementById("city").value,
    language: document.getElementById("language").value,
    period: document.getElementById("period").value * 60000,
  };
  console.log(`Form values ${d_data}`);
}

async function wifiFormUpdater(event) {
  let response = await fetch("/get_wifi", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let data = JSON.parse(response);
  let d_data = {
    ssid: document.getElementById("ssid").value,
    password: document.getElementById("password").value,
    ip_address: document.getElementById("ip").value,
    gateway: document.getElementById("gateway").value,
    sta_login: document.getElementById("login").value,
    sta_password: document.getElementById("sta-password").value,
  };
  console.log(`Form values ${d_data}`);
}

function formDataDispatcher(event) {
  event.preventDefault();
  if (event.currentTarget.id === "time-form") {
    timeFormUpdater(event);
  } else if (event.currentTarget.id === "weather-form") {
    weatherFormUpdater(event);
  } else if (event.currentTarget.id === "brightness-form") {
    brightnessFormUpdater(event);
  } else if (event.currentTarget.id === "theme-form") {
    themeFormUpdater(event);
  } else if (event.currentTarget.id === "wifi-form") {
    wifiFormUpdater(event);
  }
}

export { formDataDispatcher };
