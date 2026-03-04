// ===============================
// MODULE ASSURANCES GEO EMPIRE
// ===============================

const assurances = [
    {
        id: "base",
        nom: "Base Civique",
        remboursement: 0,
        bonusVente: 0,
        bonusValeur: 0,
        coutPourcentage: 0.00004
    },
    {
        id: "securis",
        nom: "Sécuris+",
        remboursement: 40,
        bonusVente: 0,
        bonusValeur: 0,
        coutPourcentage: 0.00010
    },
    {
        id: "optima",
        nom: "OptimaGuard",
        remboursement: 65,
        bonusVente: 5,
        bonusValeur: 0,
        coutPourcentage: 0.00014
    },
    {
        id: "total",
        nom: "TotalShield",
        remboursement: 100,
        bonusVente: 10,
        bonusValeur: 0,
        coutPourcentage: 0.00022
    },
    {
        id: "prestige",
        nom: "Imperium Prestige",
        remboursement: 120,
        bonusVente: 15,
        bonusValeur: 5,
        coutPourcentage: 0,
        prestigeOnly: true
    }
];

function coutAssurance(bien, assurance) {
    return Math.round(bien.prixAchat * assurance.coutPourcentage);
}

function appliquerAssurance(bien, idAssurance) {
    const a = assurances.find(x => x.id === idAssurance);
    if (!a) return false;

    if (a.prestigeOnly && !entreprise.prestige) {
        alert("Cette assurance est réservée au Pack Prestige.");
        return false;
    }

    const cout = coutAssurance(bien, a);

    if (entreprise.tresorerie < cout) {
        alert("Trésorerie insuffisante pour cette assurance.");
        return false;
    }

    entreprise.tresorerie -= cout;

    bien.assurance = {
        id: a.id,
        nom: a.nom,
        remboursement: a.remboursement,
        bonusVente: a.bonusVente,
        bonusValeur: a.bonusValeur
    };

    return true;
}
