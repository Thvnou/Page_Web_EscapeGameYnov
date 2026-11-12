/* ==========================================================================
   Illustrations SVG des produits
   --------------------------------------------------------------------------
   Pas de vraies photos : chaque produit est dessiné en SVG directement dans
   la page (aucun fichier externe, fonctionne hors ligne).
   Utilisation : dessinProduit("fiole", "#5f8a7c") renvoie une chaîne SVG.
   On évite volontairement les dégradés avec id (risque de doublons quand
   plusieurs dessins sont sur la même page) : les halos sont faits avec des
   cercles semi-transparents.
   ========================================================================== */

/* Halo lumineux commun à tous les dessins, derrière l'objet */
function haloSVG(cx, cy, couleur) {
  return `
    <circle cx="${cx}" cy="${cy}" r="70" fill="${couleur}" opacity="0.05"/>
    <circle cx="${cx}" cy="${cy}" r="50" fill="${couleur}" opacity="0.06"/>
    <circle cx="${cx}" cy="${cy}" r="30" fill="${couleur}" opacity="0.07"/>`;
}

/* Ombre au sol, sous l'objet */
function ombreSVG(y) {
  return `<ellipse cx="100" cy="${y}" rx="52" ry="7" fill="#000" opacity="0.45"/>`;
}

