const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "htmlmixed",
    lineNumbers: true,
    theme: "dracula",
    matchBrackets: true,
    autoCloseTags: true
});

let suggestion = "";

async function fetchSuggestion(code) {
    try {
        const res = await fetch(".netlify/functions/suggest.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: code })
        });
        const data = await res.json();
        suggestion = data.suggestion || "";
        showSuggestion();
    } catch (err) {
        console.error(err);
    }
}

function showSuggestion() {
    const lineCount = editor.lineCount();
    const lastLine = editor.getLine(lineCount - 1);
    const ghost = suggestion.startsWith(lastLine) ? suggestion.slice(lastLine.length) : "";
    
    const wrapper = editor.getWrapperElement();
    const lines = wrapper.querySelectorAll(".CodeMirror-line");
    lines.forEach((line, idx) => {
        if (idx === lineCount - 1) {
            line.setAttribute("data-ghost", ghost);
        } else {
            line.removeAttribute("data-ghost");
        }
    });
}

editor.on("change", () => {
    const code = editor.getValue();
    if (code.trim() !== "") {
        fetchSuggestion(code);
    }
});
