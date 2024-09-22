
const btnLoad = document.querySelector("button");
const output = document.querySelector("span");
if (!btnLoad || !output) throw new ReferenceError("Should never happen");

btnLoad.addEventListener("click", () => {
   btnLoad.disabled = true;
   output.textContent = "Loading ...";
   
   const spin = document.createElement("wait-loading");
   btnLoad.appendChild(spin);

   const timerId = setTimeout(() => {
      spin.remove();
      output.textContent = "Loaded successfully!";
      btnLoad.disabled = false;
      btnLoad.focus();
      clearTimeout(timerId);
   }, 3000);
});
