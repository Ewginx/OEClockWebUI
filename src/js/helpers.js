const flip_object = (data) =>
  Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

function toMinutes(milliseconds) {
  let minutes = milliseconds / 60000;
  return minutes;
}

function toMilliseconds(minutes) {
  let milliseconds = minutes * 60000;
  return milliseconds;
}

function showSuccessfulMessage() {
  document.getElementById("saved_settings").style.display = "block";
}

function check_lx() {
  let cancelButton = document.getElementById("dialog-cancel");
  cancelButton.addEventListener("click", () => {
    dialog.close();
  });
  let dialog = document.getElementById("dialog");
  dialog.showModal();
}

function show_password(target_id) {
  let x = document.getElementById(target_id);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function color_to_int(color){
  color = color.slice(1);
  color = "0x" + color;
  return parseInt(color)
}

function int_to_color(color){
  color = "#" + color.toString(16)
  return color
}

export {
  flip_object,
  toMinutes,
  toMilliseconds,
  showSuccessfulMessage,
  check_lx,
  show_password,
  color_to_int,
  int_to_color
};
