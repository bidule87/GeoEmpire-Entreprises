// ===============================
// MODULE BILAN GEO EMPIRE
// ===============================

function afficherBilan() {
    const cont = document.getElementById("contenu-bilan");
    cont.innerHTML = "";

    // --- Données principales ---
    const valeurBiens = valeurTotaleBiens();
    const treso = entreprise.tresorerie;
    const apport = entreprise.apportInitial;

    // --- Données avancées (à compléter plus tard si tu veux) ---
    const reserves = entreprise.reserves || 0;
    const dividendesVerses = entreprise.dividendesVerses || 0;
    const resultatNet = entreprise.resultatNet || 0;

    // --- Totaux ---
    const totalActif = valeurBiens + treso + reserves;
    const totalPassif = apport + resultatNet + dividendesVerses;

    cont.innerHTML = `
        <h2 style="color:#00aaff; text-shadow:0 0 8px #0077cc;">Bilan de l'entreprise</h2>

        <table class="table-bilan" style="width:100%; border-collapse:collapse; margin-top:20px;">

            <!-- ACTIF -->
            <tr style="background:#003355; color:white;">
                <th style="padding:8px; border:1px solid #004466;">ACTIF</th>
                <th style="padding:8px; border:1px solid #004466;">Montant</th>
            </tr>

            <tr style="background:#001a33; color:#ddd;">
                <td style="padding:8px; border:1px solid #003355;">Valeur des biens</td>
                <td style="padding:8px; border:1px solid #003355;">${valeurBiens.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#001a33; color:#ddd;">
                <td style="padding:8px; border:1px solid #003355;">Trésorerie</td>
                <td style="padding:8px; border:1px solid #003355;">${treso.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#001a33; color:#ddd;">
                <td style="padding:8px; border:1px solid #003355;">Réserves</td>
                <td style="padding:8px; border:1px solid #003355;">${reserves.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#003355; color:white;">
                <td style="padding:8px; border:1px solid #004466;">TOTAL ACTIF</td>
                <td style="padding:8px; border:1px solid #004466;">${totalActif.toLocaleString()} Ø</td>
            </tr>

            <!-- PASSIF -->
            <tr style="background:#550000; color:white;">
                <th style="padding:8px; border:1px solid #660000;">PASSIF</th>
                <th style="padding:8px; border:1px solid #660000;">Montant</th>
            </tr>

            <tr style="background:#330000; color:#ddd;">
                <td style="padding:8px; border:1px solid #550000;">Apport initial</td>
                <td style="padding:8px; border:1px solid #550000;">${apport.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#330000; color:#ddd;">
                <td style="padding:8px; border:1px solid #550000;">Résultat net cumulé</td>
                <td style="padding:8px; border:1px solid #550000;">${resultatNet.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#330000; color:#ddd;">
                <td style="padding:8px; border:1px solid #550000;">Dividendes versés</td>
                <td style="padding:8px; border:1px solid #550000;">${dividendesVerses.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#550000; color:white;">
                <td style="padding:8px; border:1px solid #660000;">TOTAL PASSIF</td>
                <td style="padding:8px; border:1px solid #660000;">${totalPassif.toLocaleString()} Ø</td>
            </tr>
        </table>
    `;
}

// Chargement automatique
afficherBilan();
