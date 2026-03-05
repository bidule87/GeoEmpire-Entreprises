// ===============================
// MODULE MENU GEO EMPIRE
// ===============================
//
// Gère l'affichage des différentes sections du jeu :
// - Trésorerie
// - Dashboard
// - Entreprises
// - Holdings
// - Conglomérats
// - Rôles
// - Boutique
// - Loterie
// - Immobilisations (NOUVEAU)
// ===============================


// Liste des pages disponibles
const GE_PAGES = {
    tresorerie: "contenu-tresorerie",
    dashboard: "contenu-dashboard",
    entreprises: "contenu-entreprises",
    holdings: "contenu-holdings",
    conglom: "contenu-conglom",
    roles: "contenu-roles",
    boutique: "contenu-boutique",
    loterie: "contenu-loterie",
    immobilisations: "contenu-immobilisations"   // ← AJOUT OFFICIEL
};


// Masque toutes les pages
function ge_cacherToutesLesPages() {
    Object.values(GE_PAGES).forEach(id => {
        const zone = document.getElementById(id);
        if (zone) zone.style.display = "none";
    });
}


// Affiche une page spécifique
function ge_afficherPage(page) {
    ge_cacherToutesLesPages();

    const id = GE_PAGES[page];
    const zone = document.getElementById(id);

    if (!zone) {
        console.warn("Page inconnue :", page);
        return;
    }

    zone.style.display = "block";

    // Chargement automatique des modules
    switch (page) {

        case "tresorerie":
            ge_afficherTresorerie();
            break;

        case "dashboard":
            if (typeof ge_afficherDashboard === "function") ge_afficherDashboard();
            break;

        case "entreprises":
            ge_afficherStructures();
            break;

        case "roles":
            afficherRoles();
            break;

        case "boutique":
            if (typeof afficherBoutique === "function") afficherBoutique();
            break;

        case "loterie":
            if (typeof ge_afficherLoterie === "function") ge_afficherLoterie();
            break;

        case "immobilisations":                     // ← AJOUT OFFICIEL
            if (typeof afficherImmobilisations === "function") {
                afficherImmobilisations();
            }
            break;
    }
}


// Active un bouton du menu
function ge_activerBoutonMenu(btnId) {
    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("menu-actif");
    });

    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add("menu-actif");
}


// Navigation principale
function ge_naviguer(page, boutonId = null) {
    ge_afficherPage(page);
    if (boutonId) ge_activerBoutonMenu(boutonId);
}


// Chargement initial
document.addEventListener("DOMContentLoaded", () => {
    ge_naviguer("tresorerie", "btn-tresorerie");
});
