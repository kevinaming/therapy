/* ===========================================================
   Plan de terapia en casa — lógica
   Todo el estado personal se guarda SOLO en este navegador
   (localStorage). Nada se envía a ningún servidor.
   =========================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "therapy_home_v1";
  var EMOJIS = ["🧸","📦","🎨","🥨","☁️","🫧","👣","🔊","🎧","🥁","🌙","🌯","⛰️","🦸","🧺","🥪","🐛","🥤","🪙","🥄","🚧","🏀","👕","🍽️","⛺","🗓️","⭐","🌈","🐢","🚗","🎈","🧩","🎵","💦","🔦","🧶"];

  // ---------- utilidades ----------
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function currentDayId() {
    // getDay: 0 = domingo ... 6 = sábado. Nuestro orden empieza en lunes.
    var idx = (new Date().getDay() + 6) % 7;
    return (state.days[idx] || state.days[0]).id;
  }
  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
    catch (e) { return null; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { console.warn("No se pudo guardar", e); }
  }

  // ---------- estado ----------
  var state;

  function buildState() {
    var base = clone(window.DEFAULT_DATA);
    var stored = readStore();
    if (stored && typeof stored === "object") {
      // Datos personales: siempre se conservan
      base.child = Object.assign(base.child, stored.child || {});
      base.log = stored.log || {};
      base.notes = stored.notes || {};
      // Contenido editado: se conserva si la versión coincide
      if (stored.version === base.version) {
        if (stored.activities) base.activities = stored.activities;
        if (stored.schedule) base.schedule = stored.schedule;
        if (stored.days) base.days = stored.days;
        if (stored.categories) base.categories = stored.categories;
        if (stored.tips) base.tips = stored.tips;
      }
    }
    base.log = base.log || {};
    base.notes = base.notes || {};
    return base;
  }

  function illoFor(act) {
    return (typeof window.buildIllo === "function") ? window.buildIllo(act) : "";
  }

  function activityById(id) {
    for (var i = 0; i < state.activities.length; i++) {
      if (state.activities[i].id === id) return state.activities[i];
    }
    return null;
  }
  function categoryById(id) {
    for (var i = 0; i < state.categories.length; i++) {
      if (state.categories[i].id === id) return state.categories[i];
    }
    return { id: id, label: id, icon: "•", color: "#ff8c42", hint: "" };
  }
  function isDone(actId, dayKey) {
    var k = dayKey || todayKey();
    return !!(state.log[k] && state.log[k][actId]);
  }
  function toggleDone(actId) {
    var k = todayKey();
    if (!state.log[k]) state.log[k] = {};
    if (state.log[k][actId]) delete state.log[k][actId];
    else state.log[k][actId] = true;
    save();
  }

  // ---------- edición ----------
  var editing = false;
  function setEditing(on) {
    editing = on;
    document.body.classList.toggle("editing", on);
    $("#editToggleText").textContent = on ? "Editando…" : "Editar";
    $("#editToggle").firstChild.textContent = on ? "✅ " : "✏️ ";
    renderAll();
  }

  // ---------- render: encabezado ----------
  function renderHero() {
    var name = state.child.name || "Nuestro peque";
    $("#childName").textContent = name;
    $("#childSub").textContent = state.child.ageNote
      ? (state.child.ageNote + " · plan personalizable")
      : "Plan personalizable";
    var av = $("#avatar");
    av.innerHTML = "";
    if (state.child.photo) {
      var img = new Image();
      img.src = state.child.photo;
      img.alt = name;
      av.appendChild(img);
    } else {
      av.textContent = "🧸";
    }
  }

  // ---------- render: tarjeta de actividad ----------
  function activityCard(act, opts) {
    opts = opts || {};
    var cat = categoryById(act.category);
    var card = el("div", "card");
    card.style.setProperty("--cat", cat.color);
    if (isDone(act.id)) card.classList.add("is-done");
    card.dataset.id = act.id;

    if (opts.illo !== false) {
      var art = illoFor(act);
      if (art) {
        var illo = el("div", "card__illo");
        illo.innerHTML = art;
        card.appendChild(illo);
      }
    }

    var head = el("button", "card__head");
    head.type = "button";
    var iconSrc = window.illoMainSrc ? window.illoMainSrc(act) : "";
    head.innerHTML =
      '<span class="card__icon">' +
        (iconSrc ? '<img alt="" src="' + iconSrc + '">' : (act.icon || cat.icon)) +
      '</span>' +
      '<span class="card__headtext">' +
        '<span class="card__title"></span>' +
        '<span class="card__meta">' +
          '<span class="card__badge">' + cat.icon + " " + esc(cat.label) + '</span>' +
          (act.duration ? '<span>⏱ ' + esc(act.duration) + '</span>' : '') +
        '</span>' +
      '</span>' +
      (opts.checkable !== false ? '<span class="card__check">✓</span>' : '') +
      '<span class="card__chevron">▼</span>';
    $(".card__title", head).textContent = act.title;

    var body = el("div", "card__body");
    body.appendChild(section("Materiales", list(act.materials, "ul")));
    body.appendChild(section("Cómo hacerlo", list(act.steps, "ol")));
    if (act.watch) body.appendChild(callout("watch", "Señales / cuidado", act.watch));
    if (act.why) body.appendChild(callout("why", "Para qué sirve", act.why));

    // Notas
    var nf = el("div", "note-field");
    var lbl = el("label", null, "Nuestras notas");
    lbl.htmlFor = "note-" + act.id;
    var ta = el("textarea");
    ta.id = "note-" + act.id;
    ta.placeholder = "¿Cómo respondió? ¿Qué funcionó? ¿Qué ajustar?";
    ta.value = state.notes[act.id] || "";
    ta.addEventListener("input", function () {
      state.notes[act.id] = ta.value;
      save();
    });
    nf.appendChild(lbl); nf.appendChild(ta);
    body.appendChild(nf);

    if (editing) {
      var editRow = el("div", "modal__row");
      var eb = el("button", null, "✏️ Editar actividad");
      eb.type = "button";
      eb.addEventListener("click", function (e) { e.stopPropagation(); openActivityEditor(act.id); });
      var db = el("button", "danger", act.custom ? "🗑 Eliminar" : "🙈 Ocultar");
      db.type = "button";
      db.addEventListener("click", function (e) {
        e.stopPropagation();
        if (act.custom) {
          if (confirm("¿Eliminar «" + act.title + "»?")) removeActivity(act.id);
        } else {
          act.hidden = true; save(); renderAll();
        }
      });
      editRow.appendChild(eb); editRow.appendChild(db);
      body.appendChild(editRow);
    }

    head.addEventListener("click", function (e) {
      if (e.target.closest(".card__check")) {
        toggleDone(act.id);
        renderToday();
        renderWeek();
        var c = document.querySelector('.card[data-id="' + act.id + '"]');
        return;
      }
      card.classList.toggle("is-open");
    });

    card.appendChild(head);
    card.appendChild(body);
    return card;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function section(title, node) {
    var s = el("div", "card__section");
    s.appendChild(el("h4", null, title));
    s.appendChild(node);
    return s;
  }
  function list(items, kind) {
    var l = el(kind || "ul");
    (items || []).forEach(function (it) { l.appendChild(el("li", null, it)); });
    if (!items || !items.length) l.appendChild(el("li", null, "—"));
    return l;
  }
  function callout(kind, title, text) {
    var c = el("div", "callout callout--" + kind);
    var inner = el("div");
    inner.appendChild(el("b", null, title));
    inner.appendChild(document.createTextNode(text));
    c.appendChild(inner);
    return c;
  }

  // ---------- render: HOY ----------
  function renderToday() {
    var dayId = currentDayId();
    var day = state.days.filter(function (d) { return d.id === dayId; })[0] || state.days[0];
    var ids = (state.schedule[dayId] || []).filter(function (id) {
      var a = activityById(id); return a && !a.hidden;
    });
    var host = $("#todayList");
    host.innerHTML = "";

    $("#todayName").textContent = day.label;
    var doneCount = ids.filter(function (id) { return isDone(id); }).length;
    var total = ids.length;

    // anillo
    var pct = total ? doneCount / total : 0;
    var circ = 2 * Math.PI * 15.9;
    $("#ringFill").setAttribute("stroke-dasharray", circ.toFixed(1) + " " + circ.toFixed(1));
    $("#ringFill").setAttribute("stroke-dashoffset", (circ * (1 - pct)).toFixed(1));
    $("#ringLabel").textContent = doneCount + "/" + total;
    $("#todayHeadline").textContent =
      total === 0 ? "Día libre 🎈" :
      doneCount === 0 ? "¡A jugar!" :
      doneCount < total ? "¡Vamos bien!" : "¡Todo hecho! 🎉";
    $("#todayHint").textContent = total ? (total + " actividades") : "";

    if (!total) {
      var e = el("div", "empty", "No hay actividades para hoy. Puedes añadir algunas en la pestaña «Semana».");
      host.appendChild(e);
      return;
    }
    ids.forEach(function (id) {
      host.appendChild(activityCard(activityById(id)));
    });
  }

  // ---------- render: SEMANA ----------
  function renderWeek() {
    var host = $("#weekList");
    host.innerHTML = "";
    var today = currentDayId();

    state.days.forEach(function (day, di) {
      var ids = state.schedule[day.id] || (state.schedule[day.id] = []);
      var visibleIds = ids.filter(function (id) { var a = activityById(id); return a && !a.hidden; });

      var block = el("div", "day-block");
      if (day.id === today) block.classList.add("is-today");

      var h = el("div", "day-block__head");
      var title = el("h3");
      title.textContent = day.label;
      if (editing) {
        title.contentEditable = "true";
        title.addEventListener("blur", function () {
          day.label = title.textContent.trim() || day.label;
          save();
        });
      }
      h.appendChild(title);
      h.appendChild(el("span", "day-block__count", visibleIds.length + ""));
      block.appendChild(h);

      ids.forEach(function (id, pos) {
        var act = activityById(id);
        if (!act || act.hidden) return;
        var cat = categoryById(act.category);
        var m = el("div", "mini");
        if (day.id === today && isDone(id)) m.classList.add("is-done");
        m.style.setProperty("--cat", cat.color);

        var src = window.illoMainSrc ? window.illoMainSrc(act) : "";
        if (src) {
          var thumb = el("span", "mini__thumb");
          var timg = new Image();
          timg.src = src; timg.alt = "";
          thumb.appendChild(timg);
          m.appendChild(thumb);
        } else {
          m.appendChild(el("span", "mini__icon", act.icon || cat.icon));
        }
        var t = el("span", "mini__title", act.title);
        m.appendChild(t);

        if (day.id === today && !editing) {
          var chk = el("span", "mini__check", isDone(id) ? "✓" : "");
          m.appendChild(chk);
        }

        if (editing) {
          var ctrls = el("span", "mini__ctrls");
          var up = el("button", null, "↑"); up.type = "button"; up.title = "Subir";
          up.disabled = pos === 0;
          up.addEventListener("click", function () { moveInDay(day.id, pos, -1); });
          var dn = el("button", null, "↓"); dn.type = "button"; dn.title = "Bajar";
          dn.disabled = pos === ids.length - 1;
          dn.addEventListener("click", function () { moveInDay(day.id, pos, 1); });
          var mv = el("button", null, "→"); mv.type = "button"; mv.title = "Mover a otro día";
          mv.addEventListener("click", function () { openMoveDay(day.id, id); });
          var rm = el("button", null, "✕"); rm.type = "button"; rm.title = "Quitar";
          rm.addEventListener("click", function () {
            state.schedule[day.id].splice(state.schedule[day.id].indexOf(id), 1);
            save(); renderWeek(); renderToday();
          });
          ctrls.appendChild(up); ctrls.appendChild(dn); ctrls.appendChild(mv); ctrls.appendChild(rm);
          m.appendChild(ctrls);
        } else {
          m.style.cursor = "pointer";
          m.addEventListener("click", function () { openDetail(id); });
        }
        block.appendChild(m);
      });

      var add = el("button", "day-add", "＋ Añadir actividad a " + day.label);
      add.type = "button";
      add.addEventListener("click", function () { openPicker(day.id); });
      block.appendChild(add);

      host.appendChild(block);
    });
  }

  function moveInDay(dayId, pos, dir) {
    var arr = state.schedule[dayId];
    var nb = pos + dir;
    if (nb < 0 || nb >= arr.length) return;
    var tmp = arr[pos]; arr[pos] = arr[nb]; arr[nb] = tmp;
    save(); renderWeek();
  }

  // ---------- render: ACTIVIDADES ----------
  var activeFilter = "todas";
  function renderCatalog() {
    var filters = $("#catFilters");
    filters.innerHTML = "";
    var mk = function (id, label, color) {
      var c = el("button", "chip", label);
      c.type = "button";
      c.setAttribute("aria-pressed", activeFilter === id ? "true" : "false");
      if (color) c.style.setProperty("--cat", color);
      c.addEventListener("click", function () { activeFilter = id; renderCatalog(); });
      return c;
    };
    filters.appendChild(mk("todas", "Todas"));
    state.categories.forEach(function (c) {
      filters.appendChild(mk(c.id, c.icon + " " + c.label, c.color));
    });

    var note = $("#catNote");
    if (activeFilter !== "todas") {
      var cat = categoryById(activeFilter);
      note.hidden = false;
      note.textContent = cat.icon + " " + cat.hint;
    } else {
      note.hidden = true;
    }

    var acts = state.activities.filter(function (a) {
      if (a.hidden && !editing) return false;
      return activeFilter === "todas" || a.category === activeFilter;
    });
    $("#actCount").textContent = acts.length + " en total";

    var host = $("#catList");
    host.innerHTML = "";
    if (!acts.length) {
      host.appendChild(el("div", "empty", "Sin actividades en esta categoría."));
      return;
    }
    acts.forEach(function (a) {
      var card = activityCard(a, { checkable: false });
      if (a.hidden) card.style.opacity = "0.5";
      host.appendChild(card);
    });
  }

  // ---------- render: TIPS ----------
  function renderTips() {
    var host = $("#tipsList");
    host.innerHTML = "";
    (state.tips || []).forEach(function (t) {
      host.appendChild(el("li", null, t));
    });
  }

  function renderAll() {
    renderHero();
    renderToday();
    renderWeek();
    renderCatalog();
    renderTips();
  }

  // ---------- modales ----------
  var backdrop = $("#modalBackdrop");
  var box = $("#modalBox");
  function openModal(html) {
    box.innerHTML = html;
    backdrop.classList.add("is-open");
  }
  function closeModal() {
    backdrop.classList.remove("is-open");
    box.innerHTML = "";
  }
  backdrop.addEventListener("click", function (e) {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // ----- Ajustes / personalización -----
  function openSettings() {
    openModal(
      '<h3>Personalizar</h3>' +
      '<p class="sub">Estos datos se guardan solo en este dispositivo.</p>' +
      '<label for="setName">Nombre del niño</label>' +
      '<input type="text" id="setName" value="' + esc(state.child.name) + '" placeholder="Su nombre" />' +
      '<label for="setAge">Nota de edad (opcional)</label>' +
      '<input type="text" id="setAge" value="' + esc(state.child.ageNote || "") + '" placeholder="Ej: 2 años" />' +
      '<label for="setPhoto">Foto (opcional)</label>' +
      '<input type="file" id="setPhoto" accept="image/*" />' +
      (state.child.photo ? '<button type="button" id="clearPhoto" style="margin-top:8px;border:none;background:transparent;color:#c23b3b;font-weight:800">Quitar foto</button>' : '') +
      '<div class="modal__row">' +
        '<button type="button" id="setSave" class="primary">Guardar</button>' +
        '<button type="button" id="setClose">Cerrar</button>' +
      '</div>' +
      '<div class="modal__row" style="margin-top:10px">' +
        '<button type="button" id="doExport">⬇️ Exportar</button>' +
        '<button type="button" id="doImport">⬆️ Importar</button>' +
      '</div>' +
      '<div class="modal__row" style="margin-top:6px">' +
        '<button type="button" id="doRestore">↺ Restaurar actividades ocultas</button>' +
      '</div>' +
      '<div class="modal__row" style="margin-top:6px">' +
        '<button type="button" id="doWipe" class="danger">Borrar todo y empezar de cero</button>' +
      '</div>' +
      '<input type="file" id="importFile" accept="application/json,.json" hidden />'
    );

    var pendingPhoto = null;
    $("#setPhoto").addEventListener("change", function () {
      var f = this.files[0];
      if (!f) return;
      resizeImage(f, 320, function (dataUrl) { pendingPhoto = dataUrl; });
    });
    if ($("#clearPhoto")) $("#clearPhoto").addEventListener("click", function () {
      state.child.photo = ""; save(); renderHero(); openSettings();
    });
    $("#setSave").addEventListener("click", function () {
      state.child.name = $("#setName").value.trim();
      state.child.ageNote = $("#setAge").value.trim();
      if (pendingPhoto) state.child.photo = pendingPhoto;
      save(); renderAll(); closeModal();
    });
    $("#setClose").addEventListener("click", closeModal);
    $("#doExport").addEventListener("click", exportData);
    $("#doImport").addEventListener("click", function () { $("#importFile").click(); });
    $("#importFile").addEventListener("change", function () {
      var f = this.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var data = JSON.parse(r.result);
          if (!data || typeof data !== "object") throw new Error("bad");
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          state = buildState();
          renderAll(); closeModal();
          alert("Datos importados ✓");
        } catch (e) { alert("No se pudo leer ese archivo."); }
      };
      r.readAsText(f);
    });
    $("#doRestore").addEventListener("click", function () {
      state.activities.forEach(function (a) { delete a.hidden; });
      save(); renderAll(); openSettings();
    });
    $("#doWipe").addEventListener("click", function () {
      if (confirm("Se borrará el nombre, la foto, las notas, el progreso y los cambios al plan. ¿Seguro?")) {
        localStorage.removeItem(STORAGE_KEY);
        state = buildState();
        renderAll(); closeModal();
      }
    });
  }

  function exportData() {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "plan-terapia-" + todayKey() + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function resizeImage(file, max, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, max / Math.max(img.width, img.height));
        var c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        cb(c.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // ----- Detalle (solo lectura) -----
  function openDetail(actId) {
    var act = activityById(actId);
    if (!act) return;
    var cat = categoryById(act.category);
    var art = illoFor(act);
    var html =
      (art ? '<div class="modal__illo">' + art + '</div>' : '') +
      '<h3>' + (act.icon || cat.icon) + " " + esc(act.title) + '</h3>' +
      '<p class="sub">' + cat.icon + " " + esc(cat.label) + (act.duration ? " · ⏱ " + esc(act.duration) : "") + '</p>' +
      '<div class="card__section"><h4>Materiales</h4><ul>' +
        (act.materials || []).map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") +
      '</ul></div>' +
      '<div class="card__section"><h4>Cómo hacerlo</h4><ol>' +
        (act.steps || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") +
      '</ol></div>' +
      (act.watch ? '<div class="callout callout--watch"><div><b>Señales / cuidado</b>' + esc(act.watch) + '</div></div>' : '') +
      (act.why ? '<div class="callout callout--why" style="margin-top:8px"><div><b>Para qué sirve</b>' + esc(act.why) + '</div></div>' : '') +
      '<div class="modal__row"><button type="button" id="detClose" class="primary">Cerrar</button></div>';
    openModal(html);
    $("#detClose").addEventListener("click", closeModal);
  }

  // ----- Editor de actividad -----
  function openActivityEditor(actId) {
    var act = actId ? activityById(actId) : {
      id: "custom-" + Date.now(),
      title: "", category: state.categories[0].id, icon: "⭐",
      duration: "", materials: [], steps: [], watch: "", why: "", custom: true
    };
    var isNew = !actId;
    var catOpts = state.categories.map(function (c) {
      return '<option value="' + c.id + '"' + (c.id === act.category ? " selected" : "") + '>' + esc(c.icon + " " + c.label) + '</option>';
    }).join("");
    openModal(
      '<h3>' + (isNew ? "Nueva actividad" : "Editar actividad") + '</h3>' +
      '<label>Título</label><input type="text" id="aTitle" value="' + esc(act.title) + '" />' +
      '<label>Categoría</label><select id="aCat">' + catOpts + '</select>' +
      '<label>Ícono</label><div class="emoji-pick" id="aEmoji"></div>' +
      '<label>Duración</label><input type="text" id="aDur" value="' + esc(act.duration || "") + '" placeholder="Ej: 5–10 min" />' +
      '<label>Materiales (uno por línea)</label><textarea id="aMat">' + esc((act.materials || []).join("\n")) + '</textarea>' +
      '<label>Pasos (uno por línea)</label><textarea id="aSteps">' + esc((act.steps || []).join("\n")) + '</textarea>' +
      '<label>Señales / cuidado</label><textarea id="aWatch">' + esc(act.watch || "") + '</textarea>' +
      '<label>Para qué sirve</label><textarea id="aWhy">' + esc(act.why || "") + '</textarea>' +
      '<div class="modal__row">' +
        '<button type="button" id="aSave" class="primary">Guardar</button>' +
        '<button type="button" id="aCancel">Cancelar</button>' +
      '</div>'
    );
    var chosen = act.icon || "⭐";
    var ep = $("#aEmoji");
    EMOJIS.forEach(function (e) {
      var b = el("button", null, e); b.type = "button";
      b.setAttribute("aria-pressed", e === chosen ? "true" : "false");
      b.addEventListener("click", function () {
        chosen = e;
        $all("button", ep).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
      });
      ep.appendChild(b);
    });
    $("#aCancel").addEventListener("click", closeModal);
    $("#aSave").addEventListener("click", function () {
      var title = $("#aTitle").value.trim();
      if (!title) { alert("Ponle un título."); return; }
      act.title = title;
      act.category = $("#aCat").value;
      act.icon = chosen;
      act.duration = $("#aDur").value.trim();
      act.materials = splitLines($("#aMat").value);
      act.steps = splitLines($("#aSteps").value);
      act.watch = $("#aWatch").value.trim();
      act.why = $("#aWhy").value.trim();
      if (isNew) {
        state.activities.push(act);
        // añadir al día de hoy para que se vea de inmediato
        var d = currentDayId();
        if (!state.schedule[d]) state.schedule[d] = [];
        state.schedule[d].push(act.id);
      }
      save(); renderAll(); closeModal();
    });
  }
  function splitLines(s) {
    return s.split("\n").map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function removeActivity(id) {
    state.activities = state.activities.filter(function (a) { return a.id !== id; });
    Object.keys(state.schedule).forEach(function (d) {
      state.schedule[d] = state.schedule[d].filter(function (x) { return x !== id; });
    });
    save(); renderAll(); closeModal();
  }

  // ----- Picker: añadir actividad a un día -----
  function openPicker(dayId) {
    var day = state.days.filter(function (d) { return d.id === dayId; })[0];
    var current = state.schedule[dayId] || [];
    var rows = state.activities.filter(function (a) { return !a.hidden; }).map(function (a) {
      var cat = categoryById(a.category);
      var inDay = current.indexOf(a.id) !== -1;
      return '<button type="button" class="chip" data-id="' + a.id + '" style="--cat:' + cat.color + ';display:block;width:100%;text-align:left;margin-top:6px"' +
        (inDay ? ' aria-pressed="true"' : '') + '>' +
        (a.icon || cat.icon) + " " + esc(a.title) + (inDay ? "  ✓" : "") + '</button>';
    }).join("");
    openModal(
      '<h3>Añadir a ' + esc(day.label) + '</h3>' +
      '<p class="sub">Toca para agregar o quitar.</p>' +
      '<div style="max-height:50vh;overflow:auto">' + rows + '</div>' +
      '<div class="modal__row"><button type="button" id="pkClose" class="primary">Listo</button></div>'
    );
    $("#pkClose").addEventListener("click", closeModal);
    $all(".chip[data-id]", box).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.id;
        var arr = state.schedule[dayId] || (state.schedule[dayId] = []);
        var i = arr.indexOf(id);
        if (i === -1) arr.push(id); else arr.splice(i, 1);
        save(); renderWeek(); renderToday();
        openPicker(dayId);
      });
    });
  }

  // ----- Mover actividad de día -----
  function openMoveDay(fromDay, actId) {
    var opts = state.days.map(function (d) {
      return '<button type="button" class="chip" data-day="' + d.id + '" style="display:block;width:100%;text-align:left;margin-top:6px"' +
        (d.id === fromDay ? ' aria-pressed="true"' : '') + '>' + esc(d.label) + '</button>';
    }).join("");
    openModal(
      '<h3>Mover a…</h3>' +
      '<div>' + opts + '</div>' +
      '<div class="modal__row"><button type="button" id="mvClose" class="primary">Cancelar</button></div>'
    );
    $("#mvClose").addEventListener("click", closeModal);
    $all(".chip[data-day]", box).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var to = btn.dataset.day;
        if (to !== fromDay) {
          state.schedule[fromDay] = state.schedule[fromDay].filter(function (x) { return x !== actId; });
          if (!state.schedule[to]) state.schedule[to] = [];
          if (state.schedule[to].indexOf(actId) === -1) state.schedule[to].push(actId);
          save(); renderWeek(); renderToday();
        }
        closeModal();
      });
    });
  }

  // ---------- confeti ----------
  var lastAllDone = false;
  function maybeConfetti() {
    var ids = (state.schedule[currentDayId()] || []).filter(function (id) {
      var a = activityById(id); return a && !a.hidden;
    });
    var all = ids.length > 0 && ids.every(function (id) { return isDone(id); });
    if (all && !lastAllDone) burst();
    lastAllDone = all;
  }
  function burst() {
    var colors = ["#ff8c42", "#4e8fd6", "#4caf7d", "#f2c14e", "#e76f72", "#8367c7"];
    for (var i = 0; i < 60; i++) {
      (function (i) {
        var c = el("div", "confetti");
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = colors[i % colors.length];
        c.style.animationDelay = (Math.random() * 0.3) + "s";
        c.style.transform = "rotate(" + Math.random() * 360 + "deg)";
        document.body.appendChild(c);
        setTimeout(function () { c.remove(); }, 1600);
      })(i);
    }
  }

  // ---------- navegación ----------
  function initTabs() {
    $all(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        $all(".tab").forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        $all(".view").forEach(function (v) { v.classList.remove("is-active"); });
        $("#view-" + tab.dataset.view).classList.add("is-active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  // ---------- arranque ----------
  function init() {
    state = buildState();
    save();
    initTabs();

    $("#openSettings").addEventListener("click", openSettings);
    $("#editToggle").addEventListener("click", function () { setEditing(!editing); });
    $("#editDone").addEventListener("click", function () { setEditing(false); });
    $("#editAddActivity").addEventListener("click", function () { openActivityEditor(null); });
    $("#editResetSchedule").addEventListener("click", function () {
      if (confirm("¿Volver al plan semanal por defecto? (No borra tus actividades ni notas)")) {
        state.schedule = clone(window.DEFAULT_DATA.schedule);
        save(); renderAll();
      }
    });

    // no disparar confeti en la primera carga
    lastAllDone = (function () {
      var ids = (state.schedule[currentDayId()] || []).filter(function (id) {
        var a = activityById(id); return a && !a.hidden;
      });
      return ids.length > 0 && ids.every(function (id) { return isDone(id); });
    })();

    // envolver renderToday para disparar confeti al completar el día
    var _rt = renderToday;
    renderToday = function () { _rt(); maybeConfetti(); };

    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
