async function loadHTML(id, file) {
    const res = await fetch(file);
    const text = await res.text();
    document.getElementById(id).innerHTML = text;
  }
  
  loadHTML("navbar", "/ar/navbar.html");
  loadHTML("footer", "/ar/footer.html");