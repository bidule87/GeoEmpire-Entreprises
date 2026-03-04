// ===============================
// MODULE RÔLES GEO EMPIRE
// ===============================
//
// Rôles officiels du jeu :
// - PDG
// - Actionnaire
// - Directeur Général
// - Directeur Commercial
// - Comptable
//
// Chaque rôle aura plus tard :
// - droits d'accès
// - salaire
// - permissions (achat, gestion, etc.)
// ===============================

const roles = [
    { nom: "PDG", salaire: 0 },
    { nom: "Actionnaire", salaire: 0 },
    { nom: "Directeur Général", salaire: 15000 },
    { nom: "Directeur Commercial", salaire: 8000 },
    { nom: "Comptable", salaire: 6000 }
];

let rolesActifs = [];


// ===============================
// AFFICHAGE DES RÔLES
// ===============================

function afficherRoles() {
    const cont = document.getElementById("contenu-roles");
    cont.innerHTML = "";

    cont.innerHTML += `<h2 style="color:#00aaff;">Rôles & Gestion du Personnel</h2>`;

    let html = `
        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
            <tr style="background:#003355; color:white;">
                <th style="padding:8px;">Rôle</th>
                <th style="padding:8px;">Salaire</th>
                <th style="padding:8px;">Action</th>
            </tr>
    `;

    roles.forEach(r => {
        html += `
            <tr style="background:#001a33; color:#ddd;">
                <td style="padding:8px;">${r.nom}</td>
                <td style="padding:8px;">${r.salaire.toLocaleString()} Ø</td>
                <td style="padding:8px;">
                    <button onclick="embaucherRole('${r.nom}')" style="padding:5px;">Nommer</button>
                </td>
            </tr>
        `;
    });

    html += "</table>";

    cont.innerHTML += html;

    // Liste des rôles actifs
    cont.innerHTML += `<h3 style="margin-top:25px; color:#00aaff;">Rôles actifs</h3>`;

    if (rolesActifs.length === 0) {
        cont.innerHTML += `<p>Aucun rôle attribué pour le moment.</p>`;
    } else {
        rolesActifs.forEach(r => {
            cont.innerHTML += `<p>- ${r.nom} (${r.salaire.toLocaleString()} Ø / mois)</p>`;
        });
    }
}


// ===============================
// NOMMER UN RÔLE
// ===============================

function embaucherRole(nomRole) {
    const role = roles.find(r => r.nom === nomRole);
    if (!role) return;

    rolesActifs.push(role);

    // Déduction du salaire si > 0
    if (role.salaire > 0) {
        entreprise.tresorerie -= role.salaire;
    }

    alert(`${nomRole} nommé !`);
    afficherRoles();
}


// Chargement automatique
afficherRoles();
