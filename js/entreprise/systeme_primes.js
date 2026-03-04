// ===============================
// SYSTÈME DES PRIMES GEO EMPIRE
// ===============================
//
// - Une holding peut définir une prime pour un rôle (PDG, DG, DC, Comptable)
// - La prime ne peut pas dépasser 10% du patrimoine du joueur
// - Les primes sont versées automatiquement à minuit
// ===============================


// ===============================
// DÉFINIR UNE PRIME POUR UN RÔLE
// ===============================

function ge_definirPrime(holding, role, joueur, montant) {

    if (!holding || !joueur) {
        return { ok: false, message: "Erreur : données invalides." };
    }

    // Calcul de la limite autorisée
    const limite = ge_limitePrime(joueur);

    if (montant > limite) {
        return {
            ok: false,
            message: "Prime trop élevée : limite = " + limite.toLocaleString() + " Ø"
        };
    }

    // Initialisation si nécessaire
    if (!holding.primes) holding.primes = {};

    // Enregistrement de la prime
    holding.primes[role] = {
        joueurId: joueur.id,
        montant: montant
    };

    return { ok: true };
}



// ===============================
// TRANSFERT DES PRIMES À MINUIT
// ===============================
//
// holding : la holding qui verse les primes
// joueurs : liste globale des joueurs
// ===============================

function ge_transfertPrimesMinuit(holding, joueurs) {

    if (!holding || !holding.primes) return;

    Object.values(holding.primes).forEach(prime => {

        const joueur = joueurs.find(j => j.id === prime.joueurId);
        if (!joueur) return;

        // Vérification trésorerie
        if (holding.tresorerie >= prime.montant) {

            holding.tresorerie -= prime.montant;

            joueur.cashPersonnel = (joueur.cashPersonnel || 0) + prime.montant;
        }
    });
}
