document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("openLetter");
  const modal = document.getElementById("letterModal");
  const closeButton = document.getElementById("closeLetter");
  const backdrop = document.getElementById("closeBackdrop");
  const hint = document.getElementById("hint");
  const heartLayer = document.getElementById("heartLayer");

  if (!openButton || !modal || !closeButton || !backdrop) {
    console.error("Não foi possível encontrar os elementos da cartinha.");
    return;
  }

  function makeHeart() {
    if (!heartLayer) return;
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 19}px`;
    heart.style.animationDuration = `${5 + Math.random() * 5}s`;
    heart.style.opacity = `${0.35 + Math.random() * 0.5}`;
    heartLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 10500);
  }

  function burstHearts(amount) {
    for (let i = 0; i < amount; i++) {
      window.setTimeout(makeHeart, i * 75);
    }
  }

  function openLetter() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("letter-open");
    if (hint) hint.textContent = "sua cartinha está aberta. espero que goste! ♡";
    burstHearts(16);
    closeButton.focus();
  }

  function closeLetter() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("letter-open");
    openButton.focus();
  }

  openButton.addEventListener("click", openLetter);
  closeButton.addEventListener("click", closeLetter);
  backdrop.addEventListener("click", closeLetter);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeLetter();
    }
  });

  window.setInterval(makeHeart, 1100);
});
