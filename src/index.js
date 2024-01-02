import { router } from "./js/router";
import { formSubmitDispatcher } from "./js/submit_dispatcher";
import { pageFillerDispatcher, settings_state } from "./js/filler_dispatcher";
import { initWebSocket } from "./js/sensors_handler";

async function set_time_from_device() {
  let time = { time: Date.now() };
  let response = await fetch("/set_time", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(time),
  });
}
window.set_time_from_device = set_time_from_device;

function check_lx() {
  let cancelButton = document.getElementById("dialog-cancel");
  cancelButton.addEventListener("click", () => {
    dialog.close();
  });
  let dialog = document.getElementById("dialog");
  dialog.showModal();
}
window.check_lx = check_lx;

async function fetch_settings() {
  let response = await fetch("/settings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  window.settings_state = JSON.parse(await response.json());
}

function anchorClickHandler(e) {
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
  let view = loadPage();
  if (view && view.form_id) {
    document
      .getElementById(view.form_id)
      .addEventListener("submit", formSubmitDispatcher);
  }
}

function loadPage() {
  let view = router();
  pageFillerDispatcher(view);
  return view;
}

function loadPageOnContentLoaded() {
  initWebSocket();
  fetch_settings().then(() => loadPage());
}

function pageReloadHandler(event) {
  event.preventDefault();
  loadPage();
}

// Handle navigation
document.querySelectorAll("[data-link]").forEach(function (elem) {
  elem.addEventListener("click", anchorClickHandler);
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", loadPageOnContentLoaded);
window.addEventListener("beforeunload", pageReloadHandler);

document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector("body").classList.toggle("active");
});


router(window.location.pathname);
