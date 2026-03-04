// ===============================
// NAVIGATION GEO EMPIRE
// ===============================
//
// Gère l'affichage des pages :
// - Trésorerie
// - Entreprises
// - Holdings
// - Conglomérats
// - Rôles
// - Boutique
// - Loterie
//
// Compatible avec tous les modules PRO
// ===============================


// ===============================
// LISTE DES PAGES
// ===============================

const GE_PAGES = {
    tresorerie: "contenu-tresorerie",
    entreprises: "contenu-entreprises",
    holdings: "contenu-holdings",
    conglom: "contenu-conglom",
    roles: "contenu-roles",
    boutique: "contenu-boutique",
    loterie: "contenu-loterie"
};


// ===============================
// MASQUER TOUTES LES PAGES
// ===============================

function ge_cacherToutesLesPages() {
    Object.values(GE_PAGES).forEach(id => {
        const zone = document.getElementById(id);
        if (zone) zone.style.display = "none";
    });
}


// ===============================
// AFFICHER UNE PAGE
// ===============================

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
            if (typeof ge_afficherTresorerie === "function") ge_afficherTresorerie();
            break;

        case "entreprises":
            if (typeof ge_afficherStructures === "function") ge_afficherStructures();
            break;

        case "roles":
            if (typeof afficherRoles === "function") afficherRoles();
            break;

        case "boutique":
            if (typeof afficherBoutique === "function") afficherBoutique();
            break;

        case "loterie":
            if (typeof ge_afficherLoterie === "function") ge_afficherLoterie();
            break;
    }
}


// ===============================
// ACTIVER UN BOUTON DU MENU
// ===============================

function ge_activerBoutonMenu(btnId) {
    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("menu-actif");
    });

    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add("menu-actif");
}


// ===============================
// NAVIGATION PRINCIPALE
// ===============================

function ge_naviguer(page, boutonId = null) {
    ge_afficherPage(page);
    if (boutonId) ge_activerBoutonMenu(boutonId);
}


// ===============================
// CHARGEMENT INITIAL
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    ge_naviguer("tresorerie", "btn-tresorerie");
});
