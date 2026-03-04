// ===============================
// SÉCURISATION DES VARIABLES GLOBALES
// ===============================

if (typeof entreprises === "undefined") var entreprises = [];
if (typeof holdings === "undefined") var holdings = [];
if (typeof filiales === "undefined") var filiales = [];
if (typeof conglomerats === "undefined") var conglomerats = [];


// ===============================
// STRUCTURES : ENTREPRISES / HOLDINGS / FILIALES / CONGLOMÉRATS
// ===============================
//
// Chaque structure possède :
// - id
// - nom
// - trésorerie
// - valeur
// - liens hiérarchiques
// ===============================


// ===============================
// CRÉATION D'UNE ENTREPRISE
// ===============================

function ge_creerEntreprise(nom) {
    const id = Date.now();

    entreprises.push({
        id: id,
        nom: nom,
        tresorerie: 0,
        valeur: 0,
        holdings: [],      // holdings rattachées
        filiales: [],      // filiales rattachées
        role: null         // PDG / DG / Comptable / etc.
    });
}


// ===============================
// CRÉATION D'UNE HOLDING
// ===============================

function ge_creerHolding(nom) {
    const id = Date.now();

    holdings.push({
        id: id,
        nom: nom,
        tresorerie: 0,
        valeur: 0,
        entreprises: [],   // entreprises rattachées
        filiales: [],      // filiales rattachées
        conglomeraId: null
    });
}


// ===============================
// CRÉATION D'UNE FILIALE
// ===============================

function ge_creerFiliale(nom, holdingId) {
    const id = Date.now();
    const h = holdings.find(x => x.id === holdingId);
    if (!h) return;

    const filiale = {
        id: id,
        nom: nom,
        tresorerie: 0,
        valeur: 0,
        holdingId: holdingId
    };

    filiales.push(filiale);
    h.filiales.push(id);
}


// ===============================
// CRÉATION D'UN CONGLOMÉRAT
// ===============================

function ge_creerConglomerat(nom) {
    const id = Date.now();

    conglomerats.push({
        id: id,
        nom: nom,
        tresorerie: 0,
        valeur: 0,
        holdings: []       // holdings rattachées
    });
}


// ===============================
// RATTACHER UNE HOLDING À UN CONGLOMÉRAT
// ===============================

function ge_rattacherHolding(holdingId, conglomeraId) {
    const h = holdings.find(x => x.id === holdingId);
    const c = conglomerats.find(x => x.id === conglomeraId);
    if (!h || !c) return;

    h.conglomeraId = conglomeraId;
    c.holdings.push(h.id);
}
