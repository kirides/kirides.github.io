// Accessible tabs (WAI-ARIA tabs pattern, automatic activation).
// Without JavaScript the tab bar stays hidden and every panel is shown.
(function () {
  "use strict";

  var tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (tab) {
    return document.getElementById(tab.getAttribute("aria-controls"));
  });

  document.documentElement.classList.add("js");
  tablist.hidden = false;

  function select(index, opts) {
    opts = opts || {};
    tabs.forEach(function (tab, i) {
      var on = i === index;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    if (opts.focus) tabs[index].focus();
    if (opts.updateHash) {
      try {
        history.replaceState(null, "", "#" + panels[index].id);
      } catch (e) { /* ignore (e.g. file://) */ }
    }
  }

  function indexForHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    for (var i = 0; i < panels.length; i++) {
      if (panels[i].id === id) return i;
    }
    return 0;
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () {
      select(i, { updateHash: true });
    });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      switch (e.key) {
        case "ArrowRight": next = (i + 1) % tabs.length; break;
        case "ArrowLeft": next = (i - 1 + tabs.length) % tabs.length; break;
        case "Home": next = 0; break;
        case "End": next = tabs.length - 1; break;
      }
      if (next !== null) {
        e.preventDefault();
        select(next, { focus: true, updateHash: true });
      }
    });
  });

  window.addEventListener("hashchange", function () {
    select(indexForHash());
  });

  select(indexForHash());

  // A deep link like #tooling should open that tab, not jump past the header.
  if (location.hash) {
    window.addEventListener("load", function () {
      if (document.activeElement && document.activeElement.getAttribute("role") === "tabpanel") {
        document.activeElement.blur();
      }
      window.scrollTo(0, 0);
    });
  }
})();
