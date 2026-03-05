// ===============================
// IMPORTS MODULES SYSTEME (VERSION PRO)
// ===============================
import { ge_calculerPatrimoine, ge_tauxGToken, ge_limitePrime } from "./entreprise/systeme_patrimoine.js";
import { ge_definirPrime, ge_transfertPrimesMinuit } from "./entreprise/systeme_primes.js";
import { ge_injecterGToken } from "./entreprise/systeme_gtoken.js";
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
    const nb = 50; // 50 biens par vague, comme tu l’as demandé
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
// ===============================
// UI IMMOBILISATIONS (ULTRA PRO - VERSION 1)
// ===============================

function afficherImmobilisations() {
    const cont = document.getElementById("contenu-immobilisations");
    if (!cont) return;

    // Si pas encore de biens générés, on en crée une vague
    if (biensDisponibles.length === 0) {
        genererBiensPourCategorie();
    }

    const role = (typeof joueur !== "undefined" && joueur.role) ? joueur.role : "Aucun rôle";

    const valeurBiens = valeurTotaleBiens();
    const gainJour = estimerGainJournalier();

    let html = `
        <h2 style="color:#00aaff; text-shadow:0 0 8px #0077cc;">Immobilisations</h2>

        <p><strong>Rôle :</strong> ${role}</p>
        <p><strong>Valeur totale des biens :</strong> ${valeurBiens.toLocaleString()} Ø</p>
        <p><strong>Gain journalier estimé :</strong> ${gainJour.toLocaleString()} Ø</p>

        <hr style="border-color:#004466; margin:15px 0;">

        <h3 style="color:#00aaff;">Biens possédés</h3>
    `;

    if (biensPossedes.length === 0) {
        html += `<p>Aucun bien pour le moment.</p>`;
    } else {
        html += `
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
                <tr style="background:#003355; color:white;">
                    <th style="padding:8px;">Catégorie</th>
                    <th style="padding:8px;">Type</th>
                    <th style="padding:8px;">Valeur</th>
                    <th style="padding:8px;">Loyer net</th>
                    <th style="padding:8px;">Assuré</th>
                </tr>
        `;

        biensPossedes.forEach(bien => {
            const net = bien.loyer - bien.charges - bien.impots;
            html += `
                <tr style="background:#001a33; color:#ddd;">
                    <td style="padding:8px;">${bien.categorie}</td>
                    <td style="padding:8px;">${bien.type}</td>
                    <td style="padding:8px;">${bien.prixAchat.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${net.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${bien.assure ? "Oui" : "Non"}</td>
                </tr>
            `;
        });

        html += `</table>`;
    }

    // SECTION CATALOGUE + RECOMMANDÉS (C comme tu as choisi)
    html += `
        <hr style="border-color:#004466; margin:15px 0;">
        <h3 style="color:#00aaff;">Catalogue des biens disponibles</h3>
        <p style="font-size:0.9em; color:#aaa;">L’IA génère automatiquement les biens. 50 par vague.</p>

        <table style="width:100%; border-collapse:collapse;">
            <tr style="background:#003355; color:white;">
                <th style="padding:8px;">Catégorie</th>
                <th style="padding:8px;">Type</th>
                <th style="padding:8px;">Prix</th>
                <th style="padding:8px;">Loyer</th>
                <th style="padding:8px;">Charges</th>
                <th style="padding:8px;">Impôts</th>
                <th style="padding:8px;">Action</th>
            </tr>
    `;

    biensDisponibles.slice(0, 50).forEach(bien => {
        html += `
            <tr style="background:#001a33; color:#ddd;">
                <td style="padding:8px;">${bien.categorie}</td>
                <td style="padding:8px;">${bien.type}</td>
                <td style="padding:8px;">${bien.prixAchat.toLocaleString()} Ø</td>
                <td style="padding:8px;">${bien.loyer.toLocaleString()} Ø</td>
                <td style="padding:8px;">${bien.charges.toLocaleString()} Ø</td>
                <td style="padding:8px;">${bien.impots.toLocaleString()} Ø</td>
                <td style="padding:8px;">
                    <button style="padding:4px 8px;" onclick="ge_uiAcheterBien('${bien.id}')">Acheter</button>
                </td>
            </tr>
        `;
    });

    html += `</table>`;

    cont.innerHTML = html;
}


// ===============================
// UI : ACTION ACHAT (connectée au système PRO)
// ===============================
function ge_uiAcheterBien(idBien) {
    const bien = biensDisponibles.find(b => b.id === idBien);
    if (!bien) return;

    const coutAssurance = Math.round(bien.prixAchat * 0.01); // 1% pour l’instant

    const role = (typeof joueur !== "undefined" && joueur.role) ? joueur.role : "Aucun rôle";

    const ok = acheterBien(bien, coutAssurance, role);
    if (!ok) return;

    alert("Bien acheté avec succès.");
    afficherImmobilisations();
}
// ===============================
// IMMOBILISATIONS ULTRA PRO
// ===============================
//
// - Utilise : entreprise, biensDisponibles, biensPossedes, acheterBien,
//             valeurTotaleBiens, estimerGainJournalier, ge_peutFaire
// - Intégré au menu via ge_naviguer('immobilisations')
// ===============================

