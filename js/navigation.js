// ===============================
// OUVERTURE DES MODULES
// ===============================

function ouvrirModule(nom) {

    // Masquer tous les écrans
    document.querySelectorAll('.ecran').forEach(e => e.classList.remove("actif"));

    // Afficher le bon module
    const module = document.getElementById("module-" + nom);
    if (module) module.classList.add("actif");

    // Appels d'affichage selon le module
    if (nom === "entreprises") ge_afficherStructures();
    if (nom === "immobilisation") afficherImmobilisations();
    if (nom === "bilan") afficherBilan();
    if (nom === "tresorerie") ge_afficherTresorerie();
    if (nom === "roles") afficherRoles();
}

// ===============================
// RETOUR AU MENU
// ===============================

function retourMenu() {
    document.querySelectorAll('.ecran').forEach(e => e.classList.remove("actif"));
    document.getElementById('menu-principal').classList.add('actif');
}
