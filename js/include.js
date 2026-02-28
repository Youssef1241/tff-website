async function loadHTML(id, file) {
    const res = await fetch(file);
    const text = await res.text();
    document.getElementById(id).innerHTML = text;
  }
  

function changeLanguage(lang){
  let currentPath = window.location.pathname;
  if (currentPath === "/index.html"){
    window.location.href="/en/index.html";
    return;
  }

  let newPath = currentPath.replace(/\/(ar|en)\//,`/${lang}/`);

  window.location.href  = newPath;
}
  loadHTML("navbar", "/ar/navbar.html");
  loadHTML("footer", "/ar/footer.html");

