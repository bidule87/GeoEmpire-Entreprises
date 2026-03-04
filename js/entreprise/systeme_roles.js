// ===============================
// ROLES & PERMISSIONS
// ===============================

const PERMISSIONS = {
    PDG: ["acheter", "vendre", "louer", "assurer", "marketing", "gtoken", "actionnaires"],
    COMPTABLE: ["acheter", "vendre", "louer", "assurer", "marketing", "gtoken", "actionnaires"],
    DG: ["acheter", "vendre", "louer", "assurer"],
    DC: ["vendre", "louer"]
};

function peutFaire(role, action) {
    return PERMISSIONS[role]?.includes(action);
}

// Recruter un joueur dans un rôle
function recruterRole(entreprise, role, joueur) {
    entreprise.roles[role] = joueur.id;
}
