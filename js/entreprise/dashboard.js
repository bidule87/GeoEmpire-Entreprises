// ===============================
// DASHBOARD GEO EMPIRE — ULTRA PRO
// ===============================
//
// Affiche :
// - Trésorerie
// - Revenus journaliers / hebdo
// - Valeur totale des biens
// - Patrimoine total
// - G‑Tokens / Crowns
// - Statuts (Prestige, Auto‑Manager, GPS)
// - Résumé entreprises / holdings / conglomérats
// - Alertes intelligentes
// ===============================


// ===============================
// FONCTION PRINCIPALE
// ===============================

function ge_afficherDashboard() {
    const zone = document.getElementById("contenu-dashboard");
    if (!zone) return;

    const treso = entreprise.tresorerie || 0;
    const gainJour = estimerGainJournalier();
    const benefHebdo = entreprise.beneficeSemaine || 0;
    const valeurBiens = valeurTotaleBiens();
    const patrimoine = ge_calculerPatrimoine ? ge_calculerPatrimoine() : valeurBiens + treso;

    const gTokens = joueur?.gTokens || 0;
    const crowns = joueur?.crowns || 0;

    const nbEnt = entreprises?.length || 0;
    const nbHold = holdings?.length || 0;
    const nbCong = conglomerats?.length || 0;

    const alertes = ge_genererAlertes();

    zone.innerHTML = `
        <h2>Dashboard</h2>

        <div class="bloc">
            <h3>Économie</h3>
            <p>Trésorerie : <strong>${treso.toLocaleString()} Ø</strong></p>
            <p>Revenu journalier : <strong>${gainJour.toLocaleString()} Ø</strong></p>
            <p>Revenu hebdomadaire : <strong>${benefHebdo.toLocaleString()} Ø</strong></p>
            <p>Valeur totale des biens : <strong>${valeurBiens.toLocaleString()} Ø</strong></p>
            <p>Patrimoine total : <strong>${patrimoine.toLocaleString()} Ø</strong></p>

            <div class="jauge-container">
                ${ge_jauge("Trésorerie", treso, 1_000_000)}
                ${ge_jauge("Revenus", gainJour, 100_000)}
                ${ge_jauge("Patrimoine", patrimoine, 5_000_000)}
            </div>
        </div>

        <div class="bloc">
            <h3>Joueur</h3>
            <p>G‑Tokens : <strong>${gTokens}</strong></p>
            <p>Crowns : <strong>${crowns}</strong></p>
            <p>Prestige : <strong style="color:${entreprise.prestige ? "gold" : "gray"};">
                ${entreprise.prestige ? "ACTIF" : "Inactif"}
            </strong></p>
            <p>Auto‑Manager : <strong style="color:${entreprise.autoManager ? "#00ff99" : "gray"};">
                ${entreprise.autoManager ? "ACTIF" : "Inactif"}
            </strong></p>
            <p>GPS Immobilier : <strong style="color:${entreprise.gps ? "#00ffaa" : "gray"};">
                ${entreprise.gps ? "ACTIF" : "Inactif"}
            </strong></p>
        </div>

        <div class="bloc">
            <h3>Structures</h3>
            <p>Entreprises : <strong>${nbEnt}</strong></p>
            <p>Holdings : <strong>${nbHold}</strong></p>
            <p>Conglomérats : <strong>${nbCong}</strong></p>
        </div>

        <div class="bloc">
            <h3>Alertes</h3>
            <div style="text-align:left;">
                ${alertes.length === 0 
                    ? "<p>Aucune alerte.</p>" 
                    : alertes.map(a => `<p>• ${a}</p>`).join("")}
            </div>
        </div>
    `;
}


// ===============================
// JAUGES ANIMÉES
// ===============================

function ge_jauge(label, valeur, max) {
    const pct = Math.min(100, Math.round((valeur / max) * 100));

    return `
        <div class="jauge-bloc">
            <span>${label} : ${pct}%</span>
            <div class="jauge">
                <div class="jauge-bar" style="width:${pct}%;"></div>
            </div>
        </div>
    `;
}


// ===============================
// ALERTES INTELLIGENTES
// ===============================

function ge_genererAlertes() {
    const alertes = [];

    if (entreprise.tresorerie < 10000)
        alertes.push("Trésorerie très faible.");

    if (marketing.couleur === "rouge")
        alertes.push("Marketing insuffisant : peu de clients.");

    if (biensPossedes.some(b => !b.assure))
        alertes.push("Certains biens ne sont pas assurés.");

    if (!entreprise.autoManager)
        alertes.push("Auto‑Manager non activé (optimisation manuelle).");

    if (!entreprise.prestige)
        alertes.push("Prestige non activé (rentabilité réduite).");

    return alertes;
}
