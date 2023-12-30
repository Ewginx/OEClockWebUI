import { posix_db } from "./posix_db";

async function timeFormHandler(event) {
  let data = {
    "timezone": posix_db[document.getElementById("timezone-offset").value],
    "digital-clock": document.getElementById("digital-clock").checked,
    "analog-clock": document.getElementById("analog-clock").checked,
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
    "auto-brightness": document.getElementById("auto-brightness").checked,
    "change-theme": document.getElementById("change-theme").checked,
    "threshold": document.getElementById("auto-brightness-threshold").value,
    "brightness": document.getElementById("brightness-slider").value,
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
    "theme": document.getElementById("weather-requests").checked,
    "light-background": document.getElementById("light-theme-background").value,
    "light-second": document.getElementById("light-theme-second").value,
    "dark-background": document.getElementById("dark-theme-background").value,
    "dark-second": document.getElementById("dark-theme-second").value,
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
        "weather-enabled": document.getElementById("weather-enabled").checked,
        "api-key": document.getElementById("api-key").value,
        "city": document.getElementById("city").value,
        "language": document.getElementById("language").value,
        "period": document.getElementById("period").value, // add multiply to milliseconds
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
  }
}

export { formSubmitDispatcher };
