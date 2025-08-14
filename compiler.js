let timeout;
    let editor = document.getElementById('editor');
    const suggestionBox = document.getElementById('suggestion');

    editor.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(getSuggestion, 500);
    });

    async function getSuggestion() {
      const code = editor.value;
      const res = await fetch('/.netlify/functions/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      suggestionBox.textContent = data.suggestion || '';
    }