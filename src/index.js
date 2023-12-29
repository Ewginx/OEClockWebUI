import { router, urlRoutes } from "./js/router";

function timeFormHandler(event) {
  let timezone = document.getElementById("timezone-offset");
  console.log(`Form Submitted! Timestamp: ${event.timeStamp}`);
  if (timezone.value == "") {
    console.log(`Empty form`);
  } else {
    console.log(`Form values ${timezone.value}`);
  }
}
function brightnessFormHandler(event) {
  console.log(`Brightness form`);
}
function themeFormHandler(event) {
  console.log(`Theme form`);
}
function weatherFormHandler(event) {
  console.log("This is a weather form submit");
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
function anchorClickHandler(e){
  document.querySelectorAll("[data-link]").forEach(function (elem) {
    elem.classList.remove("active");
  });
  e.preventDefault();
  if (e.target.href) {
    document.getElementById(e.target.id).classList.add("active");
    history.pushState("", "", e.target.href);
  } else {
    history.pushState("", "", e.target.offsetParent.href);
    document.getElementById(e.target.offsetParent.id).classList.add("active");
  }
  let view = router();
  if (view && view.form_id) {
    document
      .getElementById(view.form_id)
      .addEventListener("submit", formSubmitDispatcher);
  }
}

// Handle navigation
document.querySelectorAll("[data-link]").forEach(function (elem) {
  elem.addEventListener("click", anchorClickHandler);
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);
// window.addEventListener("beforeunload", e => {
// 	e.preventDefault();
// 	router();
// }
// );

document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector("body").classList.toggle("active");
});
router(window.location.pathname);
