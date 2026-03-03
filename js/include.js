async function loadHTML(id, file) {
    const res = await fetch(file);
    const text = await res.text();
    document.getElementById(id).innerHTML = text;
  }
  

function changeLanguage(lang){
  let currentPath = window.location.pathname;

  if (currentPath === "/index.html" || currentPath === "/"){
    window.location.href="/en/index.html";
    return;
  }
  else if (currentPath === "/en/index.html"){
    window.location.href="/index.html";
    return;
  }

  let newPath = currentPath.replace(/\/(ar|en)\//,`/${lang}/`);

  window.location.href  = newPath;
}
  loadHTML("ar-navbar", "/ar/navbar.html");
  loadHTML("ar-footer", "/ar/footer.html");
  loadHTML("en-navbar","/en/navbar.html");
  loadHTML("en-footer","/en/footer.html");

