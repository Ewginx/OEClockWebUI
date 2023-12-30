import { router } from "./js/router";
import {formSubmitDispatcher} from "./js/submit_dispatcher";


async function set_time_from_device() {
  let time = { time: Date.now() };
  let response = await fetch("/set_time", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(time),
  });
  console.log(`Time on clock will be set with ${JSON.stringify(time)}`);
}
window.set_time_from_device = set_time_from_device;

async function check_lx() {
  let cancelButton = document.getElementById("dialog-cancel");
  cancelButton.addEventListener("click", () => {
    dialog.close();
  });
  let dialog = document.getElementById("dialog");
  dialog.showModal();
  console.log("Your lx is 228");
}
window.check_lx = check_lx;


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
