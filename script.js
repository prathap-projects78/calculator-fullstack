const expEl = document.getElementById("expression");
const resEl = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.innerText.trim();

    if (value === "Ac") {
      expression = "";
      expEl.innerText = "Enter expression";
      resEl.innerText = "Result";
    }

    else if (value === "⌫") {
      expression = expression.slice(0, -1);
      expEl.innerText = expression;
    }

    else if (value === "=") {
  try {
    const result = eval(expression);
    resEl.innerText = "=" + result.toLocaleString();

    // SAVE TO HISTORY
    saveHistory(expression, result.toLocaleString());

  } catch {
    resEl.innerText = "Error";
    expression = "";
  }
}


    else {
      expression += value;
      expEl.innerText = expression;
    }
  });
});
/* ================= HISTORY LOGIC ================= */

// Elements
const historyScreen = document.getElementById("historyScreen");
const calculator = document.getElementById("calculator");
const historyList = document.getElementById("historyList");
const openHistoryBtn = document.getElementById("openHistory");
const backToCalcBtn = document.getElementById("backToCalc");
const clearHistoryBtn = document.getElementById("clearHistory");

// Load history from localStorage
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

// Render history
function renderHistory() {
  historyList.innerHTML = "";

  history.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <p class="history-expression">${item.expression}</p>
      <p class="history-result">= ${item.result}</p>
    `;

    historyList.appendChild(div);
  });
}

// Save history
function saveHistory(expression, result) {
  history.unshift({ expression, result }); // latest on top
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

// Open history
openHistoryBtn.addEventListener("click", () => {
  renderHistory();
  historyScreen.style.display = "block";
  calculator.style.display = "none";
});
const res = eval(expression);
saveHistory1(expression, res);

// Back to calculator
backToCalcBtn.addEventListener("click", () => {
  historyScreen.style.display = "none";
  calculator.style.display = "block";
});

// Clear history
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
});

function saveHistory1(expression, result) {
  fetch("http://localhost:3000/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      expression: expression,
      result: result
    })
  });
}


