function getTextPreview(html,maxLength = 150){
    const div = document.createElement("div");
    div.innerHTML = html;
    console.log(html);
    const text = div.textContent || div.innerText || "";

    return text.trim() + "...";
}