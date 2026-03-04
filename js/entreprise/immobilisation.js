// ===============================
// LISTE DES BIENS DISPONIBLES
// ===============================

 biensDisponibles = [
    {
        id: "maison1",
        type: "Maison",
        prixAchat: 150000,
        loyer: 1200,
        charges: 200,
        impots: 150,
        disponibilite: "Oui",
        rentabilite: "Bonne"
    },
    {
        id: "appart1",
        type: "Appartement",
        prixAchat: 90000,
        loyer: 800,
        charges: 120,
        impots: 90,
        disponibilite: "Oui",
        rentabilite: "Moyenne"
    }
];

// ===============================
// AFFICHAGE
// ===============================

function afficherImmobilisations() {
    let html = `
        <h3>Catalogue des biens disponibles</h3>
        <table class="table-biens" style="width:100%; border-collapse:collapse;">
            <tr style="background:#222; color:white;">
                <th style="padding:8px; border:1px solid #444;">Type</th>
                <th style="padding:8px; border:1px solid #444;">Prix</th>
                <th style="padding:8px; border:1px solid #444;">Loyer</th>
                <th style="padding:8px; border:1px solid #444;">Charges</th>
                <th style="padding:8px; border:1px solid #444;">Impôts</th>
                <th style="padding:8px; border:1px solid #444;">Dispo</th>
                <th style="padding:8px; border:1px solid #444;">Rentabilité</th>
                <th style="padding:8px; border:1px solid #444;">Acheter</th>
            </tr>
    `;

    biensDisponibles.forEach(bien => {
        html += `
            <tr style="background:#111; color:#ddd;">
                <td style="padding:8px; border:1px solid #333;">${bien.type}</td>
                <td style="padding:8px; border:1px solid #333;">${bien.prixAchat.toLocaleString()}</td>
                <td style="padding:8px; border:1px solid #333;">${bien.loyer.toLocaleString()}</td>
                <td style="padding:8px; border:1px solid #333;">${bien.charges.toLocaleString()}</td>
                <td style="padding:8px; border:1px solid #333;">${bien.impots.toLocaleString()}</td>
                <td style="padding:8px; border:1px solid #333;">${bien.disponibilite}</td>
                <td style="padding:8px; border:1px solid #333;">${bien.rentabilite}</td>
                <td style="padding:8px; border:1px solid #333;">
                    <button onclick="actionAcheterBien('${bien.id}')" style="padding:5px;">Acheter</button>
                </td>
            </tr>
        `;
    });

    html += `</table>`;

    document.getElementById("contenu-immobilisation").innerHTML = html;
}
