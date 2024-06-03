function highlight(code, startLine, endLine) {
  const codeLines = code.split("\n");

  const syntaxLines = Prism.highlight(
    code,
    Prism.languages.javascript,
    "javascript",
  ).split("\n");

  const before = codeLines.splice(0, startLine);
  const after = codeLines.splice(endLine, codeLines.length);

  const ret = before
    .concat(syntaxLines.splice(startLine, endLine))
    .concat(after);

  console.log("preview lines", ret.length);
  console.log("total", codeLines.length);

  // return ret.join("\n");

  return Prism.highlight(code, Prism.languages.javascript, "javascript");
}

const $el = document.querySelector("#editor #preview");

export default function (code) {
  return;
  const scrollTop = $el.parentElement.scrollTop;

  const lineHeight = parseInt(window.getComputedStyle($el).lineHeight);
  const height = $el.parentElement.getBoundingClientRect().height;
  const visibleLines = Math.ceil(height / lineHeight);

  const startLine = Math.floor(scrollTop / lineHeight);
  const endLine = Math.ceil(startLine + visibleLines);

  console.log(scrollTop, height);

  $el.innerHTML = highlight(code, startLine, endLine);
}
