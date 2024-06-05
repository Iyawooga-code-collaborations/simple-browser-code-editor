const $preview = document.querySelector("#editor .preview");
const $code = document.querySelector("#editor .code");

function mirror() {
  // make textarea grow to height of content so we can scroll together
  $code.style.height = $code.scrollHeight;
  // update the preview underlay with the syntax highlight
  $preview.innerHTML = Prism.highlight(
    $code.value,
    Prism.languages.javascript,
    "javascript",
  );
}
// insert two spaces on tab
$code.addEventListener("keydown", (ev) => {
  if (ev.code === "Tab") {
    ev.preventDefault();
    $code.setRangeText("  ", $code.selectionStart, $code.selectionStart, "end");
    mirror();
  }
});

$code.addEventListener("input", mirror);
