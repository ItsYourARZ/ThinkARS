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

async function getAISuggestion() {
    const code = editor.getValue();
    const res = await fetch("/.netlify/functions/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
    });
    const data = await res.json();

    if (data.suggestion) {
        // Append AI suggestion to editor
        editor.replaceRange("\n" + data.suggestion, editor.getCursor());
    } else {
        alert("No suggestion received");
    }
}
