export default function ($textarea) {
  return Prism.highlight(
    $textarea.value,
    Prism.languages.javascript,
    "javascript",
  );
}
