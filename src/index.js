import { router } from "./js/router";
import { formSubmitDispatcher } from "./js/submit_dispatcher";
import { pageFillerDispatcher, settings_state } from "./js/filler_dispatcher";
import { initWebSocket } from "./js/sensors_handler";
import { check_lx, show_password} from "./js/helpers";

window.check_lx = check_lx;

window.show_password = show_password;

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

window.set_time_from_device = set_time_from_device;

async function logout() {
  await fetch("/logout", {
    method: "GET",
  });
}
window.logout = logout;

async function fetch_settings() {
  let response = await fetch("/settings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  window.settings_state = __SETTINGS_JSON;
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
document.onclick = function (e) {
  if (!document.getElementById("menu_wrapper").contains(e.target)) {
    document.querySelector("body").classList.toggle("active", true);
  }
};
router(window.location.pathname);
