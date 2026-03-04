// ===============================
// DASHBOARD GEO EMPIRE
// ===============================
//
// Vue d’ensemble complète :
// - économie
// - joueur
// - entreprises / holdings
// - alertes
//
// Compatible avec tout le système PRO
// ===============================


function ge_afficherDashboard() {
    const zone = document.getElementById("contenu-dashboard");
    if (!zone) return;

    const treso = entreprise.tresorerie || 0;
    const gainJour = estimerGainJournalier();
    const benefHebdo = entreprise.beneficeSemaine || 0;
    const patrimoine = ge_calculerPatrimoine(joueur);

    const nbEntreprises = entreprises?.length || 0;
    const nbHoldings = holdings?.length || 0;
    const nbConglom = conglomerats?.length || 0;

    const alerts = ge_genererAlertes();

    zone.innerHTML = `
        <h2>Dashboard</h2>

        <div class="bloc">
            <h3>Économie</h3>
            <p>Trésorerie : <strong>${treso.toLocaleString()} Ø</strong></p>
            <p>Revenus journaliers : <strong>${gainJour.toLocaleString()} Ø</strong></p>
            <p>Revenus hebdomadaires : <strong>${benefHebdo.toLocaleString()} Ø</strong></p>
            <p>Valeur totale des biens : <strong>${valeurTotaleBiens().toLocaleString()} Ø</strong></p>
        </div>

        <div class="bloc">
            <h3>Joueur</h3>
            <p>Patrimoine : <strong>${patrimoine.toLocaleString()} Ø</strong></p>
            <p>G‑Tokens : <strong>${joueur.gTokens || 0}</strong></p>
            <p>Crowns : <strong>${joueur.crowns || 0}</strong></p>
            <p>Prestige : <strong style="color:${entreprise.prestige ? 'gold' : '#888'};">
                ${entreprise.prestige ? "Actif" : "Inactif"}
            </strong></p>
            <p>Auto‑Manager : <strong style="color:${entreprise.autoManager ? '#00ffaa' : '#888'};">
                ${entreprise.autoManager ? "Actif" : "Inactif"}
            </strong></p>
            <p>GPS Immobilier : <strong style="color:${entreprise.gps ? '#00ffaa' : '#888'};">
                ${entreprise.gps ? "Actif" : "Inactif"}
            </strong></p>
        </div>

        <div class="bloc">
            <h3>Structures</h3>
            <p>Entreprises : <strong>${nbEntreprises}</strong></p>
            <p>Holdings : <strong>${nbHoldings}</strong></p>
            <p>Conglomérats : <strong>${nbConglom}</strong></p>
        </div>

        <div class="bloc">
            <h3>Alertes</h3>
            ${alerts.length === 0 
                ? "<p>Aucune alerte.</p>"
                : alerts.map(a => `<p style="color:${a.color};">• ${a.text}</p>`).join("")
            }
        </div>
    `;
}


// ===============================
// ALERTES INTELLIGENTES
// ===============================

function ge_genererAlertes() {
    const list = [];

    if (entreprise.tresorerie < 10000) {
        list.push({ text: "Trésorerie très faible", color: "#ff4444" });
    }

    if (marketing.couleur === "rouge") {
        list.push({ text: "Marketing insuffisant", color: "#ff8800" });
    }

    const biensNonAssures = biensPossedes.filter(b => !b.assure).length;
    if (biensNonAssures > 0) {
        list.push({ text: `${biensNonAssures} biens non assurés`, color: "#ffaa00" });
    }

    if (entreprise.beneficeSemaine > 0) {
        list.push({ text: "Impôts hebdomadaires à venir", color: "#ffcc00" });
    }

    return list;
}
