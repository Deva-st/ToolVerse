document.addEventListener("DOMContentLoaded", () => {
  const calcType = document.getElementById("calcType");
  const calcArea = document.getElementById("calcArea");

  let display = null;
  let justEvaluated = false;

  calcType.addEventListener("change", render);
  render();

  function render() {
    justEvaluated = false;
    if (calcType.value === "basic") basic();
    else if (calcType.value === "scientific") scientific();
    else geometry();
  }

  /* ================= BASIC CALCULATOR ================= */
  function basic() {
    calcArea.innerHTML = `
      <div class="calculator">
        <input class="display" id="display" readonly>
        <div class="buttons">
          <button>AC</button><button>←</button><button>%</button><button>÷</button>
          <button>7</button><button>8</button><button>9</button><button>×</button>
          <button>4</button><button>5</button><button>6</button><button>-</button>
          <button>1</button><button>2</button><button>3</button><button>+</button>
          <button>0</button><button>.</button><button class="equals">=</button>
        </div>
      </div>
    `;
    initButtons();
  }

  /* ================= SCIENTIFIC CALCULATOR ================= */
  function scientific() {
    calcArea.innerHTML = `
      <div class="calculator">
        <input class="display" id="display" readonly>
        <div class="sci-grid">
          <button>sin</button><button>cos</button><button>tan</button><button>√</button>
          <button>π</button><button>^</button><button>%</button><button>÷</button>
          <button>7</button><button>8</button><button>9</button><button>×</button>
          <button>4</button><button>5</button><button>6</button><button>-</button>
          <button>1</button><button>2</button><button>3</button><button>+</button>
          <button>0</button><button>.</button><button>(</button><button>)</button>
          <button>AC</button><button>←</button><button class="equals">=</button>
        </div>
      </div>
    `;
    initButtons();
  }

  /* ================= GEOMETRY CALCULATOR ================= */
  function geometry() {
    calcArea.innerHTML = `
      <label>Shape</label>
      <select id="shape">
        <option value="triangle">Triangle</option>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="square">Square</option>
      </select>

      <label>Operation</label>
      <select id="op">
        <option value="area">Area</option>
        <option value="perimeter">Perimeter</option>
      </select>

      <div id="inputs"></div>
      <button id="geoBtn">Calculate</button>
      <div class="result" id="geoResult"></div>
    `;

    updateGeoInputs();
    shape.onchange = updateGeoInputs;
    op.onchange = updateGeoInputs;
    geoBtn.onclick = calculateGeometry;
  }

  function updateGeoInputs() {
    inputs.innerHTML = "";

    if (shape.value === "triangle") {
      inputs.innerHTML =
        op.value === "area"
          ? `<input id="base" placeholder="Base">
             <input id="height" placeholder="Height">`
          : `<input id="a" placeholder="Side A">
             <input id="b" placeholder="Side B">
             <input id="c" placeholder="Side C">`;
    }

    if (shape.value === "rectangle")
      inputs.innerHTML = `<input id="l" placeholder="Length">
                          <input id="w" placeholder="Width">`;

    if (shape.value === "circle")
      inputs.innerHTML = `<input id="r" placeholder="Radius">`;

    if (shape.value === "square")
      inputs.innerHTML = `<input id="s" placeholder="Side">`;
  }

  function calculateGeometry() {
    let r = 0;

    if (shape.value === "triangle")
      r = op.value === "area"
        ? (base.value * height.value) / 2
        : (+a.value + +b.value + +c.value);

    if (shape.value === "rectangle")
      r = op.value === "area"
        ? l.value * w.value
        : 2 * (+l.value + +w.value);

    if (shape.value === "circle")
      r = op.value === "area"
        ? Math.PI * r.value ** 2
        : 2 * Math.PI * r.value;

    if (shape.value === "square")
      r = op.value === "area"
        ? s.value ** 2
        : 4 * s.value;

    geoResult.innerText = formatResult(r);
  }

  function initButtons() {
    display = document.getElementById("display");
    document.querySelectorAll("button").forEach(btn => {
      btn.onclick = () => handleInput(btn.innerText);
    });
  }

  function isOperator(v) {
    return ["+", "-", "×", "÷", "^"].includes(v);
  }

  function handleInput(v) {
    if (v === "AC") return display.value = "";
    if (v === "←") return display.value = display.value.slice(0, -1);

    if (v === "=") {
      let exp = display.value
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/(\d+)%/g, "($1/100)")
        .replace(/π/g, "pi")
        .replace(/sin\(/g, "sin(pi/180*")
        .replace(/cos\(/g, "cos(pi/180*")
        .replace(/tan\(/g, "tan(pi/180*")
        .replace(/√/g, "sqrt");

      let result = math.evaluate(exp);

      if (/sin|cos|tan/.test(display.value))
        result = Number(result.toFixed(2));

      display.value = formatResult(result);
      justEvaluated = true;
      return;
    }

    if (justEvaluated) {
      if (isOperator(v)) {
        display.value += v;
      } else {
        display.value = v;
      }
      justEvaluated = false;
      return;
    }

    display.value += v;
  }

  function formatResult(val) {
    return Number.isInteger(val) ? val : Number(val.toFixed(2));
  }

  document.addEventListener("keydown", e => {
    if (!display) return;

    if (e.key === "Enter") return handleInput("=");
    if (e.key === "Backspace") return handleInput("←");

    if ("0123456789+-*/().%".includes(e.key)) {
      const map = { "*": "×", "/": "÷" };
      handleInput(map[e.key] || e.key);
    }
  });
});
