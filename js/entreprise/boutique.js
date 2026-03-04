// ===============================
// BOUTIQUE GEO EMPIRE
// ===============================
//
// Packs disponibles :
// - Prestige
// - Auto-Manager
// - GPS Immobilier
// - Crowns
// - G-Tokens
//
// Compatible avec :
// - entreprise.tresorerie
// - joueur.gTokens
// - joueur.crowns
// ===============================


// ===============================
// LISTE DES PACKS
// ===============================

const GE_BOUTIQUE = [
    {
        id: "prestige",
        nom: "Pack Prestige",
        prix: 500000,
        description: "Augmente la rentabilité de 15% et débloque des avantages exclusifs.",
        action: () => {
            entreprise.prestige = true;
            alert("Pack Prestige activé !");
        }
    },
    {
        id: "auto",
        nom: "Pack Auto-Manager",
        prix: 750000,
        description: "Automatise le marketing et optimise les dépenses.",
        action: () => {
            entreprise.autoManager = true;
            alert("Auto-Manager activé !");
        }
    },
    {
        id: "gps",
        nom: "Pack GPS Immobilier",
        prix: 250000,
        description: "Affiche les biens les plus rentables en priorité.",
        action: () => {
            entreprise.gps = true;
            alert("GPS Immobilier activé !");
        }
    },
    {
        id: "crowns",
        nom: "100 Crowns",
        prix: 100000,
        description: "Monnaie premium utilisée pour les bonus spéciaux.",
        action: () => {
            joueur.crowns = (joueur.crowns || 0) + 100;
            alert("100 Crowns ajoutés !");
        }
    },
    {
        id: "gtokens",
        nom: "500 G-Tokens",
        prix: 50000,
        description: "G-Tokens utilisables pour générer des Ø via les holdings.",
        action: () => {
            joueur.gTokens = (joueur.gTokens || 0) + 500;
            alert("500 G-Tokens ajoutés !");
        }
    }
];


// ===============================
// AFFICHAGE DE LA BOUTIQUE
// ===============================

function afficherBoutique() {
    const cont = document.getElementById("contenu-boutique");
    if (!cont) return;

    cont.innerHTML = `
        <h2 style="color:#00aaff;">Boutique Geo Empire</h2>
        <p>Trésorerie : <strong>${entreprise.tresorerie.toLocaleString()} Ø</strong></p>
        <div id="boutique-liste" style="margin-top:20px;"></div>
    `;

    const liste = document.getElementById("boutique-liste");

    GE_BOUTIQUE.forEach(pack => {
        const div = document.createElement("div");
        div.className = "pack-item";
        div.style = `
            background:#001a33;
            padding:15px;
            margin-bottom:15px;
            border:1px solid #004466;
            border-radius:6px;
        `;

        div.innerHTML = `
            <h3 style="color:#00ffaa;">${pack.nom}</h3>
            <p>${pack.description}</p>
            <p>Prix : <strong>${pack.prix.toLocaleString()} Ø</strong></p>
            <button onclick="acheterPack('${pack.id}')">Acheter</button>
        `;

        liste.appendChild(div);
    });
}


// ===============================
// ACHAT D'UN PACK
// ===============================

function acheterPack(id) {
    const pack = GE_BOUTIQUE.find(p => p.id === id);
    if (!pack) return;

    if (entreprise.tresorerie < pack.prix) {
        alert("Trésorerie insuffisante !");
        return;
    }

    entreprise.tresorerie -= pack.prix;

    // Exécute l'effet du pack
    pack.action();

    afficherBoutique();
}
