const glow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;

let lastSparkle = 0;
let activeSparkles = 0;
const maxSparkles = 20;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {

    glow.style.left = `${mouseX}px`;
    glow.style.top = `${mouseY}px`;

    const now = performance.now();

    if (now - lastSparkle > 50 && activeSparkles < maxSparkles) {
        createSparkle(mouseX, mouseY);
        lastSparkle = now;
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

function createSparkle(x, y) {

    activeSparkles++;

    const sparkle = document.createElement("span");

    sparkle.classList.add("sparkle");

    const offsetX = (Math.random() - 0.5) * 24;
    const offsetY = (Math.random() - 0.5) * 24;

    const driftX = (Math.random() - 0.5) * 40;
    const driftY = -(Math.random() * 30 + 15);

    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;

    sparkle.style.setProperty("--drift-x", `${driftX}px`);
    sparkle.style.setProperty("--drift-y", `${driftY}px`);

    const size = Math.random() * 5 + 8;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
        activeSparkles--;
    }, 1000);
}