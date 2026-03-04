// ===============================
// MODULE PRESTIGE GEO EMPIRE
// ===============================

function activerPrestige() {
    if (entreprise.prestige) {
        alert("Le Pack Prestige est déjà activé.");
        return;
    }

    entreprise.prestige = true;

    // BONUS EXACTS DU PACK PRESTIGE (selon ta capture)
    entreprise.gpsRadius = 20;               // Rayon GPS 20 km
    entreprise.achatsIllimités = true;       // Achats illimités
    entreprise.assuranceSpeciale = true;     // Assurance spéciale
    entreprise.prioriteAchat = true;         // Priorité absolue
    entreprise.actionsDeMasse = true;        // Achat/vente/location en masse
    entreprise.exportExcel = true;           // Export Excel / Sheets
    entreprise.bonusMoletteVente = true;     // Bonus vente via molette
    entreprise.bonusMoletteLocation = true;  // Bonus location via molette

    // G-Tokens + Crowns
    entreprise.gTokens = (entreprise.gTokens || 0) + 10000;
    entreprise.crowns = (entreprise.crowns || 0) + 10;

    // +9 capacités sur toutes les entités
    entreprise.capaciteEntites = (entreprise.capaciteEntites || 0) + 9;

    // Statut PDG / actionnaires
    entreprise.statutPrestige = "PDG";

    alert("Pack Prestige activé !");
    afficherEntreprise();
}
