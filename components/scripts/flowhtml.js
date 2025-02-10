const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "htmlmixed",
    lineNumbers: true,
    theme: "dracula",
    matchBrackets: true,
    autoCloseTags: true
});

function runCode() {
    const code = editor.getValue();
    const outputFrame = document.getElementById("output").contentWindow.document;
    outputFrame.open();
    outputFrame.write(code);
    outputFrame.close();
}