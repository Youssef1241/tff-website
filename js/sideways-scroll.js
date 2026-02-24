const container = document.getElementById("reviewTrack");
const cards = Array.from(container.children);

let speed = 0.5;
let gap = 32; // spacing between cards
let positions = [];

// Position cards side by side initially
let totalWidth = 0;

cards.forEach((card, i) => {
  positions[i] = totalWidth;
  card.style.right = totalWidth + "px";
  totalWidth += card.offsetWidth + gap;
});

function animate() {
  cards.forEach((card, i) => {
    positions[i] += speed;

    // If card is completely off screen
    if (positions[i] + card.offsetWidth > container.offsetWidth) {
      // Move it to the far right
      positions[i] = Math.min(...positions) + card.offsetWidth + gap;
    }

    card.style.right = positions[i] + "px";
  });

  requestAnimationFrame(animate);
}

animate();
