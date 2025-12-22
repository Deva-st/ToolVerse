const randType = document.getElementById("randType");
const randArea = document.getElementById("randArea");

randType.addEventListener("change", renderRandomizer);
renderRandomizer();

/* =========================
   ROUTER
========================= */
function renderRandomizer() {
  const type = randType.value;
  if (type === "number") loadNumber();
  else if (type === "dice") loadDice();
  else if (type === "coin") loadCoin();
  else if (type === "password") loadPassword();
}

/* =========================
   RANDOM NUMBER
========================= */
function loadNumber() {
  randArea.innerHTML = `
    <div class="rand-box">
      <h4>Random Number Generator</h4>
      <input id="min" placeholder="Min" type="number" />
      <input id="max" placeholder="Max" type="number" />
      <button onclick="generateNumber()">Generate</button>
      <p class="result" id="numRes"></p>
    </div>`;
}

function generateNumber() {
  const min = +document.getElementById("min").value;
  const max = +document.getElementById("max").value;

  if (isNaN(min) || isNaN(max) || min >= max) {
    alert("Enter valid range!");
    return;
  }

  document.getElementById("numRes").textContent =
    Math.floor(Math.random() * (max - min + 1)) + min;
}

/* =========================
   DICE (FACE SHOWN)
========================= */
function loadDice() {
  randArea.innerHTML = `
    <div class="rand-box">
      <h4>Dice Roller 🎲</h4>
      <div class="dice" id="dice">⚀</div>
      <button onclick="rollDice()">Roll</button>
    </div>`;
}

function rollDice() {
  const dice = document.getElementById("dice");
  const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  dice.classList.remove("roll");
  void dice.offsetWidth; // restart animation
  dice.classList.add("roll");

  const value = Math.floor(Math.random() * 6);

  setTimeout(() => {
    dice.textContent = faces[value];
  }, 600);
}

/* =========================
   COIN (HEADS / TAILS ON COIN)
========================= */
function loadCoin() {
  randArea.innerHTML = `
    <div class="rand-box">
      <h4>Coin Toss 🪙</h4>
      <div class="coin" id="coin">FLIP</div>
      <button onclick="flipCoin()">Flip</button>
    </div>`;
}

function flipCoin() {
  const coin = document.getElementById("coin");

  coin.classList.remove("flip");
  void coin.offsetWidth; // restart animation
  coin.classList.add("flip");

  const result = Math.random() < 0.5 ? "HEADS" : "TAILS";

  setTimeout(() => {
    coin.textContent = result;
  }, 700);
}

/* =========================
   PASSWORD
========================= */
function loadPassword() {
  randArea.innerHTML = `
    <div class="rand-box">
      <h4>Random Password Generator 🔐</h4>
      <input id="len" type="number" placeholder="Length (e.g. 8)" />
      <button onclick="generatePassword()">Generate</button>
      <p class="result" id="passRes"></p>
    </div>`;
}

function generatePassword() {
  const len = +document.getElementById("len").value || 8;
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&!";
  let pass = "";

  for (let i = 0; i < len; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  document.getElementById("passRes").textContent = pass;
}