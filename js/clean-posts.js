function getTextPreview(html, isMD = true, charLimit = 3000) {
    const div = document.createElement("div");
    if (isMD) {
        html = marked.parse(html);
    }

    div.innerHTML = html;

    const text = div.textContent || div.innerText || "";
    if (text.length <= charLimit) {
        return text.trim() + "...";
    }
    else{
        const trimmed = text.trim().substring(0, charLimit);
        const lastSpace = trimmed.lastIndexOf(' ');
        if (lastSpace > 0) {
            return trimmed.substring(0, lastSpace) + "...";
        } else {
            return trimmed + "...";
        }
    }
}
