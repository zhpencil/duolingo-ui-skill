/* ==========================================================================
   Duolingo UI — duolingo.js
   Optional behaviour layer for duolingo.css. Everything works without JS for
   static screens; this adds the interactions the real app has.

   Declarative hooks
   -----------------
   data-duo-open="sheet-id | dialog-id"   open a sheet or dialog
   data-duo-close                          close the nearest sheet/dialog
   data-duo-toast="Message"                show a toast on click
   data-duo-toast-type="success|error"     toast tone (default: neutral)
   data-duo-toast-icon="check"             sprite icon id (without #di-)
   data-duo-toast-host="phone-id"          render the toast inside that phone
   data-duo-bank                          a word bank; fills [data-duo-answer]
   .duo-switch                            toggle a button[aria-checked]
   data-duo-check                         toggle a .duo-check / --empty
   data-duo-progress="42"                 progress element, initial value
   data-duo-ring="64"                     ring element, initial value
   data-duo-slider                        range input; paints the fill

   Imperative API (window.Duo)
   ---------------------------
   Duo.open(elOrId) / Duo.close(elOrId) / Duo.closeAll()
   Duo.toast('Saved', { type: 'success', icon: 'check', duration: 2400 })
   Duo.progress(el, 72)        // sets --duo-progress-value, toggles is-complete
   Duo.ring(el, 64)            // sets --duo-ring-value
   Duo.answer(bank)            // returns the words currently placed
   ========================================================================== */
