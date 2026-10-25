
(function () {
  var header = document.querySelector("header");
  var toggle = document.querySelector('button[aria-controls="mobile-nav"]');
  var panel = document.getElementById("mobile-nav");
  var isOpen = false;

  function syncHeader() {
    if (!header) return;
    var solid = isOpen || window.scrollY > 24;
    header.classList.toggle("border-border", solid);
    header.classList.toggle("bg-background/90", solid);
    header.classList.toggle("backdrop-blur-md", solid);
    header.classList.toggle("border-transparent", !solid);
    header.classList.toggle("bg-transparent", !solid);
  }

  if (toggle && panel) {
    var bars = toggle.querySelectorAll("span");

    var setOpen = function (open) {
      isOpen = open;
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (bars[0]) {
        bars[0].classList.toggle("rotate-45", open);
        bars[0].classList.toggle("-translate-y-1", !open);
      }
      if (bars[1]) {
        bars[1].classList.toggle("-rotate-45", open);
        bars[1].classList.toggle("translate-y-1", !open);
      }
      document.body.style.overflow = open ? "hidden" : "";
      syncHeader();
    };

    toggle.addEventListener("click", function () {
      setOpen(panel.hidden);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768 && !panel.hidden) setOpen(false);
    });

    setOpen(false);
  }

  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();
})();
