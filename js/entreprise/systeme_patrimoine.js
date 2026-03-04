// ===============================
// SYSTÈME : PATRIMOINE & TAUX G-TOKEN
// ===============================
//
// Le patrimoine total du joueur influence :
// - le taux de conversion G-Tokens → Ø
// - la limite de prime
// - la puissance économique
//
// Ce module est utilisé par :
// - systeme_gtoken.js
// - systeme_actionnaires.js
// - modules entreprise / holding / filiale
// ===============================


// ===============================
// CALCUL DU PATRIMOINE TOTAL
// ===============================

function ge_calculerPatrimoine(joueur) {

    if (!joueur) return 0;

    let patrimoine = 0;

    // Cash personnel
    patrimoine += joueur.cashPersonnel || 0;

    // Cash provenant d'une holding (si applicable)
    patrimoine += joueur.cashHolding || 0;

    // Valeur des biens personnels
    if (Array.isArray(joueur.biens)) {
        joueur.biens.forEach(b => {
            patrimoine += (b.valeur || 0);
        });
    }

    // Valeur des actions (parts dans holdings / filiales)
    if (Array.isArray(joueur.actions)) {
        joueur.actions.forEach(a => {
            patrimoine += (a.valeur || 0);
        });
    }

    return patrimoine;
}


// ===============================
// TAUX G-TOKEN (VERSION A2)
// ===============================
//
// Plus le joueur est riche, plus ses G-Tokens valent cher.
// ===============================

function ge_tauxGToken(patrimoine) {

    if (patrimoine < 100_000) return 1.0;
    if (patrimoine < 1_000_000) return 1.5;
    if (patrimoine < 10_000_000) return 2.0;
    if (patrimoine < 50_000_000) return 2.5;
    if (patrimoine < 100_000_000) return 3.0;
    if (patrimoine < 500_000_000) return 4.0;
    if (patrimoine < 1_000_000_000) return 5.0;

    return 6.0;
}


// ===============================
// LIMITE DE PRIME
// ===============================
//
// Un joueur ne peut pas donner une prime supérieure à 10% de son patrimoine.
// ===============================

function ge_limitePrime(joueur) {
    const patrimoine = ge_calculerPatrimoine(joueur);
    return patrimoine * 0.10;
}