// Marquage des biens recommandés / proposés
let ge_biensRecommandes = [];   // ids de biens recommandés par PDG / direction
let ge_biensProposes = [];      // ids de biens proposés par DC / employés


function ge_estRecommande(id) {
    return ge_biensRecommandes.includes(id);
}

function ge_estPropose(id) {
    return ge_biensProposes.includes(id);
}


// ===============================
// UI PRINCIPALE IMMOBILISATIONS
// ===============================

function afficherImmobilisations() {
    const cont = document.getElementById("contenu-immobilisations");
    if (!cont) return;

    // Si aucun bien dispo, on génère une vague IA
    if (biensDisponibles.length === 0) {
        genererBiensPourCategorie();
    }

    const role = (typeof joueur !== "undefined" && joueur.role) ? joueur.role : "Aucun rôle";
    const valeurBiens = valeurTotaleBiens();
    const gainJour = estimerGainJournalier();

    let html = `
        <h2 style="color:#00aaff; text-shadow:0 0 8px #0077cc;">Immobilisations</h2>

        <p><strong>Rôle :</strong> ${role}</p>
        <p><strong>Valeur totale des biens :</strong> ${valeurBiens.toLocaleString()} Ø</p>
        <p><strong>Gain journalier estimé :</strong> ${gainJour.toLocaleString()} Ø</p>

        <hr style="border-color:#004466; margin:15px 0;">
    `;

    // ===============================
    // BIENS POSSÉDÉS
    // ===============================

    html += `<h3 style="color:#00aaff;">Biens possédés</h3>`;

    if (biensPossedes.length === 0) {
        html += `<p>Aucun bien pour le moment.</p>`;
    } else {
        html += `
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
                <tr style="background:#003355; color:white;">
                    <th style="padding:8px;">Catégorie</th>
                    <th style="padding:8px;">Type</th>
                    <th style="padding:8px;">Valeur</th>
                    <th style="padding:8px;">Loyer net</th>
                    <th style="padding:8px;">Assuré</th>
                    <th style="padding:8px;">Action</th>
                </tr>
        `;

        biensPossedes.forEach(bien => {
            const net = bien.loyer - bien.charges - bien.impots;

            let actions = "";
            if (ge_peutFaire(role, "vendre")) {
                actions += `<button style="margin-right:4px;" onclick="ge_vendreBien('${bien.id}')">Vendre</button>`;
            }

            html += `
                <tr style="background:#001a33; color:#ddd;">
                    <td style="padding:8px;">${bien.categorie}</td>
                    <td style="padding:8px;">${bien.type}</td>
                    <td style="padding:8px;">${bien.prixAchat.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${net.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${bien.assure ? "Oui" : "Non"}</td>
                    <td style="padding:8px;">${actions}</td>
                </tr>
            `;
        });

        html += `</table>`;
    }

    // ===============================
    // BIENS RECOMMANDÉS PAR LA DIRECTION
    // ===============================

    const biensRecommandes = biensDisponibles.filter(b => ge_estRecommande(b.id));

    html += `
        <hr style="border-color:#004466; margin:15px 0;">
        <h3 style="color:#00aaff;">Biens recommandés par la direction</h3>
    `;

    if (biensRecommandes.length === 0) {
        html += `<p>Aucun bien recommandé pour le moment.</p>`;
    } else {
        html += `
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
                <tr style="background:#003355; color:white;">
                    <th style="padding:8px;">Catégorie</th>
                    <th style="padding:8px;">Type</th>
                    <th style="padding:8px;">Prix</th>
                    <th style="padding:8px;">Loyer net</th>
                    <th style="padding:8px;">Action</th>
                </tr>
        `;

        biensRecommandes.forEach(bien => {
            const net = bien.loyer - bien.charges - bien.impots;

            let actions = "";

            if (ge_peutFaire(role, "acheter")) {
                actions += `<button style="margin-right:4px;" onclick="ge_uiAcheterBien('${bien.id}')">Acheter</button>`;
            }

            html += `
                <tr style="background:#001a33; color:#ddd;">
                    <td style="padding:8px;">${bien.categorie}</td>
                    <td style="padding:8px;">${bien.type}</td>
                    <td style="padding:8px;">${bien.prixAchat.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${net.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${actions}</td>
                </tr>
            `;
        });

        html += `</table>`;
    }

    // ===============================
    // CATALOGUE IA (50 biens)
    // ===============================

    html += `
        <hr style="border-color:#004466; margin:15px 0;">
        <h3 style="color:#00aaff;">Catalogue des biens disponibles</h3>
        <p style="font-size:0.9em; color:#aaa;">L’IA génère automatiquement les biens. 50 par vague.</p>

        <table style="width:100%; border-collapse:collapse;">
            <tr style="background:#003355; color:white;">
                <th style="padding:8px;">Catégorie</th>
                <th style="padding:8px;">Type</th>
                <th style="padding:8px;">Prix</th>
                <th style="padding:8px;">Loyer</th>
                <th style="padding:8px;">Charges</th>
                <th style="padding:8px;">Impôts</th>
                <th style="padding:8px;">Actions</th>
            </tr>
    `;

    biensDisponibles.slice(0, 50).forEach(bien => {
        const estReco = ge_estRecommande(bien.id);
        const estProp = ge_estPropose(bien.id);

        let actions = "";

        // Achat (DG, PDG, Comptable, Actionnaire)
        if (ge_peutFaire(role, "acheter")) {
            actions += `<button style="margin-right:4px;" onclick="ge_uiAcheterBien('${bien.id}')">Acheter</button>`;
        }

        // Recommandation (PDG / Comptable / Actionnaire)
        if (["PDG", "Comptable", "Actionnaire"].includes(role)) {
            actions += `<button style="margin-right:4px;" onclick="ge_recommanderBien('${bien.id}')">${estReco ? "Retirer" : "Recommander"}</button>`;
        }

        // Proposition d’achat (DC)
        if (role === "DirecteurCommercial" && !estProp) {
            actions += `<button style="margin-right:4px;" onclick="ge_proposerAchatBien('${bien.id}')">Proposer</button>`;
        } else if (role === "DirecteurCommercial" && estProp) {
            actions += `<span style="font-size:0.8em; color:#0f0;">Proposé</span>`;
        }

        html += `
            <tr style="background:#001a33; color:#ddd;">
                <td style="padding:8px;">${bien.categorie}</td>
                <td style="padding:8px;">${bien.type}</td>
                <td style="padding:8px;">${bien.prixAchat.toLocaleString()} Ø</td>
                <td style="padding:8px;">${bien.loyer.toLocaleString()} Ø</td>
                <td style="padding:8px;">${bien.charges.toLocaleString()} Ø</td>
                <td style="padding:8px;">${bien.impots.toLocaleString()} Ø</td>
                <td style="padding:8px;">${actions}</td>
            </tr>
        `;
    });

    html += `</table>`;

    cont.innerHTML = html;
}