/* Un dessin par type d'objet */
const DESSINS = {

  /* Bougie posée sur un bougeoir, flamme animée (classe .flamme) */
  bougie: (t) => `
    ${haloSVG(100, 62, "#f2b35a")}
    ${ombreSVG(176)}
    <ellipse cx="100" cy="170" rx="44" ry="8" fill="#2a2420"/>
    <path d="M62 170 Q100 152 138 170 Z" fill="#3a3129"/>
    <rect x="78" y="84" width="44" height="80" rx="3" fill="${t}" stroke="#000" stroke-opacity=".35"/>
    <path d="M78 88 q0 18 5 22 q5-3 5-16 q4 26 9 10 q3-8 6 2 q4 10 7-8 q4 14 7 4 q2-6 5-6 V84 H78 Z"
          fill="${t}" stroke="#fff" stroke-opacity=".08"/>
    <line x1="100" y1="84" x2="100" y2="74" stroke="#111" stroke-width="2"/>
    <g class="flamme">
      <path d="M100 40 C90 56 92 70 100 75 C108 70 110 56 100 40 Z" fill="#e9a94b"/>
      <path d="M100 54 C96 62 96 70 100 73 C104 70 104 62 100 54 Z" fill="#fbe7b0"/>
    </g>`,

  /* Livre épais avec fermoir et symbole sur la couverture */
  grimoire: (t) => `
    ${haloSVG(100, 100, "#c9a96a")}
    ${ombreSVG(170)}
    <path d="M52 50 L148 44 L152 160 L56 166 Z" fill="#e2d6b8" opacity=".85"/>
    <path d="M46 48 L144 40 L148 158 L50 164 Z" fill="${t}" stroke="#000" stroke-opacity=".5"/>
    <path d="M46 48 L56 47 L60 163 L50 164 Z" fill="#000" opacity=".35"/>
    <rect x="140" y="92" width="16" height="16" rx="2" fill="#a8874a"/>
    <circle cx="100" cy="100" r="24" fill="none" stroke="#a8874a" stroke-width="2" opacity=".8"/>
    <path d="M100 80 L118 112 L82 112 Z" fill="none" stroke="#a8874a" stroke-width="2" opacity=".8"/>
    <circle cx="100" cy="102" r="4" fill="#a8874a" opacity=".8"/>`,

  /* Herbier : variante du livre avec une feuille sur la couverture */
  herbier: (t) => `
    ${haloSVG(100, 100, "#9fb58a")}
    ${ombreSVG(170)}
    <path d="M52 50 L148 44 L152 160 L56 166 Z" fill="#e2d6b8" opacity=".85"/>
    <path d="M46 48 L144 40 L148 158 L50 164 Z" fill="${t}" stroke="#000" stroke-opacity=".5"/>
    <path d="M46 48 L56 47 L60 163 L50 164 Z" fill="#000" opacity=".35"/>
    <rect x="74" y="66" width="52" height="68" fill="none" stroke="#c9b98f" stroke-width="1.5" opacity=".7"/>
    <path d="M100 126 C80 112 82 86 100 74 C118 86 120 112 100 126 Z" fill="#7d9467" opacity=".85"/>
    <path d="M100 128 V78 M100 96 L90 88 M100 106 L111 97 M100 116 L91 109" stroke="#3d4a35" stroke-width="1.5"/>`,

  /* Fiole ronde avec bouchon de liège et liquide */
  fiole: (t) => `
    ${haloSVG(100, 112, t)}
    ${ombreSVG(176)}
    <rect x="88" y="34" width="24" height="16" rx="3" fill="#8a6a45"/>
    <path d="M86 48 h28 l-2 6 h-24 Z" fill="#6b1a22"/>
    <path d="M90 54 h20 v28 C134 90 144 112 138 134 C130 162 70 162 62 134 C56 112 66 90 90 82 Z"
          fill="#cfe0da" fill-opacity=".12" stroke="#cfe0da" stroke-opacity=".5" stroke-width="2"/>
    <path d="M63 124 C80 116 120 132 137 122 C138 140 128 160 100 160 C72 160 60 142 63 124 Z"
          fill="${t}" opacity=".85"/>
    <circle cx="88" cy="140" r="3" fill="#fff" opacity=".35"/>
    <circle cx="106" cy="132" r="2" fill="#fff" opacity=".3"/>
    <circle cx="116" cy="146" r="2.5" fill="#fff" opacity=".25"/>
    <path d="M76 104 C72 112 72 120 74 126" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"/>`,

  /* Petit flacon d'encre et plume */
  encre: (t) => `
    ${haloSVG(100, 110, "#a09080")}
    ${ombreSVG(170)}
    <path d="M126 30 C150 50 140 100 104 136 L100 132 C120 100 128 60 126 30 Z" fill="#d8cbb0" opacity=".85"/>
    <path d="M126 30 L102 134" stroke="#8c7a5b" stroke-width="1.5"/>
    <rect x="84" y="96" width="32" height="14" rx="2" fill="#3a3129"/>
    <path d="M70 110 h60 v44 q0 12 -12 12 h-36 q-12 0 -12 -12 Z" fill="${t}" stroke="#d8cbb0" stroke-opacity=".3" stroke-width="2"/>
    <rect x="80" y="124" width="40" height="22" fill="#d8cbb0" opacity=".75"/>
    <path d="M86 132 h28 M90 138 h20" stroke="#4a1c1f" stroke-width="1.5"/>`,

  /* Chevalière vue de trois quarts */
  bague: (t) => `
    ${haloSVG(100, 100, t)}
    ${ombreSVG(166)}
    <ellipse cx="100" cy="122" rx="46" ry="34" fill="none" stroke="${t}" stroke-width="12"/>
    <ellipse cx="100" cy="122" rx="46" ry="34" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="2"/>
    <ellipse cx="100" cy="84" rx="30" ry="18" fill="${t}"/>
    <ellipse cx="100" cy="82" rx="24" ry="13" fill="#2a2018"/>
    <path d="M88 84 q6 -10 14 -6 q6 -6 10 2 q-6 0 -8 6 q-6 -4 -16 -2 Z" fill="${t}" opacity=".9"/>`,

  /* Sablier en bois */
  sablier: (t) => `
    ${haloSVG(100, 100, "#c9a96a")}
    ${ombreSVG(174)}
    <rect x="58" y="30" width="84" height="12" rx="3" fill="#3a2a1c"/>
    <rect x="58" y="158" width="84" height="12" rx="3" fill="#3a2a1c"/>
    <rect x="64" y="42" width="6" height="116" fill="#3a2a1c"/>
    <rect x="130" y="42" width="6" height="116" fill="#3a2a1c"/>
    <path d="M76 42 h48 C124 76 106 90 102 100 C106 110 124 124 124 158 h-48 C76 124 94 110 98 100 C94 90 76 76 76 42 Z"
          fill="#d8e0dc" fill-opacity=".1" stroke="#d8e0dc" stroke-opacity=".45" stroke-width="1.5"/>
    <path d="M86 62 h28 C110 78 102 88 100 96 C98 88 90 78 86 62 Z" fill="${t}"/>
    <path d="M100 100 V140" stroke="${t}" stroke-width="1.2" stroke-dasharray="2 3"/>
    <path d="M80 156 C86 138 114 138 120 156 Z" fill="${t}"/>`,

  /* Grande clé ancienne */
  cle: (t) => `
    ${haloSVG(100, 100, "#a09080")}
    ${ombreSVG(160)}
    <g transform="rotate(-30 100 100)">
      <circle cx="56" cy="100" r="24" fill="none" stroke="${t}" stroke-width="9"/>
      <circle cx="56" cy="100" r="8" fill="none" stroke="${t}" stroke-width="4"/>
      <rect x="78" y="95" width="88" height="10" rx="2" fill="${t}"/>
      <rect x="140" y="105" width="8" height="18" fill="${t}"/>
      <rect x="154" y="105" width="8" height="12" fill="${t}"/>
      <rect x="84" y="91" width="6" height="18" rx="2" fill="${t}"/>
      <circle cx="120" cy="99" r="2" fill="#000" opacity=".4"/>
    </g>`,

  /* Miroir à main ovale */
  miroir: (t) => `
    ${haloSVG(100, 84, "#cfe0da")}
    ${ombreSVG(178)}
    <rect x="94" y="120" width="12" height="52" rx="5" fill="#5c5650"/>
    <circle cx="100" cy="174" r="7" fill="#5c5650"/>
    <ellipse cx="100" cy="78" rx="44" ry="52" fill="#5c5650"/>
    <ellipse cx="100" cy="78" rx="36" ry="44" fill="${t}" opacity=".55"/>
    <ellipse cx="100" cy="78" rx="36" ry="44" fill="#0e1312" opacity=".45"/>
    <path d="M78 54 C84 44 94 40 102 40" stroke="#fff" stroke-opacity=".35" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="112" cy="96" r="3" fill="#000" opacity=".3"/>
    <circle cx="86" cy="104" r="2" fill="#000" opacity=".3"/>`,

  /* Médaillon ouvrant sur sa chaîne */
  medaillon: (t) => `
    ${haloSVG(100, 112, t)}
    ${ombreSVG(176)}
    <path d="M44 24 C50 70 80 82 100 84 C120 82 150 70 156 24" fill="none" stroke="${t}" stroke-width="2.5" stroke-dasharray="4 3"/>
    <circle cx="100" cy="86" r="6" fill="none" stroke="${t}" stroke-width="3"/>
    <ellipse cx="100" cy="124" rx="34" ry="40" fill="${t}"/>
    <ellipse cx="100" cy="124" rx="26" ry="32" fill="#2a2018"/>
    <ellipse cx="100" cy="116" rx="9" ry="11" fill="#d8cbb0" opacity=".12"/>
    <path d="M84 148 C86 132 114 132 116 148 Z" fill="#d8cbb0" opacity=".12"/>`,

  /* Clochette avec son ruban */
  cloche: (t) => `
    ${haloSVG(100, 104, t)}
    ${ombreSVG(174)}
    <path d="M100 18 V42" stroke="#111" stroke-width="5"/>
    <path d="M92 20 C80 30 82 38 100 40 C118 38 120 30 108 20" fill="none" stroke="#111" stroke-width="4"/>
    <circle cx="100" cy="48" r="8" fill="none" stroke="${t}" stroke-width="4"/>
    <path d="M100 54 C70 54 66 84 64 112 C62 134 50 140 46 148 H154 C150 140 138 134 136 112 C134 84 130 54 100 54 Z" fill="${t}"/>
    <path d="M84 70 C76 86 76 110 74 130" stroke="#fff" stroke-opacity=".2" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="44" y="146" width="112" height="8" rx="3" fill="#000" opacity=".3"/>
    <circle cx="100" cy="162" r="8" fill="${t}"/>`
};

/**
 * Renvoie le SVG complet d'un produit.
 * @param {string} type   clé de DESSINS (ex. "bougie")
 * @param {string} teinte couleur principale
 * @param {string} titre  texte alternatif pour l'accessibilité
 */
function dessinProduit(type, teinte, titre) {
  const dessin = DESSINS[type] || DESSINS.fiole; // dessin par défaut si type inconnu
  return `<svg viewBox="0 0 200 200" role="img" aria-label="${titre || ""}" xmlns="http://www.w3.org/2000/svg">${dessin(teinte)}</svg>`;
}
