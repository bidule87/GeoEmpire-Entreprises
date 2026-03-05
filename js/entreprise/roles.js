// ===============================
// SYSTÈME DES RÔLES & PERMISSIONS GEO EMPIRE
// ===============================
//
// Rôles officiels :
// - PDG
// - Directeur Général
// - Directeur Commercial
// - Comptable
// - Actionnaire (mêmes droits que PDG)
// ===============================


// ===============================
// PERMISSIONS PAR RÔLE
// ===============================

const GE_PERMISSIONS = {
    PDG: ["acheter", "vendre", "louer", "assurer", "marketing", "gtoken", "actionnaires"],
    Comptable: ["acheter", "vendre", "louer", "assurer", "marketing", "gtoken", "actionnaires"],
    Actionnaire: ["acheter", "vendre", "louer", "assurer", "marketing", "gtoken", "actionnaires"],

    DirecteurGeneral: ["acheter", "vendre", "louer", "assurer"],

    DirecteurCommercial: ["vendre", "louer", "assurer"]
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
            Comptable: null,
            Actionnaire: null
        };
    }

    entreprise.roles[role] = joueur.id;
}
