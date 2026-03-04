// ===============================
// SYSTÈME G-TOKENS GEO EMPIRE
// ===============================
//
// Les G-Tokens sont injectés dans une holding.
// Le montant injecté génère des Ø selon un taux basé sur le patrimoine du joueur.
// ===============================


// ===============================
// CALCUL DU TAUX G-TOKEN
// ===============================
//
// Exemple simple :
// - < 1M Ø → taux 1.2
// - < 10M Ø → taux 1.5
// - < 100M Ø → taux 2.0
// - > 100M Ø → taux 3.0
//
// Tu pourras modifier ces valeurs plus tard.
// ===============================

function ge_tauxGToken(patrimoine) {
    if (patrimoine < 1_000_000) return 1.2;
    if (patrimoine < 10_000_000) return 1.5;
    if (patrimoine < 100_000_000) return 2.0;
    return 3.0;
}


// ===============================
// CALCUL DU PATRIMOINE D'UN JOUEUR
// ===============================
//
// Patrimoine = biens + trésorerie + parts + holdings + filiales
// Pour l'instant : version simple, tu pourras l'améliorer.
// ===============================

function ge_calculerPatrimoine(joueur) {
    return joueur.patrimoine || 0;
}


// ===============================
// INJECTION DE G-TOKENS
// ===============================
//
// holding : objet holding
// joueur  : joueur qui injecte
// montant : G-Tokens injectés
//
// Retourne : Ø générés
// ===============================

function ge_injecterGToken(holding, joueur, montant) {

    if (!holding) return 0;
    if (!joueur) return 0;

    // Vérification du solde G-Tokens
    joueur.gTokens = joueur.gTokens || 0;
    if (joueur.gTokens < montant) {
        alert("G-Tokens insuffisants.");
        return 0;
    }

    // Calcul du patrimoine
    const patrimoine = ge_calculerPatrimoine(joueur);

    // Taux selon le patrimoine
    const taux = ge_tauxGToken(patrimoine);

    // Ø générés
    const geo = Math.floor(montant * taux);

    // Ajout à la holding
    holding.tresorerie = (holding.tresorerie || 0) + geo;

    // Déduction des G-Tokens
    joueur.gTokens -= montant;

    // Mise à jour du patrimoine
    joueur.patrimoine = ge_calculerPatrimoine(joueur);

    return geo;
}
