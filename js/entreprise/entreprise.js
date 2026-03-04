// ===============================
// PUISSANCE ÉCONOMIQUE
// ===============================

function calculerPuissanceEconomique() {
    if (valeurTotale >= 2500000000) {
        return { bonusVente: 0.10, bonusLocation: 0.08, moletteMax: 25, niveau: "Avancé" };
    }

    if (valeurTotale >= 1000000000) {
        return { bonusVente: 0.05, bonusLocation: 0.02, moletteMax: 22, niveau: "Intermédiaire" };
    }

    return { bonusVente: 0, bonusLocation: 0, moletteMax: 20, niveau: "Débutant" };
}

// ===============================
// AFFICHAGE ENTREPRISE
// ===============================

function afficherEntreprise() {
    const cont = document.getElementById("contenu-entreprises");
    if (!cont) return;

    const valeurBiens = valeurTotaleBiens ? valeurTotaleBiens() : 0;
    const treso = entreprise?.tresorerie ?? 0;
    const gainJour = estimerGainJournalier ? estimerGainJournalier() : 0;

    cont.innerHTML = `
        <h2>Entreprise</h2>
        <p>Valeur totale des biens : ${valeurBiens.toLocaleString()} €</p>
        <p>Trésorerie : ${treso.toLocaleString()} €</p>
        <p>Gain journalier estimé : ${gainJour.toLocaleString()} €</p>
    `;
}
