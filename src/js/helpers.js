

const flip_object = (data) =>
  Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

function toMinutes(milliseconds){
    let minutes = milliseconds / 60000;
    return minutes
}

function toMilliseconds(minutes){
    let milliseconds = minutes * 60000;
    return milliseconds
}
  export {flip_object, toMinutes, toMilliseconds}