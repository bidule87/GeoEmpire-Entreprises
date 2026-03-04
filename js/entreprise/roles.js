// ===============================
// MODULE RÔLES
// ===============================

const roles = [
    { nom: "Directeur", salaire: 15000 },
    { nom: "Comptable", salaire: 8000 },
    { nom: "Gestionnaire immobilier", salaire: 6000 },
    { nom: "Responsable marketing", salaire: 7000 },
    { nom: "Agent commercial", salaire: 5000 }
];

let rolesActifs = [];

function afficherRoles() {
    const cont = document.getElementById("contenu-roles");
    cont.innerHTML = "";

    cont.innerHTML += `<h2>Rôles & Employés</h2>`;

    let html = `
        <table style="width:100%; border-collapse:collapse;">
            <tr style="background:#222; color:white;">
                <th style="padding:8px; border:1px solid #444;">Rôle</th>
                <th style="padding:8px; border:1px solid #444;">Salaire</th>
                <th style="padding:8px; border:1px solid #444;">Action</th>
            </tr>
    `;

    roles.forEach(r => {
        html += `
            <tr style="background:#111; color:#ddd;">
                <td style="padding:8px; border:1px solid #333;">${r.nom}</td>
                <td style="padding:8px; border:1px solid #333;">${r.salaire.toLocaleString()} Ø</td>
                <td style="padding:8px; border:1px solid #333;">
                    <button onclick="embaucherRole('${r.nom}')">Embaucher</button>
                </td>
            </tr>
        `;
    });

    html += "</table>";

    cont.innerHTML += html;

    // Liste des employés actifs
    cont.innerHTML += `<h3>Employés actifs</h3>`;

    if (rolesActifs.length === 0) {
        cont.innerHTML += `<p>Aucun employé pour le moment.</p>`;
    } else {
        rolesActifs.forEach(r => {
            cont.innerHTML += `<p>- ${r.nom} (${r.salaire.toLocaleString()} Ø / mois)</p>`;
        });
    }
}

function embaucherRole(nomRole) {
    const role = roles.find(r => r.nom === nomRole);
    if (!role) return;

    rolesActifs.push(role);
    entreprise.tresorerie -= role.salaire;

    alert(`${nomRole} embauché !`);

    afficherRoles();
}

// Chargement automatique
afficherRoles();