(function (global) {
  "use strict";

  var doc = global.document;
  var FOCUSABLE =
    'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  var lastFocus = null;

  function $(sel, root) {
    return (root || doc).querySelector(sel);
  }

  function $$(sel, root) {
    return Array.prototype.slice.call((root || doc).querySelectorAll(sel));
  }

  function resolve(target) {
    if (!target) return null;
    if (typeof target !== "string") return target;
    return doc.getElementById(target) || $(target);
  }

  function icon(name, className) {
    if (!name) return "";
    return (
      '<svg class="duo-icon' +
      (className ? " " + className : "") +
      '" aria-hidden="true"><use href="#di-' +
      name +
      '"></use></svg>'
    );
  }

  function hostFor(el) {
    return (el && el.closest && el.closest(".duo-phone")) || doc.body;
  }

  /* ------------------------------------------------------------------------
     Overlays: sheets, dialogs, scrims
     ---------------------------------------------------------------------- */
  var openStack = [];

  function ensureScrim(sheet) {
    var parent = sheet.parentNode;
    var scrim = sheet.__duoScrim;
    if (scrim && scrim.parentNode === parent) return scrim;
    // Reuse an explicit sibling scrim if the author provided one.
    scrim = sheet.previousElementSibling;
    if (!scrim || !scrim.classList || !scrim.classList.contains("duo-scrim")) {
      scrim = doc.createElement("div");
      scrim.className = "duo-scrim";
      scrim.setAttribute("aria-hidden", "true");
      parent.insertBefore(scrim, sheet);
      scrim.addEventListener("click", function () {
        close(sheet);
      });
    }
    sheet.__duoScrim = scrim;
    return scrim;
  }

  function focusables(container) {
    return $$(FOCUSABLE, container).filter(function (el) {
      return el.offsetParent !== null || el === doc.activeElement;
    });
  }

  function open(target) {
    var el = resolve(target);
    if (!el) return null;

    var overlay = el;
    if (el.classList.contains("duo-dialog")) {
      overlay = el.closest(".duo-dialog-scrim") || el;
    }

    if (openStack.indexOf(overlay) === -1) openStack.push(overlay);
    lastFocus = doc.activeElement;

    if (overlay.classList.contains("duo-sheet")) {
      ensureScrim(overlay).classList.add("is-open");
      if (overlay.parentNode) overlay.parentNode.style.zIndex = overlay.parentNode.style.zIndex || "";
    }

    overlay.classList.add("is-open");
    overlay.removeAttribute("aria-hidden");
    overlay.setAttribute("aria-modal", "true");

    var first = focusables(overlay)[0];
    if (first) {
      // Wait for the transform to settle before stealing focus on touch.
      setTimeout(function () {
        try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); }
      }, 60);
    }
    return overlay;
  }

  function close(target) {
    var el = resolve(target);
    if (!el) return;

    var overlay = el;
    if (el.classList.contains("duo-dialog")) {
      overlay = el.closest(".duo-dialog-scrim") || el;
    }

    if (overlay.classList.contains("duo-sheet") && overlay.__duoScrim) {
      overlay.__duoScrim.classList.remove("is-open");
    }
    if (overlay.classList.contains("duo-dialog-scrim")) {
      var sheet = $(".duo-sheet.is-open");
      if (sheet && sheet !== overlay) close(sheet);
    }

    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    overlay.removeAttribute("aria-modal");

    openStack = openStack.filter(function (o) { return o !== overlay; });
    if (!openStack.length && lastFocus && lastFocus.focus) {
      try { lastFocus.focus({ preventScroll: true }); } catch (e) { lastFocus.focus(); }
    }
  }

  function closeAll() {
    openStack.slice().forEach(close);
  }

  function topOverlay() {
    return openStack[openStack.length - 1] || null;
  }

  doc.addEventListener("keydown", function (e) {
    var top = topOverlay();
    if (!top) return;

    if (e.key === "Escape") {
      e.preventDefault();
      close(top);
      return;
    }
    if (e.key === "Tab") {
      var items = focusables(top);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && doc.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && doc.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ------------------------------------------------------------------------
     Toasts
     ---------------------------------------------------------------------- */
  function toast(message, options) {
    options = options || {};
    var host = options.host ? resolve(options.host) : doc.body;
    if (host && !host.classList.contains("duo-toast-host")) {
      var phone = host.closest && host.closest(".duo-phone");
      if (phone) host = phone;
    }
    var layer = host && host.querySelector(":scope > .duo-toast-host");
    if (!layer) {
      layer = doc.createElement("div");
      layer.className = "duo-toast-host";
      layer.setAttribute("role", "status");
      layer.setAttribute("aria-live", "polite");
      (host || doc.body).appendChild(layer);
    }

    var tone = options.type === "success" || options.type === "error" ? " duo-toast--" + options.type : "";
    var el = doc.createElement("div");
    el.className = "duo-toast" + tone;
    el.innerHTML =
      (options.icon ? icon(options.icon) : "") +
      '<span class="duo-toast__text"></span>';
    el.querySelector(".duo-toast__text").textContent = message;
    layer.appendChild(el);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add("is-open"); });
    });

    var duration = options.duration || 2400;
    var timer = setTimeout(function () {
      el.classList.remove("is-open");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 220);
    }, duration);

    el.addEventListener("click", function () {
      clearTimeout(timer);
      el.classList.remove("is-open");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 220);
    });

    return el;
  }

  /* ------------------------------------------------------------------------
     Progress + ring
     ---------------------------------------------------------------------- */
  function progress(el, value) {
    el = resolve(el);
    if (!el) return;
    var v = Math.max(0, Math.min(100, Number(value) || 0));
    el.style.setProperty("--duo-progress-value", v);
    el.classList.toggle("is-complete", v >= 100);
    var label = $(".duo-progress__label", el);
    if (label && label.hasAttribute("data-duo-progress-label")) {
      label.textContent = Math.round(v) + "%";
    }
    el.setAttribute("aria-valuenow", String(Math.round(v)));
    return v;
  }

  function ring(el, value) {
    el = resolve(el);
    if (!el) return;
    var v = Math.max(0, Math.min(100, Number(value) || 0));
    el.style.setProperty("--duo-ring-value", v);
    return v;
  }

  /* ------------------------------------------------------------------------
     Word bank → answer line
     ---------------------------------------------------------------------- */
  function bankScope(bank) {
    return bank.closest("[data-duo-exercise]") || bank.parentNode || doc;
  }

  function answerLine(bank) {
    var scope = bankScope(bank);
    return $("[data-duo-answer]", scope) || $("[data-duo-answer]", doc);
  }

  function placeWord(word) {
    var bank = word.closest("[data-duo-bank]");
    if (!bank || word.classList.contains("duo-word--used")) return;
    var line = answerLine(bank);
    if (!line) return;

    var placed = doc.createElement("button");
    placed.type = "button";
    placed.className = "duo-word duo-word--placed duo-pop";
    placed.textContent = word.textContent;
    placed.setAttribute("data-from", word.getAttribute("data-word") || word.textContent);
    placed.setAttribute("aria-label", "Remove " + placed.textContent);
    line.appendChild(placed);

    word.classList.add("duo-word--used");
    word.setAttribute("aria-hidden", "true");
    word.tabIndex = -1;

    line.dispatchEvent(new CustomEvent("duo:place", {
      bubbles: true,
      detail: { word: placed.textContent, bank: bank, line: line }
    }));
  }

  function removeWord(placed) {
    var line = placed.closest("[data-duo-answer]");
    if (!line) return;
    var bank = $("[data-duo-bank]", bankScope(line));
    var original = bank && $('[data-word="' + placed.getAttribute("data-from") + '"]', bank);
    if (original) {
      original.classList.remove("duo-word--used");
      original.removeAttribute("aria-hidden");
      original.removeAttribute("tabindex");
    }
    placed.remove();
    line.dispatchEvent(new CustomEvent("duo:remove", {
      bubbles: true,
      detail: { word: placed.textContent, line: line }
    }));
  }

  function answer(bank) {
    var line = answerLine(resolve(bank));
    if (!line) return [];
    return $$(".duo-word--placed", line).map(function (w) {
      return w.textContent;
    });
  }

  function resetAnswer(bank) {
    var line = answerLine(resolve(bank));
    if (!line) return;
    $$(".duo-word--placed", line).forEach(function (w) { w.remove(); });
    var scope = bankScope(resolve(bank));
    $$(".duo-word--used", scope).forEach(function (w) {
      w.classList.remove("duo-word--used");
      w.removeAttribute("aria-hidden");
      w.removeAttribute("tabindex");
    });
  }

  /* ------------------------------------------------------------------------
     Switches, checks, sliders, presses
     ---------------------------------------------------------------------- */
  function bindSwitch(el) {
    el.addEventListener("click", function () {
      var on = el.getAttribute("aria-checked") === "true";
      el.setAttribute("aria-checked", String(!on));
      el.dispatchEvent(new CustomEvent("duo:switch", {
        bubbles: true,
        detail: { checked: !on }
      }));
    });
  }

  function bindCheck(el) {
    el.addEventListener("click", function () {
      el.classList.toggle("duo-check--empty");
    });
  }

  function bindSlider(el) {
    function paint() {
      var min = Number(el.min || 0);
      var max = Number(el.max || 100);
      var value = Number(el.value || 0);
      var pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
      el.style.setProperty("--duo-slider-value", pct + "%");
    }
    el.addEventListener("input", paint);
    paint();
  }

  function addPressFeedback(el) {
    var pressed = false;
    function down() {
      if (pressed) return;
      pressed = true;
      el.classList.add("is-pressed");
    }
    function up() {
      if (!pressed) return;
      pressed = false;
      el.classList.remove("is-pressed");
    }
    el.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") down();
    });
    el.addEventListener("keyup", up);
    el.addEventListener("blur", up);
  }

  /* ------------------------------------------------------------------------
     Global delegation for data-* hooks
     ---------------------------------------------------------------------- */
  doc.addEventListener("click", function (e) {
    var t = e.target;

    var opener = t.closest("[data-duo-open]");
    if (opener) {
      e.preventDefault();
      open(opener.getAttribute("data-duo-open"));
      return;
    }

    var closer = t.closest("[data-duo-close]");
    if (closer) {
      e.preventDefault();
      var overlay = closer.closest(".duo-sheet") || closer.closest(".duo-dialog-scrim");
      close(overlay || topOverlay());
      return;
    }

    var toastBtn = t.closest("[data-duo-toast]");
    if (toastBtn) {
      e.preventDefault();
      toast(toastBtn.getAttribute("data-duo-toast"), {
        type: toastBtn.getAttribute("data-duo-toast-type") || undefined,
        icon: toastBtn.getAttribute("data-duo-toast-icon") || undefined,
        duration: Number(toastBtn.getAttribute("data-duo-toast-duration")) || undefined,
        host: toastBtn.getAttribute("data-duo-toast-host") || toastBtn.closest(".duo-phone") || undefined
      });
      return;
    }

    var word = t.closest(".duo-word");
    if (word) {
      e.preventDefault();
      if (word.classList.contains("duo-word--placed")) removeWord(word);
      else if (word.closest("[data-duo-bank]")) placeWord(word);
    }
  });

  doc.addEventListener("click", function (e) {
    // Scrims created by the author (not by ensureScrim) also close their sheet.
    var scrim = e.target.closest(".duo-scrim");
    if (!scrim) return;
    var next = scrim.nextElementSibling;
    if (next && next.classList.contains("duo-sheet")) close(next);
  });

  /* ------------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  function init(root) {
    root = root || doc;

    $$("[data-duo-open]", root).forEach(function (el) {
      if (el.tagName === "BUTTON" && !el.getAttribute("type")) el.type = "button";
    });

    $$(".duo-sheet, .duo-dialog-scrim", root).forEach(function (el) {
      if (!el.hasAttribute("aria-hidden")) el.setAttribute("aria-hidden", "true");
    });

    $$(".duo-switch", root).forEach(function (el) {
      if (el.__duoBound) return;
      el.__duoBound = true;
      if (!el.hasAttribute("type")) el.setAttribute("type", "button");
      if (el.tagName === "BUTTON" && !el.hasAttribute("role")) el.setAttribute("role", "switch");
      bindSwitch(el);
    });

    $$("[data-duo-check]", root).forEach(function (el) {
      if (el.__duoBound) return;
      el.__duoBound = true;
      bindCheck(el);
    });

    $$("input.duo-slider[type='range'], input[data-duo-slider][type='range']", root).forEach(function (el) {
      if (el.__duoBound) return;
      el.__duoBound = true;
      bindSlider(el);
    });

    $$(".duo-btn, .duo-choice, .duo-course, .duo-node, .duo-word", root).forEach(function (el) {
      if (el.__duoBound) return;
      el.__duoBound = true;
      addPressFeedback(el);
    });

    $$("[data-duo-progress]", root).forEach(function (el) {
      progress(el, el.getAttribute("data-duo-progress"));
    });

    $$("[data-duo-ring]", root).forEach(function (el) {
      ring(el, el.getAttribute("data-duo-ring"));
    });
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", function () { init(doc); });
  } else {
    init(doc);
  }

  global.Duo = {
    init: init,
    open: open,
    close: close,
    closeAll: closeAll,
    toast: toast,
    progress: progress,
    ring: ring,
    answer: answer,
    resetAnswer: resetAnswer,
    icon: icon
  };
})(window);
