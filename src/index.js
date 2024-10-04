import "../assets/style.css";
import { router } from "./js/router";
import {
  formSubmitDispatcher,
  set_time_from_device,
} from "./js/submit_dispatcher";
import { pageFillerDispatcher, settings_state } from "./js/filler_dispatcher";
import { initWebSocket } from "./js/sensors_handler";
import { check_lx, show_password } from "./js/helpers";

window.check_lx = check_lx;

window.show_password = show_password;

window.set_time_from_device = set_time_from_device;

async function logout() {
  await fetch("/logout", {
    method: "GET",
  });
}
window.logout = logout;

async function fetch_settings() {
  let response = await fetch(__HOST_URL +"/settings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  window.settings_state = await response.json();
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
  if (view && view.form_ids) {
    for (let index in view.form_ids) {
      if (view.form_ids[index]) {
        document
          .getElementById(view.form_ids[index])
          .addEventListener("submit", formSubmitDispatcher);
      }
    }
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
  // Handle navigation
  document.querySelectorAll("[data-link]").forEach(function (elem) {
    elem.addEventListener("click", anchorClickHandler);
  });
  document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector("body").classList.toggle("active");
  });
  document.onclick = function (e) {
    if (!document.getElementById("menu_wrapper").contains(e.target)) {
      document.querySelector("body").classList.toggle("active", true);
    }
  };
  router(window.location.pathname);
}

function pageReloadHandler(event) {
  event.preventDefault();
  loadPage();
}

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", loadPageOnContentLoaded);
window.addEventListener("beforeunload", pageReloadHandler);
