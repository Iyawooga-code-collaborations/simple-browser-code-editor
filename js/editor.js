const $editor = document.querySelector("#editor");
const $preview = $editor.querySelector(".preview");
const $code = $editor.querySelector(".code");
const lineHeight = 24;
const characterWidth = 16;
const lineWrap = 80;

let syntax;
let changeDetected = true;

function mirror() {
  const scrollPos = $editor.scrollTop;
  const snap = Math.round(scrollPos / lineHeight) * lineHeight;

  const height = $editor.getBoundingClientRect().height;
  const visibleLines = Math.ceil(height / lineHeight);

  const startLine = Math.floor(scrollPos / lineHeight);
  const endLine = Math.ceil(startLine + visibleLines);

  syntax = changeDetected
    ? Prism.highlight($code.innerText, Prism.languages.javascript, "javascript")
    : syntax;

  changeDetected = false;

  const codeLines = $code.innerHTML.split("\n");
  const syntaxLines = syntax.split("\n");

  const lines = codeLines.map((line, index) =>
    index >= startLine && index <= endLine ? syntaxLines[index] : line,
  );

  $preview.innerHTML = lines.flat().join("\n");
}

$code.addEventListener("input", () => {
  changeDetected = true;
  mirror();
});

$editor.addEventListener("scroll", mirror);
window.addEventListener("resize", mirror);

mirror();
