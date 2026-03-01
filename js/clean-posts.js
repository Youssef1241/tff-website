function getTextPreview(html){
    const div = document.createElement("div");
    div.innerHTML = html;
    console.log(html);
    const text = div.textContent || div.innerText || "";

    return text.trim() + "...";
}