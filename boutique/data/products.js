/* ==========================================================================
   Le Comptoir des Ombres — Catalogue des produits
   --------------------------------------------------------------------------
   Toutes les fiches produits sont ici. Les pages (accueil, catalogue,
   fiche produit) lisent ce tableau pour s'afficher.

   Champs :
     id           identifiant unique, utilisé dans l'URL (produit.html?id=...)
     nom          nom affiché
     prix         prix en euros (nombre)
     description  courte phrase « inquiétante » affichée sur les cartes
     details      texte plus long pour la fiche produit
     illustration type de dessin SVG (voir js/illustrations.js)
     teinte       couleur principale du dessin
     phare        true = mis en avant sur la page d'accueil
     badge        petite étiquette optionnelle ("Nouveau", "Dernier"...)
   ========================================================================== */

const PRODUITS = [
  {
    id: "bougie-veuve-noire",
    nom: "Bougie de la Veuve Noire",
    prix: 14.9,
    description: "Cire noire coulée à la main. Sa flamme penche toujours vers la porte.",
    details: "Bougie en cire d'abeille teintée au charbon végétal, mèche en coton tressé. Environ 40 heures de combustion. Ne jamais la laisser brûler seule dans une pièce vide.",
    illustration: "bougie",
    teinte: "#1c1a1a",
    phare: true,
    badge: "Best-seller"
  },
  {
    id: "grimoire-sans-titre",
    nom: "Grimoire sans titre",
    prix: 89,
    description: "Reliure de cuir craquelé. Les dernières pages se remplissent seules, dit-on.",
    details: "Carnet relié à la main, 240 pages de papier épais vieilli au thé. Fermoir en laiton. Les pages sont vierges à la livraison… normalement.",
    illustration: "grimoire",
    teinte: "#4a1c1f",
    phare: true
  },
  {
    id: "fiole-brume-marais",
    nom: "Fiole de brume du marais",
    prix: 24.5,
    description: "Bouchon de liège scellé à la cire. Ne pas ouvrir après minuit.",
    details: "Fiole en verre soufflé de 8 cm, remplie d'un liquide trouble vert-de-gris. Objet décoratif uniquement, ne pas boire (je dois vraiment le préciser ?).",
    illustration: "fiole",
    teinte: "#5f8a7c",
    phare: true,
    badge: "Nouveau"
  },
  {
    id: "chevaliere-corbeau",
    nom: "Chevalière du Corbeau",
    prix: 39,
    description: "Laiton vieilli. Son ancien propriétaire ne l'a jamais retirée. Jamais.",
    details: "Bague ajustable en laiton patiné, plateau gravé d'un corbeau aux ailes repliées. Taille unique, s'adapte à presque tous les doigts.",
    illustration: "bague",
    teinte: "#a8874a",
    phare: true
  },
  {
    id: "sablier-qui-hesite",
    nom: "Sablier qui hésite",
    prix: 32,
    description: "Le sable s'arrête parfois à mi-course. Personne ne sait ce qu'il attend.",
    details: "Sablier de 15 cm, monture en bois sombre, sable gris très fin. Durée annoncée : environ 3 minutes. Durée réelle : variable.",
    illustration: "sablier",
    teinte: "#8c7a5b"
  },
  {
    id: "cle-sans-serrure",
    nom: "Clé sans serrure",
    prix: 12,
    description: "Trouvée dans une maison condamnée. Elle n'ouvre rien… de ce côté-ci.",
    details: "Grande clé en fer forgé de 11 cm, rouille d'origine conservée et stabilisée. Livrée sur un ruban de velours bordeaux.",
    illustration: "cle",
    teinte: "#6b6259"
  },
  {
    id: "miroir-de-poche-terni",
    nom: "Miroir de poche terni",
    prix: 27,
    description: "Votre reflet y arrive toujours avec une seconde de retard.",
    details: "Miroir à main ovale, cadre en métal argenté oxydé, verre légèrement piqué. Idéal pour se recoiffer sans trop se regarder.",
    illustration: "miroir",
    teinte: "#9aa3a0"
  },
  {
    id: "lot-sept-bougies",
    nom: "Lot de 7 bougies de veillée",
    prix: 19.9,
    description: "Une pour chaque nuit. Ne pas allumer la septième.",
    details: "Sept petites bougies chauffe-plat en cire naturelle, couleurs assorties : ivoire, os, cendre, suie… Livrées dans une boîte en carton kraft.",
    illustration: "bougie",
    teinte: "#d9cfb8"
  },
  {
    id: "encre-seiche-suie",
    nom: "Encre de seiche & suie",
    prix: 9.9,
    description: "Pour écrire ce qu'on ne veut surtout pas relire.",
    details: "Flacon de 30 ml d'encre noire brunâtre, compatible plume et calame. Plume d'oie non fournie (en rupture, désolé).",
    illustration: "encre",
    teinte: "#2b2320"
  },
  {
    id: "medaillon-portrait-efface",
    nom: "Médaillon au portrait effacé",
    prix: 45,
    description: "Il y avait un visage à l'intérieur. Il y en a encore un, certains soirs.",
    details: "Médaillon ouvrant en laiton, chaîne de 60 cm. Le portrait d'origine est presque entièrement effacé, on devine encore une silhouette.",
    illustration: "medaillon",
    teinte: "#b08d57"
  },
  {
    id: "herbier-saint-jean",
    nom: "Herbier de la Saint-Jean",
    prix: 58,
    description: "Plantes cueillies la nuit la plus courte. Certaines ne figurent dans aucun livre.",
    details: "Petit herbier de 12 planches, plantes séchées sous papier cristal, annotations à l'encre brune. Chaque exemplaire est unique.",
    illustration: "herbier",
    teinte: "#3d4a35"
  },
  {
    id: "clochette-de-seuil",
    nom: "Clochette de seuil",
    prix: 17,
    description: "À suspendre au-dessus de la porte. Elle sonne quand personne n'entre.",
    details: "Clochette en bronze patiné de 6 cm avec son ruban noir. Son clair et un peu triste. Vendue avec un crochet.",
    illustration: "cloche",
    teinte: "#8a6a3c",
    badge: "Dernier exemplaire"
  }
];
