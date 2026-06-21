const delay = 500;

function readSeen() {
  try {
    const value = JSON.parse(localStorage.getItem("panku.seen") || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

const state = {
  busy: false,
  seen: readSeen(),
  last: localStorage.getItem("panku.last") || ""
};

const stage = document.getElementById("stage");
const go = document.getElementById("go");
const preview = document.getElementById("preview");
const statusLabel = document.getElementById("status");
const targetName = document.getElementById("target-name");
const targetSector = document.getElementById("target-sector");
const count = document.getElementById("count");
const lastTarget = document.getElementById("last");

function updateStats() {
  count.textContent = `${state.seen.size} / ${companies.length}`;
  const company = companies.find((item) => item.code === state.last);
  lastTarget.textContent = company ? `${company.code} ${company.name}` : "なし";
}

function chooseCompany() {
  const candidates = companies.length > 1
    ? companies.filter((item) => item.code !== state.last)
    : companies;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

function saveCompany(company) {
  state.seen.add(company.code);
  state.last = company.code;
  localStorage.setItem("panku.seen", JSON.stringify([...state.seen]));
  localStorage.setItem("panku.last", company.code);
  updateStats();
}

function showCompany(company) {
  targetName.textContent = `${company.code} ${company.name}`;
  targetSector.textContent = company.sector;
}

function visitCompany() {
  if (state.busy) return;

  state.busy = true;
  const company = chooseCompany();
  saveCompany(company);
  showCompany(company);
  statusLabel.textContent = "OPENING";
  go.textContent = "公式サイトを開いています";
  go.setAttribute("aria-busy", "true");
  stage.classList.add("is-diving");

  window.setTimeout(() => window.location.assign(company.url), delay);
}

function previewCompany() {
  if (state.busy) return;

  const company = chooseCompany();
  saveCompany(company);
  showCompany(company);
  statusLabel.textContent = "SELECTED";
}

go.addEventListener("click", visitCompany);
preview.addEventListener("click", previewCompany);
updateStats();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
