import { posix_db } from "./posix_db";
import { toMilliseconds, showSuccessfulMessage, color_to_int } from "./helpers";

function updateFWHandler() {
  const fileInput = document.getElementById("file-fw");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  var xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function (event) {
    let percent = (event.loaded / event.total) * 100;
    let progress_bar = document.getElementById("fw-file-progress-bar");
    progress_bar.style.display = "block";
    progress_bar.value = Math.round(percent);
  };
  xhr.upload.onloadend = function (event) {
    let ota_status = document.getElementById("fw-status");
    ota_status.style.display = "block";
    ota_status.innerText = "Successfully upload FW. Reboot ESP32...";
  };
  xhr.upload.onerror = function (event) {
    let ota_status = document.getElementById("fw-status");
    ota_status.style.display = "block";
    ota_status.innerText = "An error occurred.";
  };
  xhr.open("POST", "/update_fw");
  xhr.send(formData);
  //add response handling
  // if (response.status === 200) {
  //   let update = await response.json();
  //   showSuccessfulMessage();
  // }
}
function updateFSHandler() {
  const fileInput = document.getElementById("file-fs");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  var xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function (event) {
    let percent = (event.loaded / event.total) * 100;
    let progress_bar = document.getElementById("fs-file-progress-bar");
    progress_bar.style.display = "block";
    progress_bar.value = Math.round(percent);
  };
  xhr.upload.onloadend = function (event) {
    let ota_status = document.getElementById("fs-status");
    ota_status.style.display = "block";
    ota_status.innerText = "Successfully upload FS. Reboot ESP32...";
  };
  xhr.upload.onerror = function (event) {
    let ota_status = document.getElementById("fs-status");
    ota_status.style.display = "block";
    ota_status.innerText = "An error occurred.";
  };
  xhr.open("POST", "/update_fs");
  xhr.send(formData);
  //add response handling
  // if (response.status === 200) {
  //   let update = await response.json();
  //   showSuccessfulMessage();
  // }
}
function weatherFilesFormHandler(event) {
  const files = document.getElementById("files-weather").files;
  let url = "/weather_images_day";
  if (document.getElementById("night-images").checked) {
    url = "/weather_images_night";
  }
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i], files[i].name);
  }

  var xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function (event) {
    let percent = (event.loaded / event.total) * 100;
    let progress_bar = document.getElementById("weather-files-progress-bar");
    progress_bar.style.display = "block";
    progress_bar.value = Math.round(percent);
  };
  xhr.upload.onloadend = function (event) {
    let ota_status = document.getElementById("weather-files-status");
    ota_status.style.display = "block";
    ota_status.innerText = "Successfully upload images.";
  };
  xhr.upload.onerror = function (event) {
    let ota_status = document.getElementById("weather-files-status");
    ota_status.style.display = "block";
    ota_status.innerText = "An error occurred.";
  };
  xhr.open("POST", url);
  xhr.send(formData);
  // add response handling
  // if (response.status === 200) {
  //    let update = await response.json();
  //    showSuccessfulMessage();
  //  }
}

async function alarmClockFormHandler(event) {
  window.settings_state.weekdays_time =
    document.getElementById("time-weekdays").value;
  window.settings_state.weekdays_enabled =
    document.getElementById("alarm-weekdays").checked;
  window.settings_state.weekends_time =
    document.getElementById("time-weekends").value;
  window.settings_state.weekends_enabled =
    document.getElementById("alarm-weekends").checked;
  window.settings_state.one_off_time =
    document.getElementById("time-oneOff").value;
  window.settings_state.one_off_enabled =
    document.getElementById("alarm-oneOff").checked;

  let data = {
    weekdays_time: window.settings_state.weekdays_time,
    weekdays_enabled: window.settings_state.weekdays_enabled,
    weekends_time: window.settings_state.weekends_time,
    weekends_enabled: window.settings_state.weekends_enabled,
    one_off_time: window.settings_state.one_off_time,
    one_off_enabled: window.settings_state.one_off_enabled,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/settings/alarm_clock", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  if (response.status === 200) {
    showSuccessfulMessage();
  }
}

async function set_time_from_device() {
  let time = { time: Date.now() / 1000 };
  let response = await fetch("/time", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(time),
  });
}

async function timeFormHandler(event) {
  window.settings_state.timezone_posix =
    posix_db[document.getElementById("timezone-offset").value];
  window.settings_state.digital_main_screen =
    document.getElementById("digital-clock").checked;

  let data = {
    timezone_posix: window.settings_state.timezone_posix,
    digital_main_screen: window.settings_state.digital_main_screen,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/settings/time", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  if (response.status === 200) {
    showSuccessfulMessage();
  }
}

