const converterType = document.getElementById("converterType");
const converterArea = document.getElementById("converterArea");

/* LOAD DEFAULT */
document.addEventListener("DOMContentLoaded", () => {
  loadUnitConverter();
});

converterType.addEventListener("change", renderConverter);

function renderConverter() {
  converterArea.innerHTML = "";
  const type = converterType.value;

  if (type === "unit") loadUnitConverter();
  else if (type === "temperature") loadTemperatureConverter();
  else if (type === "base") loadBaseConverter();
}

/* ================= UNIT CONVERTER ================= */

const unitFactors = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  inch: 0.0254,
  feet: 0.3048,
  yard: 0.9144,
  mile: 1609.34
};

function loadUnitConverter() {
  let options = "";
  for (let u in unitFactors) {
    options += `<option value="${u}">${u}</option>`;
  }

  converterArea.innerHTML = `
    <h3>Unit Converter</h3>

    <input type="number" id="unitValue" placeholder="Enter value">

    <select id="unitFrom">${options}</select>
    <select id="unitTo">${options}</select>

    <button onclick="convertUnit()">Convert</button>
    <div class="result" id="unitResult"></div>
  `;
}

function convertUnit() {
  const value = parseFloat(document.getElementById("unitValue").value);
  const from = document.getElementById("unitFrom").value;
  const to = document.getElementById("unitTo").value;
  const res = document.getElementById("unitResult");

  if (isNaN(value)) {
    res.innerHTML = "⚠️ Enter a value";
    return;
  }

  const meters = value * unitFactors[from];
  const result = meters / unitFactors[to];

  res.innerHTML = `Result: <b>${result.toFixed(4)}</b>`;
}

/* ================= TEMPERATURE ================= */

function loadTemperatureConverter() {
  converterArea.innerHTML = `
    <h3>Temperature Converter</h3>

    <input type="number" id="tempValue" placeholder="Enter temperature">

    <select id="tempFrom">
      <option value="c">Celsius</option>
      <option value="f">Fahrenheit</option>
      <option value="k">Kelvin</option>
    </select>

    <select id="tempTo">
      <option value="c">Celsius</option>
      <option value="f">Fahrenheit</option>
      <option value="k">Kelvin</option>
    </select>

    <button onclick="convertTemp()">Convert</button>
    <div class="result" id="tempResult"></div>
  `;
}

function convertTemp() {
  const v = parseFloat(document.getElementById("tempValue").value);
  const f = document.getElementById("tempFrom").value;
  const t = document.getElementById("tempTo").value;
  const res = document.getElementById("tempResult");

  if (isNaN(v)) return res.innerHTML = "⚠️ Enter temperature";

  let c = f === "c" ? v : f === "f" ? (v - 32) * 5 / 9 : v - 273.15;
  let r = t === "c" ? c : t === "f" ? c * 9 / 5 + 32 : c + 273.15;

  res.innerHTML = `Result: <b>${r.toFixed(2)}</b>`;
}

/* ================= BASE ================= */

function loadBaseConverter() {
  converterArea.innerHTML = `
    <h3>Base Converter</h3>

    <input id="baseValue" placeholder="Enter number">

    <select id="baseFrom">
      <option value="10">Decimal</option>
      <option value="2">Binary</option>
      <option value="8">Octal</option>
      <option value="16">Hexadecimal</option>
    </select>

    <select id="baseTo">
      <option value="10">Decimal</option>
      <option value="2">Binary</option>
      <option value="8">Octal</option>
      <option value="16">Hexadecimal</option>
    </select>

    <button onclick="convertBase()">Convert</button>
    <div class="result" id="baseResult"></div>
  `;
}

function convertBase() {
  const v = document.getElementById("baseValue").value.trim();
  const f = parseInt(document.getElementById("baseFrom").value);
  const t = parseInt(document.getElementById("baseTo").value);
  const res = document.getElementById("baseResult");

  try {
    const d = parseInt(v, f);
    if (isNaN(d)) throw "";
    res.innerHTML = `Result: <b>${d.toString(t).toUpperCase()}</b>`;
  } catch {
    res.innerHTML = "⚠️ Invalid number";
  }
}
