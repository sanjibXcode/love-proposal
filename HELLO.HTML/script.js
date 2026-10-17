
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // Your name and her name
  const yourName = "NOBEL CH";
  const girlName = "Beautiful";

  $("yourName").textContent = yourName;
  $("letterYourName").textContent = yourName;
  $("girlName").textContent = girlName;
  $("letterGirlName").textContent = girlName;

  // Main photo fallback
  const girlPhoto = $("girlPhoto");
  const photoFallback = $("photoFallback");

  function checkPhoto() {
    const valid = girlPhoto.complete && girlPhoto.naturalWidth > 0;
    photoFallback.style.display = valid ? "none" : "flex";
    girlPhoto.style.display = valid ? "block" : "none";
  }

  girlPhoto.addEventListener("load", checkPhoto);
  girlPhoto.addEventListener("error", checkPhoto);
  checkPhoto();

  // Romantic music
  const music = $("music");
  const musicButton = $("musicButton");

  musicButton.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicButton.textContent = "♫ Pause Music";
      } catch {
        musicButton.textContent = "Music file not found 😢";
      }
    } else {
      music.pause();
      musicButton.textContent = "♫ Play Music";
    }
  });

  // Love letter
  const letter = $("letter");
  const letterButton = $("letterButton");

  letterButton.addEventListener("click", () => {
    letter.hidden = !letter.hidden;

    letterButton.textContent = letter.hidden
      ? "Open Your Letter 💌"
      : "Close Your Letter 💗";

    if (!letter.hidden) {
      letter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  // YES button celebration
  const celebration = $("celebration");
  const confetti = $("confetti");

  function celebrate() {
    confetti.replaceChildren();

    const emojis = ["💖", "💕", "🌹", "✨", "💗", "🥹", "❤️"];

    for (let i = 0; i < 65; i++) {
      const piece = document.createElement("span");

      piece.className = "confetti-piece";
      piece.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

      piece.style.left = Math.random() * 100 + "%";
      piece.style.animationDelay = Math.random() * 1.5 + "s";
      piece.style.animationDuration = 3 + Math.random() * 3 + "s";
      piece.style.fontSize = 15 + Math.random() * 20 + "px";

      confetti.appendChild(piece);
    }

    celebration.hidden = false;
    $("closeCelebration").focus();
  }

  $("yesButton").addEventListener("click", celebrate);
  $("replayButton").addEventListener("click", celebrate);

  $("closeCelebration").addEventListener("click", () => {
    celebration.hidden = true;
    confetti.replaceChildren();
  });

  // NO button: it runs away but NEVER disappears.
  const noButton = $("noButton");
  const buttonArea = $("buttonArea");
  const feedback = $("feedback");

  const emotionalMessages = [
    "Nooo, please don't break my heart! 🥺💔",
    "Are you sure, my sunshine? 😭🌷",
    "My little heart is crying now! 🥹💗",
    "Please give my heart one chance! 🥺❤️",
    "Don't run away from my love! 😭💕",
    "I just wanted to make you smile! 🥹🌹",
    "My heart says please click YES! 💖🥺",
    "You're making me nervous! 😭💓",
    "One YES could make my whole day! 🥹✨",
    "Pretty please? 🥺👉👈💗",
    "My heart is waiting for you! 💘😭",
    "Sending you a million little hearts! 💕💞💗"
  ];

  let messageIndex = 0;
  let moveCount = 0;
  let moveTimeout;

  function moveNoButton() {
    // Keep the NO button visible inside its own area.
    const areaWidth = buttonArea.clientWidth;
    const areaHeight = 170;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    buttonArea.style.position = "relative";
    buttonArea.style.height = areaHeight + "px";
    buttonArea.style.display = "block";

    noButton.style.position = "absolute";
    noButton.style.zIndex = "5";
    noButton.style.transition =
      "left 0.18s ease, top 0.18s ease, transform 0.18s ease";

    const maxX = Math.max(0, areaWidth - buttonWidth);
    const maxY = Math.max(0, areaHeight - buttonHeight);

    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    // Try not to place NO right on top of YES.
    const yesButton = $("yesButton");
    const yesX = yesButton.offsetLeft;
    const yesY = yesButton.offsetTop;

    for (let i = 0; i < 12; i++) {
      x = Math.random() * maxX;
      y = Math.random() * maxY;

      const farFromYes =
        Math.abs(x - yesX) > buttonWidth * 0.7 ||
        Math.abs(y - yesY) > buttonHeight + 10;

      if (farFromYes) break;
    }

    noButton.style.left = x + "px";
    noButton.style.top = y + "px";
    noButton.style.transform =
      `rotate(${Math.random() * 16 - 8}deg)`;

    feedback.textContent =
      emotionalMessages[messageIndex % emotionalMessages.length];

    messageIndex++;
    moveCount++;

    // The button stays present; only its position changes.
    noButton.textContent =
      moveCount % 3 === 0 ? "NO 😭💔" : "NO 🙈";

    clearTimeout(moveTimeout);

    // Return to its normal appearance after a moment.
    moveTimeout = setTimeout(() => {
      noButton.style.transform = "rotate(0deg)";
      noButton.textContent = "NO 🙈";
    }, 700);
  }

  // Run away when she approaches or tries to press NO.
  noButton.addEventListener("pointerenter", moveNoButton);
  noButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    moveNoButton();
  });

  // Keyboard users also trigger the playful movement.
  noButton.addEventListener("focus", () => {
    feedback.textContent = "Hehe, trying to catch NO? 🙈💗";
  });

  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
  });

  // The existing respectful decline dialog remains available.
  $("declineButton").addEventListener("click", () => {
    $("responseDialog").hidden = false;
    $("closeResponse").focus();
  });

  $("closeResponse").addEventListener("click", () => {
    $("responseDialog").hidden = true;
  });

  // Secret heart
  const surpriseButton = $("surpriseButton");
  const surpriseMessage = $("surpriseMessage");

  surpriseButton.addEventListener("click", () => {
    surpriseMessage.hidden = !surpriseMessage.hidden;
    surpriseButton.textContent =
      surpriseMessage.hidden ? "♡" : "♥";
  });

  // Gallery navigation
  const photoCards = [...document.querySelectorAll(".photo-card")];
  let currentPhoto = 0;

  function showGalleryPhoto(index) {
    currentPhoto =
      (index + photoCards.length) % photoCards.length;

    photoCards.forEach((card, i) => {
      card.style.outline =
        i === currentPhoto ? "3px solid #f06292" : "none";
    });

    $("photoCounter").textContent =
      `${currentPhoto + 1} / ${photoCards.length}`;
  }

  $("previousPhoto").addEventListener("click", () => {
    showGalleryPhoto(currentPhoto - 1);
  });

  $("nextPhoto").addEventListener("click", () => {
    showGalleryPhoto(currentPhoto + 1);
  });

  // Full-screen photo viewer
  const lightbox = $("lightbox");
  const lightboxImage = $("lightboxImage");

  function openLightbox(index) {
    showGalleryPhoto(index);

    const image =
      photoCards[currentPhoto].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;

    $("closeLightbox").focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
  }

  photoCards.forEach((card, index) => {
    card.addEventListener("click", () => openLightbox(index));
  });

  $("closeLightbox").addEventListener("click", closeLightbox);

  $("lightboxPrev").addEventListener("click", () => {
    openLightbox(currentPhoto - 1);
  });

  $("lightboxNext").addEventListener("click", () => {
    openLightbox(currentPhoto + 1);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      celebration.hidden = true;
      $("responseDialog").hidden = true;
      closeLightbox();
    }
  });

  // Floating hearts
  const heartsContainer = $("hearts");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!reducedMotion) {
    function createFloatingHeart() {
      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent =
        ["♡", "♥", "💕", "💗", "🥹"][
          Math.floor(Math.random() * 5)
        ];

      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = 12 + Math.random() * 22 + "px";
      heart.style.animationDuration = 7 + Math.random() * 8 + "s";

      heartsContainer.appendChild(heart);

      heart.addEventListener("animationend", () => heart.remove());
    }

    for (let i = 0; i < 8; i++) {
      setTimeout(createFloatingHeart, i * 500);
    }

    setInterval(createFloatingHeart, 1300);
  }

  showGalleryPhoto(0);
});
