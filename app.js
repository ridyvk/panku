const stage = document.getElementById("stage");
const go = document.getElementById("go");
let busy = false;

function chooseCompany() {
  const last = localStorage.getItem("panku.last") || "";
  const candidates = companies.length > 1
    ? companies.filter((company) => company.code !== last)
    : companies;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

function saveCompany(company) {
  localStorage.setItem("panku.last", company.code);

  try {
    const saved = JSON.parse(localStorage.getItem("panku.seen") || "[]");
    const seen = new Set(Array.isArray(saved) ? saved : []);
    seen.add(company.code);
    localStorage.setItem("panku.seen", JSON.stringify([...seen]));
  } catch {
    localStorage.setItem("panku.seen", JSON.stringify([company.code]));
  }
}

function launch() {
  if (busy || !companies.length) return;

  busy = true;
  const company = chooseCompany();
  saveCompany(company);
  go.setAttribute("aria-busy", "true");
  stage.classList.add("is-diving");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(
    () => window.location.assign(company.url),
    reduceMotion ? 350 : 1150
  );
}

go.addEventListener("click", launch);

window.addEventListener("pageshow", () => {
  busy = false;
  go.removeAttribute("aria-busy");
  stage.classList.remove("is-diving");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
