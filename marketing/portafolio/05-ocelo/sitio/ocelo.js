// Ocelo · concepto de SpindleLab. Sin dependencias y sin peticiones a terceros.
(() => {
  const raiz = document.documentElement;
  const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- El interruptor de luz ----
  const botones = document.querySelectorAll("[data-luz]");
  const pintar = () => {
    const encendida = raiz.dataset.luz === "encendida";
    botones.forEach((b) => {
      b.setAttribute("aria-pressed", String(encendida));
      const t = b.querySelector(".luz-txt");
      if (t) t.textContent = encendida ? "Apagar la luz" : "Encender la luz";
    });
  };
  const fijar = (encendida) => {
    if (encendida) raiz.dataset.luz = "encendida";
    else delete raiz.dataset.luz;
    try { localStorage.setItem("ocelo-luz", encendida ? "1" : "0"); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    pintar();
  };
  botones.forEach((b) =>
    b.addEventListener("click", () => {
      const encender = raiz.dataset.luz !== "encendida";
      if (quieto) { fijar(encender); return; }
      raiz.classList.add("cambiando");
      requestAnimationFrame(() => fijar(encender));
      setTimeout(() => raiz.classList.remove("cambiando"), 700);
    })
  );
  pintar();

  // ---- El comparador: pestañas ----
  const lista = document.querySelector('[role="tablist"]');
  if (lista) {
    const tabs = [...lista.querySelectorAll('[role="tab"]')];
    const activar = (tab, foco) => {
      tabs.forEach((t) => {
        const sel = t === tab;
        t.setAttribute("aria-selected", String(sel));
        t.tabIndex = sel ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !sel;
      });
      if (foco) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => activar(t, false));
      t.addEventListener("keydown", (ev) => {
        if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
        ev.preventDefault();
        const j = (i + (ev.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
        activar(tabs[j], true);
      });
    });
    // Desde la carta: la fila LENTE abre la segunda comparación
    document.querySelectorAll("[data-comparar]").forEach((a) =>
      a.addEventListener("click", () => {
        const t = document.getElementById(a.dataset.comparar);
        if (t) activar(t, false);
      })
    );
  }

  // ---- El formulario: es un concepto y no envía nada ----
  const form = document.querySelector("form[data-concepto]");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      let primero = null;
      form.querySelectorAll("[data-requerido]").forEach((input) => {
        const err = document.getElementById(input.getAttribute("aria-describedby").split(" ").find((id) => id.startsWith("err-")));
        const vacio = input.value.trim() === "";
        input.setAttribute("aria-invalid", String(vacio));
        err.hidden = !vacio;
        if (vacio && !primero) primero = input;
      });
      const ok = form.querySelector(".confirmacion");
      if (primero) { ok.hidden = true; primero.focus(); return; }
      ok.hidden = false;
      ok.focus();
    });
  }

  // ---- Interior: el índice marca el paso que se está leyendo ----
  const enlaces = [...document.querySelectorAll(".indice a")];
  if (enlaces.length && "IntersectionObserver" in window) {
    const porId = new Map(enlaces.map((a) => [a.hash.slice(1), a]));
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          enlaces.forEach((a) => a.removeAttribute("aria-current"));
          const a = porId.get(e.target.id);
          if (a) a.setAttribute("aria-current", "step");
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    porId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
