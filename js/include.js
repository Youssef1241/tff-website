async function loadHTML(id, file) {
  const mount = document.getElementById(id);
  if (!mount) return false;

  const res = await fetch(file);
  const text = await res.text();
  mount.innerHTML = text;
  return true;
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
    case "/ar/blogpost.html":
      window.location.href="/en/index.html";
      return;
    case "/ar/blog.html":
      window.location.href="/en/index.html";
      return;

  }
  
  let newPath = pathname.replace(/\/(ar|en)\//,`/${lang}/`);

  window.location.href  = newPath + search + hash;
}

function normalizePath(path) {
  if (!path) return path;
  if (!path.startsWith('/')) path = '/' + path;
  if (path.endsWith('/')) path += 'index.html';
  return path;
}

function markActiveNavLink() {
  const currentPath = normalizePath(window.location.pathname);

  document.querySelectorAll('.navbar .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    try {
      const linkPath = normalizePath(new URL(href, window.location.origin).pathname);
      if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
        link.classList.add('active');
      }
    } catch (e) {
      // ignore invalid URLs
    }
  });
}

function initStickyNavbarWithRetry(triesLeft = 50) {
  // Run active-link marking even if sticky isn't available yet
  markActiveNavLink();

  const hasNavbar = document.querySelector('.navbar');
  if (!hasNavbar) return;

  const canSticky = window.jQuery && typeof jQuery.fn.sticky === 'function';
  if (canSticky) {
    jQuery('.navbar').sticky({ topSpacing: 0 });
    return;
  }

  if (triesLeft > 0) {
    setTimeout(() => initStickyNavbarWithRetry(triesLeft - 1), 100);
  }
}

// Load navbar/footer and only then initialize sticky + active state
const isEn = window.location.pathname.includes("/en/");
const navbarPromise = isEn
  ? loadHTML("en-navbar", "/en/navbar.html")
  : loadHTML("ar-navbar", "/ar/navbar.html");
const footerPromise = isEn
  ? loadHTML("en-footer", "/en/footer.html")
  : loadHTML("ar-footer", "/ar/footer.html");

Promise.all([navbarPromise, footerPromise]).finally(() => {
  // Wait one tick so DOM is updated, then init (and retry until scripts are ready)
  setTimeout(() => initStickyNavbarWithRetry(), 0);
});

