const textType = document.getElementById("textType");
const textArea = document.getElementById("textArea");

textType.addEventListener("change", renderTextTool);
renderTextTool();

function renderTextTool() {
  const val = textType.value;
  if (val === "counter") loadCounter();
  else if (val === "case") loadCase();
}

// ---------- CHARACTER / WORD COUNTER ----------
function loadCounter() {
  textArea.innerHTML = `
    <div class="text-box">
      <h4>Character & Word Counter</h4>
      <textarea id="txtInput" placeholder="Type or paste text..."></textarea>
      <button onclick="countText()">Count</button>
      <p class="result" id="countRes"></p>
    </div>`;
}

function countText() {
  const txt = document.getElementById("txtInput").value.trim();
  const words = txt ? txt.split(/\s+/).length : 0;
  const chars = txt.length;
  document.getElementById("countRes").textContent =
    `Words: ${words} | Characters: ${chars}`;
}

// ---------- CASE CONVERTER ----------
function loadCase() {
  textArea.innerHTML = `
    <div class="text-box">
      <h4>Case Converter</h4>
      <textarea id="caseInput" placeholder="Enter text here..."></textarea>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button onclick="toUpper()">UPPERCASE</button>
        <button onclick="toLower()">lowercase</button>
        <button onclick="toCapitalize()">Capitalize Each Word</button>
      </div>
      <p class="result" id="caseRes"></p>
    </div>`;
}

function toUpper() {
  const val = document.getElementById("caseInput").value;
  document.getElementById("caseRes").textContent = val.toUpperCase();
}

function toLower() {
  const val = document.getElementById("caseInput").value;
  document.getElementById("caseRes").textContent = val.toLowerCase();
}

function toCapitalize() {
  const val = document.getElementById("caseInput").value
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  document.getElementById("caseRes").textContent = val;
}
