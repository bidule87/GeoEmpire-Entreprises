// Sécurisation des variables globales si chargées avant entreprise.js
if (typeof entreprises === "undefined") var entreprises = [];
if (typeof holdings === "undefined") var holdings = [];
if (typeof conglomerats === "undefined") var conglomerats = [];

// ===============================
// STRUCTURES : ENTREPRISES / HOLDINGS / CONGLOMERATS
// ===============================

// Création d'une entreprise
function ge_creerEntreprise(nom) {
    const id = Date.now();
    entreprises.push({
        id: id,
        nom: nom,
        tresorerie: 0,
        valeur: 0,
        holdings: []
    });
}

// Création d'une holding
function ge_creerHolding(nom) {
    const id = Date.now();
    holdings.push({
        id: id,
        nom: nom,
        tresorerie: 0,
        entreprises: [],
        conglomeraId: null
    });
}

// Création d'un conglomérat
function ge_creerConglomerat(nom) {
    const id = Date.now();
    conglomerats.push({
        id: id,
        nom: nom,
        tresorerie: 0,
        holdings: []
    });
}

// Rattacher une holding à un conglomérat
function ge_rattacherHolding(holdingId, conglomeraId) {
    const h = holdings.find(x => x.id === holdingId);
    const c = conglomerats.find(x => x.id === conglomeraId);
    if (!h || !c) return;

    h.conglomeraId = conglomeraId;
    c.holdings.push(h.id);
}
