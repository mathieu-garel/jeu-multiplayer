const writeEvent = (text) => {
  // element ul
  const parent = document.querySelector("#events");

  // element li
  const el = document.createElement("li");
  el.innerHTML = text;

  parent.appendChild(el);
  parent.scrollTop = parent.scrollHeight - parent.clientHeight;
};

const onFormSubmitted = (e) => {
  e.preventDefault();

  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";

  sock.emit("message", text);
};

const addButtonListeners = () => {
  ["rock", "paper", "scissors"].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener("click", () => {
      sock.emit("turn", id);
    });
  });
};

writeEvent("Welcome to Shifumi");

const sock = io();
sock.on("message", writeEvent);

document
  .querySelector("#chat-form")
  .addEventListener("submit", onFormSubmitted);

addButtonListeners();
