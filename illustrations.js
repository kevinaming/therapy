/* ===========================================================
   Ilustraciones de las actividades
   Se usan íconos de OpenMoji (https://openmoji.org) — set open source
   con estilo de silueta y contorno, licencia CC BY-SA 4.0.
   Los SVG están en assets/openmoji/ (funciona sin internet).
   Aquí solo se mapea cada actividad a 1–2 íconos.
   =========================================================== */

(function () {
  "use strict";

  var PATH = "assets/openmoji/";

  // actividad -> [ícono principal, ícono secundario opcional]
  var SCENE = {
    "caja-texturas":   ["1F4E6", "2728"],
    "pintura-bolsa":   ["1F3A8"],
    "masa":            ["1F968"],
    "espuma-afeitar":  ["2601", "1FA9E"],
    "lavar-juguetes":  ["1F986", "1FAE7"],
    "camino-texturas": ["1F463"],
    "botellas-sonido": ["1F50A", "1F3B5"],
    "adivina-sonido":  ["1F442", "1F50A"],
    "banda-musical":   ["1F941", "1F3B5"],
    "columpio-manta":  ["1F476", "1F319"],
    "taquito-rodar":   ["1F32F"],
    "saltos-cojines":  ["1F938"],
    "pelota-suiza":    ["1F3D0", "1F9B8"],
    "canasta-pesada":  ["1F9FA", "1F4DA"],
    "empujar-caja":    ["1F4E6", "1F4AA"],
    "abrazo-sandwich": ["1F96A"],
    "tunel-animales":  ["1F41B"],
    "soplar":          ["1FAE7", "1F32C"],
    "sorber-morder":   ["1F964"],
    "meter-sacar":     ["1FA99", "1F9E9"],
    "trasvasar":       ["1F944", "1F58D"],
    "circuito":        ["1F6A7", "1F3C3"],
    "lanzar-encestar": ["1F3C0"],
    "vestirse":        ["1F455"],
    "comer-recoger":   ["1F37D", "1F9F8"],
    "rincon-calma":    ["26FA", "1F9F8"],
    "rutina-visual":   ["1F5D3"]
  };

  var BYCAT = {
    tactil: ["1FAE7"], auditivo: ["1F50A"], movimiento: ["1F938"],
    pesado: ["1F4AA"], oral: ["1F32C"], fina: ["1F58D"],
    gruesa: ["1F3C3"], avd: ["1F455"], calma: ["1F319"]
  };

  function codes(act) {
    if (!act) return null;
    return SCENE[act.id] || BYCAT[act.category] || null;
  }

  // Devuelve el HTML de la ilustración (panel claro + 1–2 íconos)
  window.buildIllo = function (act) {
    var cs = codes(act);
    if (!cs) return "";
    var main = '<img class="illo__main" alt="" src="' + PATH + cs[0] + '.svg">';
    var extra = cs[1] ? '<img class="illo__extra" alt="" src="' + PATH + cs[1] + '.svg">' : "";
    return '<div class="illo">' + main + extra + '</div>';
  };

  // Ruta del ícono principal (para miniaturas)
  window.illoMainSrc = function (act) {
    var cs = codes(act);
    return cs ? PATH + cs[0] + ".svg" : "";
  };
})();
