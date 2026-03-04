// ===============================
// SYSTEME : PATRIMOINE & TAUX G-TOKEN
// ===============================

// Calcule le patrimoine total du joueur
function calculerPatrimoine(joueur) {

    // Sécurité : si joueur n'existe pas
    if (!joueur) return 0;

    let patrimoine = 0;

    // Cash perso + cash holding
    patrimoine += joueur.cashPersonnel || 0;
    patrimoine += joueur.cashHolding || 0;

    // Valeur des biens
    if (joueur.biens && Array.isArray(joueur.biens)) {
        joueur.biens.forEach(b => {
            patrimoine += (b.valeur || 0);
        });
    }

    // Valeur des actions
    if (joueur.actions && Array.isArray(joueur.actions)) {
        joueur.actions.forEach(a => {
            patrimoine += (a.valeur || 0);
        });
    }

    return patrimoine;
}

// Taux G-Token (A2)
function tauxGToken(patrimoine) {
    if (patrimoine < 100_000) return 1.0;
    if (patrimoine < 1_000_000) return 1.5;
    if (patrimoine < 10_000_000) return 2.0;
    if (patrimoine < 50_000_000) return 2.5;
    if (patrimoine < 100_000_000) return 3.0;
    if (patrimoine < 500_000_000) return 4.0;
    if (patrimoine < 1_000_000_000) return 5.0;
    return 6.0;
}

// Limite de prime = 10% du patrimoine perso
function limitePrime(joueur) {
    const patrimoine = calculerPatrimoine(joueur);
    return patrimoine * 0.10;
}
