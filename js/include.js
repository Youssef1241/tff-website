async function loadHTML(id, file) {
    const res = await fetch(file);
    const text = await res.text();
    document.getElementById(id).innerHTML = text;
  }
  

function changeLanguage(lang){
  const { pathname, search, hash } = window.location;

  switch (pathname) {
    case "/index.html":
      window.location.href="/en/index.html"
      return;
    case "/":
      window.location.href="/en/index.html";
      return;
    case "/en/index.html":
      window.location.href="/index.html";
      return;
    case "/en/blogpost.html":
      window.location.href="/ar/blog.html";
      return;
    case "/ar/blogpost.html":
      window.location.href="/en/blog.html";
      return;

  }
  
  let newPath = pathname.replace(/\/(ar|en)\//,`/${lang}/`);

  window.location.href  = newPath + search + hash;
}

if (window.location.pathname.includes("/en/")) {
  loadHTML("en-navbar", "/en/navbar.html");
  loadHTML("en-footer", "/en/footer.html");
} else {
  loadHTML("ar-navbar", "/ar/navbar.html");
  loadHTML("ar-footer", "/ar/footer.html");
}

// Ensure navbar becomes sticky and highlight the active page link
window.addEventListener('load', function () {
  if (window.jQuery && typeof jQuery.fn.sticky === 'function') {
    jQuery('.navbar').sticky({ topSpacing: 0 });
  }

  // Normalize paths so it works both locally and when deployed under a subfolder
  function normalizePath(path) {
    if (!path) return path;
    // Ensure leading slash
    if (!path.startsWith('/')) path = '/' + path;
    // If it's just a folder (ends with /), assume index.html
    if (path.endsWith('/')) path += 'index.html';
    return path;
  }

  const currentPath = normalizePath(window.location.pathname);

  document.querySelectorAll('.navbar .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    try {
      const linkPath = normalizePath(new URL(href, window.location.origin).pathname);

      // Match either exactly or as a suffix (for cases like /subsite/en/index.html vs /en/index.html)
      if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
        link.classList.add('active');
      }
    } catch (e) {
      // ignore invalid URLs
    }
  });
});

