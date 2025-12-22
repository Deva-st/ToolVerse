function switchTool() {
  document.querySelectorAll(".tool").forEach(t => t.style.display = "none");

  const selected = toolSelect.value;
  const active = document.getElementById(selected);

  active.style.display = "flex";
  active.style.flexDirection = "column";
  active.style.alignItems = "center";
}

/* Load BMI by default */
window.onload = switchTool;

/* ENTER = CALCULATE */
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    document
      .querySelector(".tool:not([style*='display: none']) button")
      ?.click();
  }
});

/* BMI + CATEGORY */
function calculateBMI() {
  const w = +bmiWeight.value;
  const h = +bmiHeight.value / 100;

  if (!w || !h) {
    bmiResult.textContent = "Enter valid values";
    return;
  }

  const bmi = (w / (h * h)).toFixed(2);
  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else category = "Overweight";

  bmiResult.textContent = `BMI: ${bmi} (${category})`;
}

/* BMR */
function calculateBMR() {
  const w = +bmrWeight.value;
  const h = +bmrHeight.value;
  const a = +bmrAge.value;
  const g = bmrGender.value;

  if (!w || !h || !a || a > 150 || !g) {
    bmrResult.textContent = "Enter valid details";
    return;
  }

  const bmr =
    g === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

  bmrResult.textContent = `BMR: ${Math.round(bmr)} kcal/day`;
}

/* IDEAL WEIGHT */
function calculateIdealWeight() {
  const h = +idealHeight.value;
  const g = idealGender.value;

  if (!h || !g) {
    idealResult.textContent = "Enter valid details";
    return;
  }

  const ideal =
    g === "male"
      ? 50 + 0.9 * (h - 152)
      : 45.5 + 0.9 * (h - 152);

  idealResult.textContent = `Ideal Weight: ${ideal.toFixed(1)} kg`;
}
