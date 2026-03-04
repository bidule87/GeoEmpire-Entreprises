// ===============================
// SYSTÈME ACTIONNAIRES GEO EMPIRE
// ===============================
//
// Chaque holding possède :
// - une liste d'actionnaires
// - chaque actionnaire = { joueur, pourcentage }
//
// Lorsqu'une filiale est créée, elle copie les actionnaires de la holding.
// ===============================


// ===============================
// CRÉATION D'UNE FILIALE AVEC ACTIONNAIRES
// ===============================

function ge_creerFilialeAvecActionnaires(holding, nom) {
    return {
        id: Date.now(),
        nom: nom,
        tresorerie: 0,
        valeur: 0,

        // Copie des actionnaires de la holding
        actionnaires: holding.actionnaires ? [...holding.actionnaires] : [],

        // Rôles internes
        roles: {
            PDG: holding.PDG || null,
            DirecteurGeneral: null,
            DirecteurCommercial: null,
            Comptable: null
        },

        biens: []
    };
}


// ===============================
// DISTRIBUTION DES G-TOKENS SELON LES PARTS
// ===============================

function ge_distribuerGTokens(holding, montant) {
    if (!holding.actionnaires) return;

    holding.actionnaires.forEach(a => {
        const part = a.pourcentage / 100;

        // Ajout des G-Tokens au joueur
        a.joueur.gTokens = (a.joueur.gTokens || 0) + Math.floor(montant * part);
    });
}
