// ===============================
// MODULE PRESTIGE GEO EMPIRE
// ===============================

// Active le pack prestige
function activerPrestige() {
    if (entreprise.prestige) {
        alert("Le Pack Prestige est déjà activé.");
        return;
    }

    entreprise.prestige = true;

    // Bonus immédiats
    entreprise.tresorerie += 100000; // +100k G-Tokens
    if (!entreprise.crowns) entreprise.crowns = 0;
    entreprise.crowns += 10; // +10 Crowns

    // Bonus marketing automatique
    marketing.couleur = "bleu"; // meilleur niveau

    alert("Pack Prestige activé !");
    afficherEntreprise();
}


// Bonus appliqués automatiquement dans le système
function bonusPrestigeVenteLocation(baseProba) {
    if (!entreprise.prestige) return baseProba;
    return Math.min(1, baseProba + 0.10); // +10% chance de vente/location
}

function bonusPrestigeValeur(bien, valeur) {
    if (!entreprise.prestige) return valeur;
    return Math.round(valeur * 1.05); // +5% valeur
}
