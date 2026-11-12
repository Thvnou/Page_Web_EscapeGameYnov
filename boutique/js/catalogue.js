/* ==========================================================================
   Le Comptoir des Ombres — Page catalogue
   --------------------------------------------------------------------------
   - Affiche tous les produits de data/products.js
   - Filtre par rubrique, recherche texte, tri par prix ou par nom
   - La rubrique choisie peut venir de l'URL : catalogue.html?rubrique=bijoux
   Dépend de main.js (carteProduitHTML) et de illustrations.js.
   ========================================================================== */

(() => {
  const formulaire = document.querySelector("[data-filtres]");
  const grille = document.querySelector("[data-catalogue]");
  if (!formulaire || !grille || typeof PRODUITS === "undefined") return;

  const zonePuces = formulaire.querySelector("[data-puces-categories]");
  const champRecherche = formulaire.elements.recherche;
  const champTri = formulaire.elements.tri;
  const compte = document.querySelector("[data-compte]");
  const vide = document.querySelector("[data-catalogue-vide]");

  const etat = { rubrique: "toutes", recherche: "", tri: "defaut" };

  /* Rubrique de départ lue dans l'URL, si elle existe */
  const depuisURL = new URLSearchParams(location.search).get("rubrique");
  if (CATEGORIES.some((c) => c.id === depuisURL)) etat.rubrique = depuisURL;

  /* Enlève accents et majuscules pour une recherche tolérante */
  function normaliser(texte) {
    return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  /* Boutons de rubriques avec le nombre d'articles de chacune */
  function construirePuces() {
    const rubriques = [{ id: "toutes", nom: "Tout" }, ...CATEGORIES];
    zonePuces.innerHTML = rubriques.map((r) => {
      const n = r.id === "toutes"
        ? PRODUITS.length
        : PRODUITS.filter((p) => p.categorie === r.id).length;
      return `
        <button class="puce" type="button" data-rubrique="${r.id}" aria-pressed="${r.id === etat.rubrique}">
          ${r.nom} <span class="puce-nombre">${n}</span>
        </button>`;
    }).join("");
  }

  function produitsVisibles() {
    const motif = normaliser(etat.recherche.trim());
    const liste = PRODUITS.filter((p) => {
      if (etat.rubrique !== "toutes" && p.categorie !== etat.rubrique) return false;
      if (!motif) return true;
      return normaliser(`${p.nom} ${p.description} ${p.details}`).includes(motif);
    });

    if (etat.tri === "prix-asc") liste.sort((a, b) => a.prix - b.prix);
    if (etat.tri === "prix-desc") liste.sort((a, b) => b.prix - a.prix);
    if (etat.tri === "nom") liste.sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
    return liste;
  }

  function afficher() {
    const liste = produitsVisibles();
    grille.innerHTML = liste.map(carteProduitHTML).join("");
    vide.hidden = liste.length > 0;
    compte.textContent = liste.length === 0
      ? "Aucun article ne correspond."
      : `${liste.length} article${liste.length > 1 ? "s" : ""} sur l'étagère`;

    zonePuces.querySelectorAll("[data-rubrique]").forEach((b) => {
      b.setAttribute("aria-pressed", b.dataset.rubrique === etat.rubrique);
    });
  }

  /* Garde la rubrique dans l'URL (lien partageable), sans recharger la page */
  function majURL() {
    try {
      const url = new URL(location.href);
      if (etat.rubrique === "toutes") url.searchParams.delete("rubrique");
      else url.searchParams.set("rubrique", etat.rubrique);
      history.replaceState(null, "", url);
    } catch (e) {
      /* page ouverte en fichier local (file://) : on ne touche pas à l'URL */
    }
  }

  zonePuces.addEventListener("click", (e) => {
    const bouton = e.target.closest("[data-rubrique]");
    if (!bouton) return;
    etat.rubrique = bouton.dataset.rubrique;
    afficher();
    majURL();
  });

  champRecherche.addEventListener("input", () => {
    etat.recherche = champRecherche.value;
    afficher();
  });

  champTri.addEventListener("change", () => {
    etat.tri = champTri.value;
    afficher();
  });

  /* Entrée dans la recherche ne doit pas recharger la page */
  formulaire.addEventListener("submit", (e) => e.preventDefault());

  document.querySelector("[data-reinitialiser]")?.addEventListener("click", () => {
    etat.rubrique = "toutes";
    etat.recherche = "";
    champRecherche.value = "";
    afficher();
    majURL();
  });

  construirePuces();
  afficher();
})();
