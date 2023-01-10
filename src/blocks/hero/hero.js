import ready from "../../js/utils/documentReady.js";

ready(function () {
  const hostHero = document.querySelector(".hero");

  if (hostHero) {
    const heroTrigger = document.querySelector(".hero__trigger");
    heroTrigger.addEventListener("click", () => {
      alert("JS works!");
    });
  }
});