// ===============================
// ACTION : ACHAT
// ===============================

function ge_uiAcheterBien(idBien) {
    const bien = biensDisponibles.find(b => b.id === idBien);
    if (!bien) return;

    const role = (typeof joueur !== "undefined" && joueur.role) ? joueur.role : "Aucun rôle";
    const coutAssurance = Math.round(bien.prixAchat * 0.01);

    const ok = acheterBien(bien, coutAssurance, role);
    if (!ok) return;

    // Si le bien était recommandé / proposé, on le retire des listes
    ge_biensRecommandes = ge_biensRecommandes.filter(id => id !== idBien);
    ge_biensProposes = ge_biensProposes.filter(id => id !== idBien);

    alert("Bien acheté avec succès !");
    afficherImmobilisations();
}


// ===============================
// ACTION : VENTE
// ===============================

function ge_vendreBien(idBien) {
    const bien = biensPossedes.find(b => b.id === idBien);
    if (!bien) return;

    const role = (typeof joueur !== "undefined" && joueur.role) ? joueur.role : "Aucun rôle";

    if (!ge_peutFaire(role, "vendre")) {
        alert("Vous n'avez pas la permission de vendre.");
        return;
    }

    const prixVente = Math.round(bien.prixAchat * 0.85);

    entreprise.tresorerie += prixVente;
    biensPossedes = biensPossedes.filter(b => b.id !== idBien);

    alert(`Bien vendu pour ${prixVente.toLocaleString()} Ø`);
    afficherImmobilisations();
}


// ===============================
// ACTION : RECOMMANDER UN BIEN (PDG / COMPTABLE / ACTIONNAIRE)
// ===============================

function ge_recommanderBien(idBien) {
    const role = (typeof joueur !== "undefined" && joueur.role) ? joueur.role : "Aucun rôle";

    if (!["PDG", "Comptable", "Actionnaire"].includes(role)) return;

    if (ge_estRecommande(idBien)) {
        ge_biensRecommandes = ge_biensRecommandes.filter(id => id !== idBien);
    } else {
        ge_biensRecommandes.push(idBien);
    }

    afficherImmobilisations();
}


// ===============================
// ACTION : PROPOSER UN ACHAT (DC)
// ===============================

function ge_proposerAchatBien(idBien) {
    const role = (typeof joueur !== "undefined" && joueur.role) ? joueur.role : "Aucun rôle";

    if (role !== "DirecteurCommercial") return;
    if (ge_estPropose(idBien)) return;

    ge_biensProposes.push(idBien);
    alert("Proposition d'achat envoyée à la direction.");
    afficherImmobilisations();
}


// ===============================
// EXPORT GLOBAL POUR LE MENU
// ===============================

window.afficherImmobilisations = afficherImmobilisations;
window.ge_uiAcheterBien = ge_uiAcheterBien;
window.ge_vendreBien = ge_vendreBien;
window.ge_recommanderBien = ge_recommanderBien;
window.ge_proposerAchatBien = ge_proposerAchatBien;
