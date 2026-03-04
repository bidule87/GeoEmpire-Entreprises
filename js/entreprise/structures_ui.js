// ===============================
// UI : AFFICHAGE DES STRUCTURES GEO EMPIRE
// ===============================
//
// Affiche :
// - Entreprises
// - Holdings
// - Conglomérats
//
// Style bleu-néon cohérent avec l'interface Geo Empire.
// ===============================


// ===============================
// TABLE ENTREPRISES
// ===============================

function ge_ui_tableEnterprises() {
    let html = `<h2 style="color:#00aaff; margin-bottom:10px;">Entreprises</h2>`;

    if (!entreprises || entreprises.length === 0) {
        html += `<p>Aucune entreprise enregistrée.</p>`;
        return html;
    }

    html += `<div class="ge-list">`;

    entreprises.forEach(e => {
        html += `
            <div class="ge-item">
                <strong>${e.nom}</strong><br>
                Trésorerie : <span style="color:#00ffaa;">${e.tresorerie.toLocaleString()} Ø</span>
            </div>
        `;
    });

    html += `</div>`;
    return html;
}


// ===============================
// TABLE HOLDINGS
// ===============================

function ge_ui_tableHoldings() {
    let html = `<h2 style="color:#00aaff; margin-top:25px; margin-bottom:10px;">Holdings</h2>`;

    if (!holdings || holdings.length === 0) {
        html += `<p>Aucune holding enregistrée.</p>`;
        return html;
    }

    html += `<div class="ge-list">`;

    holdings.forEach(h => {
        html += `
            <div class="ge-item">
                <strong>${h.nom}</strong><br>
                Trésorerie : <span style="color:#00ffaa;">${h.tresorerie.toLocaleString()} Ø</span>
            </div>
        `;
    });

    html += `</div>`;
    return html;
}


// ===============================
// TABLE CONGLOMÉRATS
// ===============================

function ge_ui_tableConglomerats() {
    let html = `<h2 style="color:#00aaff; margin-top:25px; margin-bottom:10px;">Conglomérats</h2>`;

    if (!conglomerats || conglomerats.length === 0) {
        html += `<p>Aucun conglomérat enregistré.</p>`;
        return html;
    }

    html += `<div class="ge-list">`;

    conglomerats.forEach(c => {
        html += `
            <div class="ge-item">
                <strong>${c.nom}</strong><br>
                Trésorerie : <span style="color:#00ffaa;">${c.tresorerie.toLocaleString()} Ø</span>
            </div>
        `;
    });

    html += `</div>`;
    return html;
}


// ===============================
// AFFICHAGE GLOBAL
// ===============================

function ge_afficherStructures() {
    const cont = document.getElementById("contenu-entreprises");
    if (!cont) return;

    cont.innerHTML = `
        ${ge_ui_tableEnterprises()}
        ${ge_ui_tableHoldings()}
        ${ge_ui_tableConglomerats()}
    `;
}
