// ===============================
// CATALOGUE GLOBAL DES BIENS (IA PERSISTANTE)
// ===============================
//
// Le catalogue est global : tous les joueurs voient les mêmes biens.
// L’IA regénère automatiquement quand une catégorie est vide.
//

let catalogueGlobal = {
    residentiel: [],
    commercial: [],
    industriel: [],
    transport: [],
    zones: [],
    spatial: []
};


// ===============================
// IA DE GÉNÉRATION DE BIENS
// ===============================

function genererBienAleatoire(type) {
    const basePrix = {
        residentiel: 80_000,
        commercial: 250_000,
        industriel: 600_000,
        transport: 1_200_000,
        zones: 3_000_000,
        spatial: 25_000_000
    };

    const prix = basePrix[type] + Math.floor(Math.random() * basePrix[type] * 1.5);

    return {
        id: type + "_" + Math.random().toString(36).substring(2, 9),
        type: type.charAt(0).toUpperCase() + type.slice(1),
        prixAchat: prix,
        loyer: Math.floor(prix * 0.008),
        charges: Math.floor(prix * 0.0015),
        impots: Math.floor(prix * 0.001),
        disponibilite: "Oui",
        rentabilite: "Variable"
    };
}


// ===============================
// GÉNÉRATION INITIALE (20–25 biens par catégorie)
// ===============================

function initialiserCatalogue() {
    const categories = Object.keys(catalogueGlobal);

    categories.forEach(cat => {
        if (catalogueGlobal[cat].length < 20) {
            for (let i = 0; i < 25; i++) {
                catalogueGlobal[cat].push(genererBienAleatoire(cat));
            }
        }
    });
}

initialiserCatalogue();


// ===============================
// ACHAT D’UN BIEN
// ===============================

function actionAcheterBien(id) {
    const toutesCategories = Object.values(catalogueGlobal).flat();
    const bien = toutesCategories.find(b => b.id === id);
    if (!bien) return;

    // Vérification du rôle
    const role = joueur.role;
    const rolesAutorises = ["PDG", "Directeur Général", "Directeur Commercial", "Comptable"];

    if (!rolesAutorises.includes(role)) {
        alert("Vous n'avez pas les droits pour acheter un bien.");
        return;
    }

    // Vérification trésorerie entreprise
    if (entreprise.tresorerie < bien.prixAchat) {
        alert("Trésorerie insuffisante.");
        return;
    }

    entreprise.tresorerie -= bien.prixAchat;

    if (!entreprise.biens) entreprise.biens = [];
    entreprise.biens.push(bien);

    // Suppression du catalogue
    Object.keys(catalogueGlobal).forEach(cat => {
        catalogueGlobal[cat] = catalogueGlobal[cat].filter(x => x.id !== id);
    });

    alert("Bien acheté avec succès !");
    afficherImmobilisations();
}


// ===============================
// AFFICHAGE DU CATALOGUE
// ===============================

function afficherImmobilisations() {
    const cont = document.getElementById("contenu-immobilisation");
    if (!cont) return;

    let html = `
        <h2 style="color:#00aaff; text-shadow:0 0 8px #0077cc;">Catalogue des biens</h2>
    `;

    Object.keys(catalogueGlobal).forEach(cat => {
        html += `
            <h3 style="color:#00aaff; margin-top:25px;">${cat.toUpperCase()}</h3>
            <table style="width:100%; border-collapse:collapse;">
                <tr style="background:#003355; color:white;">
                    <th style="padding:8px;">Type</th>
                    <th style="padding:8px;">Prix</th>
                    <th style="padding:8px;">Loyer</th>
                    <th style="padding:8px;">Charges</th>
                    <th style="padding:8px;">Impôts</th>
                    <th style="padding:8px;">Acheter</th>
                </tr>
        `;

        catalogueGlobal[cat].forEach(bien => {
            html += `
                <tr style="background:#001a33; color:#ddd;">
                    <td style="padding:8px;">${bien.type}</td>
                    <td style="padding:8px;">${bien.prixAchat.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${bien.loyer.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${bien.charges.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${bien.impots.toLocaleString()} Ø</td>
                    <td style="padding:8px;">
                        <button onclick="actionAcheterBien('${bien.id}')" style="padding:5px;">Acheter</button>
                    </td>
                </tr>
            `;
        });

        html += `</table>`;
    });

    cont.innerHTML = html;
}
