/* ToolVerse Developer Tools — with QR Tabbed Generator */

const devType = document.getElementById("devType");
const devArea = document.getElementById("devArea");

devType.addEventListener("change", renderTool);
renderTool();

/* ------------------ TOOL RENDERING ------------------ */
function renderTool() {
  const type = devType.value;
  if (type === "hash") loadHashTool();
  else if (type === "qr") loadQRTool();
  else if (type === "morse") loadMorseTool();
}

/* ------------------ HASH GENERATOR ------------------ */
function loadHashTool() {
  devArea.innerHTML = `
    <h3>Hash Generator</h3>
    <textarea id="hashInput" placeholder="Enter text to hash"></textarea>
    <select id="hashType">
      <option value="md5">MD5</option>
      <option value="sha256">SHA256</option>
    </select>
    <button onclick="generateHash()">Generate Hash</button>
    <div class="result" id="hashResult"></div>
  `;
}

async function generateHash() {
  const text = document.getElementById("hashInput").value;
  const algo = document.getElementById("hashType").value;
  const output = document.getElementById("hashResult");

  if (text.trim() === "") {
    output.innerHTML = `<p style='color:red;'>⚠️ Enter some text!</p>`;
    return;
  }

  let hashValue = "";
  if (algo === "md5") hashValue = md5(text);
  else {
    const buffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    hashValue = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  output.innerHTML = `<p><b>${algo.toUpperCase()}:</b> ${hashValue}</p>`;
}

function md5(s) {
  // Simple MD5 function
  function L(k, d) { return (k << d) | (k >>> (32 - d)); }
  function K(G, k) { var I, d, F, H, x;
    F = (G & 2147483648); H = (k & 2147483648);
    I = (G & 1073741824); d = (k & 1073741824);
    x = (G & 1073741823) + (k & 1073741823);
    if (I & d) return (x ^ 2147483648 ^ F ^ H);
    if (I | d) {
      if (x & 1073741824) return (x ^ 3221225472 ^ F ^ H);
      else return (x ^ 1073741824 ^ F ^ H);
    } else return (x ^ F ^ H);
  }
  function r(d, F, k) { return (d & F) | ((~d) & k); }
  function q(d, F, k) { return (d & k) | (F & (~k)); }
  function p(d, F, k) { return (d ^ F ^ k); }
  function n(d, F, k) { return (F ^ (d | (~k))); }
  function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F); }
  function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F); }
  function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F); }
  function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F); }
  function e(G) {
    var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64;
    var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0;
    while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8;
      aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++;
    } Z = (H - (H % 4)) / 4; d = (H % 4) * 8;
    aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa;
  }
  function B(x) {
    var k = "", F = "", G, d;
    for (d = 0; d <= 3; d++) {
      G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16);
      k = k + F.substr(F.length - 2, 2);
    } return k;
  }
  var C = Array(); var P, h, E, v, g, Y, X, W, V;
  var S = 7, Q = 12, N = 17, M = 22;
  var A = 5, z = 9, y = 14, w = 20;
  var o = 4, m = 11, l = 16, j = 23;
  var U = 6, T = 10, R = 15, O = 21;
  s = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878;
  for (P = 0; P < s.length; P += 16) {
    h = Y; E = X; v = W; g = V;
    Y = u(Y, X, W, V, s[P + 0], S, 3614090360);
    V = u(V, Y, X, W, s[P + 1], Q, 3905402710);
    W = u(W, V, Y, X, s[P + 2], N, 606105819);
    X = u(X, W, V, Y, s[P + 3], M, 3250441966);
    Y = u(Y, X, W, V, s[P + 4], S, 4118548399);
    V = u(V, Y, X, W, s[P + 5], Q, 1200080426);
    W = u(W, V, Y, X, s[P + 6], N, 2821735955);
    X = u(X, W, V, Y, s[P + 7], M, 4249261313);
    Y = f(Y, X, W, V, s[P + 8], A, 1770035416);
    V = f(V, Y, X, W, s[P + 9], z, 2336552879);
    W = f(W, V, Y, X, s[P + 10], y, 4294925233);
    X = f(X, W, V, Y, s[P + 11], w, 2304563134);
    Y = D(Y, X, W, V, s[P + 12], o, 1804603682);
    V = D(V, Y, X, W, s[P + 13], m, 4254626195);
    W = D(W, V, Y, X, s[P + 14], l, 2792965006);
    X = D(X, W, V, Y, s[P + 15], j, 1236535329);
    Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g);
  }
  return (B(Y) + B(X) + B(W) + B(V)).toLowerCase();
}

