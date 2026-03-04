// ===============================
// ACTIONNAIRES
// ===============================

// Quand une holding crée une filiale → copie les actionnaires
function creerFiliale(holding, nom) {
    return {
        nom,
        actionnaires: [...holding.actionnaires],
        roles: { PDG: holding.PDG, COMPTABLE: null, DG: null, DC: null },
        biens: [],
        tresorerie: 0
    };
}

// Répartition des gains G-Token selon les parts
function distribuerGTokens(holding, montant) {
    holding.actionnaires.forEach(a => {
        const part = a.pourcentage / 100;
        a.joueur.gtoken += montant * part;
    });
}
