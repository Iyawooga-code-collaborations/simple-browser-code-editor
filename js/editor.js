// import mirror from "./mirror.js";

const $editor = document.querySelector("#editor");
const $preview = $editor.querySelector(".preview");
const $code = $editor.querySelector(".code");
const lineHeight = 24;

$code.style.height =
  Math.ceil($code.getBoundingClientRect().height / lineHeight) * lineHeight;

let syntax;
let changeDetected = true;

function snap() {
  const top = $code.scrollTop;

  const bottomedOut = $code.scrollHeight - top === $code.clientHeight;
  console.log(bottomedOut);

  // if (bottomedOut) return;

  const snap = Math.floor(top / lineHeight) * lineHeight;
  $code.scrollTo({ top: snap, behavior: "smooth" });
}

// here is where we mirror with syntax only the viewable area of the code
function mirror() {
  const scrollPos = $code.scrollTop;
  const snap = Math.round($code.scrollTop / lineHeight) * lineHeight;

  const height = $code.getBoundingClientRect().height;
  const visibleLines = Math.ceil(height / lineHeight);

  const startLine = Math.floor(scrollPos / lineHeight);
  const endLine = Math.ceil(startLine + visibleLines);

  syntax = changeDetected
    ? Prism.highlight($code.value, Prism.languages.javascript, "javascript")
    : syntax;

  changeDetected = false;
  $preview.innerHTML = syntax.split("\n").splice(startLine, endLine).join("\n");
}

$code.addEventListener("input", () => {
  changeDetected = true;
  mirror();
  snap();
});

$code.addEventListener("scroll", (ev) => {
  mirror();
});

$code.addEventListener("scrollend", snap);

window.addEventListener("resize", () => {
  snap();
  mirror();
});

mirror();
