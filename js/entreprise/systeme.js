// ===============================
// IMPORTS MODULES SYSTEME (VERSION PRO)
// ===============================
import { ge_calculerPatrimoine, ge_tauxGToken, ge_limitePrime } from "./entreprise/systeme_patrimoine.js";
import { ge_definirPrime, ge_transfertPrimesMinuit } from "./entreprise/systeme_primes.js";
import { ge_injecterGToken } from "./entreprise/systeme_gtoken.js";
import { ge_recruterRole, ge_peutFaire } from "./entreprise/systeme_roles.js";
import { ge_creerFilialeAvecActionnaires, ge_distribuerGTokens } from "./entreprise/systeme_actionnaires.js";


// ===============================
// SYSTEME ECONOMIQUE GEO EMPIRE
// ===============================

const entreprise = {
    apportInitial: 0,
    tresorerie: 0,
    valeurBiens: 0,
    prestige: false,
    autoManager: false,
    beneficeSemaine: 0
};

const marketing = {
    budgetJournalier: 0,
    couleur: "rouge"
};

let biensDisponibles = [];
let biensPossedes = [];


// ===============================
// OUTILS
// ===============================
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ===============================
// BONUS PRESTIGE (MANQUANT DANS TON CODE)
// ===============================
function bonusPrestigeValeur(bien, net) {
    if (!entreprise.prestige) return net;
    return Math.round(net * 1.15); // +15% de rentabilité
}


// ===============================
// GENERATION IA DES BIENS
// ===============================
const categoriesPossibles = [
    "Bureaux", "Commerces", "Industriels",
    "Transport", "Zones", "Espace"
];

function genererBienIA() {
    const categorie = categoriesPossibles[randomInt(0, categoriesPossibles.length - 1)];
    const basePrix = randomInt(100_000, 5_000_000);

    const loyer = Math.round(basePrix * (0.005 + Math.random() * 0.02));
    const charges = Math.round(loyer * (0.05 + Math.random() * 0.15));
    const impots = Math.round((loyer - charges) * (0.05 + Math.random() * 0.25));

    return {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
        categorie,
        type: `${randomInt(100, 3000)}m² de ${categorie.toLowerCase()}`,
        prixAchat: basePrix,
        loyer,
        charges,
        impots,
        disponibilite: randomInt(10, 500),
        assure: false,
        assurance: null,
        rentabilite: 0
    };
}

function genererBiensPourCategorie() {
    const nb = randomInt(100, 500);
    const nouveaux = [];

    for (let i = 0; i < nb; i++) {
        const bien = genererBienIA();
        bien.rentabilite = calculerRentabilite(bien);
        nouveaux.push(bien);
    }

    biensDisponibles = biensDisponibles.concat(nouveaux);
}


// ===============================
// RENTABILITE
// ===============================
function calculerRentabilite(bien) {
    const net = bien.loyer - bien.charges - bien.impots;
    const netPrestige = bonusPrestigeValeur(bien, net);
    return netPrestige / bien.prixAchat;
}

function valeurTotaleBiens() {
    return biensPossedes.reduce((sum, b) => sum + b.prixAchat, 0);
}

function peutAcheter(bien) {
    const nouvelleValeur = valeurTotaleBiens() + bien.prixAchat;
    if (nouvelleValeur > 5_000_000_000) return false;
    if (entreprise.tresorerie < bien.prixAchat) return false;
    return true;
}


// ===============================
// MARKETING
// ===============================
function estimerGainJournalier() {
    return biensPossedes.reduce((sum, b) => {
        const net = b.loyer - b.charges - b.impots;
        return sum + Math.max(net, 0);
    }, 0);
}

function mettreAJourMarketing() {

    // AUTO-MANAGER : marketing automatique
    if (entreprise.autoManager) {
        marketing.budgetJournalier = Math.round(entreprise.tresorerie * 0.02);
    }

    const gain = estimerGainJournalier();
    if (gain <= 0) {
        marketing.couleur = "rouge";
        return;
    }

    const ratio = marketing.budgetJournalier / gain;

    if (ratio < 0.05) marketing.couleur = "rouge";
    else if (ratio < 0.10) marketing.couleur = "orange";
    else if (ratio < 0.13) marketing.couleur = "jaune";
    else if (ratio < 0.16) marketing.couleur = "vert_clair";
    else if (ratio < 0.18) marketing.couleur = "vert_fonce";
    else marketing.couleur = "bleu";
}

function probaVenteLocation() {
    switch (marketing.couleur) {
        case "rouge": return 0.05;
        case "orange": return 0.15;
        case "jaune": return 0.30;
        case "vert_clair": return 0.55;
        case "vert_fonce": return 0.75;
        case "bleu": return 0.95;
        default: return 0.10;
    }
}


// ===============================
// ASSURANCE
// ===============================
function assurerBien(bien, coutAssurance) {
    if (bien.assure) return true;
    if (entreprise.tresorerie < coutAssurance) return false;

    entreprise.tresorerie -= coutAssurance;
    bien.assure = true;
    return true;
}


// ===============================
// ACHAT (AVEC PERMISSIONS)
// ===============================
function acheterBien(bien, coutAssurance, role) {

    if (!ge_peutFaire(role, "acheter")) {
        alert("Vous n'avez pas la permission d'acheter.");
        return false;
    }

    if (!peutAcheter(bien)) return false;
    if (!assurerBien(bien, coutAssurance)) return false;

    entreprise.tresorerie -= bien.prixAchat;
    biensPossedes.push(bien);
    biensDisponibles = biensDisponibles.filter(b => b.id !== bien.id);
    entreprise.valeurBiens = valeurTotaleBiens();

    return true;
}


// ===============================
// VENTES & LOCATIONS A MINUIT
// ===============================
function traiterLocationsEtVentesMinuit() {
    const proba = probaVenteLocation();
    let benefJour = 0;

    biensPossedes.forEach(bien => {
        if (Math.random() < proba) {
            const net = bien.loyer - bien.charges - bien.impots;
            if (net > 0) {
                entreprise.tresorerie += net;
                benefJour += net;
            }
        }
    });

    entreprise.beneficeSemaine += benefJour;
}


// ===============================
// IMPOTS HEBDOMADAIRES
// ===============================
function appliquerImpotsHebdo(tauxImpots = 0.25) {
    if (entreprise.beneficeSemaine <= 0) {
        entreprise.beneficeSemaine = 0;
        return;
    }

    const impots = Math.round(entreprise.beneficeSemaine * tauxImpots);
    entreprise.tresorerie -= impots;
    entreprise.beneficeSemaine = 0;
}
