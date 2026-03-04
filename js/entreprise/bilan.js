// ===============================
// MODULE BILAN
// ===============================

function afficherBilan() {
    const cont = document.getElementById("contenu-bilan");
    cont.innerHTML = "";

    const valeurBiens = valeurTotaleBiens();
    const treso = entreprise.tresorerie;
    const apport = entreprise.apportInitial;

    const totalActif = valeurBiens + treso;
    const totalPassif = apport;

    cont.innerHTML = `
        <h2>Bilan de l'entreprise</h2>

        <table class="table-bilan" style="width:100%; border-collapse:collapse;">
            <tr style="background:#222; color:white;">
                <th style="padding:8px; border:1px solid #444;">Catégorie</th>
                <th style="padding:8px; border:1px solid #444;">Montant</th>
            </tr>

            <tr style="background:#111; color:#ddd;">
                <td style="padding:8px; border:1px solid #333;">Valeur des biens</td>
                <td style="padding:8px; border:1px solid #333;">${valeurBiens.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#111; color:#ddd;">
                <td style="padding:8px; border:1px solid #333;">Trésorerie</td>
                <td style="padding:8px; border:1px solid #333;">${treso.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#222; color:white;">
                <td style="padding:8px; border:1px solid #444;">TOTAL ACTIF</td>
                <td style="padding:8px; border:1px solid #444;">${totalActif.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#111; color:#ddd;">
                <td style="padding:8px; border:1px solid #333;">Apport initial</td>
                <td style="padding:8px; border:1px solid #333;">${apport.toLocaleString()} Ø</td>
            </tr>

            <tr style="background:#222; color:white;">
                <td style="padding:8px; border:1px solid #444;">TOTAL PASSIF</td>
                <td style="padding:8px; border:1px solid #444;">${totalPassif.toLocaleString()} Ø</td>
            </tr>
        </table>
    `;
}

// Chargement automatique
afficherBilan();
