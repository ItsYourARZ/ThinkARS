function runHTML() {
    const htmlCode = document.getElementById("code").value;
    const iframe = document.getElementById("output-iframe");
    iframe.srcdoc = htmlCode; // Set the iframe's content
}