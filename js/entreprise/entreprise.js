// ===============================
// PUISSANCE ÉCONOMIQUE GEO EMPIRE
// ===============================
//
// La puissance économique dépend du patrimoine total de l'entreprise :
// - valeur des biens
// - trésorerie
// - réserves (si activées)
// - résultat net cumulé
//

function calculerPuissanceEconomique() {
    const valeurBiens = valeurTotaleBiens();
    const treso = entreprise.tresorerie || 0;
    const reserves = entreprise.reserves || 0;
    const resultatNet = entreprise.resultatNet || 0;

    const valeurTotale = valeurBiens + treso + reserves + resultatNet;

    if (valeurTotale >= 2_500_000_000) {
        return { bonusVente: 0.10, bonusLocation: 0.08, moletteMax: 25, niveau: "Avancé", valeurTotale };
    }

    if (valeurTotale >= 1_000_000_000) {
        return { bonusVente: 0.05, bonusLocation: 0.02, moletteMax: 22, niveau: "Intermédiaire", valeurTotale };
    }

    return { bonusVente: 0, bonusLocation: 0, moletteMax: 20, niveau: "Débutant", valeurTotale };
}



// ===============================
// AFFICHAGE ENTREPRISE (VERSION PRO)
// ===============================
//
// Affiche :
// - Nom de l'entreprise
// - Rôle du joueur
// - Patrimoine total
// - Valeur des biens
// - Trésorerie
// - Gain journalier estimé
// - Puissance économique
// - Bonus actifs
//

function afficherEntreprise() {
    const cont = document.getElementById("contenu-entreprises");
    if (!cont) return;

    const valeurBiens = valeurTotaleBiens();
    const treso = entreprise.tresorerie || 0;
    const gainJour = estimerGainJournalier ? estimerGainJournalier() : 0;

    const puissance = calculerPuissanceEconomique();

    const patrimoineTotal = puissance.valeurTotale;

    const role = joueur.role || "Aucun rôle";

    cont.innerHTML = `
        <h2 style="color:#00aaff; text-shadow:0 0 8px #0077cc;">Entreprise</h2>

        <p><strong>Nom :</strong> ${entreprise.nom}</p>
        <p><strong>Rôle :</strong> ${role}</p>

        <hr style="border-color:#004466; margin:15px 0;">

        <p><strong>Valeur totale des biens :</strong> ${valeurBiens.toLocaleString()} Ø</p>
        <p><strong>Trésorerie :</strong> ${treso.toLocaleString()} Ø</p>
        <p><strong>Patrimoine total :</strong> ${patrimoineTotal.toLocaleString()} Ø</p>
        <p><strong>Gain journalier estimé :</strong> ${gainJour.toLocaleString()} Ø</p>

        <hr style="border-color:#004466; margin:15px 0;">

        <h3 style="color:#00aaff;">Puissance économique : ${puissance.niveau}</h3>
        <p><strong>Bonus vente :</strong> +${(puissance.bonusVente * 100).toFixed(0)}%</p>
        <p><strong>Bonus location :</strong> +${(puissance.bonusLocation * 100).toFixed(0)}%</p>
        <p><strong>Molette max :</strong> ${puissance.moletteMax}</p>
    `;
}