async function brightnessFormHandler(event) {
  window.settings_state.auto_brightness =
    document.getElementById("auto-brightness").checked;
  window.settings_state.auto_theme_change =
    document.getElementById("change-theme").checked;
  window.settings_state.threshold = parseInt(
    document.getElementById("auto-brightness-threshold").value
  );
  window.settings_state.brightness_level = parseInt(
    document.getElementById("brightness-slider").value
  );

  let data = {
    auto_brightness: window.settings_state.auto_brightness,
    auto_theme_change: window.settings_state.auto_theme_change,
    threshold: window.settings_state.threshold,
    brightness_level: window.settings_state.brightness_level,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/settings/brightness", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  if (response.status === 200) {
    showSuccessfulMessage();
  }
}

async function themeFormHandler(event) {
  window.settings_state.dark_theme_enabled =
    document.getElementById("theme-switch").checked;

  window.settings_state.light_primary_color = color_to_int(
    document.getElementById("light-theme-primary").value
  );
  window.settings_state.light_second_color = color_to_int(
    document.getElementById("light-theme-second").value
  );
  window.settings_state.light_screen_color = color_to_int(
    document.getElementById("light-theme-screen").value
  );
  window.settings_state.light_card_color = color_to_int(
    document.getElementById("light-theme-card").value
  );
  window.settings_state.light_text_color = color_to_int(
    document.getElementById("light-theme-text").value
  );
  window.settings_state.light_grey_color = color_to_int(
    document.getElementById("light-theme-grey").value
  );

  window.settings_state.dark_primary_color = color_to_int(
    document.getElementById("dark-theme-primary").value
  );
  window.settings_state.dark_second_color = color_to_int(
    document.getElementById("dark-theme-second").value
  );
  window.settings_state.dark_screen_color = color_to_int(
    document.getElementById("dark-theme-screen").value
  );
  window.settings_state.dark_card_color = color_to_int(
    document.getElementById("dark-theme-card").value
  );
  window.settings_state.dark_text_color = color_to_int(
    document.getElementById("dark-theme-text").value
  );
  window.settings_state.dark_grey_color = color_to_int(
    document.getElementById("dark-theme-grey").value
  );

  let data = {
    dark_theme_enabled: window.settings_state.dark_theme_enabled,

    light_primary_color: window.settings_state.light_primary_color,
    light_second_color: window.settings_state.light_second_color,
    light_screen_color: window.settings_state.light_screen_color,
    light_card_color: window.settings_state.light_card_color,
    light_text_color: window.settings_state.light_text_color,
    light_grey_color: window.settings_state.light_grey_color,

    dark_primary_color: window.settings_state.dark_primary_color,
    dark_second_color: window.settings_state.dark_second_color,
    dark_screen_color: window.settings_state.dark_screen_color,
    dark_card_color: window.settings_state.dark_card_color,
    dark_text_color: window.settings_state.dark_text_color,
    dark_grey_color: window.settings_state.dark_grey_color,
  };

  let json_data = JSON.stringify(data);
  let response = await fetch("/settings/theme", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  if (response.status === 200) {
    showSuccessfulMessage();
  }
}

async function weatherFormHandler(event) {
  window.settings_state.weather_enabled =
    document.getElementById("weather-enabled").checked;
  window.settings_state.api_key = document.getElementById("api-key").value;
  window.settings_state.city = document.getElementById("city").value;
  window.settings_state.language = document.getElementById("language").value;
  window.settings_state.request_period = toMilliseconds(
    parseInt(document.getElementById("period").value)
  );

  let data = {
    weather_enabled: window.settings_state.weather_enabled,
    api_key: window.settings_state.api_key,
    city: window.settings_state.city,
    language: window.settings_state.language,
    request_period: window.settings_state.request_period,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/settings/weather", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  if (response.status === 200) {
    showSuccessfulMessage();
  }
}

async function wifiFormHandler(event) {
  window.settings_state.ssid = document.getElementById("ssid").value;
  window.settings_state.password = document.getElementById("password").value;
  window.settings_state.ip_address = document.getElementById("ip").value;
  window.settings_state.gateway = document.getElementById("gateway").value;
  window.settings_state.ap_login = document.getElementById("login").value;
  window.settings_state.ap_password =
    document.getElementById("ap-password").value;

  let data = {
    ssid: window.settings_state.ssid,
    password: window.settings_state.password,
    ip_address: window.settings_state.ip_address,
    gateway: window.settings_state.gateway,
    ap_login: window.settings_state.ap_login,
    ap_password: window.settings_state.ap_password,
  };
  let json_data = JSON.stringify(data);
  let response = await fetch("/settings/wifi", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: json_data,
  });
  if (response.status === 200) {
    showSuccessfulMessage();
  }
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
  } else if (event.currentTarget.id === "alarm-form") {
    alarmClockFormHandler(event);
  } else if (event.currentTarget.id === "update-fw-form") {
    updateFWHandler(event);
  } else if (event.currentTarget.id === "update-fs-form") {
    updateFSHandler(event);
  } else if (event.currentTarget.id === "update-weather-images-form") {
    weatherFilesFormHandler(event);
  }
}

export { formSubmitDispatcher, set_time_from_device };
