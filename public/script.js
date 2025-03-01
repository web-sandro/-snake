const dotSize = 20; 
const gapSize = 3;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const columns = Math.floor(screenWidth / (dotSize + gapSize));
const rows = Math.floor(screenHeight / (dotSize + gapSize));
const grid = document.getElementById("grid");
const scoreElement = document.getElementById("score");

grid.style.gridTemplateColumns = `repeat(${columns}, ${dotSize}px)`;
grid.style.gridTemplateRows = `repeat(${rows}, ${dotSize}px)`;

const colors = ["yellow", "green", "purple", "red"];
const colorValues = { "yellow": 1, "green": 2, "purple": 3, "red": 0 };

let dots = [];
let score = 0;
let pos = Math.floor(rows / 2) * columns + Math.floor(columns / 2);
let direction = 1;
let speed = 500;
let tail = [];
let gameOver = false;
let redPos = -1;
let gameStarted = false;

for (let i = 0; i < columns * rows; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    if (Math.random() < 0.1) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        dot.classList.add(randomColor);
        dot.dataset.value = colorValues[randomColor];
    }
    grid.appendChild(dot);
    dots.push(dot);
}

function updateLights() {
    if (gameOver) return;
    dots.forEach(dot => dot.classList.remove("black", "blue"));
    dots[pos].classList.add("blue");
    if (tail.length > 0) {
        tail.forEach(t => dots[t].classList.add("blue"));
    }
    dots[pos + direction]?.classList.add("black");

    if (Math.random() < 0.1 && redPos === -1) {
        redPos = Math.floor(Math.random() * (columns * rows));
        dots[redPos].classList.add("red");
    }

    if (redPos !== -1 && pos === redPos) {
        endGame();
    }
}

document.addEventListener("keydown", (e) => {
    if (!gameStarted) return;
    if (e.key === "ArrowRight" && (pos + 1) % columns !== 0) direction = 1;
    if (e.key === "ArrowLeft" && pos % columns !== 0) direction = -1;
    if (e.key === "ArrowUp" && pos - columns >= 0) direction = -columns;
    if (e.key === "ArrowDown" && pos + columns < columns * rows) direction = columns;
    if (e.key === "+") speed = Math.max(10, speed - 10);
    if (e.key === "-") speed = Math.min(500, speed + 10);
});

function moveLights() {
    if (gameOver) return;
    let newPos = pos + direction;

    if (newPos >= 0 && newPos < columns * rows) {
        if (dots[newPos].classList.contains("yellow") || dots[newPos].classList.contains("green") || dots[newPos].classList.contains("purple")) {
            let color = dots[newPos].classList[1];
            score += colorValues[color];
            scoreElement.textContent = score;

            dots[newPos].classList.remove("yellow", "green", "purple");
            dots[newPos].classList.add("blue");
            tail.push(pos);

            let remainingColors = dots.some(dot => dot.classList.contains("yellow") || dot.classList.contains("green") || dot.classList.contains("purple"));
            if (!remainingColors) {
                alert(`Vitória! Você terminou com ${score} pontos!`);
                return;
            }
        }

        if (dots[newPos].classList.contains("red")) {
            dots[newPos].classList.remove("red");
            tail.push(false);
            alert(`Game Over! Pontuação final: ${score}`);
            location.reload();
        }

        tail.push(pos);
        if (tail.length > 2) {
            let tailEnd = tail.shift();
            dots[tailEnd].classList.remove("blue");
        }

        pos = newPos;
    }

    updateLights();
    setTimeout(moveLights, speed);
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    updateLights();
    moveLights();
}

function endGame() {
    gameOver = true;
    alert(`Fim de jogo! Sua pontuação final foi: ${score}`);
}
