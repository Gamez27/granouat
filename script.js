(function () {
  "use strict";

  var VIEWS = [
    "inicio", "nosotros", "origen", "proceso", "productos",
    "sostenibilidad", "galeria", "testimonios", "precios", "contacto"
  ];

  var navLinks = document.querySelectorAll(".nav-link");
  var sections = document.querySelectorAll(".view");
  var viewIndexEl = document.getElementById("viewIndex");
  var viewNameEl = document.getElementById("viewName");
  var content = document.getElementById("content");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");
  var navToggle = document.getElementById("navToggle");

  function showView(id, opts) {
    if (VIEWS.indexOf(id) === -1) id = VIEWS[0];
    var index = VIEWS.indexOf(id);

    sections.forEach(function (section) {
      var isMatch = section.id === "view-" + id;
      section.classList.toggle("active", isMatch);
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.dataset.view === id);
    });

    var activeSection = document.getElementById("view-" + id);
    if (activeSection) {
      viewIndexEl.textContent = String(index + 1).padStart(2, "0") + " / " + VIEWS.length;
      viewNameEl.textContent = activeSection.dataset.title || "";
    }

    if (!opts || opts.scroll !== false) {
      content.scrollTo({ top: 0, behavior: "auto" });
    }

    if (!opts || opts.updateHash !== false) {
      history.replaceState(null, "", "#" + id);
    }

    closeMobileNav();
  }

  function openMobileNav() {
    sidebar.classList.add("open");
    scrim.classList.add("visible");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeMobileNav() {
    sidebar.classList.remove("open");
    scrim.classList.remove("visible");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      showView(link.dataset.view);
    });
  });

  document.querySelectorAll("[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showView(btn.dataset.goto);
    });
  });

  navToggle.addEventListener("click", function () {
    var isOpen = sidebar.classList.contains("open");
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  scrim.addEventListener("click", closeMobileNav);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileNav();
  });

  window.addEventListener("hashchange", function () {
    var id = location.hash.replace("#", "");
    showView(id, { updateHash: false });
  });

  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      formStatus.textContent = "Mensaje enviado. Respondemos en uno o dos días hábiles.";
      contactForm.reset();
    });
  }

  var initial = location.hash.replace("#", "");
  showView(initial || VIEWS[0], { scroll: false, updateHash: false });
})();
