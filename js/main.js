(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var nav = document.getElementById("menu-principal");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));
  var hashLinks = Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var backToTop = document.querySelector("[data-back-to-top]");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setMenu(open) {
    if (!header || !menuToggle) {
      return;
    }

    header.classList.toggle("is-menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  function closeMenu() {
    setMenu(false);
  }

  function getHeaderOffset() {
    return header ? header.offsetHeight + 16 : 0;
  }

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function scrollToHash(hash, updateUrl) {
    var target = document.querySelector(hash);

    if (!target) {
      return;
    }

    var targetTop = target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: reducedMotion ? "auto" : "smooth"
    });

    if (updateUrl) {
      history.pushState(null, "", hash);
    }

    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    closeMenu();
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = menuToggle.getAttribute("aria-expanded") !== "true";
      setMenu(open);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  hashLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var url = new URL(link.href);

      if (url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      event.preventDefault();
      scrollToHash(url.hash, true);
    });
  });

  function updateHeaderState() {
    var isScrolled = window.scrollY > 12;

    if (header) {
      header.classList.toggle("is-scrolled", isScrolled);
    }

    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 520);
    }
  }

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
      });
      setActiveLink("inicio");
      closeMenu();
    });
  }

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  } else {
    window.addEventListener("scroll", function () {
      var current = sections.reduce(function (active, section) {
        var offset = section.offsetTop - getHeaderOffset() - 40;
        return window.scrollY >= offset ? section.id : active;
      }, "inicio");

      setActiveLink(current);
    }, { passive: true });
  }

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12
    });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }
})();
