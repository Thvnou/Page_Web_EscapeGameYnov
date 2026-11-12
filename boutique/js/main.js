/* ==========================================================================
   Le Comptoir des Ombres — Script commun à toutes les pages
   --------------------------------------------------------------------------
   - Stockage du panier et des commandes archivées (localStorage protégé)
   - Compteur du panier dans l'en-tête
   - Affichage des produits phares sur l'accueil
   - Petit message de confirmation ("ajouté au panier")
   ========================================================================== */

/* ---------- Stockage sécurisé ----------
   localStorage peut être indisponible (navigation privée, fichier ouvert en
   local avec certains navigateurs, cookies bloqués). Dans ce cas on garde
   le panier en mémoire le temps de la visite, sans planter le site. */
const Stockage = (() => {
  const memoire = {}; // secours si localStorage ne marche pas

  function lire(cle, defaut) {
    try {
      const brut = localStorage.getItem(cle);
      return brut ? JSON.parse(brut) : defaut;
    } catch (e) {
      return cle in memoire ? memoire[cle] : defaut;
    }
  }

  function ecrire(cle, valeur) {
    memoire[cle] = valeur;
    try {
      localStorage.setItem(cle, JSON.stringify(valeur));
    } catch (e) {
      /* tant pis, on reste en mémoire */
    }
  }

  return { lire, ecrire };
})();

const CLE_PANIER = "comptoir-panier";
const CLE_COMMANDES = "comptoir-commandes";

/* ---------- Panier ----------
   Le panier est une liste de { id, quantite }. */
const Panier = {
  contenu() {
    const p = Stockage.lire(CLE_PANIER, []);
    if (!Array.isArray(p)) return [];
    // ignore les produits qui n'existent plus dans le catalogue
    return typeof PRODUITS === "undefined" ? p : p.filter((l) => PRODUITS.some((x) => x.id === l.id));
  },

  enregistrer(panier) {
    Stockage.ecrire(CLE_PANIER, panier);
    majCompteurPanier();
  },

  ajouter(id, quantite = 1) {
    const panier = this.contenu();
    const ligne = panier.find((l) => l.id === id);
    if (ligne) {
      ligne.quantite += quantite;
    } else {
      panier.push({ id, quantite });
    }
    this.enregistrer(panier);
  },

  /* Fixe la quantité d'un article (0 ou moins = retiré du panier) */
  definirQuantite(id, quantite) {
    const panier = this.contenu()
      .map((l) => (l.id === id ? { ...l, quantite } : l))
      .filter((l) => l.quantite > 0);
    this.enregistrer(panier);
  },

  retirer(id) {
    this.enregistrer(this.contenu().filter((l) => l.id !== id));
  },

  vider() {
    this.enregistrer([]);
  },

  nombreArticles() {
    return this.contenu().reduce((total, l) => total + (Number(l.quantite) || 0), 0);
  }
};

/* ---------- Commandes archivées ----------
   Environnement fictif : « valider » le panier ne paie rien, on archive
   simplement une copie de la commande dans le navigateur. */
const Commandes = {
  liste() {
    const c = Stockage.lire(CLE_COMMANDES, []);
    return Array.isArray(c) ? c : [];
  },

  archiver(commande) {
    const liste = this.liste();
    liste.unshift(commande); // la plus récente en premier
    Stockage.ecrire(CLE_COMMANDES, liste);
  }
};

/* ---------- Outils d'affichage ---------- */

/* Formate un prix en euros à la française : 14,90 € */
function formaterPrix(montant) {
  return montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

/* Met à jour la pastille du panier dans l'en-tête */
function majCompteurPanier() {
  const pastille = document.querySelector("[data-compteur-panier]");
  if (!pastille) return;
  const n = Panier.nombreArticles();
  pastille.textContent = n;
  pastille.hidden = n === 0;
}

/* Petit message qui apparaît en bas de l'écran puis s'efface */
let minuteurToast = null;
function afficherToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => toast.classList.remove("visible"), 2600);
}

/* Construit le HTML d'une carte produit (réutilisée par le catalogue plus tard) */
function carteProduitHTML(produit) {
  const lien = `produit.html?id=${encodeURIComponent(produit.id)}`;
  const badge = produit.badge ? `<span class="badge">${produit.badge}</span>` : "";
  return `
    <article class="carte-produit">
      ${badge}
      <a class="carte-visuel" href="${lien}" tabindex="-1" aria-hidden="true">
        ${dessinProduit(produit.illustration, produit.teinte, produit.nom)}
      </a>
      <div class="carte-corps">
        <h3><a href="${lien}">${produit.nom}</a></h3>
        <p class="carte-desc">${produit.description}</p>
        <div class="carte-pied">
          <span class="prix">${formaterPrix(produit.prix)}</span>
          <button class="bouton bouton-petit" type="button" data-ajouter="${produit.id}">
            Ajouter au panier
          </button>
        </div>
      </div>
    </article>`;
}

/* Affiche les produits marqués "phare" dans le conteneur prévu (accueil) */
function afficherProduitsPhares() {
  const conteneur = document.querySelector("[data-produits-phares]");
  if (!conteneur || typeof PRODUITS === "undefined") return;
  conteneur.innerHTML = PRODUITS.filter((p) => p.phare).map(carteProduitHTML).join("");
}

/* Un seul écouteur pour tous les boutons "Ajouter au panier" de la page */
function brancherBoutonsAjout() {
  document.addEventListener("click", (e) => {
    const bouton = e.target.closest("[data-ajouter]");
    if (!bouton) return;
    const produit = PRODUITS.find((p) => p.id === bouton.dataset.ajouter);
    if (!produit) return;
    Panier.ajouter(produit.id);
    afficherToast(`« ${produit.nom} » a rejoint votre panier.`);
  });
}

/* Met en évidence le lien du menu correspondant à la page en cours */
function marquerPageActive() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-principale a").forEach((a) => {
    if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
  });
}

/* Menu repliable sur petit écran */
function brancherMenuMobile() {
  const bouton = document.querySelector(".bouton-menu");
  const nav = document.querySelector(".nav-principale");
  if (!bouton || !nav) return;
  bouton.addEventListener("click", () => {
    const ouvert = nav.classList.toggle("ouverte");
    bouton.setAttribute("aria-expanded", ouvert);
  });
}

/* Année automatique dans le pied de page */
function majAnnee() {
  const el = document.querySelector("[data-annee]");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Démarrage ---------- */
document.addEventListener("DOMContentLoaded", () => {
  afficherProduitsPhares();
  brancherBoutonsAjout();
  majCompteurPanier();
  marquerPageActive();
  brancherMenuMobile();
  majAnnee();
});
