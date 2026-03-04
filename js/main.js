// ===============================
// GEO EMPIRE — INITIALISATION GLOBALE
// ===============================
//
// Ce fichier démarre tout le jeu :
// - affichage du menu principal
// - génération des biens IA
// - mise à jour marketing
// - affichage des modules (trésorerie, entreprises, rôles…)
// - cycles minuit / hebdo
// ===============================


// ===============================
// LANCEMENT DU JEU
// ===============================

window.onload = () => {

    console.log("Geo Empire – Entreprise chargé.");

    // Affiche le menu principal
    const menu = document.getElementById("menu-principal");
    if (menu) menu.classList.add("actif");

    // Génération initiale des biens IA
    genererBiensPourCategorie();

    // Mise à jour marketing initiale
    mettreAJourMarketing();

    // Affichage des modules principaux
    if (typeof ge_afficherTresorerie === "function") ge_afficherTresorerie();
    if (typeof ge_afficherStructures === "function") ge_afficherStructures();
    if (typeof afficherRoles === "function") afficherRoles();

    // Lancement des cycles automatiques
    lancerCycleMinuit();
    lancerCycleHebdo();
};



// ===============================
// CYCLE AUTOMATIQUE : MINUIT
// ===============================
//
// - locations & ventes
// - primes
// - marketing
// ===============================

function lancerCycleMinuit() {

    setInterval(() => {

        console.log("Cycle minuit exécuté.");

        // Locations & ventes
        traiterLocationsEtVentesMinuit();

        // Primes automatiques
        if (typeof ge_transfertPrimesMinuit === "function") {
            ge_transfertPrimesMinuit(holding, joueurs || []);
        }

        // Marketing
        mettreAJourMarketing();

        // Mise à jour UI
        if (typeof ge_afficherTresorerie === "function") ge_afficherTresorerie();

    }, 60 * 1000); // 1 minute = 1 jour dans ton jeu
}



// ===============================
// CYCLE AUTOMATIQUE : IMPÔTS HEBDOMADAIRES
// ===============================

function lancerCycleHebdo() {

    setInterval(() => {

        console.log("Cycle hebdomadaire exécuté.");

        appliquerImpotsHebdo();

        if (typeof ge_afficherTresorerie === "function") ge_afficherTresorerie();

    }, 7 * 60 * 1000); // 7 minutes = 1 semaine dans ton jeu
}
