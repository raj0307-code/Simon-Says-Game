let gameSeq = [];
let userSeq = [];

let btns = ["blue", "white", "orange", "pink"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    playSound();
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start`;
        overSound();
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress(e) {
    let btn = this;
    userFlash(btn);
    playSound();

    // Ripple effect (uses only CSS class)
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(btn.clientWidth, btn.clientHeight);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function playSound() {
    let audio = new Audio(`audio.mp3`);
    audio.play();
}

function overSound() {
    let audio = new Audio(`wrong.wav`);
    audio.play();
}
