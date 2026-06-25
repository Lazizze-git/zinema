/**
 * ZINEMA — script unique (classique, sans modules).
 * Fonctionne aussi bien par double-clic (file://) que via un serveur.
 * Tout est encapsulé et protégé : aucune erreur ne peut masquer le contenu.
 */
(function () {
  "use strict";

  // Marque que le JS tourne (active les états cachés gérés en CSS).
  document.documentElement.classList.add("js");

  /* ---------- Apparitions au scroll ---------- */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealAll = function () {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
    };

    if (reduce || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) { observer.observe(el); });

    // Filet de sécurité : tout révéler après 2 s quoi qu'il arrive.
    window.setTimeout(revealAll, 2000);
  }

  /* ---------- Navigation ---------- */
  function initNav() {
    var burger = document.querySelector(".burger");
    var nav = document.querySelector(".nav");
    var header = document.querySelector(".header");
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));

    function closeMenu() {
      if (burger) { burger.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
      if (nav) nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }

    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("menu-open", open);
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest(".nav__link, .nav__cta")) closeMenu();
      });
      window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
      });
    }

    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var sections = links
      .map(function (l) { return document.querySelector(l.getAttribute("href")); })
      .filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = "#" + entry.target.id;
            links.forEach(function (l) {
              l.classList.toggle("is-active", l.getAttribute("href") === id);
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach(function (s) { spy.observe(s); });
    }

    var announce = document.querySelector(".announce");
    var closeBtn = document.querySelector(".announce__close");
    if (closeBtn && announce) {
      closeBtn.addEventListener("click", function () { announce.setAttribute("hidden", ""); });
    }
  }

  /* ---------- Onglets du programme ---------- */
  function initProgramme() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".day-tab"));
    var panels = Array.prototype.slice.call(document.querySelectorAll(".day-panel"));
    if (!tabs.length || !panels.length) return;

    function activate(day) {
      tabs.forEach(function (t) {
        var on = t.dataset.day === day;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
      });
      panels.forEach(function (p) {
        p.classList.toggle("is-active", p.dataset.day === day);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { activate(tab.dataset.day); });
    });

    var current = tabs.filter(function (t) { return t.classList.contains("is-active"); })[0] || tabs[0];
    activate(current.dataset.day);
  }

  /* ---------- Lancement protégé ---------- */
  function start() {
    // Le reveal d'abord : priorité à la visibilité du contenu.
    try { initScrollReveal(); } catch (e) {
      var hidden = document.querySelectorAll(".reveal");
      for (var i = 0; i < hidden.length; i++) hidden[i].classList.add("is-visible");
    }
    try { initNav(); } catch (e) { /* navigation non critique */ }
    try { initProgramme(); } catch (e) { /* onglets non critiques */ }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
