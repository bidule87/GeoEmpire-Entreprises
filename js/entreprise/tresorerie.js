// ===============================
// MODULE TRÉSORERIE GEO EMPIRE
// ===============================
//
// Affiche :
// - trésorerie
// - gain journalier
// - bénéfice hebdo
// - marketing
// - primes
//
// Compatible avec :
// - Auto-Manager
// - Holdings / Entreprises / Conglomérats
// - Système de primes PRO
// ===============================


// ===============================
// AFFICHAGE TRÉSORERIE
// ===============================

function ge_afficherTresorerie() {
    const cont = document.getElementById("contenu-tresorerie");
    if (!cont) return;

    const treso = entreprise.tresorerie || 0;
    const gainJour = estimerGainJournalier();
    const benefHebdo = entreprise.beneficeSemaine || 0;

    cont.innerHTML = `
        <h2 style="color:#00aaff;">Trésorerie</h2>

        <p style="font-size:18px;">
            Trésorerie actuelle : <strong>${treso.toLocaleString()} Ø</strong>
        </p>

        <p style="font-size:18px;">
            Gain journalier estimé : <strong>${gainJour.toLocaleString()} Ø</strong>
        </p>

        <p style="font-size:18px;">
            Bénéfice hebdomadaire (avant impôts) : <strong>${benefHebdo.toLocaleString()} Ø</strong>
        </p>

        <h3 style="color:#00aaff;">Marketing</h3>

        <p>
            Clients : <span class="point-marketing point-${marketing.couleur}"></span>
        </p>

        <label>Budget marketing journalier :</label>
        <input type="number" id="inputMarketing" value="${marketing.budgetJournalier}" style="width:150px;">
        <button onclick="ge_changerBudgetMarketing()">Valider</button>

        <h3 style="margin-top:25px; color:#00aaff;">Primes</h3>

        <div>
            <label>Montant :</label>
            <input type="number" id="prime-montant" style="width:120px;">
        </div>

        <div style="margin-top:10px;">
            <label>Cible :</label>
            <select id="prime-cible" onchange="ge_mettreAJourListeCibles()">
                <option value="joueur">Joueur</option>
                <option value="entreprise">Entreprise</option>
                <option value="holding">Holding</option>
                <option value="conglomerat">Conglomérat</option>
            </select>
        </div>

        <select id="prime-cible-liste" style="display:none; margin-top:10px;"></select>

        <button style="margin-top:10px;" onclick="ge_validerPrime()">Valider la prime</button>

        <h3 style="margin-top:25px; color:#00aaff;">Historique des primes</h3>
        <div id="historique-primes" style="max-height:200px; overflow-y:auto;"></div>
    `;
}


// ===============================
// CHANGEMENT BUDGET MARKETING
// ===============================

function ge_changerBudgetMarketing() {
    const val = parseInt(document.getElementById("inputMarketing").value);
    if (isNaN(val) || val < 0) return;

    marketing.budgetJournalier = val;
    mettreAJourMarketing();
    ge_afficherTresorerie();
}


// ===============================
// PRIMES
// ===============================

let historiquePrimes = [];

function ge_validerPrime() {
    const montant = parseInt(document.getElementById("prime-montant").value, 10);
    const type = document.getElementById("prime-cible").value;
    const liste = document.getElementById("prime-cible-liste");

    if (isNaN(montant) || montant <= 0) {
        alert("Montant invalide.");
        return;
    }

    let message = "";

    // Cible joueur
    if (type === "joueur") {
        entreprise.tresorerie -= montant;
        message = `Prime de ${montant.toLocaleString()} Ø versée au joueur.`;
    }

    // Cible entreprise / holding / conglomérat
    else {
        const id = liste.value;
        let cibleObj = null;

        if (type === "entreprise") cibleObj = entreprises.find(e => e.id == id);
        if (type === "holding") cibleObj = holdings.find(h => h.id == id);
        if (type === "conglomerat") cibleObj = conglomerats.find(c => c.id == id);

        if (!cibleObj) {
            alert("Cible introuvable.");
            return;
        }

        cibleObj.tresorerie = (cibleObj.tresorerie || 0) + montant;
        entreprise.tresorerie -= montant;

        message = `Prime de ${montant.toLocaleString()} Ø versée à ${cibleObj.nom}.`;
    }

    historiquePrimes.push(message);
    ge_afficherHistoriquePrimes();
    ge_afficherTresorerie();
}


// ===============================
// HISTORIQUE DES PRIMES
// ===============================

function ge_afficherHistoriquePrimes() {
    const zone = document.getElementById("historique-primes");
    if (!zone) return;

    zone.innerHTML = historiquePrimes.map(l => `<div>• ${l}</div>`).join("");
}


// ===============================
// LISTE DES CIBLES
// ===============================

function ge_mettreAJourListeCibles() {
    const type = document.getElementById("prime-cible").value;
    const liste = document.getElementById("prime-cible-liste");

    liste.innerHTML = "";
    liste.style.display = "none";

    let source = [];

    if (type === "entreprise") source = entreprises;
    if (type === "holding") source = holdings;
    if (type === "conglomerat") source = conglomerats;

    if (source.length === 0 || type === "joueur") return;

    liste.style.display = "block";

    source.forEach(obj => {
        const opt = document.createElement("option");
        opt.value = obj.id;
        opt.textContent = obj.nom;
        liste.appendChild(opt);
    });
}


// ===============================
// CHARGEMENT AUTOMATIQUE
// ===============================

ge_afficherTresorerie();
