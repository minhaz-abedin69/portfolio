(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Sticky header shadow/border on scroll
     --------------------------------------------------------------------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");

  function closeMobileNav() {
    if (!navToggle || !navMobile) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    navMobile.classList.remove("open");
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      navMobile.classList.toggle("open", !isOpen);
    });

    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });
  }

  /* ---------------------------------------------------------------------
     Active nav link highlighting based on visible section
     --------------------------------------------------------------------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", match);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal animations
     --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (index % 4) * 80;
            setTimeout(function () {
              el.classList.add("is-visible");
            }, delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Contact form — submits to Web3Forms (no backend of my own needed)
     --------------------------------------------------------------------- */
  var contactForm = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");
  var submitBtn = document.getElementById("contactSubmitBtn");

  if (contactForm && formNote && submitBtn) {
    var defaultNote = formNote.textContent;
    var defaultBtnText = submitBtn.textContent;

    function setNote(text, color) {
      formNote.textContent = text;
      formNote.style.color = color || "";
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: if this hidden checkbox got checked, silently drop it (bot).
      var honeypot = contactForm.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        contactForm.reset();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      setNote("Sending your message…");

      var formData = new FormData(contactForm);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result.success) {
            setNote("Thanks! Your message has been sent — I'll get back to you soon.", "var(--accent-2)");
            contactForm.reset();
          } else {
            setNote("Something went wrong sending your message. Please try emailing me directly at the address above.", "#ff5f7a");
          }
        })
        .catch(function () {
          setNote("Couldn't send right now — please email me directly at the address above.", "#ff5f7a");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = defaultBtnText;
          setTimeout(function () { setNote(defaultNote); }, 8000);
        });
    });
  }
})();
