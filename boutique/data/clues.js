/* ==========================================================================
   Indices du jeu — source de vérité (NE PAS inclure dans une page)
   --------------------------------------------------------------------------
   Ce fichier n'est chargé par AUCUNE page : s'il l'était, le texte en clair
   apparaîtrait dans le code source et l'épreuve serait cassée.

   Épreuve « page cachée » (espace-prive-ghost.html)
     Texte en clair actuel (PROVISOIRE) :
       ghost // message provisoire : a remplacer dans data/clues.js

   Pour changer le message :
     1. Modifier TEXTE_CLAIR ci-dessous (et le commentaire au-dessus).
     2. Encoder :   printf '%s' "le nouveau texte" | base64 -w0
     3. Coller le résultat dans BASE64 ci-dessous
        ET dans espace-prive-ghost.html (bloc <pre class="dump">).
     4. Vérifier :  echo "<chaine>" | base64 -d
   ========================================================================== */

const INDICES = {
  pageCachee: {
    page: "espace-prive-ghost.html",
    TEXTE_CLAIR: "ghost // message provisoire : a remplacer dans data/clues.js",
    BASE64: "Z2hvc3QgLy8gbWVzc2FnZSBwcm92aXNvaXJlIDogYSByZW1wbGFjZXIgZGFucyBkYXRhL2NsdWVzLmpz"
  }
};
