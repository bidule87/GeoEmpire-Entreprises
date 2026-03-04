// ===============================
// MODULE TRÉSORERIE
// ===============================

function afficherTresorerie() {
    const cont = document.getElementById("contenu-tresorerie");
    cont.innerHTML = "";

    const treso = entreprise.tresorerie;
    const gainJour = estimerGainJournalier();
    const benefHebdo = entreprise.beneficeSemaine;

    cont.innerHTML = `
        <h2>Trésorerie</h2>

        <p style="font-size:18px;">
            Trésorerie actuelle : <strong>${treso.toLocaleString()} Ø</strong>
        </p>

        <p style="font-size:18px;">
            Gain journalier estimé : <strong>${gainJour.toLocaleString()} Ø</strong>
        </p>

        <p style="font-size:18px;">
            Bénéfice hebdomadaire (avant impôts) : <strong>${benefHebdo.toLocaleString()} Ø</strong>
        </p>

        <h3>Marketing</h3>

        <p>
            Clients : <span class="point-marketing point-${marketing.couleur}"></span>
        </p>

        <label>Budget marketing journalier :</label>
        <input type="number" id="inputMarketing" value="${marketing.budgetJournalier}" style="width:150px;">
        <button onclick="changerBudgetMarketing()">Valider</button>
    `;
}

function changerBudgetMarketing() {
    const val = parseInt(document.getElementById("inputMarketing").value);
    if (isNaN(val) || val < 0) return;

    marketing.budgetJournalier = val;
    mettreAJourMarketing();
    afficherTresorerie();
}

// Chargement automatique
afficherTresorerie();
let historiquePrimes = [];

function ge_validerPrime() {
    const montant = parseInt(document.getElementById("prime-montant").value, 10);
    const cible = document.getElementById("prime-cible").value;

    if (isNaN(montant) || montant <= 0) {
        alert("Montant invalide.");
        return;
    }

    let message = "";

    switch (cible) {
        case "joueur":
            tresorerie -= montant;
            message = `Prime de ${montant}€ versée au joueur.`;
            break;

        case "entreprise":
            if (entreprises.length === 0) {
                alert("Aucune entreprise disponible.");
                return;
            }
            entreprises[0].tresorerie += montant;
            tresorerie -= montant;
            message = `Prime de ${montant}€ versée à l'entreprise ${entreprises[0].nom}.`;
            break;

        case "holding":
            if (holdings.length === 0) {
                alert("Aucune holding disponible.");
                return;
            }
            holdings[0].tresorerie += montant;
            tresorerie -= montant;
            message = `Prime de ${montant}€ versée à la holding ${holdings[0].nom}.`;
            break;

        case "conglomerat":
            if (conglomerats.length === 0) {
                alert("Aucun conglomérat disponible.");
                return;
            }
            conglomerats[0].tresorerie += montant;
            tresorerie -= montant;
            message = `Prime de ${montant}€ versée au conglomérat ${conglomerats[0].nom}.`;
            break;
    }

    historiquePrimes.push(message);
    ge_afficherHistoriquePrimes();
    ge_afficherTresorerie();
}

function ge_afficherHistoriquePrimes() {
    const zone = document.getElementById("historique-primes");
    zone.innerHTML = historiquePrimes.map(l => `<div>• ${l}</div>`).join("");
}
function ge_mettreAJourListeCibles() {
    const type = document.getElementById("prime-cible").value;
    const liste = document.getElementById("prime-cible-liste");

    // Réinitialisation
    liste.innerHTML = "";
    liste.style.display = "none";

    let source = [];

    if (type === "entreprise") source = entreprises;
    if (type === "holding") source = holdings;
    if (type === "conglomerat") source = conglomerats;

    if (source.length === 0 || type === "joueur") {
        return; // rien à afficher
    }

    // Affiche la liste
    liste.style.display = "block";

    source.forEach(obj => {
        const opt = document.createElement("option");
        opt.value = obj.id;
        opt.textContent = obj.nom;
        liste.appendChild(opt);
    });
}
