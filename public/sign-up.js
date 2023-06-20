const btn = document.getElementsById("btn");
btn.addEventListener("click", (e) => {
  console.log(e);
  btn.classList.toggle("loading");
  btn.innerHTML === "SEND"
    ? (btn.innerHTML = "LOADING")
    : (btn.innerHTML = "SEND");
});
