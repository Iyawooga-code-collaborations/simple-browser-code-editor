const $editor = document.querySelector("#editor");
const $preview = $editor.querySelector(".preview");
const $code = $editor.querySelector(".code");
const lineHeight = parseInt(window.getComputedStyle($code).lineHeight);
const characterWidth = 16;
const lineWrap = 80;

let syntax;
let previousRaw = "";

function mirror() {
  const scrollPos = $editor.scrollTop;
  const snap = Math.round(scrollPos / lineHeight) * lineHeight;
  const height = $editor.getBoundingClientRect().height;
  const visibleLines = Math.ceil(height / lineHeight);

  const startLine = Math.floor(scrollPos / lineHeight);
  const endLine = Math.ceil(startLine + visibleLines);

  const raw = $code.value;

  // $editor.scroll({ top: snap });
  $code.style.height = `${$code.scrollHeight}px`;

  syntax =
    raw !== previousRaw
      ? Prism.highlight(raw, Prism.languages.javascript, "javascript")
      : syntax;

  previousRaw = raw;

  const codeLines = raw.split("\n");
  const syntaxLines = syntax.split("\n");
  // .map((line) => `<span class="line">${line}</span>`);

  const previewLines = codeLines.map((line, index) =>
    index >= startLine && index <= endLine ? syntaxLines[index] : line,
  );

  $preview.innerHTML = previewLines.join("\n");
}

$code.addEventListener("input", () => {
  changeDetected = true;
  mirror();
});

$editor.addEventListener("scrollend", mirror);
window.addEventListener("resize", mirror);
