// ===============================
// UI : AFFICHAGE DES STRUCTURES
// ===============================

function ge_ui_tableEnterprises() {
    let html = `<h3>Entreprises</h3>`;

    if (entreprises.length === 0) {
        html += `<p>Aucune entreprise.</p>`;
        return html;
    }

    html += `<ul>`;
    entreprises.forEach(e => {
        html += `<li>${e.nom} — Trésorerie : ${e.tresorerie.toLocaleString()} €</li>`;
    });
    html += `</ul>`;

    return html;
}

function ge_ui_tableHoldings() {
    let html = `<h3>Holdings</h3>`;

    if (holdings.length === 0) {
        html += `<p>Aucune holding.</p>`;
        return html;
    }

    html += `<ul>`;
    holdings.forEach(h => {
        html += `<li>${h.nom} — Trésorerie : ${h.tresorerie.toLocaleString()} €</li>`;
    });
    html += `</ul>`;

    return html;
}

function ge_ui_tableConglomerats() {
    let html = `<h3>Conglomérats</h3>`;

    if (conglomerats.length === 0) {
        html += `<p>Aucun conglomérat.</p>`;
        return html;
    }

    html += `<ul>`;
    conglomerats.forEach(c => {
        html += `<li>${c.nom} — Trésorerie : ${c.tresorerie.toLocaleString()} €</li>`;
    });
    html += `</ul>`;

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
