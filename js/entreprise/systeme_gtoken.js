// ===============================
// G-TOKEN
// ===============================

function injecterGToken(holding, joueur, montant) {
    const patrimoine = calculerPatrimoine(joueur);
    const taux = tauxGToken(patrimoine);

    const geo = montant * taux;

    holding.tresorerie += geo;
    joueur.gtoken -= montant;

    // Mise à jour du patrimoine automatique
    joueur.patrimoine = calculerPatrimoine(joueur);

    return geo;
}
