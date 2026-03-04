// ===============================
// PRIMES & MINUIT
// ===============================

// Définir une prime pour un rôle
function definirPrime(holding, role, joueur, montant) {
    const limite = limitePrime(joueur);

    if (montant > limite) {
        return { ok: false, message: "Prime trop élevée : limite = " + limite.toLocaleString() };
    }

    holding.primes[role] = { joueurId: joueur.id, montant };
    return { ok: true };
}

// Exécuté à minuit
function transfertPrimesMinuit(holding, joueurs) {
    Object.values(holding.primes).forEach(prime => {
        const joueur = joueurs.find(j => j.id === prime.joueurId);
        if (!joueur) return;

        if (holding.tresorerie >= prime.montant) {
            holding.tresorerie -= prime.montant;
            joueur.cashPersonnel += prime.montant;
        }
    });
}
