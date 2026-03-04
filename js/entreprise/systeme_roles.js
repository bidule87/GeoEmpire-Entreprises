// ===============================
// SYSTÈME DES RÔLES & PERMISSIONS GEO EMPIRE
// ===============================
//
// Rôles officiels :
// - PDG
// - Directeur Général
// - Directeur Commercial
// - Comptable
//
// Chaque rôle donne accès à certaines actions.
// ===============================


// ===============================
// PERMISSIONS PAR RÔLE
// ===============================

const GE_PERMISSIONS = {
    PDG: ["acheter", "vendre", "louer", "assurer", "marketing", "gtoken", "actionnaires"],
    DirecteurGeneral: ["acheter", "vendre", "louer", "assurer"],
    DirecteurCommercial: ["vendre", "louer"],
    Comptable: ["acheter", "vendre", "louer", "assurer", "marketing", "gtoken", "actionnaires"]
};


// ===============================
// VÉRIFIER UNE PERMISSION
// ===============================

function ge_peutFaire(role, action) {
    return GE_PERMISSIONS[role]?.includes(action) || false;
}


// ===============================
// ATTRIBUER UN RÔLE DANS UNE ENTREPRISE
// ===============================

function ge_recruterRole(entreprise, role, joueur) {

    if (!entreprise.roles) {
        entreprise.roles = {
            PDG: null,
            DirecteurGeneral: null,
            DirecteurCommercial: null,
            Comptable: null
        };
    }

    entreprise.roles[role] = joueur.id;
}