/* ------------------ QR GENERATOR (WITH TABS) ------------------ */
function loadQRTool() {
  devArea.innerHTML = `
    <h3>QR Code Generator (Offline)</h3>

    <div class="tabs">
      <button class="tab-btn active" onclick="switchTab('text')">Text</button>
      <button class="tab-btn" onclick="switchTab('website')">Website</button>
      <button class="tab-btn" onclick="switchTab('contact')">Contact</button>
      <button class="tab-btn" onclick="switchTab('email')">Email</button>
    </div>

    <div id="qrInputs"></div>

    <!-- Generate Button -->
    <button onclick="generateAdvancedQR()">Generate QR</button>

    <!-- QR OUTPUT (BETWEEN BUTTONS) -->
    <div id="qrResult" class="qr-preview"></div>

    <!-- Download Button -->
    <button id="downloadQR" style="display:none;" onclick="downloadQR()">
      ⬇️ Download QR
    </button>
  `;
  switchTab("text");
}


function switchTab(type) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  const btn = [...document.querySelectorAll(".tab-btn")].find(b => b.textContent.toLowerCase() === type);
  if (btn) btn.classList.add("active");

  const qrInputs = document.getElementById("qrInputs");
  if (type === "text") {
    qrInputs.innerHTML = `<textarea id="qrTextInput" placeholder="Enter text..."></textarea>`;
  } else if (type === "website") {
    qrInputs.innerHTML = `<input id="qrWebsite" type="text" placeholder="Enter website URL...">`;
  } else if (type === "contact") {
    qrInputs.innerHTML = `
      <input id="contactName" placeholder="Name" />
      <input id="contactCompany" placeholder="Company" />
      <input id="contactPhone" placeholder="Phone" />
      <input id="contactEmail" placeholder="Email" />
    `;
  } else if (type === "email") {
    qrInputs.innerHTML = `
      <input id="emailAddr" placeholder="Email Address" />
      <input id="emailSubject" placeholder="Subject" />
      <textarea id="emailBody" placeholder="Message"></textarea>
    `;
  }
}

function generateAdvancedQR() {
  const activeTab = document.querySelector(".tab-btn.active").textContent.toLowerCase();
  let qrData = "";

  if (activeTab === "text") {
    qrData = document.getElementById("qrTextInput").value.trim();
  } else if (activeTab === "website") {
    let url = document.getElementById("qrWebsite").value.trim();
    if (url && !/^https?:\/\//i.test(url)) url = "https://" + url;
    qrData = url;
  } else if (activeTab === "contact") {
    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const company = document.getElementById("contactCompany").value.trim();
    qrData = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:${name}\r\nORG:${company}\r\nTEL:${phone}\r\nEMAIL:${email}\r\nEND:VCARD`;
  } else if (activeTab === "email") {
    const addr = document.getElementById("emailAddr").value.trim();
    const sub = document.getElementById("emailSubject").value.trim();
    const msg = document.getElementById("emailBody").value.trim();
    qrData = `mailto:${addr}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(msg)}`;
  }

  if (!qrData) return alert("⚠️ Please fill in the fields!");

  const qrResult = document.getElementById("qrResult");
  qrResult.innerHTML = "";
  new QRCode(qrResult, {
    text: qrData,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => document.getElementById("downloadQR").style.display = "inline-block", 300);
}

function downloadQR() {
  const canvas = document.querySelector("#qrResult canvas");
  if (!canvas) return;
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "QRCode_ToolVerse.png";
  link.click();
}

/* ------------------ MORSE GENERATOR ------------------ */
function loadMorseTool() {
  devArea.innerHTML = `
    <h3>Morse Code Generator</h3>
    <textarea id="morseInput" placeholder="Enter text here"></textarea>
    <button onclick="generateMorse()">Generate Morse</button>
    <div class="result" id="morseResult"></div>
  `;
}

function generateMorse() {
  const text = document.getElementById("morseInput").value.toUpperCase();
  const morseResult = document.getElementById("morseResult");
  if (!text.trim()) return morseResult.innerHTML = "<p style='color:red;'>⚠️ Enter text!</p>";

  const morseMap = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
    G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
    S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..", "1": ".----", "2": "..---", "3": "...--",
    "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..",
    "9": "----.", "0": "-----", " ": " / "
  };

  const morse = text.split("").map(ch => morseMap[ch] || "").join(" ");
  morseResult.innerHTML = `<p>${morse}</p>`;
}