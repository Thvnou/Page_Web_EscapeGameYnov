/* ==========================================================================
   Le Comptoir des Ombres — Page panier
   --------------------------------------------------------------------------
   - Liste les articles du panier, quantités modifiables, suppression
   - Calcule sous-total, livraison (offerte dès 60 €) et total
   - « Valider » : environnement fictif, aucun paiement. La commande est
     archivée dans le navigateur (Commandes, voir main.js) et le panier vidé.
   Dépend de main.js (Panier, Commandes, formaterPrix) et illustrations.js.
   ========================================================================== */

(() => {
  const zonePanier = document.querySelector("[data-panier]");
  if (!zonePanier || typeof PRODUITS === "undefined") return;

  const SEUIL_LIVRAISON_OFFERTE = 60;
  const FRAIS_LIVRAISON = 4.9;
  const QUANTITE_MAX = 20;

  const lignes = document.querySelector("[data-lignes]");
  const vide = document.querySelector("[data-panier-vide]");
  const confirmation = document.querySelector("[data-confirmation]");
  const historique = document.querySelector("[data-historique]");
  const historiqueListe = document.querySelector("[data-historique-liste]");

  /* Lignes du panier enrichies avec la fiche produit (ignore les id inconnus) */
  function lignesDetaillees() {
    return Panier.contenu()
      .map((l) => ({ ...l, produit: PRODUITS.find((p) => p.id === l.id) }))
      .filter((l) => l.produit && l.quantite > 0);
  }

  function calculerTotaux(details) {
    const sousTotal = details.reduce((t, l) => t + l.produit.prix * l.quantite, 0);
    const livraison = sousTotal >= SEUIL_LIVRAISON_OFFERTE || sousTotal === 0 ? 0 : FRAIS_LIVRAISON;
    return { sousTotal, livraison, total: sousTotal + livraison };
  }

  function ligneHTML({ produit, quantite }) {
    const lien = `produit.html?id=${encodeURIComponent(produit.id)}`;
    return `
      <li class="panier-ligne">
        <a class="ligne-visuel" href="${lien}" tabindex="-1" aria-hidden="true">
          ${dessinProduit(produit.illustration, produit.teinte, produit.nom)}
        </a>
        <div class="ligne-infos">
          <h3><a href="${lien}">${produit.nom}</a></h3>
          <p class="ligne-prix-unitaire">${formaterPrix(produit.prix)} l'unité</p>
          <button class="lien-retirer" type="button" data-retirer="${produit.id}">Retirer</button>
        </div>
        <div class="quantite" role="group" aria-label="Quantité de ${produit.nom}">
          <button type="button" data-moins="${produit.id}" aria-label="Retirer un exemplaire">−</button>
          <span aria-live="polite">${quantite}</span>
          <button type="button" data-plus="${produit.id}" aria-label="Ajouter un exemplaire"
                  ${quantite >= QUANTITE_MAX ? "disabled" : ""}>+</button>
        </div>
        <p class="ligne-total">${formaterPrix(produit.prix * quantite)}</p>
      </li>`;
  }

  function afficherPanier() {
    const details = lignesDetaillees();
    const estVide = details.length === 0;

    zonePanier.hidden = estVide;
    vide.hidden = !estVide || !confirmation.hidden;
    if (estVide) return;

    lignes.innerHTML = details.map(ligneHTML).join("");

    const { sousTotal, livraison, total } = calculerTotaux(details);
    document.querySelector("[data-sous-total]").textContent = formaterPrix(sousTotal);
    document.querySelector("[data-livraison]").textContent = livraison === 0 ? "Offerte" : formaterPrix(livraison);
    document.querySelector("[data-total]").textContent = formaterPrix(total);

    const reste = SEUIL_LIVRAISON_OFFERTE - sousTotal;
    document.querySelector("[data-note-livraison]").textContent = reste > 0
      ? `Encore ${formaterPrix(reste)} et la livraison vous est offerte.`
      : "La livraison est offerte. Le facteur ne se doutera de rien.";
  }

  function formaterDate(iso) {
    return new Date(iso).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
  }

  function afficherHistorique() {
    const commandes = Commandes.liste();
    historique.hidden = commandes.length === 0;
    historiqueListe.innerHTML = commandes.map((c) => `
      <li class="commande">
        <div class="commande-entete">
          <strong>${c.numero}</strong>
          <span>${formaterDate(c.date)}</span>
          <span class="commande-total">${formaterPrix(c.total)}</span>
        </div>
        <ul class="commande-articles">
          ${c.articles.map((a) => `<li>${a.quantite} × ${a.nom}</li>`).join("")}
        </ul>
      </li>`).join("");
  }

  /* Numéro de commande lisible : CO-AAMMJJ-XXXX */
  function nouveauNumero() {
    const d = new Date();
    const date = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()]
      .map((n) => String(n).padStart(2, "0")).join("");
    const hasard = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `CO-${date}-${hasard}`;
  }

  function validerPanier() {
    const details = lignesDetaillees();
    if (details.length === 0) return;

    const { sousTotal, livraison, total } = calculerTotaux(details);
    const commande = {
      numero: nouveauNumero(),
      date: new Date().toISOString(),
      articles: details.map((l) => ({
        id: l.produit.id,
        nom: l.produit.nom,
        prix: l.produit.prix,
        quantite: l.quantite
      })),
      sousTotal,
      livraison,
      total
    };

    Commandes.archiver(commande);
    Panier.vider();

    confirmation.querySelector("[data-numero-commande]").textContent = commande.numero;
    confirmation.hidden = false;
    afficherPanier();
    afficherHistorique();
    confirmation.focus();
  }

  /* Un seul écouteur pour tous les boutons de la page */
  document.addEventListener("click", (e) => {
    const cible = e.target.closest("button");
    if (!cible) return;
    const quantiteDe = (id) => Panier.contenu().find((l) => l.id === id)?.quantite || 0;

    if (cible.dataset.plus) {
      const id = cible.dataset.plus;
      Panier.definirQuantite(id, Math.min(quantiteDe(id) + 1, QUANTITE_MAX));
    } else if (cible.dataset.moins) {
      const id = cible.dataset.moins;
      Panier.definirQuantite(id, quantiteDe(id) - 1);
    } else if (cible.dataset.retirer) {
      Panier.retirer(cible.dataset.retirer);
    } else if (cible.hasAttribute("data-vider")) {
      if (!confirm("Vider tout le panier ?")) return;
      Panier.vider();
    } else if (cible.hasAttribute("data-valider")) {
      validerPanier();
      return;
    } else {
      return;
    }
    afficherPanier();
  });

  afficherPanier();
  afficherHistorique();
})();
