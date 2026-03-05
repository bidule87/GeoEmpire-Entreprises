// ===============================
// IMMOBILISATIONS — ULTRA PRO
// ===============================
//
// Compatible avec :
// - systeme.js (biensDisponibles, biensPossedes, acheterBien, etc.)
// - entreprises.js (valeurTotaleBiens, estimerGainJournalier)
// - systeme_roles.js (ge_peutFaire)
// - Navigation PRO (ge_naviguer)
// ===============================


// ===============================
// UI PRINCIPALE
// ===============================

export function afficherImmobilisations() {
    const cont = document.getElementById("contenu-immobilisations");
    if (!cont) return;

    // Génération IA si catalogue vide
    if (biensDisponibles.length === 0) {
        genererBiensPourCategorie();
    }

    const role = joueur?.role || "Aucun rôle";
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

            html += `
                <tr style="background:#001a33; color:#ddd;">
                    <td style="padding:8px;">${bien.categorie}</td>
                    <td style="padding:8px;">${bien.type}</td>
                    <td style="padding:8px;">${bien.prixAchat.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${net.toLocaleString()} Ø</td>
                    <td style="padding:8px;">${bien.assure ? "Oui" : "Non"}</td>
                    <td style="padding:8px;">
                        ${ge_peutFaire(role, "vendre") ? `<button onclick="ge_vendreBien('${bien.id}')">Vendre</button>` : ""}
                    </td>
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
                    <button onclick="ge_uiAcheterBien('${bien.id}')">Acheter</button>
                </td>
            </tr>
        `;
    });

    html += `</table>`;

    cont.innerHTML = html;
}


// ===============================
// ACTION ACHAT
// ===============================

export function ge_uiAcheterBien(idBien) {
    const bien = biensDisponibles.find(b => b.id === idBien);
    if (!bien) return;

    const role = joueur?.role || "Aucun rôle";
    const coutAssurance = Math.round(bien.prixAchat * 0.01);

    const ok = acheterBien(bien, coutAssurance, role);
    if (!ok) return;

    alert("Bien acheté avec succès !");
    afficherImmobilisations();
}


// ===============================
// ACTION VENTE (ULTRA PRO)
// ===============================

export function ge_vendreBien(idBien) {
    const bien = biensPossedes.find(b => b.id === idBien);
    if (!bien) return;

    const role = joueur?.role || "Aucun rôle";

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
// EXPORT GLOBAL POUR NAVIGATION
// ===============================

window.afficherImmobilisations = afficherImmobilisations;
window.ge_uiAcheterBien = ge_uiAcheterBien;
window.ge_vendreBien = ge_vendreBien;
