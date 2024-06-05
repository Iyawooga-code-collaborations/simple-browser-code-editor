const $preview = document.querySelector("#editor .preview");
const $code = document.querySelector("#editor .code");

function mirror() {
  $preview.innerHTML = Prism.highlight(
    $code.value,
    Prism.languages.javascript,
    "javascript",
  );
}

$code.addEventListener("input", mirror);
